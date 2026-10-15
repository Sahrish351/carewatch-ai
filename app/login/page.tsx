"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  HeartPulse,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type UserRole = "citizen" | "clinician" | "admin";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const roleMeta = {
    citizen: {
      title: "Patient / Citizen Access",
      subtitle: "Review your personal recovery journey, follow-ups, and Health Passport",
      demoName: "Sarah Jenkins (Patient)",
      demoDetail: "Active 24h headache check-in ready for submission",
      accentBg: "bg-[#EFF7F1]",
      accentBorder: "border-[#DDEBE2]",
      accentText: "text-[#174E4A]",
      activeTabStyle: "bg-[#174E4A] text-white shadow-xs",
      defaultPath: "/dashboard",
    },
    clinician: {
      title: "Clinician Triage Workspace",
      subtitle: "Access assigned patient cases, triage queues, and symptom escalation alerts",
      demoName: "Dr. Aris Thorne, MD (Clinician)",
      demoDetail: "Physician triage queue with 2 escalated patient cases",
      accentBg: "bg-sky-50",
      accentBorder: "border-sky-200",
      accentText: "text-[#0284C7]",
      activeTabStyle: "bg-[#0284C7] text-white shadow-xs",
      defaultPath: "/clinician",
    },
    admin: {
      title: "System Administrator Console",
      subtitle: "Monitor Gemini 3.8 Flash telemetry, database tables, and audit logs",
      demoName: "System Administrator (Admin)",
      demoDetail: "Real-time agent execution stream & security metrics",
      accentBg: "bg-amber-50",
      accentBorder: "border-amber-200",
      accentText: "text-[#D97706]",
      activeTabStyle: "bg-[#D97706] text-white shadow-xs",
      defaultPath: "/admin",
    },
  };

  const currentMeta = roleMeta[selectedRole];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "email_not_confirmed") {
          setErrorMsg(
            "Your email address has not been confirmed yet. Please verify via the link sent to your inbox, or select 1-Click Demo Login below to evaluate immediately."
          );
        } else {
          setErrorMsg(data.error || "Invalid credentials. Please verify your email and password.");
        }
      } else {
        setSuccessMsg(`Welcome back! Authenticated as ${data.user.name}. Redirecting...`);
        const target = redirect || (data.role === "admin" ? "/admin" : data.role === "clinician" ? "/clinician" : "/dashboard");
        setTimeout(() => {
          router.push(target);
          router.refresh();
        }, 700);
      }
    } catch {
      setErrorMsg("Network error connecting to login service. Please check your connection or use 1-Click Demo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(`Authenticated as ${data.user.name} (${selectedRole.toUpperCase()}). Redirecting...`);
        const target = redirect || data.redirect || currentMeta.defaultPath;
        setTimeout(() => {
          router.push(target);
          router.refresh();
        }, 600);
      } else {
        setErrorMsg(data.error || "Failed to start demo session.");
      }
    } catch {
      setErrorMsg("Network error starting demo session.");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF8F3] p-4 sm:p-6 lg:p-8 antialiased selection:bg-[#DDEBE2]">
      <div className="w-full max-w-xl space-y-6">
        {/* Back to Home Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#174E4A] hover:text-[#103835] hover:underline transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to CareWatch Home
          </Link>

          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#174E4A] flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-4 h-4 text-[#DDEBE2]" />
            </div>
            <span className="font-display text-lg font-bold text-[#263735]">
              CareWatch<span className="text-[#174E4A]">.AI</span>
            </span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="text-center space-y-1.5 pt-1">
          <h1 className="font-display text-3xl font-bold text-[#263735]">
            Welcome back
          </h1>
          <p className="text-sm text-[#627472]">
            Continue your health journey, monitor recovery, and complete scheduled safety checks.
          </p>
        </div>

        {/* THREE HORIZONTAL ROLE SELECTORS (Required Single Row on Desktop) */}
        <div className="bg-white p-1.5 rounded-2xl border border-[#EDE8DF] shadow-xs">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {/* Patient Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("citizen");
                setErrorMsg("");
              }}
              className={cn(
                "py-3 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer",
                selectedRole === "citizen"
                  ? "bg-[#174E4A] text-white shadow-xs"
                  : "text-[#263735] hover:bg-[#FAF8F3] hover:text-[#174E4A]"
              )}
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>Patient</span>
            </button>

            {/* Clinician Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("clinician");
                setErrorMsg("");
              }}
              className={cn(
                "py-3 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer",
                selectedRole === "clinician"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#263735] hover:bg-[#FAF8F3] hover:text-[#0284C7]"
              )}
            >
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span>Clinician</span>
            </button>

            {/* Administrator Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("admin");
                setErrorMsg("");
              }}
              className={cn(
                "py-3 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer",
                selectedRole === "admin"
                  ? "bg-[#D97706] text-white shadow-xs"
                  : "text-[#263735] hover:bg-[#FAF8F3] hover:text-[#D97706]"
              )}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Administrator</span>
            </button>
          </div>
        </div>

        {/* Dynamic Context Card for the Selected Role */}
        <div
          className={cn(
            "p-4 rounded-2xl border text-xs space-y-2 transition-all",
            currentMeta.accentBg,
            currentMeta.accentBorder
          )}
        >
          <div className="flex items-center justify-between">
            <span className={cn("font-bold uppercase tracking-wider text-[11px]", currentMeta.accentText)}>
              {currentMeta.title}
            </span>
            <span className="text-[10px] bg-white font-semibold px-2 py-0.5 rounded border border-[#EDE8DF]">
              Role-Scoped Session
            </span>
          </div>
          <p className="text-[#263735] leading-relaxed">
            {currentMeta.subtitle}
          </p>

          {/* 1-Click Evaluation Access for the Selected Role */}
          <div className="pt-2 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="font-bold text-[#263735]">
                Evaluate as {currentMeta.demoName}
              </div>
              <div className="text-[11px] text-[#627472]">{currentMeta.demoDetail}</div>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={handleDemoLogin}
              isLoading={demoLoading}
              className={cn(
                "shrink-0 text-xs font-bold",
                selectedRole === "clinician"
                  ? "bg-[#0284C7] hover:bg-[#0369A1] text-white"
                  : selectedRole === "admin"
                  ? "bg-[#D97706] hover:bg-[#B45309] text-white"
                  : "bg-[#174E4A] hover:bg-[#103835] text-white"
              )}
            >
              Instant 1-Click Access <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Standard Authentication Form */}
        <Card className="shadow-md border-[#EDE8DF] bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-[#263735]">
              Sign in with Registered Account
            </CardTitle>
            <CardDescription className="text-xs text-[#627472]">
              Authenticate using your email and password to access your encrypted records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <div className="space-y-1">
                    <p className="font-semibold">{errorMsg}</p>
                  </div>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-start gap-2.5 text-xs text-[#174E4A]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <p className="font-semibold">{successMsg}</p>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#263735] block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#627472] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading || demoLoading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#263735] bg-white focus:outline-none focus:ring-2 focus:ring-[#174E4A]/30 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#263735]">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-[#174E4A] hover:underline font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#627472] absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    disabled={loading || demoLoading}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#263735] bg-white focus:outline-none focus:ring-2 focus:ring-[#174E4A]/30 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#627472] hover:text-[#263735]"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full text-sm font-semibold shadow-sm"
                isLoading={loading}
                disabled={loading || demoLoading}
              >
                Sign In <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#627472]">
              <div>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#174E4A] font-bold hover:underline">
                  Create account
                </Link>
              </div>

              <Link href="/" className="hover:text-[#174E4A] hover:underline flex items-center gap-1">
                Return to homepage <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
          <div className="flex flex-col items-center gap-3 text-[#174E4A]">
            <div className="w-8 h-8 rounded-full border-2 border-[#174E4A] border-t-transparent animate-spin" />
            <span className="text-xs font-semibold">Loading CareWatch AI...</span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
