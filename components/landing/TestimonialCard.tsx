'use client';

import React from 'react';
import { Reveal } from './Reveal';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
  index?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  rating,
  index = 0,
}) => {
  return (
    <Reveal delay={index * 0.5} variant="slideUp" duration="0.7s">
      <div className="bg-white rounded-3xl p-8 border border-gray-100/40 hover:shadow-lg transition-smooth group">
        <div className="flex gap-1 mb-5">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-lg">⭐</span>
          ))}
        </div>

        <p className="text-[#1a1a1a] text-lg mb-6 leading-relaxed italic">
          "{quote}"
        </p>

        <div className="border-t border-gray-100/40 pt-5">
          <p className="font-bold text-[#1a1a1a]">{name}</p>
          <p className="text-sm text-[#6b6b6b]">{role}</p>
        </div>
      </div>
    </Reveal>
  );
};
