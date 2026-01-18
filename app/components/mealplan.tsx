'use client';

import { useEffect, useState } from 'react';

type DayKey = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
type WeekKey = 'WEEK 1' | 'WEEK 2' | 'WEEK 3' | 'WEEK 4';

interface Recipe {
  name: string;
}

interface PlannedMeal {
  weekNumber: number;
  dayOfWeek: string;
  mealType: string;
  recipe: Recipe;
}

interface MealPlanData {
  id: number;
  title: string;
  meals: PlannedMeal[];
}

export default function MealPlan() {
  const days: DayKey[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const weeks: WeekKey[] = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'];
  
  // Initialize with empty structure to prevent layout collapse
  const initialData: Record<DayKey, Record<WeekKey, { B: string; L: string; D: string }>> = {} as any;
  days.forEach(day => {
    initialData[day] = {};
    weeks.forEach(week => {
      initialData[day][week] = { B: '-', L: '-', D: '-' };
    });
  });

  const [mealData, setMealData] = useState<Record<DayKey, Record<WeekKey, { B: string; L: string; D: string }>>>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMealPlan() {
      try {
        const res = await fetch('/api/meal-plans');
        if (!res.ok) {
          throw new Error('Failed to fetch meal plans');
        }
        const data: MealPlanData[] = await res.json();
        
        if (data.length > 0) {
          const latestPlan = data[0];
          const processedData: any = JSON.parse(JSON.stringify(initialData)); // Deep copy empty structure
          
          latestPlan.meals.forEach(meal => {
            const day = meal.dayOfWeek as DayKey;
            const week = `WEEK ${meal.weekNumber}` as WeekKey;
            
            if (processedData[day] && processedData[day][week]) {
              const val = meal.recipe.name;
              if (meal.mealType.toLowerCase() === 'breakfast') processedData[day][week].B = val;
              else if (meal.mealType.toLowerCase() === 'lunch') processedData[day][week].L = val;
              else if (meal.mealType.toLowerCase() === 'dinner') processedData[day][week].D = val;
            }
          });
          
          setMealData(processedData);
        }
      } catch (err) {
        console.error(err);
        setError('Error loading meal plan');
      } finally {
        setLoading(false);
      }
    }

    fetchMealPlan();
  }, []);

  return (
    <main className="flex-1 p-8 bg-white overflow-auto">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-8 font-[family:var(--font-montserrat)]">
        Meal Plan {loading && <span className="text-sm font-normal text-gray-400">(Loading...)</span>}
      </h1>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-[family:var(--font-poppins)] shadow-2xl rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-white text-white font-semibold p-3 text-center border border-purple-200 text-sm">
              </th>
              {weeks.map((week) => (
                <th
                  key={week}
                  className="bg-white text-purple-600 font-semibold p-3 text-center border border-purple-200 text-sm"
                >
                  {week}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="bg-white text-purple-600 font-semibold p-3 text-center border border-purple-200 w-16">
                  {day}
                </td>
                {weeks.map((week) => (
                  <td
                    key={`${day}-${week}`}
                    className="p-3 border border-purple-200 text-xs text-gray-700 align-top bg-white"
                  >
                    <div className="space-y-1">
                      <div>
                        <span className="font-semibold text-purple-600">B:</span> {mealData[day][week].B}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-600">L:</span> {mealData[day][week].L}
                      </div>
                      <div>
                        <span className="font-semibold text-purple-600">D:</span> {mealData[day][week].D}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
