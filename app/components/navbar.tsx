'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 w-1/5 h-screen bg-white border-r border-gray-200 flex flex-col items-center justify-between py-8 z-50">
      <Link
        href="/"
        className="w-4/5 font-bold bg-white text-purple-500 py-3 px-6 rounded-lg hover:brightness-90 transition-opacity  text-center font-[family:var(--font-poppins)] border-purple-500 border"
      >
        Home
      </Link>
      <Link
        href="/settings"
        className="w-4/5 bg-white  text-purple-500 py-3 px-6 rounded-lg hover:brightness-90 transition-opacity font-bold text-center font-[family:var(--font-poppins)] border-purple-500 border"
      >
        Settings
      </Link>
    </nav>
  );
}