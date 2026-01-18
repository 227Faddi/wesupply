import React from 'react';
import { Reveal } from './Reveal';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c8b5e]/10 via-[#d4a574]/5 to-[#7c8b5e]/10 -z-10" />

      {/* Decorative blobs */}
      <div className="absolute top-10 right-20 w-96 h-96 bg-[#d4a574]/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-[#7c8b5e]/10 rounded-full blur-3xl opacity-30" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal variant="slideUp" duration="0.8s">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-tight mb-6">
            Your best week <span className="text-[#7c8b5e]">starts</span> with WeSupply.
          </h2>
        </Reveal>

        <Reveal variant="slideUp" delay={1} duration="0.8s">
          <p className="text-lg md:text-xl text-[#6b6b6b] mb-10 max-w-2xl mx-auto">
            Join thousands who've already transformed their relationship with food. Get personalized meals delivered to your door.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={2} duration="0.8s">
          <button className="px-10 py-5 bg-[#7c8b5e] text-white rounded-full font-bold text-xl hover:bg-[#5c6b4e] transition-colors hover:shadow-2xl hover:scale-110 active:scale-95 inline-block">
            Build My Plan
          </button>
        </Reveal>

        <Reveal variant="fade" delay={3} duration="0.8s">
          <p className="text-sm text-[#6b6b6b] mt-6">
            No commitment. Cancel anytime. Your satisfaction is guaranteed.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
