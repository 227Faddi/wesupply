import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { MenuPreviewSection } from '@/components/landing/MenuPreviewSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* Hero with top padding to account for sticky navbar */}
      <Hero />
      
      {/* Main sections */}
      <HowItWorksSection />
      <FeaturesSection />
      <MenuPreviewSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
