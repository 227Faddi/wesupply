import Link from 'next/link';

export default function Landing() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white">
			<h1 className="text-5xl font-extrabold text-[#0033FF] mb-6">WeSupply</h1>
			<p className="text-lg text-gray-700 mb-10">Bienvenue sur WeSupply, votre assistant nutrition et budget !</p>
			<Link href="/dashboard">
				<button className="px-8 py-4 bg-[#0033FF] text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-[#0600AF] transition-colors">
					Accéder au Dashboard
				</button>
			</Link>
		</div>
	);
}