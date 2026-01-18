"use client";

import React, { useState, ReactNode } from "react";
import { poppins } from "@/src/styles/fonts";

import DashboardHeader from "@/src/components/layout/DashboardHeader";
import SidenavMobile from "@/src/components/layout/sidenavMobile";
import SidenavDesktop from "@/src/components/layout/sidenavDesktop";
import PageWrapper from "@/src/components/layout/page-wrapper";
import MarginWidthWrapper from "@/src/components/layout/margin-width-wrapper";
import "@/styles/global.css";

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
