import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    // Find the prisma user
    const dbUser = await prisma.user.findUnique({
      where: { authId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'Database user not found.' }, { status: 404 });
    }

    // 1. Create Sample Recipes
    const recipesData = [
      { name: 'Oatmeal', prepTime: 10, servings: 1, instructions: 'Boil oats.', totalCost: 1.5, costPerServing: 1.5, calories: 150, protein: 5, carbs: 25, fats: 3, ingredients: '[]' },
      { name: 'Stir fried vegetables', prepTime: 20, servings: 2, instructions: 'Fry veggies.', totalCost: 5.0, costPerServing: 2.5, calories: 200, protein: 4, carbs: 10, fats: 5, ingredients: '[]' },
      { name: 'Roast eggplant and tofu', prepTime: 30, servings: 2, instructions: 'Roast them.', totalCost: 6.0, costPerServing: 3.0, calories: 250, protein: 10, carbs: 15, fats: 8, ingredients: '[]' },
      { name: 'Banana Ice Cream', prepTime: 5, servings: 1, instructions: 'Blend frozen bananas.', totalCost: 1.0, costPerServing: 1.0, calories: 120, protein: 1, carbs: 28, fats: 0, ingredients: '[]' },
      { name: 'Tofu barbecue', prepTime: 25, servings: 2, instructions: 'Grill tofu.', totalCost: 4.0, costPerServing: 2.0, calories: 180, protein: 12, carbs: 5, fats: 6, ingredients: '[]' },
      { name: 'Roasted sweet potato', prepTime: 40, servings: 1, instructions: 'Bake potato.', totalCost: 0.5, costPerServing: 0.5, calories: 110, protein: 2, carbs: 26, fats: 0, ingredients: '[]' },
    ];

    const createdRecipes = [];
    for (const r of recipesData) {
      // Check if exists to avoid duplicates if run multiple times
      let recipe = await prisma.recipe.findFirst({ where: { name: r.name } });
      if (!recipe) {
        recipe = await prisma.recipe.create({ data: r });
      }
      createdRecipes.push(recipe);
    }

    // 2. Create Meal Plan
    const mealPlan = await prisma.mealPlan.create({
      data: {
        title: 'Sample Monthly Plan',
        startDate: new Date(),
        userId: dbUser.id,
        totalCost: 100.0,
      },
    });

    // 3. Create Planned Meals
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
    const weeks = [1, 2, 3, 4];
    const types = ['breakfast', 'lunch', 'dinner'];

    for (const week of weeks) {
      for (const day of days) {
        for (const type of types) {
          // Pick a random recipe
          const randomRecipe = createdRecipes[Math.floor(Math.random() * createdRecipes.length)];
          
          await prisma.plannedMeal.create({
            data: {
              weekNumber: week,
              dayOfWeek: day,
              mealType: type,
              mealPlanId: mealPlan.id,
              recipeId: randomRecipe.id,
            },
          });
        }
      }
    }

    return NextResponse.json({ message: 'Success! Sample data created.', mealPlanId: mealPlan.id });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json({ error: 'Error seeding data: ' + error }, { status: 500 });
  }
}
