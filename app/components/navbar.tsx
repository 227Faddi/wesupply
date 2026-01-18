'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 w-1/5 h-screen flex flex-col items-center py-8 z-50 border-r border-[#977DFF]/40 bg-white"
      style={{
        background: '#fff',
        boxShadow: '0 8px 32px 0 rgba(151, 125, 255, 0.10)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '2px solid #977DFF22',
        borderRadius: '0 32px 32px 0',
      }}
    >
      {/* Logo/Brand */}
      <div className="mb-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-3xl bg-white border-2 border-[#0033FF] shadow-xl flex items-center justify-center mb-2 backdrop-blur-lg">
          <span className="text-4xl font-extrabold text-[#0033FF] font-[family:var(--font-montserrat)] drop-shadow-lg">W</span>
        </div>
        <span className="text-xl font-bold text-[#0033FF] font-[family:var(--font-montserrat)] tracking-wide drop-shadow-sm">WeSupply</span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-6 w-full items-center flex-1">
        <Link
          href="/"
          className="w-4/5 font-bold bg-white text-[#0033FF] py-3 px-6 rounded-2xl hover:bg-[#e9e6ff] hover:text-[#0033FF] transition-all text-center font-[family:var(--font-poppins)] border border-[#977DFF]/60 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#977DFF]/40 backdrop-blur-lg"
        >
          Home
        </Link>
        <Link
          href="/onboarding"
          className="w-4/5 font-bold bg-white text-[#0033FF] py-3 px-6 rounded-2xl hover:bg-[#977DFF]/80 hover:text-white transition-all text-center font-[family:var(--font-poppins)] border border-[#0033FF]/60 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0033FF]/40 backdrop-blur-lg"
        >
          Quizz
        </Link>
        <Link
          href="/settings"
          className="w-4/5 font-bold bg-white text-[#0033FF] py-3 px-6 rounded-2xl hover:bg-[#977DFF]/80 hover:text-white transition-all text-center font-[family:var(--font-poppins)] border border-[#0033FF]/60 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0033FF]/40 backdrop-blur-lg"
        >
          Settings
        </Link>
      </div>

      {/* Footer or version */}
      <div className="mt-10 text-xs text-[#977DFF] font-[family:var(--font-poppins)] drop-shadow-sm">
        © 2026 WeSupply
      </div>
    </nav>
  );
}