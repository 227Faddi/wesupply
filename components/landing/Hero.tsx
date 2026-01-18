'use client';

import React, { useState } from 'react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#d4a574]/10 rounded-full blur-3xl animate-blob opacity-40" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#7c8b5e]/10 rounded-full blur-3xl opacity-30" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <Reveal variant="slideUp" duration="0.8s">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-tight">
              Healthy meals, <span className="text-[#7c8b5e]">supplied</span> for your week.
            </h1>
          </Reveal>

          <Reveal variant="slideUp" delay={1} duration="0.8s">
            <p className="text-lg md:text-xl text-[#6b6b6b] leading-relaxed max-w-lg">
              Save time, eat clean, and hit your goals. WeSupply delivers personalized meal plans straight to your door.
            </p>
          </Reveal>

          {/* Trust line */}
          <Reveal variant="slideUp" delay={2} duration="0.8s">
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium text-[#6b6b6b]">
              <div className="flex items-center gap-2">
                <span>⭐ 4.9/5 from 2,000+ customers</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-[#6b6b6b] rounded-full" />
              <div className="flex items-center gap-2">
                <span>🚚 Free delivery over $50</span>
              </div>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal variant="slideUp" delay={3} duration="0.8s">
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-[#7c8b5e] text-white rounded-full font-bold text-lg hover:bg-[#5c6b4e] transition-colors hover:shadow-xl hover:scale-105 active:scale-95">
                Start Meal Plan
              </button>
              <button className="px-8 py-4 border-2 border-[#7c8b5e] text-[#7c8b5e] rounded-full font-bold text-lg hover:bg-[#7c8b5e]/5 transition-colors">
                View Menu
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Content - Image & Badges */}
        <Reveal variant="slideInRight" duration="1s">
          <div className="relative h-96 lg:h-full min-h-[500px]">
            {/* Main Hero Card */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/30 to-[#7c8b5e]/30 flex items-center justify-center">
                <div className="text-8xl md:text-9xl opacity-20 animate-float">🍱</div>
              </div>

              {/* Glass card overlay */}
              <div className="absolute inset-0 glass flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <div className="text-6xl">✨</div>
                  <p className="text-lg font-bold text-[#1a1a1a]">Premium Meals</p>
                  <p className="text-sm text-[#6b6b6b]">Chef-prepared & delivered</p>
                </div>
              </div>
            </div>

            {/* Floating Badge 1 - High Protein */}
            <div className="absolute -top-4 -right-4 bg-white rounded-3xl px-6 py-4 shadow-lg border border-gray-100/40 glass animate-float"
              style={{ animationDelay: '0s' }}>
              <p className="text-xs font-bold text-[#7c8b5e] uppercase tracking-widest">High Protein</p>
              <p className="text-lg font-bold text-[#1a1a1a]">25g+</p>
            </div>

            {/* Floating Badge 2 - Ready in 2 minutes */}
            <div className="absolute bottom-8 -left-4 bg-white rounded-3xl px-6 py-4 shadow-lg border border-gray-100/40 glass animate-float"
              style={{ animationDelay: '1s' }}>
              <p className="text-xs font-bold text-[#d4a574] uppercase tracking-widest">Ready in</p>
              <p className="text-lg font-bold text-[#1a1a1a]">2 min</p>
            </div>

            {/* Weekly Plan Mini Card */}
            <div className="absolute -bottom-6 right-4 bg-white rounded-2xl p-5 shadow-lg border border-gray-100/40 glass w-64">
              <p className="text-xs font-bold text-[#7c8b5e] uppercase mb-3">This Week's Plan</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#1a1a1a] font-semibold">Monday</span>
                  <span className="text-[#6b6b6b]">Grilled Salmon</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1a1a1a] font-semibold">Tuesday</span>
                  <span className="text-[#6b6b6b]">Chicken Bowl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1a1a1a] font-semibold">Wednesday</span>
                  <span className="text-[#6b6b6b]">Tofu Stir-fry</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1a1a1a] font-semibold">Thursday</span>
                  <span className="text-[#6b6b6b]">Turkey Pasta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1a1a1a] font-semibold">Friday</span>
                  <span className="text-[#6b6b6b]">Beef Tacos</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
