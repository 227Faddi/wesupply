
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Onboarding from './onboarding/page';
import MealPlan from './components/mealplan';
import Budget from './components/budget';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const done = localStorage.getItem('wesupply_user_settings');
      if (!done) setShowOnboarding(true);
      setChecked(true);
    }
  }, []);

  if (!checked) return null;
  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <>
      <MealPlan />
      <Budget />
    </>
  );
}
