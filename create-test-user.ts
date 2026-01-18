import { prisma } from './lib/prisma';

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      authId: 'test-auth-id',
      name: 'Test User',
      preferences: {
        create: {
          weeklyBudget: 150,
          dailyCalories: 2500,
          dietaryRestrictions: ['vegan'],
          allergens: ['nuts']
        }
      }
    }
  });
  console.log('Created test user:', JSON.stringify(user, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
