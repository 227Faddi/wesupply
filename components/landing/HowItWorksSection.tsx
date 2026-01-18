import React from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export const HowItWorksSection: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Choose Your Goal',
      description: 'Tell us your objectives: lose fat, gain muscle, or maintain balance. We personalize everything from there.',
      icon: '🎯',
    },
    {
      number: 2,
      title: 'Pick Meals You Love',
      description: 'Browse 250+ weekly options and select your favorites. Mix and match to create the perfect plan for you.',
      icon: '🍽️',
    },
    {
      number: 3,
      title: 'Delivered & Ready',
      description: 'Your meals arrive at your door weekly. Reheat, enjoy, and crush your health goals. That\'s it!',
      icon: '📦',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Simple Process"
          title="How it works in 3 steps."
          subtitle="From goal-setting to delicious meals in your fridge. Simple, fast, effective."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index} variant="slideUp" duration="0.7s">
              <div className="relative">
                {/* Step number background */}
                <div className="absolute -top-8 -left-4 w-16 h-16 bg-[#7c8b5e]/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#7c8b5e] opacity-30">{step.number}</span>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100/40 pt-12">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">{step.title}</h3>
                  <p className="text-[#6b6b6b] leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-1 bg-gradient-to-r from-[#7c8b5e] to-transparent opacity-30" />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '10k+', label: 'Meals Delivered' },
            { number: '250+', label: 'Menu Options' },
            { number: '20+', label: 'Dietary Filters' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <Reveal key={index} delay={index * 0.3} variant="scale">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#7c8b5e] mb-1">{stat.number}</p>
                <p className="text-sm text-[#6b6b6b]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
