'use client';

import React, { useState } from 'react';
import { Reveal } from './Reveal';

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  index?: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={index} variant="slideUp" duration="0.7s">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative rounded-3xl transition-smooth ${
          isPopular
            ? 'bg-gradient-to-br from-[#7c8b5e] to-[#5c6b4e] text-white shadow-2xl scale-105'
            : 'bg-white border border-gray-100/40 hover:shadow-lg hover:scale-102'
        } p-8`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#d4a574] text-[#1a1a1a] px-4 py-1 rounded-full text-xs font-bold">
            Most Popular
          </div>
        )}

        <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-[#1a1a1a]'}`}>
          {name}
        </h3>
        <p className={`text-sm mb-6 ${isPopular ? 'text-white/80' : 'text-[#6b6b6b]'}`}>
          {description}
        </p>

        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-[#1a1a1a]'}`}>
              ${price}
            </span>
            <span className={isPopular ? 'text-white/80' : 'text-[#6b6b6b]'}>/month</span>
          </div>
        </div>

        <button
          className={`w-full py-3 px-6 rounded-full font-semibold transition-smooth mb-8 ${
            isPopular
              ? 'bg-[#d4a574] text-[#1a1a1a] hover:bg-white hover:shadow-lg'
              : 'bg-[#7c8b5e] text-white hover:bg-[#5c6b4e] hover:shadow-lg'
          }`}
        >
          Get Started
        </button>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  isPopular ? 'bg-[#d4a574] text-[#1a1a1a]' : 'bg-[#7c8b5e]/20 text-[#7c8b5e]'
                }`}
              >
                ✓
              </div>
              <span className={`text-sm ${isPopular ? 'text-white/90' : 'text-[#6b6b6b]'}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};
