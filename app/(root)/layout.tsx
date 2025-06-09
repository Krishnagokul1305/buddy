import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import DashBoardHeader from "@/components/DashBoardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashBoardHeader />
          <div className="flex flex-col gap-4 p-2 w-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
