import DashboardShell from "@/src/components/layout/DashboardShell";


import { redirect } from "next/navigation";

import "@/styles/global.css"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}

