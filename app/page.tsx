import Image from "next/image";
import "./globals.css";
import { Button } from "./components/ui/Button/Button";
import { FeatureCard } from "./components/ui/Card/featureCard";
import { AlarmClock, Apple, Dumbbell, SquareStack, Zap, Leaf } from "lucide-react";
import Header from "./components/layout/Header";

export default function Landing() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ">
			<div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-xl w-full">
				<h1 className="text-6xl font-extrabold text-[#0033FF] mb-4 tracking-tight drop-shadow-lg">WeSupply</h1>
				<p className="text-xl text-gray-700 mb-8 text-center font-medium max-w-md">
					"Empower your meals. Master your budget. Simplify your life."
				</p>
				<Link href="/onboarding">
					<button className="px-10 py-4 bg-gradient-to-r from-[#0033FF] to-[#4F8CFF] text-white rounded-full text-2xl font-bold shadow-lg hover:from-[#0600AF] hover:to-[#0033FF] transition-all duration-200">
						Get Started
					</button>
				</Link>
			</div>
		</div>
	);
}