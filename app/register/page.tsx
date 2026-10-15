"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse, Eye, EyeOff, Lock, Mail, User, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMsg("Please review and acknowledge the clinical safety terms.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || "Failed to create account. You can also use 1-Click Demo Login.");
      } else {
        setSuccessMsg("Account created! Check your email to confirm, or proceed directly to login.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch {
      setErrorMsg("An unexpected registration error occurred.");
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
            Create a secure account for continuous recovery tracking
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join CareWatch AI to track your health recovery journeys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-[#FDF0ED] border border-[#E0674B]/30 flex items-start gap-2.5 text-xs text-[#AB371C]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-[#EBF3ED] border border-[#8FB996]/40 flex items-start gap-2.5 text-xs text-[#24542E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
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
                    placeholder="e.g. Sarah Khan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#173737] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#657777] absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
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

              {/* Safety acknowledgment */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] flex items-start gap-2.5 text-xs text-[#657777]">
                <input
                  type="checkbox"
                  id="safety_terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-[#2A6F6F] focus:ring-[#2A6F6F]"
                />
                <label htmlFor="safety_terms" className="cursor-pointer">
                  I understand that CareWatch AI is a supportive navigation platform, not a doctor or diagnostic engine. I agree to seek professional/emergency medical care when needed.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={loading}
              >
                Create Free Account
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-[#657777]">
              Already registered?{" "}
              <Link href="/login" className="text-[#2A6F6F] font-semibold hover:underline">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

