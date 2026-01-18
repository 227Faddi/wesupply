'use client';

import React, { useState, ReactNode } from 'react';
import { poppins } from "@/Components/ui/fonts";

import DashboardHeader from "@/Components/layout/DashboardHeader";
import SidenavMobile from "@/Components/layout/sidenavMobile";
import SidenavDesktop from "@/Components/layout/sidenavDesktop";
import PageWrapper from "@/Components/layout/page-wrapper";
import MarginWidthWrapper from "@/Components/layout/margin-width-wrapper";
import "@/styles/global.css"

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <html lang="en">
      <body className={`bg-white ${poppins.className}`}>
        <div className="flex h-screen">
          <SidenavDesktop 
            isOpen={isSidebarOpen} 
            onOpen={handleOpenSidebar}
            onClose={handleCloseSidebar}
          />
          <main className="flex-1 overflow-auto">
            <MarginWidthWrapper isOpen={isSidebarOpen}>
              <DashboardHeader />
              <SidenavMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
