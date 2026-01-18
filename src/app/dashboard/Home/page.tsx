"use client";

import Onboarding from '../../onboarding/page';
import MealPlan from '../../../components/mealplan';
import Budget from '../../../components/budget';
import { useEffect, useState } from 'react';

// Example Sidebar component (replace with your actual navigation)
function Sidebar() {
  return (
    <aside className="w-64 bg-[#F5F5FF] border-r border-[#977DFF] min-h-screen p-6">
      {/* Navigation items go here */}
      <h2 className="text-xl font-bold text-[#0033FF] mb-4">Navigation</h2>
      <ul>
        <li className="mb-2"><a href="/dashboard" className="text-[#0600AF]">Dashboard</a></li>
        <li className="mb-2"><a href="/settings" className="text-[#0600AF]">Settings</a></li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
}

export default function Dashboard() {
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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-white overflow-auto">
        <div className="mb-8">
          <MealPlan />
        </div>
        <div>
          <Budget />
        </div>
        {/* Add your receipt component here, e.g. <Receipt /> */}
      </main>
    </div>
  );
}
