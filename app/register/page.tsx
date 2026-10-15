"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse, Eye, EyeOff, Lock, Mail, User, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!agreed) {
      setErrorMsg("Please review and acknowledge the clinical safety terms before creating an account.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify both password entries.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to create account. Please check your details and try again.");
      } else {
        if (data.requiresEmailConfirmation) {
          setRequiresConfirmation(true);
          setSuccessMsg(
            "Account registered successfully! A confirmation link has been sent to your email. You can verify it now, or explore immediately using 1-Click Demo Login."
          );
        } else {
          setSuccessMsg("Account created! Redirecting to your personal recovery dashboard...");
          setTimeout(() => router.push("/dashboard"), 1500);
        }
      }
    } catch {
      setErrorMsg("Network error connecting to registration service. Please verify your connection or try 1-Click Demo Login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF7F2] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
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
            Create a secure account for continuous health journey tracking
          </p>
        </div>

        <Card className="shadow-md border-[#EDE8DF] bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-[#173737]">Create Free Account</CardTitle>
              <span className="text-[11px] font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> RLS Protected
              </span>
            </div>
            <CardDescription className="text-xs text-[#657777]">
              Join CareWatch AI to track your health symptoms, check-ins, and recovery pathways
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-[#FDF0ED] border border-[#E0674B]/30 flex items-start gap-2.5 text-xs text-[#AB371C]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{errorMsg}</p>
                    <p className="text-[11px] text-[#AB371C]/80">
                      Need immediate testing? You can use{" "}
                      <Link href="/login" className="underline font-bold">
                        1-Click Demo Login
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#8FB996]/40 flex items-start gap-2.5 text-xs text-[#24542E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div className="space-y-1.5">
                    <p className="font-semibold">{successMsg}</p>
                    {requiresConfirmation && (
                      <div className="pt-1">
                        <Link href="/login">
                          <Button size="sm" variant="outline" type="button" className="text-xs bg-white">
                            Go to Sign In / Demo Login <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#657777] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 disabled:opacity-50"
                  />
                </div>
              </div>

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
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Password (min 8 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#657777] absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    disabled={loading}
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#657777] absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-[#657777] hover:text-[#173737]"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Clinical safety terms acknowledgment */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] flex items-start gap-2.5 text-xs text-[#657777]">
                <input
                  type="checkbox"
                  id="safety_terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={loading}
                  className="mt-0.5 rounded text-[#2A6F6F] focus:ring-[#2A6F6F]"
                />
                <label htmlFor="safety_terms" className="cursor-pointer leading-relaxed">
                  I understand that CareWatch AI is a health tracking and supportive navigation platform. It does <strong>not</strong> provide medical diagnoses, replace clinical consultations, or prescribe medication. In an emergency, I agree to call emergency services (e.g. 911/999) immediately.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full text-sm font-semibold shadow-sm"
                isLoading={loading}
                disabled={loading}
              >
                Create Account <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#F4EFEB] flex flex-col items-center gap-3 text-xs text-[#657777]">
              <div>
                Already registered?{" "}
                <Link href="/login" className="text-[#2A6F6F] font-semibold hover:underline">
                  Sign in here
                </Link>
              </div>
              <div className="text-[11px] text-[#657777]/80 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2A6F6F]" />
                Looking to evaluate features? Use 1-Click Demo on the Sign In page.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
