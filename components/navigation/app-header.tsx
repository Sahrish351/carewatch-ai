"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Languages,
  RotateCcw,
  Menu,
  X,
  Sparkles,
  Database,
  CheckCircle,
} from "lucide-react";

export function AppHeader({
  onToggleMobileSidebar,
}: {
  onToggleMobileSidebar?: () => void;
}) {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState<"en" | "ur_roman">("en");
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "ur_roman" : "en";
    setCurrentLang(nextLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("carewatch_lang", nextLang);
      window.dispatchEvent(new Event("carewatch_lang_change"));
    }
  };

  const handleResetDemo = async () => {
    setResetting(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("carewatch_health_store_v1");
      }
      await fetch("/api/demo/reset", { method: "POST" });
      setResetDone(true);
      setTimeout(() => {
        setResetDone(false);
        window.location.href = "/dashboard";
      }, 800);
    } catch (e) {
      console.error(e);
    } finally {
      setResetting(false);
    }
  };

  return (
    <header className="h-20 border-b border-[#EDE8DF] bg-white/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[#263735] hover:bg-[#FAF8F3] transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5 text-[#174E4A]" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl font-bold text-[#173737]">
              CareWatch AI Platform
            </h1>
            {/* Live Model & Supabase Badges */}
            <div className="hidden xl:flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EBF3ED] text-[#24542E] border border-[#8FB996]/40">
                <Sparkles className="w-3 h-3 text-[#2A6F6F]" />
                Gemini 3.8 Flash (Live)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0F7F7] text-[#2A6F6F] border border-[#BDDEDC]">
                <Database className="w-3 h-3 text-[#2A6F6F]" />
                Supabase Connected
              </span>
            </div>
          </div>
          <p className="text-xs text-[#657777] hidden sm:block">
            Continuous health support, active follow-ups, and reassessment
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="hidden sm:inline-flex text-xs h-9"
          title="Switch Language: English / Roman Urdu"
        >
          <Languages className="w-3.5 h-3.5 text-[#2A6F6F]" />
          <span>{currentLang === "en" ? "Roman Urdu" : "English"}</span>
        </Button>

        {/* 1-Click Demo Reset for Hackathon Judges */}
        <Button
          variant="subtle"
          size="sm"
          onClick={handleResetDemo}
          disabled={resetting || resetDone}
          className="text-xs h-9"
          title="Preload 3-Minute Demo Scenario: 3-day headache with pending check-in"
        >
          {resetDone ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-[#2A6F6F]" />
              <span className="hidden sm:inline">Scenario Ready</span>
            </>
          ) : (
            <>
              <RotateCcw className={`w-3.5 h-3.5 ${resetting ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Reset Demo Flow</span>
            </>
          )}
        </Button>

        {/* Follow-up Due Alert Pill */}
        <Link href="/follow-ups">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium cursor-pointer hover:bg-amber-100 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="hidden md:inline">1 Check-in Due</span>
            <Bell className="w-3.5 h-3.5 text-amber-700" />
          </div>
        </Link>
      </div>
    </header>
  );
}
