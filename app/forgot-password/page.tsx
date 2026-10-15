"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse, Mail, ArrowLeft, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg("Failed to send reset link. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF8F3] p-4 sm:p-6 lg:p-8 antialiased selection:bg-[#DDEBE2]">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#174E4A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
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

        <div className="text-center space-y-1.5">
          <h1 className="font-display text-3xl font-bold text-[#263735]">
            Reset your password
          </h1>
          <p className="text-sm text-[#627472]">
            Enter your registered email address to receive a secure password recovery link.
          </p>
        </div>

        <Card className="shadow-md border-[#EDE8DF] bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-[#263735]">Account Recovery</CardTitle>
            <CardDescription className="text-xs text-[#627472]">
              We will send a one-time reset link directly to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#EFF7F1] text-[#174E4A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[#263735]">Check your email</h3>
                  <p className="text-xs text-[#627472]">
                    If an account exists for <strong>{email}</strong>, a recovery link has been dispatched.
                  </p>
                </div>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="mt-2 text-xs">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMsg}</span>
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
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE8DF] text-sm text-[#263735] bg-white focus:outline-none focus:ring-2 focus:ring-[#174E4A]/30 disabled:opacity-50"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full text-sm font-semibold"
                  isLoading={loading}
                >
                  Send Recovery Link <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
