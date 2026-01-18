import React from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { PricingCard } from './PricingCard';

export const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: 49,
      description: 'Perfect for trying us out',
      features: ['5 meals per week', 'Standard delivery', 'Basic nutrition tracking', 'Email support'],
      isPopular: false,
    },
    {
      name: 'Pro',
      price: 79,
      description: 'Most popular choice',
      features: ['12 meals per week', 'Priority delivery', 'Advanced macro tracking', 'Priority support', 'Meal customization', 'Recipe variations'],
      isPopular: true,
    },
    {
      name: 'Family',
      price: 149,
      description: 'Feed the whole crew',
      features: ['25 meals per week', 'Free delivery always', 'Full family tracking', 'Dedicated support', 'Custom recipes', 'Bulk discounts'],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans for everyone."
          subtitle="No hidden fees. Cancel anytime. Switch plans whenever you want."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
