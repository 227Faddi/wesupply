'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: string;
  variant?: 'fade' | 'slideUp' | 'slideInRight' | 'scale';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = '0.6s',
  variant = 'slideUp',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getVariantStyles = () => {
    const baseStyle = `transition-all ease-out`;
    const animations: Record<string, string> = {
      fade: 'opacity-0',
      slideUp: 'opacity-0 translate-y-8',
      slideInRight: 'opacity-0 translate-x-10',
      scale: 'opacity-0 scale-95',
    };

    return isVisible
      ? `opacity-100 translate-y-0 translate-x-0 scale-100 ${baseStyle}`
      : `${animations[variant]} ${baseStyle}`;
  };

  return (
    <div
      ref={ref}
      className={`${getVariantStyles()} ${className}`}
      style={{
        transitionDuration: duration,
        transitionDelay: `${delay * 100}ms`,
      }}
    >
      {children}
    </div>
  );
};
