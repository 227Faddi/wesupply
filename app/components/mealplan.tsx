'use client';

type DayKey = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
type WeekKey = 'WEEK 1' | 'WEEK 2' | 'WEEK 3' | 'WEEK 4';

export default function MealPlan() {
  const days: DayKey[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
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
  };

  return (
    <main className="flex-1 p-8 bg-white overflow-auto">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-8 font-[family:var(--font-montserrat)]">
        Meal Plan
      </h1>

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
