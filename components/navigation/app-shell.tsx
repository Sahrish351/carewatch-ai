"use client";

import React, { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#FAF8F3] text-[#263735] antialiased">
      {/* Desktop Sidebar (Fixed 270px width) */}
      <div className="hidden lg:block shrink-0 w-[272px]">
        <div className="fixed top-0 bottom-0 left-0 w-[272px] z-30">
          <AppSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Collapsible Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#263735]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[280px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col">
            <AppSidebar onClose={() => setMobileSidebarOpen(false)} isMobile />
          </div>
        </div>
      )}
    </div>
  );
}
