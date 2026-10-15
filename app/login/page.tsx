"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
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
  Sparkles,
  AlertCircle,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoRoleLoading, setDemoRoleLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
            "Your email address has not been confirmed yet. Please verify via the link sent to your inbox, or select a 1-Click Demo role below to explore right away."
          );
        } else {
          setErrorMsg(data.error || "Invalid credentials. Please verify your email and password.");
        }
      } else {
        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => {
          router.push(data.redirect || redirect);
          router.refresh();
        }, 800);
      }
    } catch {
      setErrorMsg("Network error connecting to login service. Please check your connection or use 1-Click Demo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: "citizen" | "clinician" | "admin") => {
    setDemoRoleLoading(role);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(`Authenticated as ${data.user.name} (${data.role.toUpperCase()}). Redirecting...`);
        setTimeout(() => {
          router.push(data.redirect || redirect);
          router.refresh();
        }, 700);
      } else {
        setErrorMsg(data.error || "Failed to start demo session.");
      }
    } catch {
      setErrorMsg("Network error starting demo session.");
    } finally {
      setDemoRoleLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF7F2] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#2A6F6F] flex items-center justify-center text-white shadow-sm">
              <HeartPulse className="w-5 h-5 text-[#8FB996]" />
            </div>
            <span className="font-display text-2xl font-bold text-[#173737]">
              CareWatch<span className="text-[#2A6F6F]">.AI</span>
            </span>
          </Link>
          <p className="text-sm text-[#657777]">
            Sign in to access continuous health journeys & follow-ups
          </p>
        </div>

        {/* 1-Click Role-Aware Demo Selector */}
        <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#8FB996]/40 text-[#173737] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2A6F6F]" /> Instant Evaluation Access
            </span>
            <span className="text-[10px] bg-white text-[#24542E] px-2 py-0.5 rounded font-bold border border-[#8FB996]/30">
              No Sign-Up Needed
            </span>
          </div>

          <p className="text-xs text-[#24542E] leading-relaxed">
            Select a verified persona to test CareWatch AI with role-based permissions:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {/* Citizen Persona */}
            <button
              type="button"
              disabled={!!demoRoleLoading || loading}
              onClick={() => handleDemoLogin("citizen")}
              className="w-full p-2.5 rounded-xl bg-white border border-[#8FB996]/40 hover:border-[#2A6F6F] hover:bg-[#F4F9F5] transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EBF3ED] text-[#2A6F6F] flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#173737] group-hover:text-[#2A6F6F]">
                    Sarah Jenkins
                  </div>
                  <div className="text-[11px] text-[#657777]">Patient (Active check-in due)</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#2A6F6F] flex items-center gap-1">
                {demoRoleLoading === "citizen" ? "Signing in..." : "Enter"} <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Clinician Persona */}
            <button
              type="button"
              disabled={!!demoRoleLoading || loading}
              onClick={() => handleDemoLogin("clinician")}
              className="w-full p-2.5 rounded-xl bg-white border border-[#8FB996]/40 hover:border-[#2A6F6F] hover:bg-[#F4F9F5] transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#173737] group-hover:text-[#2A6F6F]">
                    Dr. Aris Thorne, MD
                  </div>
                  <div className="text-[11px] text-[#657777]">Physician Triage Dashboard</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#0284C7] flex items-center gap-1">
                {demoRoleLoading === "clinician" ? "Signing in..." : "Enter"} <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Admin Persona */}
            <button
              type="button"
              disabled={!!demoRoleLoading || loading}
              onClick={() => handleDemoLogin("admin")}
              className="w-full p-2.5 rounded-xl bg-white border border-[#8FB996]/40 hover:border-[#2A6F6F] hover:bg-[#F4F9F5] transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#173737] group-hover:text-[#2A6F6F]">
                    System Administrator
                  </div>
                  <div className="text-[11px] text-[#657777]">Audit Logs & AI Telemetry</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#D97706] flex items-center gap-1">
                {demoRoleLoading === "admin" ? "Signing in..." : "Enter"} <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>

        {/* Standard Supabase Auth Card */}
        <Card className="shadow-md border-[#EDE8DF] bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-[#173737]">Registered Account Sign In</CardTitle>
            <CardDescription className="text-xs text-[#657777]">
              Enter your email and password to access your personal records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-[#FDF0ED] border border-[#E0674B]/30 flex items-start gap-2.5 text-xs text-[#AB371C]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{errorMsg}</p>
                  </div>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#8FB996]/40 flex items-start gap-2.5 text-xs text-[#24542E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <p className="font-semibold">{successMsg}</p>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#657777] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading || !!demoRoleLoading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#173737]">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-[#2A6F6F] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#657777] absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading || !!demoRoleLoading}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#657777] hover:text-[#173737]"
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
                disabled={loading || !!demoRoleLoading}
              >
                Sign In to CareWatch <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#F4EFEB] flex flex-col items-center gap-3 text-xs text-[#657777]">
              <div>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#2A6F6F] font-semibold hover:underline">
                  Create free account
                </Link>
              </div>
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
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="flex flex-col items-center gap-3 text-[#2A6F6F]">
            <div className="w-8 h-8 rounded-full border-2 border-[#2A6F6F] border-t-transparent animate-spin" />
            <span className="text-xs font-semibold">Loading CareWatch AI...</span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
