import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Setup local prisma client for testing
let connectionString = process.env.DATABASE_URL;
if (connectionString) {
  // Remove sslmode=require or similar to prevent conflict with our explicit config
  // This is a common fix for "self-signed certificate" errors when using pools
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  connectionString = url.toString();
}

const pool = new Pool({ 
    connectionString, 
    ssl: { rejectUnauthorized: false } // Force accept self-signed
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

async function testEndpoint() {
  console.log("Calling Gemini 2.5 Flash...");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: mealPlanSchema as any,
    },
  });

  const prompt = `
    Create a 1-week meal plan (7 days, 3 meals per day) for a user with the following preferences:
    - Weekly Budget: $150
    - Daily Calories Goal: 2000
    - Dietary Restrictions: none
    - Allergens to avoid: none

    Ensure the meals are varied and nutritious.
    The output must strictly follow the JSON schema provided.
    The 'ingredients' field in recipes should be a list of items with estimated prices.
    Calculate total costs accurately.
    
    Return 21 meals in total (3 per day for 7 days).
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const generatedPlan = JSON.parse(text);
    
    console.log("SUCCESS! Generated Meal Plan. Saving to DB...");
    
    // Find a user to attach this to (or create a dummy one if needed)
    // For this test script, we'll try to find the first user, or create a placeholder.
    let user = await prisma.user.findFirst();
    if (!user) {
        console.log("No user found, creating a test user...");
        user = await prisma.user.create({
            data: {
                email: "test_script_user@example.com",
                authId: "test_script_auth_id",
                preferences: {
                    create: {
                        weeklyBudget: 150,
                        dailyCalories: 2000,
                        dietaryRestrictions: [],
                        allergens: []
                    }
                }
            }
        });
    }

    const savedPlan = await prisma.$transaction(async (tx) => {
      const newPlan = await tx.mealPlan.create({
        data: {
          title: generatedPlan.title,
          startDate: new Date(),
          totalCost: generatedPlan.totalCost,
          userId: user.id,
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

    console.log(`\n✅ Saved Meal Plan to DB! ID: ${savedPlan.id}`);
    console.log(`Title: ${savedPlan.title}`);
    console.log(`Total Cost: $${savedPlan.totalCost}`);
    
  } catch (error: any) {
    console.error("Error:", error);
  } finally {
      await prisma.$disconnect();
  }
}

testEndpoint();