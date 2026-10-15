"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  Users,
  KeyRound,
  Activity,
  Cpu,
  BookOpen,
  Sliders,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  X,
  History,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "clinician" | "admin";
  isDemo?: boolean;
}

export function AppSidebar({
  onClose,
  isMobile,
}: {
  onClose?: () => void;
  isMobile?: boolean;
}) {
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

  // Determine current active navigation view based on route or role
  const isClinicianView = pathname.startsWith("/clinician");
  const isAdminView = pathname.startsWith("/admin");

  interface NavItem {
    name: string;
    href: string;
    icon: any;
    highlight?: boolean;
  }

  // 1. Patient Navigation
  const patientNavigation: NavItem[] = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Health Check", href: "/assessment/new", icon: PlusCircle, highlight: true },
    { name: "My Journeys", href: "/journeys", icon: Compass },
    { name: "Follow-ups", href: "/follow-ups", icon: Clock },
    { name: "Recovery Timeline", href: "/timeline", icon: Milestone },
    { name: "Action Plans", href: "/action-plans", icon: FileCheck2 },
    { name: "Health Passport", href: "/health-passport", icon: FileBadge2 },
    { name: "My Documents", href: "/documents", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  // 2. Clinician Navigation
  const clinicianNavigation: NavItem[] = [
    { name: "Clinical Overview", href: "/clinician", icon: Stethoscope },
    { name: "Assigned Case Queue", href: "/clinician?tab=queue", icon: ClipboardList },
    { name: "Case Review", href: "/clinician?tab=review", icon: FileCheck2 },
    { name: "Follow-up Reviews", href: "/clinician?tab=followups", icon: Clock },
    { name: "Escalations", href: "/clinician?tab=escalations", icon: AlertTriangle, highlight: true },
    { name: "Evidence References", href: "/clinician?tab=evidence", icon: BookOpen },
    { name: "Activity History", href: "/clinician?tab=history", icon: History },
    { name: "Clinical Settings", href: "/clinician?tab=settings", icon: Settings },
  ];

  // 3. Admin Navigation
  const adminNavigation: NavItem[] = [
    { name: "Operations Overview", href: "/admin", icon: ShieldCheck },
    { name: "User Management", href: "/admin?tab=users", icon: Users },
    { name: "Role & Access", href: "/admin?tab=roles", icon: KeyRound },
    { name: "System Health", href: "/admin?tab=health", icon: Activity },
    { name: "AI Telemetry", href: "/admin?tab=ai", icon: Cpu },
    { name: "Audit Logs", href: "/admin?tab=audit", icon: ClipboardList },
    { name: "Evidence Sources", href: "/admin?tab=evidence", icon: BookOpen },
    { name: "System Config", href: "/admin?tab=config", icon: Sliders },
    { name: "Admin Settings", href: "/admin?tab=settings", icon: Settings },
  ];

  const currentNav = isClinicianView
    ? clinicianNavigation
    : isAdminView
    ? adminNavigation
    : patientNavigation;

  return (
    <aside className="w-full h-full bg-white border-r border-[#EDE8DF] flex flex-col justify-between overflow-y-auto selection:bg-[#DDEBE2]">
      <div>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#EDE8DF]">
          <Link href={isClinicianView ? "/clinician" : isAdminView ? "/admin" : "/dashboard"} className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs transition-colors",
                isClinicianView
                  ? "bg-[#0284C7]"
                  : isAdminView
                  ? "bg-[#D97706]"
                  : "bg-[#174E4A]"
              )}
            >
              {isClinicianView ? (
                <Stethoscope className="w-5 h-5 text-white" />
              ) : isAdminView ? (
                <ShieldCheck className="w-5 h-5 text-white" />
              ) : (
                <HeartPulse className="w-5 h-5 text-[#DDEBE2]" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-[#263735]">
                CareWatch<span className={cn(isClinicianView ? "text-[#0284C7]" : isAdminView ? "text-[#D97706]" : "text-[#174E4A]")}>.AI</span>
              </span>
              <span className="text-[10px] text-[#627472] font-semibold tracking-wider uppercase">
                {isClinicianView
                  ? "Clinician Workspace"
                  : isAdminView
                  ? "Governance Console"
                  : "Health Journey"}
              </span>
            </div>
          </Link>

          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#627472] hover:bg-[#FAF8F3]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#627472]">
            {isClinicianView
              ? "Clinical Operations"
              : isAdminView
              ? "System Governance"
              : "Patient Care Navigation"}
          </div>

          {currentNav.map((item) => {
            const Icon = item.icon;
            // Clean match for query params vs exact paths
            const isActive =
              item.href.includes("?tab=")
                ? typeof window !== "undefined" &&
                  window.location.pathname + window.location.search === item.href
                : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                  item.highlight && !isActive
                    ? isClinicianView
                      ? "bg-red-50 text-red-700 hover:bg-red-100/70 border border-red-200/60"
                      : "bg-[#EFF7F1] text-[#174E4A] hover:bg-[#DDEBE2] border border-[#DDEBE2]"
                    : isActive
                    ? isClinicianView
                      ? "bg-[#0284C7] text-white shadow-xs"
                      : isAdminView
                      ? "bg-[#D97706] text-white shadow-xs"
                      : "bg-[#174E4A] text-white shadow-xs"
                    : "text-[#263735] hover:bg-[#FAF8F3] hover:text-[#174E4A]"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-white"
                      : item.highlight
                      ? isClinicianView
                        ? "text-red-700"
                        : "text-[#174E4A]"
                      : "text-[#627472] group-hover:text-[#174E4A]"
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}

          {/* Quick Switch to Patient/Clinician/Admin for Evaluators */}
          {(user?.role === "admin" || user?.role === "clinician" || user?.isDemo) && (
            <div className="pt-4 border-t border-[#EDE8DF] mt-4 space-y-1">
              <span className="px-3 text-[10px] uppercase font-bold text-[#627472] tracking-wider block mb-1">
                Role Views
              </span>
              {!pathname.startsWith("/dashboard") && (
                <Link
                  href="/dashboard"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#627472] hover:bg-[#FAF8F3] hover:text-[#174E4A]"
                >
                  <User className="w-3.5 h-3.5 text-[#174E4A]" />
                  <span>Patient Dashboard</span>
                </Link>
              )}
              {!pathname.startsWith("/clinician") && (
                <Link
                  href="/clinician"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#627472] hover:bg-[#FAF8F3] hover:text-[#0284C7]"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Clinician Workspace</span>
                </Link>
              )}
              {!pathname.startsWith("/admin") && (
                <Link
                  href="/admin"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#627472] hover:bg-[#FAF8F3] hover:text-[#D97706]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Admin Console</span>
                </Link>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-[#EDE8DF]">
        <div className="p-3 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className={cn(
                "w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0",
                isClinicianView
                  ? "bg-sky-100 text-sky-800"
                  : isAdminView
                  ? "bg-amber-100 text-amber-800"
                  : "bg-[#EFF7F1] text-[#174E4A]"
              )}
            >
              {getInitials(user?.name)}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#263735] truncate">
                {user?.name || "Care Patient"}
              </div>
              <div className="text-[10px] text-[#627472] truncate capitalize flex items-center gap-1 mt-0.5">
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
                {user?.isDemo ? `Demo ${user.role}` : user?.role || "Citizen"}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
