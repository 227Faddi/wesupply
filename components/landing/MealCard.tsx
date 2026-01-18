'use client';

import React, { useState } from 'react';
import { Reveal } from './Reveal';

interface MealCardProps {
  image: string;
  name: string;
  calories: number;
  protein: number;
  tag: string;
  index?: number;
}

export const MealCard: React.FC<MealCardProps> = ({
  image,
  name,
  calories,
  protein,
  tag,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const tagColors: Record<string, string> = {
    'Vegan': 'bg-green-100 text-green-700',
    'High Protein': 'bg-orange-100 text-orange-700',
    'Low Carb': 'bg-blue-100 text-blue-700',
    'Gluten-Free': 'bg-purple-100 text-purple-700',
  };

  return (
    <Reveal delay={index * 0.5} variant="slideUp" duration="0.7s">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-3xl overflow-hidden transition-smooth hover:shadow-lg hover:scale-105 border border-gray-100/40"
      >
        {/* Image Placeholder */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#7c8b5e]/10 to-[#d4a574]/10 flex items-center justify-center">
          <div className={`absolute inset-0 bg-gradient-to-br from-[#d4a574]/40 to-[#7c8b5e]/40 transition-smooth ${isHovered ? 'scale-110' : 'scale-100'}`} />
          <div className="text-4xl relative z-10">🍱</div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-[#1a1a1a] flex-1 line-clamp-2">{name}</h3>
          </div>
          
          <div className="flex items-center gap-3 mb-4 text-sm font-medium">
            <span className="text-[#1a1a1a]">{calories}cal</span>
            <span className="w-1 h-1 bg-[#6b6b6b] rounded-full" />
            <span className="text-[#6b6b6b]">{protein}g protein</span>
          </div>

          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tagColors[tag] || 'bg-gray-100 text-gray-700'}`}>
            {tag}
          </div>
        </div>
      </div>
    </Reveal>
  );
};
