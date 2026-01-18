import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  alignment = 'center',
  className = '',
}) => {
  return (
    <div className={`${alignment === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold text-[#7c8b5e] uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};
