import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Define the schema for the AI response
// We define it outside to keep the handler clean
const recipeSchema = {
  type: SchemaType.OBJECT,
  properties: {
    name: { type: SchemaType.STRING },
    prepTime: { type: SchemaType.INTEGER },
    servings: { type: SchemaType.INTEGER },
    instructions: { type: SchemaType.STRING },
    totalCost: { type: SchemaType.NUMBER },
    costPerServing: { type: SchemaType.NUMBER },
    calories: { type: SchemaType.INTEGER },
    protein: { type: SchemaType.INTEGER },
    carbs: { type: SchemaType.INTEGER },
    fats: { type: SchemaType.INTEGER },
    ingredients: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          amount: { type: SchemaType.STRING },
          price: { type: SchemaType.NUMBER },
        },
        required: ["name", "amount", "price"],
      },
    },
  },
  required: ["name", "prepTime", "servings", "instructions", "totalCost", "costPerServing", "calories", "protein", "carbs", "fats", "ingredients"],
};

const plannedMealSchema = {
  type: SchemaType.OBJECT,
  properties: {
    dayOfWeek: { type: SchemaType.STRING, enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] },
    mealType: { type: SchemaType.STRING, enum: ["breakfast", "lunch", "dinner"] },
    recipe: recipeSchema,
  },
  required: ["dayOfWeek", "mealType", "recipe"],
};

const mealPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    totalCost: { type: SchemaType.NUMBER },
    meals: {
      type: SchemaType.ARRAY,
      items: plannedMealSchema,
    },
  },
  required: ["title", "totalCost", "meals"],
};

export async function POST(_req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
      include: { preferences: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const preferences = dbUser.preferences;
    
    // Default preferences if not set
    const budget = preferences?.weeklyBudget || 100;
    const calories = preferences?.dailyCalories || 2000;
    const diet = preferences?.dietaryRestrictions?.join(", ") || "none";
    const allergens = preferences?.allergens?.join(", ") || "none";

    // Using gemini-2.5-flash as requested
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: mealPlanSchema,
      },
    });

    const prompt = `
      Create a 1-week meal plan (7 days, 3 meals per day) for a user with the following preferences:
      - Weekly Budget: $${budget}
      - Daily Calories Goal: ${calories}
      - Dietary Restrictions: ${diet}
      - Allergens to avoid: ${allergens}

      Ensure the meals are varied and nutritious.
      The output must strictly follow the JSON schema provided.
      The 'ingredients' field in recipes should be a list of items with estimated prices.
      Calculate total costs accurately.
      
      Return 21 meals in total (3 per day for 7 days).
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const generatedPlan = JSON.parse(text);

    // Save to database
    const savedPlan = await prisma.$transaction(async (tx) => {
      // Create the meal plan
      const newPlan = await tx.mealPlan.create({
        data: {
          title: generatedPlan.title,
          startDate: new Date(), // Start today
          totalCost: generatedPlan.totalCost,
          userId: dbUser.id,
        },
      });

      // Create meals and recipes
      for (const meal of generatedPlan.meals) {
        // Create recipe
        const ingredientsJson = JSON.stringify(meal.recipe.ingredients);
        
        const recipe = await tx.recipe.create({
          data: {
            name: meal.recipe.name,
            prepTime: meal.recipe.prepTime,
            servings: meal.recipe.servings,
            instructions: meal.recipe.instructions,
            totalCost: meal.recipe.totalCost,
            costPerServing: meal.recipe.costPerServing,
            calories: meal.recipe.calories,
            protein: meal.recipe.protein,
            carbs: meal.recipe.carbs,
            fats: meal.recipe.fats,
            ingredients: ingredientsJson,
          },
        });

        // Link to meal plan
        await tx.plannedMeal.create({
          data: {
            weekNumber: 1, // Defaulting to week 1
            dayOfWeek: meal.dayOfWeek,
            mealType: meal.mealType,
            mealPlanId: newPlan.id,
            recipeId: recipe.id,
          },
        });
      }
      
      // Return the full plan with relations
      return await tx.mealPlan.findUnique({
        where: { id: newPlan.id },
        include: {
          meals: {
            include: {
              recipe: true
            }
          }
        }
      });
    });

    return NextResponse.json(savedPlan);

  } catch (error: any) {
    console.error('Error generating meal plan:', error);
    // Handle 429 specifically if we can detect it, or just return 500
    if (error.message?.includes('429')) {
         return NextResponse.json({ error: 'AI quota exceeded. Please try again later.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}