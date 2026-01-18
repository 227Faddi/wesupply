"use client";
import { usePathname } from 'next/navigation';

export default function HideNavbarOnLanding({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/landing') {
    return null;
  }
  return <>{children}</>;
}
