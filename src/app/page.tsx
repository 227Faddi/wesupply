import Image from "next/image";
import "./globals.css";
import { Button } from "../components/Button/Button";
import { FeatureCard } from "../components/Card/featureCard";
import { AlarmClock, Apple, Dumbbell, SquareStack, Zap, Leaf } from "lucide-react";
import Header from "../components/layout/Header";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-20 bg-[#F2E6EE]">
      {/* Decorative Background Shape */}
     
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: `
             radial-gradient(800px 600px at 20% 10%, rgba(151, 125, 255, 0.08), transparent 70%),
             radial-gradient(600px 600px at 80% 20%, rgba(0, 51, 255, 0.06), transparent 70%),
             radial-gradient(700px 700px at 50% 90%, rgba(151, 125, 255, 0.05), transparent 70%)
           `
      }}>
      </div>

      <Header />
      
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <p className="text-sm uppercase tracking-wide text-slate-600 mb-4">
                PERSONALIZED MEAL PLANS
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-[#977DFF] via-[#0033FF] to-[#0600AB] bg-clip-text text-transparent">
                  GOOD 😋 TASTE.
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#977DFF] via-[#0033FF] to-[#0600AB] bg-clip-text text-transparent">
                  GOOD 🤔 SENSE.
                </span>
              </h1>
              <p className="text-slate-700 text-lg mb-8 max-w-lg">
                Custom meal plans designed for gym-goers and students. Whether you're bulking, cutting, or maintaining, get simple recipes that diversify your diet and minimize food waste.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" className="w-full sm:w-auto">
                  Get Your Meal Plan
                </Button>
                <Button variant="white" className="w-full sm:w-auto">
                  See How It Works
                </Button>
              </div>
            </div>
            
            {/* Right Content - Image Placeholder */}
            <div className="relative">
              <div className="relative w-full h-[500px] bg-white/40 rounded-2xl backdrop-blur-sm border border-white/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#977DFF]/20 to-[#0033FF]/20 rounded-full flex items-center justify-center">
                    <Apple className="w-16 h-16 text-[#977DFF]" />
                  </div>
                  <p className="text-slate-500 font-medium">Hero Image Placeholder</p>
                  <p className="text-sm text-slate-400">Food bowl image goes here</p>
                </div>
              </div>
              
              {/* Decorative Elements Placeholders */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/60 rounded-full backdrop-blur-sm border border-white/80 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute bottom-10 -left-4 w-20 h-20 bg-white/60 rounded-full backdrop-blur-sm border border-white/80"></div>
            </div>
          </div>
        </div>
          
          {/* Features Section */}
          <div className="flex justify-center my-60 gap-10 flex-wrap flex-row align-center">
            <div className="flex-none">
              <FeatureCard
                icon={Dumbbell}
                title="Goal-Based Plans"
                description="Whether you're bulking, losing weight, or maintaining, get meal plans tailored to your specific fitness goals and dietary needs."
              />
            </div>
            <div className="flex-none">
              <FeatureCard
                icon={Apple}
                title="Simple & Diverse Recipes"
                description="Easy-to-follow recipes that diversify your daily intake while keeping prep time short. Perfect for busy students and gym-goers."
              />
            </div>
            <div className="flex-none">
              <FeatureCard
                icon={Leaf}
                title="Minimize Food Waste"
                description="Smart ingredient planning ensures you use what you buy. Save money and reduce waste with efficient shopping lists."
              />
            </div>
          </div>
        </div>
    </main>
  );
}