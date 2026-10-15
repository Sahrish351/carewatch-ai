"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"assess" | "plan" | "checkin" | "reassess">("assess");

  const faqs = [
    {
      q: "What is CareWatch AI and how is it different from a symptom checker?",
      a: "Most symptom checkers give you a single probability list and disappear. CareWatch AI creates a continuous health journey: it understands your initial symptoms, provides an evidence-informed action plan, schedules an automated follow-up check-in, compares your new symptoms against your baseline, and reassesses your care pathway if symptoms worsen.",
    },
    {
      q: "Is CareWatch AI a replacement for a licensed doctor?",
      a: "No. CareWatch AI is an intelligent supportive navigation tool, not a doctor. It does not provide medical diagnoses, make clinical guarantees, or prescribe medication. It helps you organize your symptoms, monitor recovery timelines, and recognize when it is appropriate to seek urgent or in-person clinical care.",
    },
    {
      q: "How does the automated follow-up check-in work?",
      a: "Based on the urgency of your condition, CareWatch AI schedules a personalized follow-up window (e.g., 12, 24, or 48 hours). When you check in, the system compares your current severity and any new symptoms against your initial assessment to determine if your condition is improving, stable, or requiring clinical escalation.",
    },
    {
      q: "Can I track multiple health journeys over time?",
      a: "Yes. Every health concern you start is preserved as an episode in your private health timeline. You can review past check-ins, symptom trend graphs, action plans, and access your personal Health Passport.",
    },
    {
      q: "How is my personal health data protected?",
      a: "Your data is stored in a dedicated Supabase PostgreSQL database protected by Row-Level Security (RLS). Only your authenticated account can read or write your assessments, follow-ups, and health records. We never sell your data or use it for advertising.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737] selection:bg-[#8FB996]/30">
      <PublicNav />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Core Positioning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] border border-[#8FB996]/40 text-[#24542E] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#2A6F6F]" />
                <span>Next-Generation Healthcare Navigation & Follow-Up</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#173737] leading-[1.12]">
                Your Health Journey,{" "}
                <span className="text-[#2A6F6F] underline decoration-[#8FB996]/50 underline-offset-8">
                  Followed Through.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#657777] max-w-2xl leading-relaxed font-normal">
                CareWatch AI helps you understand a health concern, take an evidence-informed next step, and automatically checks back later to see whether your condition improved or changed.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href="/assessment/new">
                  <Button size="lg" className="w-full sm:w-auto text-base shadow-md">
                    Start Your Health Journey <ArrowRight className="w-5 h-5 ml-1.5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                    Explore How It Works
                  </Button>
                </Link>
              </div>

              {/* Clinical safety micro-notice */}
              <div className="pt-2">
                <Disclaimer variant="inline" />
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Real Photography & Floating Clinical Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EDE8DF] bg-white aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor discussing digital health assessment with patient"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173737]/80 via-transparent to-transparent" />

                {/* Overlaid Floating Recovery Indicator */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE8DF] shadow-lg">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-[#173737] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Care Episode
                    </span>
                    <span className="text-[10px] font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-2 py-0.5 rounded">
                      Step 3: Follow-Up
                    </span>
                  </div>
                  <div className="text-xs text-[#657777] flex items-center justify-between">
                    <span>Headache Check-in: <strong>24h Window</strong></span>
                    <span className="text-amber-800 font-bold">Severity: 4/10 $\to$ 7/10</span>
                  </div>
                  <div className="mt-2 w-full bg-[#EDE8DF] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#2A6F6F] h-full rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST AND SAFETY STRIP */}
      <section className="border-y border-[#EDE8DF] bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-[#657777]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2A6F6F]" />
            <span className="font-semibold text-[#173737]">Row-Level Security (RLS)</span> Protected
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#2A6F6F]" />
            <span>Private User-Scoped Records</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2A6F6F]" />
            <span>Multi-Agent Gemini 3.8 Flash Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2A6F6F]" />
            <span>Continuous Recovery Safety Net</span>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
              The Healthcare Disconnect
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
              Why ordinary symptom checkers leave you stranded
            </h2>
            <p className="text-sm text-[#657777] leading-relaxed">
              When people feel unwell, they search symptoms online, get an alarming list of diagnoses, and are left with no ongoing safety net or structured follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#173737]">
                Traditional One-Off Checkers
              </h3>
              <ul className="space-y-3 text-xs text-[#657777] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Give you a generic probability list, then immediately disappear.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Never check back tomorrow to see if you improved, stayed the same, or got worse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>No persistent timeline to compare today&apos;s symptoms against last week.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Cause anxiety without offering actionable, evidence-informed next steps.</span>
                </li>
              </ul>
            </div>

            {/* The CareWatch AI Way */}
            <div className="p-8 rounded-3xl bg-[#EBF3ED]/70 border border-[#8FB996]/50 space-y-5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#2A6F6F] text-white flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5 text-[#8FB996]" />
              </div>
              <h3 className="text-xl font-bold text-[#173737]">
                The CareWatch Continuous Loop
              </h3>
              <ul className="space-y-3 text-xs text-[#24542E] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Understand:</strong> Listens to your concern and asks focused, adaptive clinical questions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Action Plan:</strong> Generates a tailored self-care and monitoring plan grounded in published clinical guidelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Check In:</strong> Proactively prompts you at 12, 24, or 48 hours to report changes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Compare & Reassess:</strong> Compares progression against baseline and escalates to a doctor if red flags emerge.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW CAREWATCH AI WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
              The Care Navigation Engine
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
              How the Continuous Recovery Loop Works
            </h2>
            <p className="text-sm text-[#657777]">
              Five intelligent steps connected across your health journey:
            </p>
          </div>

          {/* 5-Step Connected Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: "Assess Concern",
                desc: "Describe what is bothering you in plain language. AI extracts symptoms and asks targeted questions.",
                icon: Search,
              },
              {
                step: "02",
                title: "Triage & Plan",
                desc: "Receive an urgency assessment (Self-Care, Monitor, See a Doctor, Urgent) with evidence-informed next steps.",
                icon: ShieldAlert,
              },
              {
                step: "03",
                title: "Schedule Check-In",
                desc: "CareWatch schedules an in-app follow-up checkpoint based on your clinical risk profile.",
                icon: Clock,
              },
              {
                step: "04",
                title: "Compare Trajectory",
                desc: "Return to report symptom progression (Better, Same, Worse, or New Symptoms) vs baseline.",
                icon: GitCompare,
              },
              {
                step: "05",
                title: "Reassess & Escalate",
                desc: "If symptoms deteriorate, your care pathway automatically upgrades with prompt escalation guidance.",
                icon: RefreshCw,
              },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-3 flex flex-col justify-between hover:border-[#2A6F6F]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#2A6F6F] font-mono">
                      {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#EDE8DF] flex items-center justify-center text-[#2A6F6F]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#173737] mb-1">{s.title}</h3>
                    <p className="text-xs text-[#657777] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
              Comprehensive Care Toolkit
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
              Built for Safety, Clarity, and Follow-Through
            </h2>
            <p className="text-sm text-[#657777]">
              Everything you need to navigate symptoms with calm confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Adaptive Questioning",
                desc: "Tailors follow-up questions dynamically to rule out critical red-flag emergency symptoms.",
                icon: Search,
                tag: "AI Powered",
              },
              {
                title: "Evidence-Informed Plans",
                desc: "Grounds home-care steps and warning signs in clinical guidelines from NICE, CDC, and AAFP.",
                icon: FileCheck2,
                tag: "Verified Sources",
              },
              {
                title: "Scheduled Check-Ins",
                desc: "Never forget when to re-evaluate: scheduled safety checks at 12, 24, or 48 hours.",
                icon: Clock,
                tag: "Proactive",
              },
              {
                title: "Symptom Comparison",
                desc: "Visualizes trajectory changes over time, highlighting progression or newly emerging factors.",
                icon: GitCompare,
                tag: "Trajectory Analysis",
              },
              {
                title: "Health Passport",
                desc: "Instant emergency card detailing medications, allergies, and chronic conditions for clinical visits.",
                icon: HeartPulse,
                tag: "Emergency Card",
              },
              {
                title: "Recovery Timeline",
                desc: "Chronological audit trail of health checks, symptom changes, and clinical recommendations.",
                icon: Compass,
                tag: "Audit Trail",
              },
              {
                title: "Health Records Vault",
                desc: "Securely organize past medical discharge notes and diagnostic panels with user-scoped RLS.",
                icon: Lock,
                tag: "Private Vault",
              },
              {
                title: "Bilingual English & Roman Urdu",
                desc: "Accessible interface providing clear health guidance in English and Roman Urdu.",
                icon: Sparkles,
                tag: "Accessible",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] text-[#2A6F6F] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-2 py-0.5 rounded">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#173737]">{f.title}</h3>
                  <p className="text-xs text-[#657777] leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE RECOVERY JOURNEY PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
                Illustrative Walkthrough
              </span>
              <h2 className="font-display text-3xl font-bold text-[#173737]">
                Experience the Follow-Up Loop in Action
              </h2>
              <p className="text-xs text-[#657777]">
                See how CareWatch AI handles a real clinical scenario from first symptom intake through scheduled check-in and reassessment.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full shrink-0">
              Illustrative Demo Case (Sarah Jenkins)
            </div>
          </div>

          {/* Interactive Step Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                  className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#2A6F6F] text-white border-[#2A6F6F] shadow-sm"
                      : "bg-[#FAF8F5] text-[#173737] border-[#EDE8DF] hover:border-[#2A6F6F]/40"
                  }`}
                >
                  <div className="text-xs font-bold">{tab.label}</div>
                  <div className={`text-[11px] mt-0.5 ${activeTab === tab.id ? "text-white/80" : "text-[#657777]"}`}>
                    {tab.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Display Card */}
            <div className="lg:col-span-7">
              <Card className="border-[#EDE8DF] shadow-md p-6 bg-white min-h-[340px] flex flex-col justify-between">
                {activeTab === "assess" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#173737]">Step 1: Symptom Intake</span>
                      <Badge variant="secondary">Intake Completed</Badge>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] text-xs">
                      <span className="text-[#657777] block font-semibold mb-1">Reported Concern:</span>
                      <p className="font-medium text-[#173737]">&quot;Persistent dull headache behind forehead for 2 days, mild light sensitivity.&quot;</p>
                    </div>
                    <div className="space-y-2 text-xs">
                      <span className="font-semibold text-[#173737]">Adaptive Clinical Questions Asked:</span>
                      <div className="p-2.5 rounded-lg bg-[#F0F7F7] text-[#2A6F6F]">
                        Q: &quot;Did this headache develop suddenly like a thunderclap, or gradually?&quot; $\to$ A: &quot;Gradually over 2 days.&quot;
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "plan" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#173737]">Step 2: Urgency Triage & Care Plan</span>
                      <span className="text-xs font-bold text-[#2A6F6F] bg-[#EBF3ED] px-2.5 py-0.5 rounded">Tier: Monitor Closely</span>
                    </div>
                    <p className="text-xs text-[#657777] leading-relaxed">
                      Gradual tension-type presentation with absent red flags. Safe for home monitoring with scheduled follow-up.
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-1.5 text-xs">
                      <span className="font-bold text-[#173737]">Scheduled Safety Check:</span>
                      <p className="text-[#657777]">Automated follow-up set for <strong>24 hours</strong>. When to seek care: if sudden weakness or severe vomiting emerges.</p>
                    </div>
                  </div>
                )}

                {activeTab === "checkin" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#173737]">Step 3: 24-Hour Follow-Up Check-In</span>
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">Progression: Worse</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                      <span className="font-bold text-amber-900">Patient Check-in Report:</span>
                      <p className="text-amber-950">Severity increased from <strong>4/10 to 7/10</strong>. Developed new symptom: <strong>intermittent dizziness</strong> on standing.</p>
                    </div>
                    <p className="text-xs text-[#657777]">
                      AI detects significant symptom escalation (+3 severity and new vestibular symptom) triggering automatic reassessment.
                    </p>
                  </div>
                )}

                {activeTab === "reassess" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3">
                      <span className="text-xs font-bold text-[#173737]">Step 4: Reassessment & Pathway Upgrade</span>
                      <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded">Tier: See a Doctor Today</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F0F7F7] border border-[#BDDEDC] space-y-2 text-xs">
                      <span className="font-bold text-[#2A6F6F]">Updated Clinical Recommendation:</span>
                      <p className="text-[#173737] leading-relaxed">
                        Due to severity progression and new dizziness, primary care or urgent care review is recommended within the next 8–12 hours for neurological screening and blood pressure evaluation.
                      </p>
                      <div className="text-[11px] text-[#657777] pt-1 border-t border-[#BDDEDC]/50">
                        Citation: NICE CG150 Headache Assessment Guidance
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#EDE8DF] flex items-center justify-between text-xs">
                  <span className="text-[#657777]">Ready to test with your own health concern?</span>
                  <Link href="/assessment/new">
                    <Button size="sm">
                      Start Live Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DASHBOARD PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
              Patient Portal Experience
            </span>
            <h2 className="font-display text-3xl font-bold text-[#173737]">
              A Calm, Reassuring Dashboard for Your Health Journey
            </h2>
            <p className="text-sm text-[#657777]">
              Keep track of active health checks, follow-up countdowns, and your personal Health Passport.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#EDE8DF] shadow-2xl bg-white p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE8DF] pb-6">
              <div>
                <span className="text-xs font-semibold text-[#2A6F6F]">Personal Health Safety Net</span>
                <h3 className="text-2xl font-bold text-[#173737]">Welcome back, Sarah</h3>
                <p className="text-xs text-[#657777]">CareWatch AI is monitoring your active care journey.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-[#EBF3ED] text-[#24542E] px-3 py-1 rounded-full">
                  Follow-up Check-in Due Now
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-2">
                <span className="text-[11px] font-bold uppercase text-[#657777]">Current Episode</span>
                <div className="text-sm font-bold text-[#173737]">Persistent Headache</div>
                <div className="text-xs text-[#657777]">Reported 24 hours ago. Severity: 4/10</div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="text-[11px] font-bold uppercase text-amber-900">Next Action</span>
                <div className="text-sm font-bold text-amber-950">Complete 24h Check-in</div>
                <div className="text-xs text-amber-900">Report how your symptoms have progressed</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F0F7F7] border border-[#BDDEDC] space-y-2">
                <span className="text-[11px] font-bold uppercase text-[#2A6F6F]">Health Passport</span>
                <div className="text-sm font-bold text-[#173737]">Emergency Card Ready</div>
                <div className="text-xs text-[#657777]">2 active medications, no known drug allergies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRIVACY AND HEALTHCARE SAFETY SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Privacy */}
          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#2A6F6F] text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 text-[#8FB996]" />
            </div>
            <h3 className="text-xl font-bold text-[#173737]">Strict Privacy & Data Ownership</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              Health concerns are deeply personal. CareWatch AI enforces PostgreSQL Row-Level Security (RLS) on all 15 database tables. You own your data: no third-party tracking, no advertising pixels, and no sharing with insurance providers.
            </p>
          </div>

          {/* Emergency Safety Protocol */}
          <div className="p-8 rounded-3xl bg-red-50/50 border border-red-200/80 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-red-950">Emergency Safety Guardrails</h3>
            <p className="text-xs text-red-900 leading-relaxed">
              CareWatch AI immediately flags red-flag symptoms (severe chest pain, sudden numbness, difficulty speaking, severe breathing distress) and displays direct emergency numbers (911/999/112). <strong>Never delay emergency medical treatment while waiting for an AI response.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl font-bold text-[#173737]">
              Everything you need to know about CareWatch AI
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EDE8DF] bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#173737] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#2A6F6F] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#657777] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#657777] leading-relaxed border-t border-[#F4EFEB] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2A6F6F] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#8FB996]" />
            <span>Start Today with Zero Commitment</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Understand today. Check in tomorrow. Act when it matters.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Take the anxiety out of health concerns. Try CareWatch AI&apos;s adaptive symptom check and continuous recovery safety net now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-white text-[#2A6F6F] hover:bg-[#FAF8F5] shadow-lg text-sm font-bold">
                Start a Free Health Check <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-sm">
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
