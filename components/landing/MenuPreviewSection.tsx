import React from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { MealCard } from './MealCard';

export const MenuPreviewSection: React.FC = () => {
  const meals = [
    { image: '', name: 'Grilled Salmon & Asparagus', calories: 520, protein: 38, tag: 'High Protein' },
    { image: '', name: 'Vegan Buddha Bowl', calories: 420, protein: 18, tag: 'Vegan' },
    { image: '', name: 'Chicken Breast & Sweet Potato', calories: 480, protein: 42, tag: 'High Protein' },
    { image: '', name: 'Low-Carb Zucchini Pasta', calories: 340, protein: 28, tag: 'Low Carb' },
    { image: '', name: 'Turkey Meatballs & Greens', calories: 450, protein: 35, tag: 'Gluten-Free' },
    { image: '', name: 'Tofu Stir-Fry', calories: 380, protein: 22, tag: 'Vegan' },
  ];

  return (
    <section id="menu" className="py-20 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7c8b5e]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Our Menu"
          title="250+ meals to choose from."
          subtitle="Variety for every taste, every goal. New dishes added weekly."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {meals.map((meal, index) => (
            <MealCard
              key={index}
              image={meal.image}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              tag={meal.tag}
              index={index}
            />
          ))}
        </div>

        <Reveal variant="scale" className="flex justify-center">
          <button className="px-8 py-4 border-2 border-[#7c8b5e] text-[#7c8b5e] rounded-full font-bold text-lg hover:bg-[#7c8b5e] hover:text-white transition-colors">
            See Full Menu
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <Reveal variant="slideUp">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7c8b5e] to-[#d4a574] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="font-bold text-xl">WeSupply</span>
              </div>
              <p className="text-gray-400 text-sm">Healthy meals, delivered for your week.</p>
            </div>
          </Reveal>

          {/* Product */}
          <Reveal variant="slideUp" delay={1}>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </Reveal>

          {/* Company */}
          <Reveal variant="slideUp" delay={2}>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </Reveal>

          {/* Legal */}
          <Reveal variant="slideUp" delay={3}>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DPA</a></li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12" />

        {/* Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Reveal variant="slideUp">
            <p className="text-gray-400 text-sm">
              © 2024 WeSupply. All rights reserved. Built with ❤️ for your health.
            </p>
          </Reveal>

          {/* Social */}
          <Reveal variant="slideUp" delay={1}>
            <div className="flex gap-6 justify-start md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
};
