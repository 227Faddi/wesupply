import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  return (
    <div className={`flex flex-col ${isOpen ? 'md:ml-[280px]' : 'md:ml-0'} min-h-screen transition-[margin] duration-300 ease-in-out`}>
      {children}
    </div>
  );
}