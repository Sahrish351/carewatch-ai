"use client";

import React, { useState, useEffect } from "react";
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
  Stethoscope,
  ShieldCheck,
  User,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "clinician" | "admin";
  isDemo?: boolean;
}

const baseNavigationItems = [
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
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const getInitials = (name?: string) => {
    if (!name) return "CW";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
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
          {baseNavigationItems.map((item) => {
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

          {/* Clinician Portal Link */}
          {(user?.role === "clinician" || user?.role === "admin" || user?.isDemo) && (
            <div className="pt-3 border-t border-[#EDE8DF] my-2">
              <span className="px-3.5 text-[10px] uppercase font-bold text-[#657777] tracking-wider block mb-1">
                Clinical Management
              </span>
              <Link
                href="/clinician"
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  pathname.startsWith("/clinician")
                    ? "bg-[#0284C7] text-white shadow-xs"
                    : "text-[#173737] hover:bg-[#F0F9FF] hover:text-[#0284C7]"
                )}
              >
                <Stethoscope className="w-4 h-4 text-[#0284C7]" />
                <span>Clinician Triage</span>
              </Link>

              {(user?.role === "admin" || user?.isDemo) && (
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all mt-1",
                    pathname.startsWith("/admin")
                      ? "bg-[#D97706] text-white shadow-xs"
                      : "text-[#173737] hover:bg-[#FFFBEB] hover:text-[#D97706]"
                  )}
                >
                  <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                  <span>Admin Console</span>
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-[#EDE8DF]">
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#2A6F6F]/10 text-[#2A6F6F] font-bold text-xs flex items-center justify-center shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-[#173737] truncate">
                {user?.name || "Patient Session"}
              </div>
              <div className="text-[10px] text-[#657777] truncate capitalize flex items-center gap-1">
                <span
                  className={cn(
                    "inline-block w-1.5 h-1.5 rounded-full",
                    user?.role === "admin"
                      ? "bg-amber-500"
                      : user?.role === "clinician"
                      ? "bg-sky-500"
                      : "bg-emerald-500"
                  )}
                />
                {user?.isDemo ? `Demo ${user.role}` : user?.role || "Citizen User"}
              </div>
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
