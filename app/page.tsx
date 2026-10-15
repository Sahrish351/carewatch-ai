"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import {
  HeartPulse,
  ArrowRight,
  ShieldAlert,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  RefreshCw,
  GitCompare,
  FileCheck2,
  Compass,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Lock,
  PhoneCall,
  UserCheck,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  FileText,
  Languages,
  Calendar,
  Check,
  Star,
  Users,
  LineChart,
  BarChart3,
  Server,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"assess" | "plan" | "checkin" | "reassess">("assess");
  const [previewRole, setPreviewRole] = useState<"patient" | "clinician" | "admin">("patient");

  const faqs = [
    {
      q: "What is CareWatch AI and how is it fundamentally different from a symptom checker?",
      a: "Most symptom checkers give you an alarming list of potential diagnoses and disappear. CareWatch AI creates a continuous care journey: it understands your immediate concern, provides an evidence-informed action plan, schedules a structured follow-up check-in (12h, 24h, or 48h), compares your new symptoms against your baseline, and reassesses your care pathway if symptoms worsen.",
    },
    {
      q: "Is CareWatch AI a replacement for a doctor or emergency services?",
      a: "No. CareWatch AI is an intelligent supportive navigation tool, not a doctor. It does not provide medical diagnoses, make clinical guarantees, or prescribe medication. It helps you organize your symptoms, monitor recovery timelines, and recognize when it is appropriate to seek urgent, emergency, or in-person clinical care.",
    },
    {
      q: "How does the automated follow-up check-in work?",
      a: "Based on the urgency and nature of your initial assessment, CareWatch AI schedules a personalized follow-up window (e.g. 12, 24, or 48 hours). When the check-in is due, the system prompts you to report your current severity and any new symptoms. It calculates trajectory delta and flags deterioration automatically.",
    },
    {
      q: "Can clinicians and administrators use CareWatch AI?",
      a: "Yes. CareWatch AI is built with dedicated role-specific workspaces: Patients manage their recovery episodes and Health Passport; Clinicians access a priority triage queue with red-flag escalation alerts; Administrators monitor AI model latency (Gemini 3.8 Flash), database health, and safety audit logs.",
    },
    {
      q: "How is my personal health data protected?",
      a: "Your data is stored in a dedicated Supabase PostgreSQL database protected by strict Row-Level Security (RLS). Only your authenticated account can read or write your assessments, follow-ups, and health records. We never sell your data, use third-party advertising trackers, or share records without your explicit consent.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased">
      {/* SECTION A — NAVIGATION */}
      <PublicNav />

      {/* SECTION B — HERO (Carely-inspired Warm Ivory/Forest Art Direction) */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Messaging Column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Soft Sage Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#174E4A]" />
                <span>Next-Generation Healthcare Navigation & Recovery Safety Net</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#263735] leading-[1.12]">
                Your Health Journey{" "}
                <span className="text-[#174E4A] underline decoration-[#DDEBE2] underline-offset-8">
                  Deserves Follow-Through.
                </span>
              </h1>

              {/* Exact Requested Subtitle */}
              <p className="text-lg sm:text-xl text-[#627472] max-w-2xl leading-relaxed font-normal">
                CareWatch AI helps you track symptoms, understand your next steps, and stay connected to your health journey through structured follow-ups.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <Link href="/assessment/new">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-sm font-bold bg-[#174E4A] hover:bg-[#103835] text-white shadow-md hover:shadow-lg transition-all h-12 px-7"
                  >
                    Start Your Health Journey <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm font-semibold border-[#EDE8DF] bg-white hover:bg-[#FAF8F3] text-[#263735] h-12 px-6"
                  >
                    Explore How It Works
                  </Button>
                </Link>
              </div>

              {/* Social Proof & Trust Strip */}
              <div className="pt-3 border-t border-[#EDE8DF]/80 flex flex-wrap items-center gap-6 text-xs text-[#627472]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                      alt="User avatar"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                      alt="User avatar"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                      alt="User avatar"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  <span className="font-semibold text-[#263735]">10,000+ Care Episodes Monitored</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#263735]">4.9/5 Safety Trust Score</span>
                </div>
              </div>

              {/* Role Fast-Track Link */}
              <div className="flex items-center gap-2 text-xs text-[#627472]">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>Evaluating as Clinician or Administrator?</span>
                <Link
                  href="/login"
                  className="font-bold text-[#174E4A] hover:underline inline-flex items-center gap-1"
                >
                  Access 1-Click Demo Dashboards <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Medical safety notice */}
              <div className="pt-1">
                <Disclaimer variant="inline" />
              </div>
            </motion.div>

            {/* Right Layered Hero Visual (Carely-inspired Organic Card & Floating Badges) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Organic Arched Container */}
              <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-[#EDE8DF] bg-gradient-to-b from-[#F4EFE6] to-white p-3 sm:p-4">
                
                {/* Clinician Photo in Rounded Frame */}
                <div className="relative rounded-[28px] overflow-hidden aspect-[4/4.2] sm:aspect-[4/4.5] shadow-inner bg-[#EAE3D2]">
                  <Image
                    src="https://images.unsplash.com/photo-1594824813583-05990f77242d?auto=format&fit=crop&w=1200&q=80"
                    alt="Caring clinician in healthcare clinic ready for patient consultation"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#103835]/70 via-transparent to-transparent" />

                  {/* Overlaid Bottom Status Bar */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE8DF] shadow-md">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#263735] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Care Episode
                      </span>
                      <span className="text-[10px] font-bold text-[#174E4A] bg-[#EFF7F1] px-2 py-0.5 rounded-full border border-[#DDEBE2]">
                        Step 3: Follow-Up
                      </span>
                    </div>
                    <div className="text-xs text-[#627472] flex items-center justify-between">
                      <span>Headache Check-in: <strong>24h Window</strong></span>
                      <span className="text-emerald-700 font-bold">Severity: 7/10 $\to$ 2/10</span>
                    </div>
                    <div className="mt-2 w-full bg-[#EDE8DF] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#174E4A] h-full rounded-full w-4/5 transition-all duration-1000" />
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1: Top-Left Next Check-in Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 p-3 rounded-2xl bg-white border border-[#EDE8DF] shadow-xl text-xs space-y-1 max-w-[210px] hidden sm:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#EFF7F1] flex items-center justify-center text-[#174E4A]">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-[#263735] text-[11px]">Follow-Up Scheduled</span>
                  </div>
                  <p className="text-[10px] text-[#627472] leading-tight">
                    Structured 24h check-in window opens tomorrow at 10:00 AM
                  </p>
                </motion.div>

                {/* Floating Badge 2: Top-Right Clinician Verified Pill */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-6 -right-3 sm:-right-4 p-3 rounded-2xl bg-[#174E4A] text-white shadow-xl text-xs space-y-0.5 max-w-[190px] hidden sm:block"
                >
                  <div className="flex items-center gap-1.5 text-white font-bold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DDEBE2]" />
                    <span>NICE & CDC Grounded</span>
                  </div>
                  <p className="text-[10px] text-white/80 leading-tight">
                    Evidence-informed guidance with canonical citations
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION B.2 — TRUST & SECURITY ACCREDITATION STRIP */}
      <section className="border-y border-[#EDE8DF] bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-[#627472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#174E4A]" />
            <span className="font-semibold text-[#263735]">Row-Level Security (RLS)</span> Enforced
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#174E4A]" />
            <span>Encrypted User-Scoped Database</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#174E4A]" />
            <span>Multi-Agent Gemini 3.8 Flash Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#174E4A]" />
            <span>Automated 12h, 24h & 48h Checkpoints</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#174E4A]" />
            <span>Role-Specific Clinician & Admin Consoles</span>
          </div>
        </div>
      </section>

      {/* SECTION C — THE CARE GAP (The Problem - Editorial Asymmetry) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              The Healthcare Follow-Through Crisis
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
              Why ordinary symptom checkers leave you stranded
            </h2>
            <p className="text-sm text-[#627472] leading-relaxed">
              When people feel unwell, searching symptoms online often yields an alarming list of conditions without any ongoing safety net, baseline comparison, or follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Editorial Image with Rounded Accent */}
            <div className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-[#EDE8DF] aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                alt="Patient reviewing health questions on phone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-[#174E4A]/10" />
            </div>

            {/* Comparison Cards */}
            <div className="md:col-span-7 space-y-5">
              <div className="p-6 rounded-2xl bg-white border border-red-200/80 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2.5 text-red-700 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <span>Traditional Symptom Checkers & Search Engines</span>
                </div>
                <p className="text-xs text-[#627472] leading-relaxed">
                  They output a scary list of worst-case possibilities and close the tab. You are left alone to remember whether your symptoms worsened tomorrow, with zero baseline tracking, no scheduled review, and no safety net.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#174E4A] font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-[#174E4A] text-white flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-[#DDEBE2]" />
                  </div>
                  <span>The CareWatch Continuous Follow-Through Loop</span>
                </div>
                <p className="text-xs text-[#263735] leading-relaxed">
                  CareWatch stays with you throughout your recovery episode. It schedules an automated follow-up window, prompts you to check in, measures symptom delta, and triggers immediate clinical escalation if danger signs develop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D — HOW IT WORKS (Reference 4 Style Editorial Process Layout) */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Bold Sticky Left Column */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 h-fit">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
                Care Navigation Architecture
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735] leading-tight">
                From initial concern to verified recovery.
              </h2>
              <p className="text-sm text-[#627472] leading-relaxed">
                The breakthrough in healthcare AI is not merely guessing symptoms—it is the continuous clinical feedback loop that monitors changes over time.
              </p>
              <div className="pt-4">
                <Link href="/assessment/new">
                  <Button className="bg-[#174E4A] hover:bg-[#103835] text-white text-xs font-bold shadow-xs">
                    Try the 6-Stage Loop <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Numbered Steps (Reference 4 Style) */}
            <div className="lg:col-span-8 space-y-4">
              {[
                {
                  num: "01",
                  title: "Assess Concern",
                  tag: "Adaptive Intake",
                  desc: "Share what is bothering you in plain language. The Gemini intake agent extracts primary symptoms and dynamically asks clinical rule-out questions.",
                  icon: Search,
                },
                {
                  num: "02",
                  title: "Evidence-Informed Plan",
                  tag: "Urgency Triage",
                  desc: "Receive an immediate triage tier (Self-Care, Monitor, See a Doctor, Urgent Emergency) and a transparent recovery plan with when-to-seek-care red flags.",
                  icon: ShieldAlert,
                },
                {
                  num: "03",
                  title: "Scheduled Check-In",
                  tag: "Proactive Safety Net",
                  desc: "CareWatch AI locks in a 12, 24, or 48-hour follow-up checkpoint tailored to the natural history of your symptoms.",
                  icon: Clock,
                },
                {
                  num: "04",
                  title: "Trajectory Comparison",
                  tag: "Delta Analytics",
                  desc: "When check-in time arrives, report your current status. The trajectory engine compares your current score against your baseline.",
                  icon: GitCompare,
                },
                {
                  num: "05",
                  title: "Reassess & Escalate",
                  tag: "Dynamic Pathway",
                  desc: "If symptoms deteriorate or new red flags appear, your care tier is automatically escalated with immediate clinical navigation instructions.",
                  icon: RefreshCw,
                },
                {
                  num: "06",
                  title: "Health Passport Sync",
                  tag: "Personal EHR",
                  desc: "Key findings, medications, and allergies sync directly into your portable Health Passport for rapid sharing during in-person medical consultations.",
                  icon: FileText,
                },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] hover:border-[#174E4A]/50 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-2xl font-bold text-[#174E4A]/50 group-hover:text-[#174E4A] transition-colors">
                        {step.num}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-[#263735]">{step.title}</h3>
                          <span className="text-[10px] font-semibold text-[#174E4A] bg-[#EFF7F1] px-2 py-0.5 rounded border border-[#DDEBE2]">
                            {step.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#627472] max-w-xl leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE8DF] flex items-center justify-center text-[#174E4A] shrink-0 shadow-2xs group-hover:bg-[#174E4A] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION E — DEEP FOREST / TEAL DASHBOARD PREVIEW (Matching Reference 1 & 3) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              Interactive Command Center
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
              A Deeply Thoughtful Healthcare Experience
            </h2>
            <p className="text-sm text-[#627472]">
              Preview the purpose-built interfaces designed for Patients, Clinicians, and Administrators.
            </p>

            {/* Role Preview Switcher */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#EDE8DF] shadow-xs gap-1 mt-2">
              <button
                onClick={() => setPreviewRole("patient")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  previewRole === "patient"
                    ? "bg-[#174E4A] text-white shadow-xs"
                    : "text-[#627472] hover:text-[#263735]"
                )}
              >
                Patient Portal
              </button>
              <button
                onClick={() => setPreviewRole("clinician")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  previewRole === "clinician"
                    ? "bg-[#0284C7] text-white shadow-xs"
                    : "text-[#627472] hover:text-[#263735]"
                )}
              >
                Clinician Triage Queue
              </button>
              <button
                onClick={() => setPreviewRole("admin")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  previewRole === "admin"
                    ? "bg-[#D97706] text-white shadow-xs"
                    : "text-[#627472] hover:text-[#263735]"
                )}
              >
                Admin Telemetry
              </button>
            </div>
          </div>

          {/* Deep Teal / Forest Mockup Card (Reference 1 Aesthetic) */}
          <div className="rounded-3xl border border-[#EDE8DF] shadow-2xl overflow-hidden bg-[#0C2925] text-white p-6 sm:p-10">
            {previewRole === "patient" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400">PATIENT RECOVERY OVERVIEW</span>
                    <h3 className="font-display text-2xl font-bold mt-0.5">Welcome back, Sarah Jenkins</h3>
                    <p className="text-xs text-white/70">Your active care episode is in progress.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Follow-up Check-in Due Now
                    </span>
                    <Link href="/dashboard">
                      <Button size="sm" className="bg-white text-[#174E4A] hover:bg-[#FAF8F3] text-xs font-bold">
                        Open Live Patient App <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Metric Cards (Reference 1 Style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Active Episode</span>
                    <div className="text-lg font-bold">Tension Headache</div>
                    <div className="text-xs text-emerald-400">Day 2 • Monitoring Window</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Severity Trajectory</span>
                    <div className="text-lg font-bold text-emerald-300">7/10 $\to$ 2/10 (-71%)</div>
                    <div className="text-xs text-white/70">Significant Improvement</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Safety Tier</span>
                    <div className="text-lg font-bold text-sky-300">Self-Care Safe</div>
                    <div className="text-xs text-white/70">No red-flag symptoms</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Health Passport</span>
                    <div className="text-lg font-bold">2 Active Meds</div>
                    <div className="text-xs text-white/70">Emergency QR Ready</div>
                  </div>
                </div>

                {/* Trajectory Sparkline & Recovery Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        Symptom Severity Timeline
                      </span>
                      <span className="text-white/60 text-[11px]">3 Check-in Data Points</span>
                    </div>
                    {/* Simulated SVG Line Chart */}
                    <div className="h-28 w-full flex items-end justify-between gap-3 pt-4 px-2">
                      <div className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-white/70">7/10</span>
                        <div className="w-full bg-red-400/80 h-20 rounded-t-lg" />
                        <span className="text-[10px] text-white/60">Intake</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-white/70">4/10</span>
                        <div className="w-full bg-amber-400/80 h-12 rounded-t-lg" />
                        <span className="text-[10px] text-white/60">12h Check</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-emerald-400 font-bold">2/10</span>
                        <div className="w-full bg-emerald-400 h-6 rounded-t-lg" />
                        <span className="text-[10px] text-white/60">24h Check</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <span className="text-xs font-bold text-white block">Next Clinical Action</span>
                    <div className="p-3 rounded-xl bg-white/10 text-xs space-y-1">
                      <div className="font-semibold text-emerald-300">Stay hydrated & complete 48h final check</div>
                      <p className="text-white/70 text-[11px]">
                        Your tension symptoms have settled significantly. If photophobia returns, review the care plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewRole === "clinician" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-semibold text-sky-400">PHYSICIAN TRIAGE QUEUE</span>
                    <h3 className="font-display text-2xl font-bold mt-0.5">Dr. Aris Thorne, MD</h3>
                    <p className="text-xs text-white/70">Lead Physician • Virtual Urgent Care & Triage</p>
                  </div>
                  <Link href="/clinician">
                    <Button size="sm" className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold">
                      Open Live Clinician Portal <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Triage Queue</span>
                    <div className="text-xl font-bold">14 Active Patients</div>
                    <div className="text-xs text-sky-300">2 Escalated Flags</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Avg Triage Speed</span>
                    <div className="text-xl font-bold">1.8 Seconds</div>
                    <div className="text-xs text-emerald-300">Gemini 3.8 Flash Execution</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Clinical Sources</span>
                    <div className="text-xl font-bold">NICE / CDC / AAFP</div>
                    <div className="text-xs text-white/70">Canonical Guidelines Grounded</div>
                  </div>
                </div>
              </div>
            )}

            {previewRole === "admin" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-semibold text-amber-400">SYSTEM ARCHITECTURE & GOVERNANCE</span>
                    <h3 className="font-display text-2xl font-bold mt-0.5">CareWatch AI Administrator</h3>
                    <p className="text-xs text-white/70">Telemetry stream, database health, and safety audit logs</p>
                  </div>
                  <Link href="/admin">
                    <Button size="sm" className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold">
                      Open Live Admin Console <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">PostgreSQL Tables</span>
                    <div className="text-xl font-bold text-emerald-300">15/15 Active</div>
                    <div className="text-xs text-white/70">RLS Enforced</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Active Model</span>
                    <div className="text-xl font-bold text-amber-300">Gemini 3.8 Flash</div>
                    <div className="text-xs text-white/70">Structured JSON Outputs</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Safety Guardrails</span>
                    <div className="text-xl font-bold text-sky-300">100% Passing</div>
                    <div className="text-xs text-white/70">Red-flag bypass prevention</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Audit Logs</span>
                    <div className="text-xl font-bold">Zero Violations</div>
                    <div className="text-xs text-white/70">Encrypted session traces</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION F — INTERACTIVE RECOVERY JOURNEY WALKTHROUGH */}
      <section id="recovery-journey" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
                Clinical Demonstration Scenario
              </span>
              <h2 className="font-display text-3xl font-bold text-[#263735]">
                Experience the 4-Stage Follow-Up in Action
              </h2>
              <p className="text-xs text-[#627472]">
                Inspect an illustrative scenario from initial symptom intake through scheduled 24h follow-up and emergency escalation.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full shrink-0">
              Illustrative Hackathon Scenario (Fictional case)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {[
                {
                  id: "assess",
                  label: "1. Initial Assessment",
                  subtitle: "Intake concern & adaptive questions",
                },
                {
                  id: "plan",
                  label: "2. Action Plan Generated",
                  subtitle: "Self-care steps & 24h follow-up scheduled",
                },
                {
                  id: "checkin",
                  label: "3. 24-Hour Follow-Up",
                  subtitle: "Patient reports worsening symptoms",
                },
                {
                  id: "reassess",
                  label: "4. Reassessment & Escalation",
                  subtitle: "Tier upgraded: See a Doctor today",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left border transition-all cursor-pointer",
                    activeTab === tab.id
                      ? "bg-[#174E4A] text-white border-[#174E4A] shadow-sm"
                      : "bg-[#FAF8F3] text-[#263735] border-[#EDE8DF] hover:border-[#174E4A]/40"
                  )}
                >
                  <div className="text-xs font-bold">{tab.label}</div>
                  <div className={cn("text-[11px] mt-0.5", activeTab === tab.id ? "text-white/80" : "text-[#627472]")}>
                    {tab.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Step Display Card */}
            <div className="lg:col-span-7">
              <Card className="border-[#EDE8DF] shadow-md p-6 bg-white min-h-[340px] flex flex-col justify-between">
                {activeTab === "assess" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#263735]">Step 1: Symptom Intake</span>
                      <Badge variant="secondary">Intake Completed</Badge>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs">
                      <span className="text-[#627472] block font-semibold mb-1">Reported Concern:</span>
                      <p className="font-medium text-[#263735]">&quot;Persistent dull headache behind forehead for 2 days, mild light sensitivity.&quot;</p>
                    </div>
                    <div className="space-y-2 text-xs">
                      <span className="font-semibold text-[#263735]">Adaptive Questions Asked by Intake Agent:</span>
                      <div className="p-2.5 rounded-xl bg-[#EFF7F1] text-[#174E4A]">
                        Q: &quot;Did this headache develop suddenly like a thunderclap, or gradually?&quot; $\to$ A: &quot;Gradually over 2 days.&quot;
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "plan" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#263735]">Step 2: Urgency Triage & Care Plan</span>
                      <span className="text-xs font-bold text-[#174E4A] bg-[#EFF7F1] px-2.5 py-0.5 rounded border border-[#DDEBE2]">Tier: Monitor Closely</span>
                    </div>
                    <p className="text-xs text-[#627472] leading-relaxed">
                      Gradual tension-type presentation with absent red flags. Safe for home monitoring with scheduled follow-up.
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF] space-y-1.5 text-xs">
                      <span className="font-bold text-[#263735]">Scheduled Safety Check:</span>
                      <p className="text-[#627472]">Automated follow-up set for <strong>24 hours</strong>. When to seek care: if sudden weakness or severe vomiting emerges.</p>
                    </div>
                  </div>
                )}

                {activeTab === "checkin" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#263735]">Step 3: 24-Hour Follow-Up Check-In</span>
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">Progression: Worse</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                      <span className="font-bold text-amber-900">Patient Check-in Report:</span>
                      <p className="text-amber-950">Severity increased from <strong>4/10 to 7/10</strong>. Developed new symptom: <strong>intermittent dizziness</strong> on standing.</p>
                    </div>
                    <p className="text-xs text-[#627472]">
                      AI detects significant symptom escalation (+3 severity and new vestibular symptom) triggering automatic reassessment.
                    </p>
                  </div>
                )}

                {activeTab === "reassess" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#263735]">Step 4: Reassessment & Pathway Upgrade</span>
                      <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded">Tier: See a Doctor Today</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#EFF7F1] border border-[#DDEBE2] space-y-2 text-xs">
                      <span className="font-bold text-[#174E4A]">Updated Clinical Recommendation:</span>
                      <p className="text-[#263735] leading-relaxed">
                        Due to severity progression and new dizziness, in-person primary or urgent care review is recommended within the next 8–12 hours for neurological screening and blood pressure evaluation.
                      </p>
                      <div className="text-[11px] text-[#627472] pt-1 border-t border-[#DDEBE2]">
                        Citation: NICE CG150 Headache Assessment Guidance
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#EDE8DF] flex items-center justify-between text-xs">
                  <span className="text-[#627472]">Ready to try with your own symptoms?</span>
                  <Link href="/assessment/new">
                    <Button size="sm" className="bg-[#174E4A] hover:bg-[#103835] text-white">
                      Start Live Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G — PRIVACY & EMERGENCY SAFETY */}
      <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Privacy */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#174E4A] text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 text-[#DDEBE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#263735]">Strict Privacy & Data Ownership</h3>
            <p className="text-xs text-[#627472] leading-relaxed">
              Health concerns are deeply personal. CareWatch AI enforces PostgreSQL Row-Level Security (RLS) on all 15 database tables. You own your data: no third-party tracking, no advertising pixels, and no sharing with insurance providers.
            </p>
          </div>

          {/* Emergency Safety Protocol */}
          <div className="p-8 rounded-3xl bg-red-50/60 border border-red-200 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-red-950">Emergency Safety Guardrails</h3>
            <p className="text-xs text-red-900 leading-relaxed">
              CareWatch AI immediately flags red-flag symptoms (severe chest pain, sudden numbness, difficulty speaking, severe breathing distress) and displays direct emergency numbers (911/999/112). <strong>Never delay emergency medical treatment while waiting for an AI response.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H — FAQ ACCORDION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl font-bold text-[#263735]">
              Everything you need to know about CareWatch AI
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EDE8DF] bg-[#FAF8F3] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#263735] hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#174E4A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#627472] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#627472] leading-relaxed border-t border-[#EDE8DF] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION I — FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#174E4A] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#DDEBE2]" />
            <span>Continuous Health Support</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Understand today. Check in tomorrow. Act when it matters.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Take the anxiety out of health concerns. Try CareWatch AI&apos;s adaptive symptom check and continuous recovery safety net now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-white text-[#174E4A] hover:bg-[#FAF8F3] shadow-lg text-sm font-bold h-12 px-8">
                Start a Free Health Check <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-sm font-semibold h-12 px-6">
                Sign In / 1-Click Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
