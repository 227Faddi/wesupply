import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center pt-2 px-4  bg-zinc-100 h-screen  ">
      {children}
    </div>
  );
}