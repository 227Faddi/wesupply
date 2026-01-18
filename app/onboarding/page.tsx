'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  { key: 'name', label: 'What is your name?', type: 'text', placeholder: 'Enter your name', required: true },
  { key: 'email', label: 'What is your email?', type: 'email', placeholder: 'Enter your email', required: true },
  { key: 'age', label: 'How old are you?', type: 'number', placeholder: 'Enter your age', min: 1, max: 120, required: true },
  { key: 'sex', label: 'What is your sex?', type: 'select', options: ['Male', 'Female'], required: true },
  { key: 'height', label: 'What is your height (cm)?', type: 'number', placeholder: 'Enter your height in cm', min: 50, max: 250, required: true },
  { key: 'weight', label: 'What is your weight (kg)?', type: 'number', placeholder: 'Enter your weight in kg', min: 20, max: 300, required: true },
  { key: 'budget', label: 'What is your weekly food budget (€)?', type: 'number', placeholder: 'Enter your budget', min: 0, required: true },
  { key: 'duration', label: 'How many weeks for your meal plan?', type: 'number', placeholder: 'Enter duration in weeks', min: 1, max: 52, required: true },
  { key: 'restrictions', label: 'Any dietary restrictions?', type: 'text', placeholder: 'e.g. Vegan, Gluten-free', required: false },
  { key: 'goal', label: 'What is your goal?', type: 'select', options: ['Lose weight', 'Maintain weight', 'Gain weight'], required: true },
  { key: 'knowsCalories', label: 'Do you know how many calories you consume daily?', type: 'select', options: ['Yes', 'No'], required: true },
];

const activityQuestions = [
  { key: 'activityLevel', label: 'How active are you in sports?', type: 'select', options: ['Sedentary', 'Light', 'Moderate', 'Active'], required: true },
];

function calculateMetabolicRate({ sex, weight, height, age }) {
  if (sex === 'Male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calculateCaloriesBurned(metabolicRate, activityLevel) {
  switch (activityLevel) {
    case 'Sedentary': return metabolicRate * 1.2;
    case 'Light': return metabolicRate * 1.375;
    case 'Moderate': return metabolicRate * 1.55;
    case 'Active': return metabolicRate * 1.725;
    default: return metabolicRate * 1.2;
  }
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [calculatedCalories, setCalculatedCalories] = useState(null);
  const router = useRouter();

  const isLast = step === questions.length - 1 || (step === questions.length && answers.knowsCalories === 'Yes');
  const showActivity = step === questions.length && answers.knowsCalories === 'No';
  const totalSteps = questions.length + (answers.knowsCalories === 'No' ? 1 : 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (showActivity) {
      const metabolicRate = calculateMetabolicRate({
        sex: answers.sex,
        weight: Number(answers.weight),
        height: Number(answers.height),
        age: Number(answers.age),
      });
      const calories = calculateCaloriesBurned(metabolicRate, answers.activityLevel);
      setCalculatedCalories(Math.round(calories));
      setAnswers((prev) => ({ ...prev, caloriesBurned: Math.round(calories) }));
      setStep((s) => s + 1);
    } else if (isLast) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('wesupply_user_settings', JSON.stringify(answers));
        window.location.href = '/';
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleActivityChange = (e) => {
    setAnswers((prev) => ({ ...prev, activityLevel: e.target.value }));
  };

  let currentQuestion = null;
  if (step < questions.length) {
    currentQuestion = questions[step];
  } else if (showActivity) {
    currentQuestion = activityQuestions[0];
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center border-2 border-[#0033FF]/30">
        <h2 className="text-2xl font-bold text-[#0033FF] mb-6 font-[family:var(--font-montserrat)]">Welcome to WeSupply!</h2>
        <form className="w-full" onSubmit={handleNext}>
          {currentQuestion && (
            <div className="mb-8 w-full">
              <label className="block text-lg font-semibold text-[#977DFF] mb-4 font-[family:var(--font-poppins)]">
                {currentQuestion.label}
              </label>
              {currentQuestion.type === 'select' ? (
                <select
                  name={currentQuestion.key}
                  value={answers[currentQuestion.key] || ''}
                  onChange={showActivity ? handleActivityChange : handleChange}
                  className="w-full border-2 border-[#0033FF] rounded-lg p-3 text-[#0033FF] bg-white focus:outline-none focus:border-[#0033FF] font-[family:var(--font-poppins)]"
                  required={currentQuestion.required}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {currentQuestion.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={currentQuestion.key}
                  type={currentQuestion.type}
                  value={answers[currentQuestion.key] || ''}
                  onChange={handleChange}
                  placeholder={currentQuestion.placeholder}
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  className="w-full border-2 border-[#0033FF] rounded-lg p-3 text-[#0033FF] bg-white focus:outline-none focus:border-[#0033FF] font-[family:var(--font-poppins)]"
                  required={currentQuestion.required}
                />
              )}
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#977DFF] rounded-full mb-8">
            <div
              className="h-2 bg-[#0033FF] rounded-full transition-all duration-300"
              style={{ width: `${Math.min((step + 1) / totalSteps, 1) * 100}%` }}
            ></div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0033FF] text-white py-3 rounded-lg font-bold text-lg font-[family:var(--font-montserrat)] hover:bg-[#0600AF] hover:text-[#FFCCF2] transition-colors"
            disabled={currentQuestion && !answers[currentQuestion.key]}
          >
            {isLast ? 'Finish' : 'Next'}
          </button>
        </form>
        {calculatedCalories && (
          <div className="mt-8 text-center">
            <p className="text-[#0033FF] font-semibold text-lg">Estimated Calories Burned: {calculatedCalories} kcal</p>
          </div>
        )}
      </div>
    </div>
  );
}
