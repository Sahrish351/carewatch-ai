"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase credentials are not live or user not found, suggest demo or show message
        setErrorMsg(error.message || "Invalid login credentials. You can also use the 1-Click Demo below.");
      } else {
        router.push(redirect);
      }
    } catch (err: any) {
      setErrorMsg("Authentication error. Try 1-Click Demo Login for testing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@carewatch.ai" }),
      });
      if (res.ok) {
        router.push(redirect);
      } else {
        setErrorMsg("Failed to start demo session.");
      }
    } catch {
      setErrorMsg("Network error starting demo session.");
    } finally {
      setDemoLoading(false);
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
            Sign in to access your continuous health journeys
          </p>
        </div>

        {/* 1-Click Demo Card for Hackathon Judges */}
        <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#8FB996]/40 text-[#173737] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Hackathon Evaluation Mode
            </span>
            <span className="text-[11px] bg-white text-[#24542E] px-2 py-0.5 rounded font-semibold">
              Instant
            </span>
          </div>
          <p className="text-xs text-[#24542E] leading-relaxed">
            Evaluate the full application without setting up Supabase email verification:
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={handleDemoLogin}
            isLoading={demoLoading}
            className="w-full text-xs shadow-xs"
          >
            Log In as Demo Patient (Dr. Sarah Khan) <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Standard Auth Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Login</CardTitle>
            <CardDescription>
              Enter your email and password to access your records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-[#FDF0ED] border border-[#E0674B]/30 flex items-start gap-2.5 text-xs text-[#AB371C]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
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
                    className="text-xs text-[#2A6F6F] hover:underline"
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
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#657777] hover:text-[#173737]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="w-full"
                isLoading={loading}
              >
                Sign In With Email
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-[#657777]">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#2A6F6F] font-semibold hover:underline">
                Register here
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
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="w-8 h-8 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

