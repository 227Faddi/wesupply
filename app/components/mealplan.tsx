'use client';

type DayKey = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
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
  const days: DayKey[] = ['MON', 'TUE', 'WED', 'THU', 'FRI','SAT','SUN'];
  const weeks: WeekKey[] = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'];
  
  const mealData: Record<DayKey, Record<WeekKey, { B: string; L: string; D: string }>> = {
    MON: {
      'WEEK 1': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 2': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
      'WEEK 3': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 4': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
    },
    TUE: {
      'WEEK 1': { B: 'Cereal', L: 'Tofu barbecue & garlic rice', D: 'Roasted sweet potato' },
      'WEEK 2': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 3': { B: 'Cereal', L: 'Tofu barbecue & garlic rice', D: 'Roasted sweet potato' },
      'WEEK 4': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
    },
    WED: {
      'WEEK 1': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
      'WEEK 2': { B: 'Cereal', L: 'Tofu barbecue & garlic rice', D: 'Roasted sweet potato' },
      'WEEK 3': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
      'WEEK 4': { B: 'Cereal', L: 'Tofu barbecue & garlic rice', D: 'Roasted sweet potato' },
    },
    THU: {
      'WEEK 1': { B: 'Cereal', L: 'Tofu barbecue & garlic rice', D: 'Roasted sweet eggplant and tofu' },
      'WEEK 2': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 3': { B: 'Cereal', L: 'Tofu barbecue & garlic rice', D: 'Roasted sweet eggplant and tofu' },
      'WEEK 4': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
    },
    FRI: {
      'WEEK 1': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 2': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
      'WEEK 3': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 4': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
    },
    SAT: {
      'WEEK 1': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 2': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
      'WEEK 3': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 4': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
    },
    SUN: {
      'WEEK 1': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 2': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
      'WEEK 3': { B: 'Oatmeal', L: 'Stir fried vegetables', D: 'Roast eggplant and tofu' },
      'WEEK 4': { B: 'Banana Ice Cream', L: 'Stir fried veggies', D: 'Roast veggies' },
    },
  };

  return (
    <main className="flex-1 p-8 bg-white overflow-auto">
      <h1 className="text-3xl font-bold text-[#0033FF] text-center mb-8 font-[family:var(--font-montserrat)]">
        Meal Plan
      </h1>

      <div className="overflow-x-auto w-full flex justify-center">
        <table className="w-full max-w-2xl border-collapse font-[family:var(--font-poppins)] shadow-2xl rounded-lg overflow-hidden bg-white" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th className="bg-white text-[#977DFF] font-semibold p-3 text-center border border-[#977DFF] text-sm">
              </th>
              {weeks.map((week) => (
                <th
                  key={week}
                  className="bg-white text-[#0033FF] font-semibold p-3 text-center border border-[#977DFF] text-sm"
                >
                  {week}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="bg-white text-[#0033FF] font-semibold p-3 text-center border border-[#977DFF] w-16">
                  {day}
                </td>
                {weeks.map((week) => (
                  <td
                    key={`${day}-${week}`}
                    className="p-3 border border-[#977DFF] text-xs text-[#0600AF] align-top bg-white"
                  >
                    <div className="space-y-1">
                      <div>
                        <span className="font-semibold text-[#977DFF]">B:</span>{' '}
                        <a
                          href={`/recipes/${encodeURIComponent(`${week}-${day}-B-${mealData[day][week].B}`)}`}
                          className="text-[#0033FF] hover:underline cursor-pointer hover:text-[#0600AF]"
                        >
                          {mealData[day][week].B}
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold text-[#977DFF]">L:</span>{' '}
                        <a
                          href={`/recipes/${encodeURIComponent(`${week}-${day}-L-${mealData[day][week].L}`)}`}
                          className="text-[#0033FF] hover:underline cursor-pointer hover:text-[#0600AF]"
                        >
                          {mealData[day][week].L}
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold text-[#977DFF]">D:</span>{' '}
                        <a
                          href={`/recipes/${encodeURIComponent(`${week}-${day}-D-${mealData[day][week].D}`)}`}
                          className="text-[#0033FF] hover:underline cursor-pointer hover:text-[#0600AF]"
                        >
                          {mealData[day][week].D}
                        </a>
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
