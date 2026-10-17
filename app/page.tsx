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
  QrCode,
  Pill,
  CheckCircle,
  TrendingDown,
  TrendingUp,
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
    {
      q: "Can I describe symptoms in Roman Urdu?",
      a: "Yes. CareWatch AI natively processes natural English and Roman Urdu (e.g. 'Sar mein 3 din se shadeed dard hai aur chakkar aa rahe hain'), converting colloquial symptoms into standardized clinical triage indicators.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased overflow-x-hidden relative">
      {/* Ambient Background Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[120px] left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/50 to-teal-50/20 blur-3xl" />
        <div className="absolute top-[80px] right-1/6 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-amber-100/40 to-transparent blur-3xl" />
      </div>

      {/* SECTION A — NAVIGATION */}
      <PublicNav />

      {/* SECTION B — HERO (Carely-inspired Warm Ivory/Forest Art Direction with Fluid Motion) */}
      <section className="relative z-10 pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Messaging Column */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="md:col-span-7 space-y-6 text-left"
            >
              {/* Soft Sage Pill Badge with Animated Glow */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#DDEBE2] text-[#174E4A] text-xs font-bold shadow-xs hover:border-[#174E4A]/40 transition-all cursor-default"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Next-Generation Healthcare Navigation & Recovery Safety Net</span>
              </motion.div>

              {/* Responsive Elegant Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-extrabold tracking-tight text-[#263735] leading-[1.12]">
                Your Health Journey
                <span className="block mt-1 sm:mt-2 text-[#174E4A]">
                  Deserves <span className="inline-block">Follow-Through.</span>
                </span>
              </h1>

              {/* Exact Requested Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-[#627472] max-w-2xl leading-relaxed font-normal">
                CareWatch AI helps you track symptoms, understand your next steps, and stay connected to your health journey through structured follow-ups.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                <Link href="/assessment/new">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-sm font-bold bg-gradient-to-r from-[#174E4A] to-[#103835] hover:from-[#103835] hover:to-[#0B2825] text-white shadow-lg shadow-[#174E4A]/25 hover:shadow-xl transition-all h-13 px-8 rounded-2xl group"
                  >
                    <span>Start Your Health Journey</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm font-semibold border-[#EDE8DF] bg-white/80 hover:bg-white backdrop-blur-md text-[#263735] h-13 px-7 rounded-2xl shadow-xs"
                  >
                    Explore How It Works
                  </Button>
                </Link>
              </div>

              {/* Social Proof & Trust Strip */}
              <div className="pt-4 border-t border-[#EDE8DF]/90 flex flex-wrap items-center gap-6 text-xs text-[#627472]">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2.5">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                      SJ
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                      AT
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                      MV
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-[#263735] block">10,000+ Care Episodes</span>
                    <span className="text-[11px] text-[#627472]">Followed through safely</span>
                  </div>
                </div>

                <div className="h-6 w-px bg-[#EDE8DF] hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-[#263735]">4.9/5 Safety Trust Score</span>
                </div>
              </div>

              {/* Role Fast-Track Link */}
              <div className="p-3 rounded-2xl bg-white/80 border border-[#EDE8DF] backdrop-blur-md flex items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="flex items-center gap-2 text-[#627472]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Evaluating as <strong>Clinician</strong> or <strong>Administrator</strong>?</span>
                </div>
                <Link
                  href="/login"
                  className="font-bold text-[#174E4A] hover:text-[#103835] hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  Access 1-Click Dashboards <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Medical safety notice */}
              <div className="pt-1">
                <Disclaimer variant="inline" />
              </div>
            </motion.div>

            {/* Right Layered Hero Visual (Carely-inspired Organic Card & Floating Interactive Badges) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
              className="md:col-span-5 relative"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 rounded-[42px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/20 to-amber-100/30 blur-2xl -z-10" />

              {/* Organic Arched Container */}
              <div className="relative rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(23,78,74,0.12)] border border-[#EDE8DF] bg-gradient-to-b from-[#F4EFE6] to-white p-3.5 sm:p-4">
                
                {/* Clinician Photo in Rounded Frame */}
                <div className="relative rounded-[28px] overflow-hidden aspect-[4/4.3] sm:aspect-[4/4.6] shadow-inner bg-[#EAE3D2]">
                  <Image
                    src="/images/clinician-female.jpg"
                    alt="Caring clinician in healthcare clinic ready for patient consultation"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-top hover:scale-102 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#103835]/75 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Bottom Status Bar with Live Progress */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE8DF] shadow-lg">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-[#263735] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Care Episode #104
                      </span>
                      <span className="text-[10px] font-bold text-[#174E4A] bg-[#EFF7F1] px-2.5 py-0.5 rounded-full border border-[#DDEBE2]">
                        Step 3: Follow-Up
                      </span>
                    </div>
                    <div className="text-xs text-[#627472] flex items-center justify-between font-medium">
                      <span>Headache Check-in: <strong>24h Window</strong></span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" /> Severity: 7/10 → 2/10
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-[#EDE8DF] h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#174E4A] to-emerald-500 h-full rounded-full w-4/5 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION B.2 — TRUST & SECURITY ACCREDITATION STRIP */}
      <section className="border-y border-[#EDE8DF] bg-white/80 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-[#627472]">
          <div className="flex items-center gap-2 hover:text-[#174E4A] transition-colors">
            <div className="w-6 h-6 rounded-lg bg-[#EFF7F1] flex items-center justify-center text-[#174E4A]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span><strong className="text-[#263735]">Row-Level Security (RLS)</strong> Enforced</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#174E4A] transition-colors">
            <div className="w-6 h-6 rounded-lg bg-[#EFF7F1] flex items-center justify-center text-[#174E4A]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span>Encrypted PostgreSQL Database</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#174E4A] transition-colors">
            <div className="w-6 h-6 rounded-lg bg-[#EFF7F1] flex items-center justify-center text-[#174E4A]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Multi-Agent Gemini 3.8 Flash Engine</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#174E4A] transition-colors">
            <div className="w-6 h-6 rounded-lg bg-[#EFF7F1] flex items-center justify-center text-[#174E4A]">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span>Automated 12h, 24h & 48h Checkpoints</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#174E4A] transition-colors">
            <div className="w-6 h-6 rounded-lg bg-[#EFF7F1] flex items-center justify-center text-[#174E4A]">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <span>Role-Specific Clinician & Admin Consoles</span>
          </div>
        </div>
      </section>

      {/* SECTION C — THE CARE GAP (The Problem - Editorial Asymmetry & Before/After Contrast) */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] relative z-10">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-3 py-1 rounded-full border border-[#DDEBE2]">
              The Healthcare Follow-Through Crisis
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263735] tracking-tight">
              Why ordinary symptom checkers leave you stranded
            </h2>
            <p className="text-sm sm:text-base text-[#627472] leading-relaxed">
              When people feel unwell, searching symptoms online often yields an alarming list of conditions without any ongoing safety net, baseline comparison, or structured follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Editorial Image with Rounded Shadow Frame */}
            <div className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-[#EDE8DF] aspect-square group">
              <Image
                src="/images/patient-phone.jpg"
                alt="Patient reviewing health questions on phone"
                fill
                unoptimized
                className="object-cover group-hover:scale-103 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#174E4A]/40 via-transparent to-transparent" />
              
              {/* Floating Stat Pill on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE8DF] shadow-md text-xs text-[#263735]">
                <div className="font-bold text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> 84% Follow-Up Void
                </div>
                <p className="text-[11px] text-[#627472] mt-0.5">
                  Patients are left alone to remember whether symptoms escalated or settled.
                </p>
              </div>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div className="md:col-span-7 space-y-5">
              {/* Broken Experience Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-red-200/80 shadow-xs space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-red-400" />
                <div className="flex items-center gap-3 text-red-700 font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <span>Traditional Symptom Checkers & Search Engines</span>
                </div>
                <p className="text-xs sm:text-sm text-[#627472] leading-relaxed pl-1">
                  They output a scary list of worst-case possibilities and close the tab. You are left alone to remember whether your symptoms worsened tomorrow, with zero baseline tracking, no scheduled review, and no safety net.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-red-800 font-medium pl-1 pt-1">
                  <span className="bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">✕ One-and-done answer</span>
                  <span className="bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">✕ Closed tabs</span>
                  <span className="bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">✕ Missed escalation signs</span>
                </div>
              </div>

              {/* CareWatch Continuous Loop Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#EFF7F1] to-white border border-[#DDEBE2] shadow-md space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-[#174E4A]" />
                <div className="flex items-center gap-3 text-[#174E4A] font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-[#174E4A] text-white flex items-center justify-center shadow-xs">
                    <HeartPulse className="w-4 h-4 text-[#A3D9C9]" />
                  </div>
                  <span>The CareWatch Continuous Follow-Through Loop</span>
                </div>
                <p className="text-xs sm:text-sm text-[#263735] leading-relaxed pl-1">
                  CareWatch stays with you throughout your recovery episode. It schedules an automated follow-up window, prompts you to check in, measures symptom delta, and triggers immediate clinical escalation if danger signs develop.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-[#174E4A] font-medium pl-1 pt-1">
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-[#DDEBE2]">✓ Active follow-up timer</span>
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-[#DDEBE2]">✓ Delta trajectory engine</span>
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-[#DDEBE2]">✓ Emergency safety net</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D — HOW IT WORKS (Reference 4 Style Editorial Process Layout with Interactive Hover) */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Bold Sticky Left Column */}
            <div className="md:col-span-4 space-y-5 md:sticky md:top-28 h-fit">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-3 py-1 rounded-full border border-[#DDEBE2]">
                Care Navigation Architecture
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263735] leading-tight">
                From initial concern to verified recovery.
              </h2>
              <p className="text-sm sm:text-base text-[#627472] leading-relaxed">
                The breakthrough in healthcare AI is not merely guessing symptoms—it is the continuous clinical feedback loop that monitors changes over time.
              </p>
              <div className="pt-2">
                <Link href="/assessment/new">
                  <Button className="bg-[#174E4A] hover:bg-[#103835] text-white text-xs font-bold shadow-md rounded-xl h-11 px-6">
                    Try the 6-Stage Loop <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Numbered Steps (Reference 4 Style with Connected Subtle Rail) */}
            <div className="md:col-span-8 space-y-4">
              {[
                {
                  num: "01",
                  title: "Assess Concern",
                  tag: "Adaptive Intake",
                  desc: "Share what is bothering you in plain language. The Gemini intake agent extracts primary symptoms and dynamically asks clinical rule-out questions.",
                  icon: Search,
                  example: "Q: 'Did the headache develop suddenly like a thunderclap?' → A: 'Gradually over 2 days.'",
                },
                {
                  num: "02",
                  title: "Evidence-Informed Plan",
                  tag: "Urgency Triage",
                  desc: "Receive an immediate triage tier (Self-Care, Monitor, See a Doctor, Urgent Emergency) and a transparent recovery plan with when-to-seek-care red flags.",
                  icon: ShieldAlert,
                  example: "Tier: Monitor Closely • Action: Hydrate 500ml, dim lighting, avoid screen strain.",
                },
                {
                  num: "03",
                  title: "Scheduled Check-In",
                  tag: "Proactive Safety Net",
                  desc: "CareWatch AI locks in a 12, 24, or 48-hour follow-up checkpoint tailored to the natural history of your symptoms.",
                  icon: Clock,
                  example: "Automated check-in timer scheduled for tomorrow at 10:00 AM.",
                },
                {
                  num: "04",
                  title: "Trajectory Comparison",
                  tag: "Delta Analytics",
                  desc: "When check-in time arrives, report your current status. The trajectory engine compares your current score against your baseline.",
                  icon: GitCompare,
                  example: "Baseline Severity: 4/10 → Check-in Severity: 7/10 (+3 jump detected).",
                },
                {
                  num: "05",
                  title: "Reassess & Escalate",
                  tag: "Dynamic Pathway",
                  desc: "If symptoms deteriorate or new red flags appear, your care tier is automatically escalated with immediate clinical navigation instructions.",
                  icon: RefreshCw,
                  example: "Pathway Upgraded: 'See a Doctor Today' due to new dizziness indicator.",
                },
                {
                  num: "06",
                  title: "Health Passport Sync",
                  tag: "Personal EHR",
                  desc: "Key findings, medications, and allergies sync directly into your portable Health Passport for rapid sharing during in-person medical consultations.",
                  icon: FileText,
                  example: "Encrypted emergency QR ready for clinic triage desk review.",
                },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 sm:p-7 rounded-3xl bg-[#FAF8F3] border border-[#EDE8DF] hover:border-[#174E4A]/50 hover:bg-white hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-start justify-between gap-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#174E4A]/30 group-hover:text-[#174E4A] transition-colors shrink-0">
                        {step.num}
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base sm:text-lg text-[#263735]">{step.title}</h3>
                          <span className="text-[10px] font-semibold text-[#174E4A] bg-[#EFF7F1] px-2.5 py-0.5 rounded-full border border-[#DDEBE2]">
                            {step.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#627472] max-w-xl leading-relaxed">
                          {step.desc}
                        </p>
                        <div className="pt-2 text-[11px] font-medium text-[#174E4A] bg-white group-hover:bg-[#EFF7F1] p-2.5 rounded-xl border border-[#EDE8DF] transition-colors">
                          {step.example}
                        </div>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-[#EDE8DF] flex items-center justify-center text-[#174E4A] shrink-0 shadow-2xs group-hover:bg-[#174E4A] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION E — DEEP FOREST / TEAL DASHBOARD PREVIEW (Matching Reference 1 & 3 with Rich Interactive Tabs) */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] relative z-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-3 py-1 rounded-full border border-[#DDEBE2]">
              Interactive Command Center
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263735]">
              A Deeply Thoughtful Healthcare Experience
            </h2>
            <p className="text-sm sm:text-base text-[#627472]">
              Explore the purpose-built workspaces tailored for Patients, Clinicians, and Administrators.
            </p>

            {/* Role Preview Switcher Pills */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#EDE8DF] shadow-xs gap-1.5 mt-3">
              <button
                onClick={() => setPreviewRole("patient")}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  previewRole === "patient"
                    ? "bg-[#174E4A] text-white shadow-xs"
                    : "text-[#627472] hover:text-[#263735]"
                )}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Patient Portal</span>
              </button>
              <button
                onClick={() => setPreviewRole("clinician")}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  previewRole === "clinician"
                    ? "bg-[#0284C7] text-white shadow-xs"
                    : "text-[#627472] hover:text-[#263735]"
                )}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Clinician Triage Queue</span>
              </button>
              <button
                onClick={() => setPreviewRole("admin")}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  previewRole === "admin"
                    ? "bg-[#D97706] text-white shadow-xs"
                    : "text-[#627472] hover:text-[#263735]"
                )}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Admin Telemetry</span>
              </button>
            </div>
          </div>

          {/* Deep Teal / Forest Mockup Card (Reference 1 & 3 Aesthetic) */}
          <div className="rounded-[36px] border border-[#174E4A]/30 shadow-[0_25px_60px_rgba(12,41,37,0.25)] overflow-hidden bg-gradient-to-b from-[#0C2925] to-[#071917] text-white p-6 sm:p-10 relative">
            
            {/* Subtle Top Glowing Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

            {previewRole === "patient" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">PATIENT RECOVERY WORKSPACE</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">Welcome back, Sarah Jenkins</h3>
                    <p className="text-xs text-white/70">Your active care episode is in progress.</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Follow-up Check-in Due Now
                    </span>
                    <Link href="/dashboard">
                      <Button size="sm" className="bg-white text-[#174E4A] hover:bg-[#FAF8F3] text-xs font-bold rounded-xl">
                        Open Live Patient App <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Metric Cards (Reference 1 & 3 Style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Active Episode</span>
                    <div className="text-lg font-bold">Tension Headache</div>
                    <div className="text-xs text-emerald-400">Day 2 • Monitoring Window</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Severity Trajectory</span>
                    <div className="text-lg font-bold text-emerald-300">7/10 → 2/10 (-71%)</div>
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

                {/* Trajectory Bar Chart & Care Checklist */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        Symptom Severity Delta Timeline
                      </span>
                      <span className="text-white/60 text-[11px]">3 Recorded Points</span>
                    </div>
                    {/* Visual Bar Chart */}
                    <div className="h-32 w-full flex items-end justify-between gap-4 pt-4 px-2">
                      <div className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-bold text-red-400">7/10</span>
                        <div className="w-full bg-red-400/80 h-24 rounded-t-xl" />
                        <span className="text-[10px] text-white/60">Intake</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-bold text-amber-400">4/10</span>
                        <div className="w-full bg-amber-400/80 h-14 rounded-t-xl" />
                        <span className="text-[10px] text-white/60">12h Check</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400">2/10</span>
                        <div className="w-full bg-emerald-400 h-7 rounded-t-xl" />
                        <span className="text-[10px] text-emerald-400 font-bold">24h Check</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
                    <span className="text-xs font-bold text-white block">Today&apos;s Active Recovery Steps</span>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                        <span className="text-emerald-300">Hydration goal (2.0L reached)</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                        <span className="text-white/80">Digital screen rest (15m/hr)</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                        <span className="text-white/80">Final 48h check-in tomorrow</span>
                        <Clock className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewRole === "clinician" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-sky-400 uppercase">PHYSICIAN TRIAGE QUEUE</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">Dr. Aris Thorne, MD</h3>
                    <p className="text-xs text-white/70">Lead Physician • Virtual Urgent Care & Triage</p>
                  </div>
                  <Link href="/clinician">
                    <Button size="sm" className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl">
                      Open Live Clinician Portal <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Triage Queue</span>
                    <div className="text-2xl font-bold">14 Active Patients</div>
                    <div className="text-xs text-sky-300">2 Escalated Red Flags</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Avg Triage Latency</span>
                    <div className="text-2xl font-bold">1.8 Seconds</div>
                    <div className="text-xs text-emerald-300">Gemini 3.8 Flash Execution</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Evidence Basis</span>
                    <div className="text-2xl font-bold">NICE / CDC / AAFP</div>
                    <div className="text-xs text-white/70">Canonical Guidelines Grounded</div>
                  </div>
                </div>
              </div>
            )}

            {previewRole === "admin" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">SYSTEM ARCHITECTURE & GOVERNANCE</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">CareWatch AI Administrator</h3>
                    <p className="text-xs text-white/70">Telemetry stream, database health, and safety audit logs</p>
                  </div>
                  <Link href="/admin">
                    <Button size="sm" className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-xl">
                      Open Live Admin Console <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">PostgreSQL Tables</span>
                    <div className="text-2xl font-bold text-emerald-300">15/15 Active</div>
                    <div className="text-xs text-white/70">RLS Enforced</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Active Model</span>
                    <div className="text-2xl font-bold text-amber-300">Gemini 3.8 Flash</div>
                    <div className="text-xs text-white/70">Structured JSON Outputs</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Safety Guardrails</span>
                    <div className="text-2xl font-bold text-sky-300">100% Passing</div>
                    <div className="text-xs text-white/70">Zero Red-Flag Bypass</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-white/60 uppercase font-semibold">Audit Logs</span>
                    <div className="text-2xl font-bold">Encrypted</div>
                    <div className="text-xs text-white/70">Full execution traces</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION F — INTERACTIVE RECOVERY JOURNEY WALKTHROUGH */}
      <section id="recovery-journey" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF] relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-3 py-1 rounded-full border border-[#DDEBE2]">
                Clinical Demonstration Scenario
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
                Experience the 4-Stage Follow-Up in Action
              </h2>
              <p className="text-xs sm:text-sm text-[#627472]">
                Inspect an illustrative scenario from initial symptom intake through scheduled 24h follow-up and emergency escalation.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full shrink-0">
              Illustrative Hackathon Scenario (Fictional case)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Step Selection Buttons */}
            <div className="md:col-span-5 space-y-3">
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
                    "w-full p-4.5 rounded-2xl text-left border transition-all cursor-pointer",
                    activeTab === tab.id
                      ? "bg-[#174E4A] text-white border-[#174E4A] shadow-md"
                      : "bg-[#FAF8F3] text-[#263735] border-[#EDE8DF] hover:border-[#174E4A]/40 hover:bg-white"
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
            <div className="md:col-span-7">
              <Card className="border-[#EDE8DF] shadow-lg p-6 sm:p-8 bg-white min-h-[350px] flex flex-col justify-between rounded-3xl">
                {activeTab === "assess" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3.5">
                      <span className="text-xs font-bold text-[#263735]">Step 1: Symptom Intake</span>
                      <Badge variant="secondary">Intake Completed</Badge>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs">
                      <span className="text-[#627472] block font-semibold mb-1">Reported Concern:</span>
                      <p className="font-medium text-[#263735] text-sm">&quot;Persistent dull headache behind forehead for 2 days, mild light sensitivity.&quot;</p>
                    </div>
                    <div className="space-y-2 text-xs">
                      <span className="font-semibold text-[#263735]">Adaptive Questions Asked by Intake Agent:</span>
                      <div className="p-3 rounded-xl bg-[#EFF7F1] text-[#174E4A] font-medium">
                        Q: &quot;Did this headache develop suddenly like a thunderclap, or gradually?&quot; → A: &quot;Gradually over 2 days.&quot;
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "plan" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3.5">
                      <span className="text-xs font-bold text-[#263735]">Step 2: Urgency Triage & Care Plan</span>
                      <span className="text-xs font-bold text-[#174E4A] bg-[#EFF7F1] px-2.5 py-0.5 rounded border border-[#DDEBE2]">Tier: Monitor Closely</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#627472] leading-relaxed">
                      Gradual tension-type presentation with absent red flags. Safe for home monitoring with scheduled follow-up.
                    </p>
                    <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] space-y-1.5 text-xs">
                      <span className="font-bold text-[#263735]">Scheduled Safety Check:</span>
                      <p className="text-[#627472]">Automated follow-up set for <strong>24 hours</strong>. When to seek care: if sudden weakness or severe vomiting emerges.</p>
                    </div>
                  </div>
                )}

                {activeTab === "checkin" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3.5">
                      <span className="text-xs font-bold text-[#263735]">Step 3: 24-Hour Follow-Up Check-In</span>
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">Progression: Worse</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                      <span className="font-bold text-amber-900">Patient Check-in Report:</span>
                      <p className="text-amber-950 font-medium">Severity increased from <strong>4/10 to 7/10</strong>. Developed new symptom: <strong>intermittent dizziness</strong> on standing.</p>
                    </div>
                    <p className="text-xs text-[#627472]">
                      AI detects significant symptom escalation (+3 severity and new vestibular symptom) triggering automatic reassessment.
                    </p>
                  </div>
                )}

                {activeTab === "reassess" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-3.5">
                      <span className="text-xs font-bold text-[#263735]">Step 4: Reassessment & Pathway Upgrade</span>
                      <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded">Tier: See a Doctor Today</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] space-y-2 text-xs">
                      <span className="font-bold text-[#174E4A]">Updated Clinical Recommendation:</span>
                      <p className="text-[#263735] leading-relaxed">
                        Due to severity progression and new dizziness, in-person primary or urgent care review is recommended within the next 8–12 hours for neurological screening and blood pressure evaluation.
                      </p>
                      <div className="text-[11px] text-[#627472] pt-1.5 border-t border-[#DDEBE2]">
                        Citation: NICE CG150 Headache Assessment Guidance
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#EDE8DF] flex items-center justify-between text-xs">
                  <span className="text-[#627472]">Ready to try with your own symptoms?</span>
                  <Link href="/assessment/new">
                    <Button size="sm" className="bg-[#174E4A] hover:bg-[#103835] text-white rounded-xl">
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
      <section id="safety" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Privacy */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EDE8DF] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#263735]">Strict Privacy & Data Ownership</h3>
            <p className="text-xs sm:text-sm text-[#627472] leading-relaxed">
              Health concerns are deeply personal. CareWatch AI enforces PostgreSQL Row-Level Security (RLS) on all 15 database tables. You own your data: no third-party tracking, no advertising pixels, and no sharing with insurance providers.
            </p>
          </div>

          {/* Emergency Safety Protocol */}
          <div className="p-8 sm:p-10 rounded-3xl bg-red-50/70 border border-red-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold shadow-md shadow-red-600/20">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-red-950">Emergency Safety Guardrails</h3>
            <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
              CareWatch AI immediately flags red-flag symptoms (severe chest pain, sudden numbness, difficulty speaking, severe breathing distress) and displays direct emergency numbers (911/999/112). <strong>Never delay emergency medical treatment while waiting for an AI response.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H — FAQ ACCORDION */}
      <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EDE8DF] relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-3 py-1 rounded-full border border-[#DDEBE2]">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263735]">
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
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-[#627472] leading-relaxed border-t border-[#EDE8DF] pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION I — FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#174E4A] via-[#103835] to-[#0B2825] text-white relative z-10 overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#A3D9C9]" />
            <span>Continuous Health Support Loop</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Understand today. Check in tomorrow. Act when it matters.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Take the anxiety out of health concerns. Try CareWatch AI&apos;s adaptive symptom check and continuous recovery safety net now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-white text-[#174E4A] hover:bg-[#FAF8F3] shadow-xl text-sm font-bold h-13 px-8 rounded-2xl group">
                <span>Start a Free Health Check</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-sm font-semibold h-13 px-7 rounded-2xl">
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
