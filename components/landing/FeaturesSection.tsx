import React from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { FeatureCard } from './FeatureCard';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Smart Meal Recommendations',
      description: 'AI-powered suggestions based on your goals, preferences, and dietary needs. Get personalized plans that evolve with you.',
    },
    {
      icon: '📊',
      title: 'Nutrition + Macros Tracking',
      description: 'Monitor protein, carbs, fats, and micros in real-time. Hit your fitness goals with precision and confidence.',
    },
    {
      icon: '📅',
      title: 'Flexible Delivery Scheduling',
      description: 'Choose your delivery days and times. Pause, skip, or customize anytime. Complete control in your hands.',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a574]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Everything you need to thrive."
          subtitle="Smart nutrition meets convenience. Your meal prep, perfected."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
