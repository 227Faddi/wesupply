import Image from "next/image";


import "./globals.css";
import { Button } from "./components/ui/Button/Button";
import { FeatureCard } from "./components/ui/Card/featureCard";
import { AlarmClock, Home, Motorbike, SquareStack, Zap } from "lucide-react"
import Header from "./components/layout/Header";


export default function HomePage() {
  
  
  return (
    //container mx-auto px-4 py-16 trying to keep everything in this size 
    
    
    <main className="relative min-h-screen overflow-hidden pt-20" style={{
      backgroundImage: `
           radial-gradient(600px 400px at 10% 20%, rgba(99,102,241,0.35), transparent 60%),
           radial-gradient(500px 500px at 80% 0%, rgba(147,51,234,0.28), transparent 60%),
           radial-gradient(600px 500px at 50% 80%, rgba(56,189,248,0.25), transparent 60%)
         `
    }}>
        <h1>yoooo</h1>

      <Header />
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-10" >

        <div className="container mx-auto px-4 py-16 text-center align-center">
          <h1 className=" text-3xl  md:text-4xl  lg:text-6xl font-bold leading-tight text-pretty ">Transform your reels into LinkedIn posts</h1>
          <p className="max-w-xl mx-auto  text-gray-600 m-6">Automatically transcribe, generate, and schedule professional LinkedIn content from your Instagram videos. Save hours while growing your professional brand.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 my-10 px-4 sm:px-0">


            <Button variant="gradient" className="w-full sm:w-auto"> Start Free Trial </Button>
            <Button variant="white" className="w-full sm:w-auto"> Watch Demo</Button>



          </div>
          <div className="flex justify-center my-60 gap-10 flex-wrap flex-row align-center">
            <div className="flex-none">
              <FeatureCard
                icon={Zap}
                title="AI-Powered Generation"
                description="Our AI understands your tone and industry, crafting perfectly formatted LinkedIn posts from your video content." />
            </div>
            <div className="flex-none">
              <FeatureCard
                icon={AlarmClock}
                title="Smart Scheduling"
                description="Set your posting frequency and let automation handle the rest. Post daily, twice a day, or custom schedules." />
            </div>
            <div className="flex-none">
              <FeatureCard
                icon={SquareStack}
                title="Multi-Platform Support"
                description="Connect Instagram, TikTok, and LinkedIn. Smart duplicate detection ensures unique content across platforms." />
            </div>



          </div>



        </div>
      </div>
    </main>


  );
}
