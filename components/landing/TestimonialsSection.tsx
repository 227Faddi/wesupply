import React from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { TestimonialCard } from './TestimonialCard';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fitness Enthusiast',
      quote: 'I lost 15 lbs in 3 months without feeling deprived. WeSupply makes it so easy to eat healthy consistently.',
      rating: 5,
    },
    {
      name: 'Marcus Thompson',
      role: 'Busy Professional',
      quote: 'As someone working 60-hour weeks, this service is a game-changer. Healthy meals without the stress.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Medical Student',
      quote: 'Finally, I can focus on my studies instead of meal prepping every Sunday. The food is actually delicious!',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#d4a574]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Loved by 2,000+ Customers"
          title="See what people are saying."
          subtitle="Real stories from real customers who transformed their health with WeSupply."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
