'use client';

import { useState } from 'react';
import { Calendar, Mail, Ruler, Scale, Ban, User, Flame, Target } from 'lucide-react';

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState({
    age: 25,
    email: 'user@example.com',
    height: 175,
    weight: 70,
    restrictions: 'Vegan, Gluten-free',
    sex: 'Male',
    caloriesBurned: 2000,
    caloriesGoals: 2500,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(userSettings);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleModify = () => {
    setIsEditing(true);
    setTempSettings(userSettings);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    setUserSettings(tempSettings);
    setIsEditing(false);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowConfirmation(false);
  };

  const handleInputChange = (key: string, value: any) => {
    setTempSettings({
      ...tempSettings,
      [key]: value,
    });
  };

  const settingsCards = [
    { key: 'age', label: 'Age', unit: 'years', Icon: Calendar },
    { key: 'email', label: 'Email', unit: '', Icon: Mail },
    { key: 'height', label: 'Height', unit: 'cm', Icon: Ruler },
    { key: 'weight', label: 'Weight', unit: 'kg', Icon: Scale },
    { key: 'restrictions', label: 'Restrictions', unit: '', Icon: Ban },
    { key: 'sex', label: 'Sex', unit: '', Icon: User },
    { key: 'caloriesBurned', label: 'Calories Burned', unit: 'kcal', Icon: Flame },
    { key: 'caloriesGoals', label: 'Calories Goals', unit: 'kcal', Icon: Target },
  ];

  return (
    <div className="flex-1 bg-white p-8 overflow-auto flex flex-col min-h-screen w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0033FF] font-[family:var(--font-montserrat)]">
          Settings
        </h1>
        {!isEditing && (
          <button
            onClick={handleModify}
            className="bg-[#0033FF] text-white px-6 py-2 rounded-lg font-[family:var(--font-montserrat)] font-semibold text-sm hover:bg-[#0600AF] hover:text-[#FFCCF2] transition-colors"
          >
            Modify Profile
          </button>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {!isEditing ? (
            // Display Mode - Grid Layout
            <div className="grid grid-cols-4 gap-4">
              {settingsCards.map((card) => (
                <div
                  key={card.key}
                  className="bg-white border-2 border-[#977DFF] rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-2">
                    <card.Icon className="w-6 h-6 text-[#0033FF]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#977DFF] mb-1 font-[family:var(--font-poppins)]">
                    {card.label}
                  </h3>
                  <p
                    className={`font-semibold text-[#0600AF] font-[family:var(--font-montserrat)] ${(card.key === 'email' || card.key === 'restrictions') ? 'text-base' : 'text-lg'} ${card.key === 'email' ? 'break-words whitespace-normal' : ''}`}
                    style={card.key === 'email' ? { wordBreak: 'break-word', whiteSpace: 'normal' } : {}}
                  >
                    {userSettings[card.key as keyof typeof userSettings]}
                  </p>
                  {card.unit && (
                    <p className="text-xs text-[#0033FF] font-[family:var(--font-poppins)]">
                      {card.unit}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Edit Mode - Grid Layout
            <div className="grid grid-cols-4 gap-4">
              {settingsCards.map((card) => {
                const rawValue = tempSettings[card.key as keyof typeof tempSettings];
                const isNumericField =
                  card.key.includes('calories') ||
                  card.key.includes('age') ||
                  card.key.includes('height') ||
                  card.key.includes('weight');
                const displayValue = isNumericField
                  ? (typeof rawValue === 'number' && !Number.isNaN(rawValue) ? rawValue.toString() : '')
                  : (rawValue ?? '');

                return (
                  <div key={card.key} className="flex flex-col">
                    <label className="text-purple-600 font-semibold mb-1 font-[family:var(--font-poppins)] text-xs">
                      {card.label}
                    </label>
                    <input
                      type={card.key === 'email' ? 'email' : 'text'}
                      value={displayValue}
                      onChange={(e) =>
                        handleInputChange(
                          card.key,
                          isNumericField
                            ? e.target.value === ''
                              ? ''
                              : parseInt(e.target.value)
                            : e.target.value
                        )
                      }
                      className="bg-white border-2 border-purple-600 text-gray-700 px-3 py-2 rounded-lg font-[family:var(--font-poppins)] text-sm focus:outline-none focus:border-purple-700"
                    />
                    {card.unit && (
                      <p className="text-xs text-gray-500 mt-0.5">{card.unit}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {isEditing && (
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={handleSaveClick}
                className="bg-purple-600 text-white px-8 py-2 rounded-lg font-[family:var(--font-montserrat)] font-semibold text-sm hover:bg-purple-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-8 py-2 rounded-lg font-[family:var(--font-montserrat)] font-semibold text-sm hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4 border-2 border-purple-200 relative">
            <h2 className="text-xl font-bold text-purple-600 mb-3 font-[family:var(--font-montserrat)]">
              Confirm Update
            </h2>
            <p className="text-gray-700 mb-1 font-[family:var(--font-poppins)] text-sm">
              Are you sure you want to update your profile?
            </p>
            <p className="text-gray-600 text-xs mb-4 font-[family:var(--font-poppins)]">
              This modification will change your entire calorie diet plan.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleConfirmSave}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-[family:var(--font-montserrat)] font-semibold text-sm hover:bg-purple-700 transition-colors"
              >
                Yes, Update
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-[family:var(--font-montserrat)] font-semibold text-sm hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

