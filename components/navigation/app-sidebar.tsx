"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  Compass,
  Milestone,
  Clock,
  FileCheck2,
  FileBadge2,
  FileText,
  Settings,
  HeartPulse,
  LogOut,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Health Check", href: "/assessment/new", icon: PlusCircle, highlight: true },
  { name: "My Journeys", href: "/journeys", icon: Compass },
  { name: "Timeline", href: "/timeline", icon: Milestone },
  { name: "Follow-ups", href: "/follow-ups", icon: Clock },
  { name: "Action Plans", href: "/action-plans", icon: FileCheck2 },
  { name: "Health Passport", href: "/health-passport", icon: FileBadge2 },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/demo-login", { method: "DELETE" });
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 border-r border-[#EDE8DF] bg-white flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center border-b border-[#EDE8DF]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2A6F6F] flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-5 h-5 text-[#8FB996]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-[#173737]">
                CareWatch<span className="text-[#2A6F6F]">.AI</span>
              </span>
              <span className="text-[10px] text-[#657777] font-medium tracking-wider uppercase">
                Health Journey
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  item.highlight && !isActive
                    ? "bg-[#EBF3ED] text-[#2A6F6F] hover:bg-[#d8e8dc]"
                    : isActive
                    ? "bg-[#2A6F6F] text-white shadow-xs"
                    : "text-[#173737] hover:bg-[#F8F6F1] hover:text-[#2A6F6F]"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#657777]")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User / Bottom info */}
      <div className="p-4 border-t border-[#EDE8DF]">
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#2A6F6F]/10 text-[#2A6F6F] font-bold text-xs flex items-center justify-center shrink-0">
              SK
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-[#173737] truncate">Dr. Sarah Khan</div>
              <div className="text-[10px] text-[#657777] truncate">Demo Patient Profile</div>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-[#AB371C] hover:bg-[#FDF0ED] rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

