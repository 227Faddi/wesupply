'use client';

import React, { useState } from 'react';
import { Reveal } from './Reveal';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={index} variant="slideUp" duration="0.7s">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-3xl p-8 transition-smooth hover:shadow-xl hover:scale-105 border border-gray-100/40 cursor-pointer"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-[#7c8b5e]/20 to-[#d4a574]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
          <div className="text-2xl text-[#7c8b5e]">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{title}</h3>
        <p className="text-[#6b6b6b] leading-relaxed">{description}</p>
      </div>
    </Reveal>
  );
};
