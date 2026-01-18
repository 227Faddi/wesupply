import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Same schemas as in the main route
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

export async function GET() {
  try {
    // BYPASS AUTH FOR TESTING
    const testAuthId = 'test-auth-id';

    const dbUser = await prisma.user.findUnique({
      where: { authId: testAuthId },
      include: { preferences: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const preferences = dbUser.preferences;
    const budget = preferences?.weeklyBudget || 100;
    const calories = preferences?.dailyCalories || 2000;
    const diet = preferences?.dietaryRestrictions?.join(", ") || "none";
    const allergens = preferences?.allergens?.join(", ") || "none";

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

    const savedPlan = await prisma.$transaction(async (tx) => {
      const newPlan = await tx.mealPlan.create({
        data: {
          title: generatedPlan.title,
          startDate: new Date(),
          totalCost: generatedPlan.totalCost,
          userId: dbUser.id,
        },
      });

      for (const meal of generatedPlan.meals) {
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

        await tx.plannedMeal.create({
          data: {
            weekNumber: 1,
            dayOfWeek: meal.dayOfWeek,
            mealType: meal.mealType,
            mealPlanId: newPlan.id,
            recipeId: recipe.id,
          },
        });
      }

      return newPlan;
    });

    return NextResponse.json({ message: "Success", plan: savedPlan });

  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
  }
}
