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
  FileText,
  Languages,
  Calendar,
  Check,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"assess" | "plan" | "checkin" | "reassess">("assess");

  const faqs = [
    {
      q: "What is CareWatch AI and how is it different from a symptom checker?",
      a: "Most symptom checkers give you a single list of conditions and disappear. CareWatch AI creates a continuous health journey: it understands your concern, provides an evidence-informed action plan, schedules an automated follow-up check-in, compares your new symptoms against your baseline, and reassesses your care pathway if symptoms worsen.",
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased">
      {/* SECTION A — NAVIGATION */}
      <PublicNav />

      {/* SECTION B — HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Messaging */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#174E4A]" />
                <span>Next-Generation Healthcare Navigation & Recovery Safety Net</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#263735] leading-[1.12]">
                Your Health Journey,{" "}
                <span className="text-[#174E4A] underline decoration-[#DDEBE2] underline-offset-8">
                  Followed Through.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#627472] max-w-2xl leading-relaxed font-normal">
                Understand your health concerns, keep track of changes, and receive structured follow-up support throughout your recovery journey.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href="/assessment/new">
                  <Button size="lg" className="w-full sm:w-auto text-sm font-bold bg-[#174E4A] hover:bg-[#103835] text-white shadow-md">
                    Start Your Health Journey <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm font-semibold">
                    Explore How It Works
                  </Button>
                </Link>
              </div>

              {/* Medical safety notice */}
              <div className="pt-2">
                <Disclaimer variant="inline" />
              </div>
            </motion.div>

            {/* Right Layered Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EDE8DF] bg-white aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor consulting with patient reviewing health tracking tablet"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#174E4A]/80 via-transparent to-transparent" />

                {/* Overlaid Recovery Timeline Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE8DF] shadow-lg">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-[#263735] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Care Episode
                    </span>
                    <span className="text-[10px] font-semibold text-[#174E4A] bg-[#EFF7F1] px-2 py-0.5 rounded border border-[#DDEBE2]">
                      Step 3: Follow-Up
                    </span>
                  </div>
                  <div className="text-xs text-[#627472] flex items-center justify-between">
                    <span>Headache Check-in: <strong>24h Window</strong></span>
                    <span className="text-amber-800 font-bold">Severity: 4/10 $\to$ 7/10</span>
                  </div>
                  <div className="mt-2 w-full bg-[#EDE8DF] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#174E4A] h-full rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#EDE8DF] bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-[#627472]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#174E4A]" />
            <span className="font-semibold text-[#263735]">Row-Level Security (RLS)</span> Protected
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
            <span>Continuous Recovery Safety Net</span>
          </div>
        </div>
      </section>

      {/* SECTION C — THE PROBLEM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              The Care Gap
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
              Why ordinary symptom checkers leave you stranded
            </h2>
            <p className="text-sm text-[#627472] leading-relaxed">
              When people feel unwell, searching symptoms online often yields an alarming list of conditions without any ongoing safety net or structured follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Editorial Image */}
            <div className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-[#EDE8DF] aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                alt="Person checking health application on smartphone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-[#174E4A]/10" />
            </div>

            {/* Comparison Text Block */}
            <div className="md:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
                <div className="flex items-center gap-2.5 text-red-700 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span>Traditional Symptom Checkers</span>
                </div>
                <p className="text-xs text-[#627472] leading-relaxed">
                  They output a terrifying probability list and close the tab. You are left alone to remember whether your symptoms worsened tomorrow, with no baseline comparison or proactive safety check.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] space-y-3 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#174E4A] font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-[#174E4A] text-white flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-[#DDEBE2]" />
                  </div>
                  <span>The CareWatch Recovery Loop</span>
                </div>
                <p className="text-xs text-[#263735] leading-relaxed">
                  CareWatch stays with you throughout your illness. It schedules an automated follow-up window, prompts you to check in, detects when symptoms deteriorate, and updates your care pathway when it matters most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D — HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              Care Navigation Engine
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
              ASSESS → PLAN → CHECK IN → COMPARE → REASSESS
            </h2>
            <p className="text-sm text-[#627472]">
              The core innovation is not simply checking symptoms—it is the continuous recovery loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: "Assess Concern",
                desc: "Describe what is bothering you. The intake agent extracts symptoms and asks adaptive clinical questions.",
                icon: Search,
              },
              {
                step: "02",
                title: "Triage & Plan",
                desc: "Receive an urgency assessment (Self-Care, Monitor, See a Doctor, Urgent) and an evidence-informed action plan.",
                icon: ShieldAlert,
              },
              {
                step: "03",
                title: "Check In Later",
                desc: "CareWatch AI schedules a 12, 24, or 48-hour follow-up checkpoint tailored to your risk level.",
                icon: Clock,
              },
              {
                step: "04",
                title: "Compare Trajectory",
                desc: "Report your symptoms during check-in. The system evaluates whether you improved, stayed stable, or worsened.",
                icon: GitCompare,
              },
              {
                step: "05",
                title: "Reassess & Escalate",
                desc: "If new red flags or worsening emerge, your pathway is upgraded with immediate clinical escalation advice.",
                icon: RefreshCw,
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] space-y-3 flex flex-col justify-between hover:border-[#174E4A]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#174E4A] font-mono">
                      {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#EDE8DF] flex items-center justify-center text-[#174E4A] shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#263735] mb-1">{s.title}</h3>
                    <p className="text-xs text-[#627472] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION E — FEATURE SHOWCASE (Varied Layouts) */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              Comprehensive Care Toolkit
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
              Designed with Clinical Rigor and Patient Empathy
            </h2>
            <p className="text-sm text-[#627472]">
              Every tool is purpose-built to guide, monitor, and empower your health decisions.
            </p>
          </div>

          {/* Varied Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Adaptive Questioning */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                  Intelligent Intake
                </span>
                <h3 className="text-2xl font-bold text-[#263735]">
                  Adaptive Questions to Rule Out Emergencies
                </h3>
                <p className="text-xs text-[#627472] leading-relaxed max-w-xl">
                  Instead of static checklists, CareWatch dynamically tailors questions to rule out sudden onset, neurological deficits, or cardiac indicators before formulating guidance.
                </p>
              </div>

              {/* Simulated Interactive Dialog */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#EDE8DF] text-[#263735] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#174E4A]" />
                  <span>&quot;Did the headache occur suddenly like a thunderclap?&quot;</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] flex items-center justify-between">
                  <span>Answer: &quot;No, it built up gradually over 2 days.&quot;</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Feature 2: Health Passport */}
            <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                  Emergency Readiness
                </span>
                <h3 className="text-xl font-bold text-[#263735]">Personal Health Passport</h3>
                <p className="text-xs text-[#627472] leading-relaxed">
                  A compact, accessible summary of your current medications, known allergies, and chronic conditions for in-person clinic visits.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs space-y-1.5">
                <div className="font-bold text-[#263735]">Emergency Summary Card</div>
                <div className="text-[11px] text-[#627472]">• 2 Active Medications</div>
                <div className="text-[11px] text-[#627472]">• No Known Drug Allergies</div>
              </div>
            </div>

            {/* Feature 3: Evidence Sources */}
            <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs space-y-4">
              <span className="text-[10px] font-bold uppercase text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Clinical Integrity
              </span>
              <h3 className="text-xl font-bold text-[#263735]">Grounded in Verified Evidence</h3>
              <p className="text-xs text-[#627472] leading-relaxed">
                Triage recommendations cite public guidelines from NICE, CDC, AAFP, and WHO with canonical references—never hallucinated medical citations.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#174E4A] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> 5 Curated Guideline Repositories
              </div>
            </div>

            {/* Feature 4: Trajectory Comparisons */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-[#EFF7F1]/80 border border-[#DDEBE2] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#174E4A] bg-white px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                  Trajectory Analysis
                </span>
                <h3 className="text-2xl font-bold text-[#263735]">
                  Previous vs Current Symptom Comparisons
                </h3>
                <p className="text-xs text-[#263735] leading-relaxed max-w-xl">
                  CareWatch AI measures changes across severity scores, functional limitations, and newly emerging symptoms to decide whether recovery is on track or requires escalation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-[#DDEBE2]">
                  <span className="text-[#627472] block text-[10px] uppercase font-bold">Initial Intake</span>
                  <div className="text-sm font-bold text-[#263735] mt-1">Severity: 4/10</div>
                  <div className="text-[11px] text-[#174E4A]">Tier: Monitor Closely</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#DDEBE2]">
                  <span className="text-[#627472] block text-[10px] uppercase font-bold">24-Hour Follow-up</span>
                  <div className="text-sm font-bold text-red-600 mt-1">Severity: 7/10 (+3)</div>
                  <div className="text-[11px] text-red-700">Tier: See a Doctor Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F — RECOVERY JOURNEY PREVIEW */}
      <section id="recovery-journey" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
                Illustrative Walkthrough
              </span>
              <h2 className="font-display text-3xl font-bold text-[#263735]">
                Experience the Follow-Up Loop in Action
              </h2>
              <p className="text-xs text-[#627472]">
                Walk through an illustrative scenario from first symptom intake through scheduled check-in and reassessment.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full shrink-0">
              Illustrative example (Fictional case for demonstration)
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
                      <span className="font-semibold text-[#263735]">Adaptive Questions Asked by Question Agent:</span>
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
                  <span className="text-[#627472]">Want to evaluate with your own concern?</span>
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

      {/* SECTION G — PRODUCT PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
              Interface Experience
            </span>
            <h2 className="font-display text-3xl font-bold text-[#263735]">
              A Calm, Patient-Centered Dashboard
            </h2>
            <p className="text-sm text-[#627472]">
              Keep track of active health checks, follow-up countdowns, and your personal Health Passport.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#EDE8DF] shadow-xl bg-white p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE8DF] pb-6">
              <div>
                <span className="text-xs font-bold text-[#174E4A]">Personal Health Safety Net</span>
                <h3 className="text-2xl font-bold text-[#263735]">Welcome back, Sarah</h3>
                <p className="text-xs text-[#627472]">CareWatch AI is monitoring your active care journey.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-[#EFF7F1] text-[#174E4A] border border-[#DDEBE2] px-3 py-1 rounded-full">
                  Follow-up Check-in Due Now
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] space-y-2">
                <span className="text-[11px] font-bold uppercase text-[#627472]">Current Episode</span>
                <div className="text-sm font-bold text-[#263735]">Persistent Headache</div>
                <div className="text-xs text-[#627472]">Reported 24 hours ago. Severity: 4/10</div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-[11px] font-bold uppercase text-amber-900">Next Action</span>
                <div className="text-sm font-bold text-amber-950">Complete 24h Check-in</div>
                <div className="text-xs text-amber-900">Report how your symptoms have progressed</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] space-y-2">
                <span className="text-[11px] font-bold uppercase text-[#174E4A]">Health Passport</span>
                <div className="text-sm font-bold text-[#263735]">Emergency Card Ready</div>
                <div className="text-xs text-[#627472]">2 active medications, no known drug allergies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H — PRIVACY & EMERGENCY SAFETY */}
      <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Privacy */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#EDE8DF] space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#174E4A] text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 text-[#DDEBE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#263735]">Strict Privacy & Data Ownership</h3>
            <p className="text-xs text-[#627472] leading-relaxed">
              Health concerns are deeply personal. CareWatch AI enforces PostgreSQL Row-Level Security (RLS) on all 15 database tables. You own your data: no third-party tracking, no advertising pixels, and no sharing with insurance providers.
            </p>
          </div>

          {/* Emergency Safety Protocol */}
          <div className="p-8 rounded-3xl bg-red-50/60 border border-red-200 space-y-4">
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

      {/* SECTION I — FAQ ACCORDION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3]">
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
                  className="rounded-2xl border border-[#EDE8DF] bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#263735] hover:bg-[#FAF8F3] transition-colors cursor-pointer"
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

      {/* SECTION J — FINAL CTA AND FOOTER */}
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
              <Button size="lg" className="bg-white text-[#174E4A] hover:bg-[#FAF8F3] shadow-lg text-sm font-bold">
                Start a Free Health Check <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-sm font-semibold">
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
