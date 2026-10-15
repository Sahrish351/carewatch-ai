"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  HelpCircle,
  Activity,
  Layers,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"assess" | "plan" | "checkin" | "reassess">("assess");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737]">
      <PublicNav />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Messaging */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] border border-[#8FB996]/30 text-[#24542E] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#2A6F6F]" />
                <span>Next-Generation Healthcare Navigation</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#173737] leading-[1.15]">
                Your symptoms don&apos;t stop after one answer.{" "}
                <span className="text-[#2A6F6F] underline decoration-[#8FB996]/40 underline-offset-8">
                  Neither should your care.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#657777] max-w-2xl leading-relaxed font-normal">
                CareWatch AI helps you understand a health concern, take an evidence-informed next step, and automatically checks back when it matters to see if your condition improved or changed.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link href="/assessment/new">
                  <Button size="lg" className="w-full sm:w-auto text-base shadow-md">
                    Start a Health Check <ArrowRight className="w-5 h-5 ml-1.5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Core Safety Micro-Badge */}
              <div className="pt-2">
                <Disclaimer variant="inline" />
              </div>
            </div>

            {/* Right Column: Live Interactive Product Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-[#EDE8DF] bg-white p-6 shadow-xl shadow-[#2A6F6F]/5">
                <div className="flex items-center justify-between border-b border-[#F4EFEB] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-[#173737] uppercase tracking-wider">
                      CareWatch Active Journey
                    </span>
                  </div>
                  <Badge variant="secondary">Step 3: Follow-Up Loop</Badge>
                </div>

                {/* Scenario Preview Card */}
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF]">
                    <div className="text-xs text-[#657777] mb-1 font-medium">Initial Concern (Day 1)</div>
                    <div className="text-sm font-semibold text-[#173737]">
                      &quot;Headache persisting for 3 days&quot;
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[#657777]">Initial Severity: 4/10</span>
                      <span className="font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-2 py-0.5 rounded">
                        Tier: Monitor Closely
                      </span>
                    </div>
                  </div>

                  {/* The Follow-Up Check-in */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        Check-in at 24 Hours
                      </span>
                      <span className="text-[11px] bg-amber-200/60 text-amber-900 font-semibold px-2 py-0.5 rounded">
                        Change Detected
                      </span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      Patient reported severity increase to <strong className="text-amber-950">7/10</strong> with newly developed <strong>dizziness</strong>.
                    </p>
                  </div>

                  {/* Reassessment Transition */}
                  <div className="p-4 rounded-xl bg-[#F0F7F7] border border-[#BDDEDC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2A6F6F] flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-[#2A6F6F]" />
                        Reassessment Triggered
                      </span>
                      <span className="text-[11px] font-semibold text-[#9A5B13] bg-[#FFF8EE] border border-[#F2C99C] px-2 py-0.5 rounded">
                        Escalated: See a Doctor
                      </span>
                    </div>
                    <p className="text-xs text-[#173737]">
                      Care pathway updated to recommend in-person primary or urgent care review today due to dizziness onset.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F4EFEB] flex items-center justify-between text-xs text-[#657777]">
                  <span>Follow-up continuity safety net</span>
                  <Link href="/assessment/new" className="text-[#2A6F6F] font-semibold hover:underline flex items-center gap-1">
                    Try Live Assessment <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION: SICK OF 1-TIME CHATBOTS */}
      <section className="py-20 bg-white border-y border-[#EDE8DF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Badge variant="default">The Healthcare Void</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
              Why One-Time Symptom Checkers Fail Patients
            </h2>
            <p className="text-[#657777] text-base sm:text-lg">
              Most health apps answer your question once and disappear. But health conditions are dynamic. What was safe on Monday can become dangerous by Wednesday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Broken Way */}
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Traditional Symptom Checkers
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-200 text-neutral-700 font-semibold">
                  Static & Fragile
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-800">
                Concern → Generic Answer → Dead End
              </h3>
              <p className="text-sm text-[#657777] leading-relaxed">
                You type a symptom. An algorithm returns a terrifying list of rare diseases or vague advice. There is no check-in, no record of progression, and no safety net when symptoms worsen.
              </p>
              <div className="space-y-3 pt-2">
                {["No ongoing tracking of recovery", "Zero follow-up or scheduled check-in", "Fails to notice subtle deterioration", "Leaves you googling in isolation"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-600">
                    <span className="w-4 h-4 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center font-bold text-[10px]">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The CareWatch Way */}
            <div className="p-8 rounded-3xl bg-[#F0F7F7] border border-[#BDDEDC] space-y-6 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
                  CareWatch AI Continuous Pathway
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#2A6F6F] text-white font-semibold">
                  Adaptive Safety Net
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#173737]">
                Assess → Plan → Check In → Compare → Reassess
              </h3>
              <p className="text-sm text-[#173737] leading-relaxed">
                CareWatch AI turns a one-off query into an ongoing health journey. It asks targeted questions, sets a personalized follow-up, detects changes, and escalates when safety dictates.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Adaptive questioning without diagnostic overclaims",
                  "Personalized scheduled check-in window (12h, 24h, 48h)",
                  "Automatic comparison against baseline severity",
                  "Seamless escalation to healthcare professionals if worsening",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#24542E] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#2A6F6F] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AGENTIC AI ARCHITECTURE (Section 14) */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="default">Multi-Agent Intelligence</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
            8 Specialized Clinical Agents Working in Concert
          </h2>
          <p className="text-[#657777] text-base sm:text-lg">
            Rather than relying on an unconstrained generic chat, CareWatch decomposes healthcare navigation into discrete, audited agents bounded by clinical safety rules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "1",
              title: "Intake Agent",
              desc: "Parses user narrative, extracts duration, severity, context, and flags acute emergency triggers.",
              icon: Search,
            },
            {
              id: "2",
              title: "Question Agent",
              desc: "Generates one targeted adaptive question at a time to resolve missing clinical uncertainties without overwhelming.",
              icon: Sparkles,
            },
            {
              id: "3",
              title: "Triage Agent",
              desc: "Assigns safe urgency tier (Self-care, Monitor, See-a-Doctor, Urgent) using conservative clinical thresholds.",
              icon: Activity,
            },
            {
              id: "4",
              title: "Evidence Agent",
              desc: "Retrieves peer-reviewed guidance from curated authorities (NICE, CDC, AAFP, WHO) without hallucinations.",
              icon: Compass,
            },
            {
              id: "5",
              title: "Action Plan Agent",
              desc: "Creates practical next steps, monitoring guidelines, and warning signs in clean, scannable language.",
              icon: FileCheck2,
            },
            {
              id: "6",
              title: "Explanation Agent",
              desc: "Articulates why the tier was chosen, what remains clinically uncertain, and what changes would require escalation.",
              icon: HelpCircle,
            },
            {
              id: "7",
              title: "Follow-Up Agent",
              desc: "Conducts scheduled check-ins, evaluates severity changes, and measures progress against baseline.",
              icon: Clock,
            },
            {
              id: "8",
              title: "Reassessment Agent",
              desc: "Triggered on worsening or new symptoms; re-evaluates risk and updates care pathways immediately.",
              icon: RefreshCw,
            },
          ].map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="p-6 rounded-2xl bg-white border border-[#EDE8DF] hover:border-[#2A6F6F]/40 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] flex items-center justify-center text-[#2A6F6F] mb-4 group-hover:bg-[#2A6F6F] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#657777] uppercase tracking-wider mb-1">
                  Agent 0{agent.id}
                </div>
                <h3 className="font-display text-lg font-bold text-[#173737] mb-2">
                  {agent.title}
                </h3>
                <p className="text-xs text-[#657777] leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. THE CORE FOLLOW-UP LOOP & INTERACTIVE WORKFLOW (Section 13 & 34) */}
      <section id="how-it-works" className="py-20 bg-white border-y border-[#EDE8DF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Badge variant="secondary">The Primary Differentiator</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
              Continuous Health Recovery Journey
            </h2>
            <p className="text-[#657777] text-base sm:text-lg">
              Explore how CareWatch AI accompanies you from initial concern to recovery or clinical escalation.
            </p>
          </div>

          {/* Workflow Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: "assess", label: "1. Intake & Adaptive Questions" },
              { id: "plan", label: "2. Urgency Triage & Action Plan" },
              { id: "checkin", label: "3. Scheduled 24h Check-in" },
              { id: "reassess", label: "4. Reassessment & Escalation" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#2A6F6F] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-[#173737] border border-[#EDE8DF] hover:bg-[#EBF3ED]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-[#FAF8F5] border border-[#EDE8DF]">
            {activeTab === "assess" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3 text-[#2A6F6F]">
                  <Search className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold text-[#173737]">
                    Intake & Adaptive Questioning
                  </h3>
                </div>
                <p className="text-sm text-[#657777] leading-relaxed">
                  Instead of filling out an exhaustive 40-question questionnaire, CareWatch parses your natural narrative. The Question Agent identifies critical clinical gaps and asks one targeted question at a time (usually 4 to 5 total).
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#EDE8DF] space-y-2 text-xs">
                  <div className="font-semibold text-[#173737]">Sample Clinical Exchange:</div>
                  <div className="text-[#2A6F6F]">&ldquo;I&apos;ve had a headache for three days and today I also feel dizzy.&rdquo;</div>
                  <div className="text-[#657777]">→ AI: &ldquo;Have you noticed any fever, neck stiffness, or vision changes?&rdquo;</div>
                </div>
              </div>
            )}

            {activeTab === "plan" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3 text-[#2A6F6F]">
                  <FileCheck2 className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold text-[#173737]">
                    Urgency Triage & Next-Step Plan
                  </h3>
                </div>
                <p className="text-sm text-[#657777] leading-relaxed">
                  The Triage Agent assigns a safety tier (Self-Care, Monitor, See-a-Doctor, or Urgent). You receive concise, scannable immediate steps, monitoring signs, and a scheduled follow-up window.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-[#EDE8DF]">
                    <span className="font-semibold block text-[#173737]">What to Do Now</span>
                    <span className="text-[#657777]">Hydration, dark room rest, avoid screen strain.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#EDE8DF]">
                    <span className="font-semibold block text-[#173737]">What to Monitor</span>
                    <span className="text-[#657777]">Check severity twice daily on 1-10 scale.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#EDE8DF]">
                    <span className="font-semibold block text-[#173737]">When to Seek Care</span>
                    <span className="text-[#657777]">Sudden spike to &gt;7/10 or speech difficulty.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "checkin" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3 text-amber-700">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold text-[#173737]">
                    Scheduled 24-Hour Check-in
                  </h3>
                </div>
                <p className="text-sm text-[#657777] leading-relaxed">
                  CareWatch sends an in-app reminder when your check-in is due. In under 30 seconds, report: &ldquo;Better&rdquo;, &ldquo;About the same&rdquo;, &ldquo;Worse&rdquo;, or &ldquo;New symptoms&rdquo;, along with your updated 1-10 severity score.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#EDE8DF] flex items-center justify-around text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-medium">Better</span>
                  <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 font-medium">Same</span>
                  <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 font-bold border border-amber-300">Worse (+3)</span>
                  <span className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 font-medium">New Symptoms</span>
                </div>
              </div>
            )}

            {activeTab === "reassess" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3 text-[#2A6F6F]">
                  <RefreshCw className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold text-[#173737]">
                    Automated Reassessment & Escalation
                  </h3>
                </div>
                <p className="text-sm text-[#657777] leading-relaxed">
                  If you report worsening pain or new symptoms like dizziness, the Reassessment Agent triggers instantly. It calculates delta changes from baseline and automatically escalates your care pathway to prevent home delays.
                </p>
                <div className="p-4 rounded-xl bg-[#FFF8EE] border border-[#F2C99C] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#9A5B13]">Pathway Escalated</span>
                    <p className="text-[#657777]">Severity increased 4/10 → 7/10 with dizziness</p>
                  </div>
                  <span className="px-3 py-1 bg-[#C4751A] text-white font-semibold rounded-lg">
                    See Doctor Today
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. SAFETY AND ETHICAL TRANSPARENCY (Section 48) */}
      <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="urgent">Clinical Safety Principles</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173737]">
              Built for Safety, Humility, and Clinical Navigation
            </h2>
            <p className="text-base text-[#657777] leading-relaxed">
              CareWatch AI is deliberately designed to avoid medical overreach. It never claims to diagnose diseases or prescribe treatment. Instead, it helps individuals recognize warning flags and make informed decisions on when to consult doctors.
            </p>
            <div className="space-y-3">
              {[
                { title: "No Medical Diagnoses", desc: "We guide next steps and monitor symptoms; we do not label diseases." },
                { title: "Zero Medication Prescriptions", desc: "Pharmacological management requires licensed clinical oversight." },
                { title: "Explicit Uncertainty Bounds", desc: "Every assessment transparently reports what is clinically unknown." },
                { title: "Immediate Emergency Escalation", desc: "Overt red flags are routed to emergency services without delay." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EDE8DF]">
                  <CheckCircle2 className="w-5 h-5 text-[#2A6F6F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#173737] block">{item.title}</span>
                    <span className="text-xs text-[#657777]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-6 shadow-sm">
              <div className="flex items-center gap-3 text-[#2A6F6F]">
                <Compass className="w-6 h-6" />
                <h3 className="font-display text-xl font-bold text-[#173737]">
                  Curated Evidence Knowledge Base
                </h3>
              </div>
              <p className="text-xs text-[#657777] leading-relaxed">
                CareWatch recommendations are grounded in verified guidelines from recognized clinical health organizations. No unreferenced hallucinated sources.
              </p>

              <div className="space-y-3">
                {[
                  { org: "NICE Clinical Guidelines", topic: "Headache Assessment & Red Flags (CG150)" },
                  { org: "American Academy of Family Physicians", topic: "Acute Dizziness & Vertigo Triage Protocol" },
                  { org: "Centers for Disease Control and Prevention", topic: "Viral Respiratory Infection Monitoring" },
                  { org: "World Health Organization", topic: "Abdominal Pain Triage Criteria" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF] text-xs">
                    <div>
                      <span className="font-semibold text-[#173737] block">{item.org}</span>
                      <span className="text-[#657777]">{item.topic}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#2A6F6F]" />
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/safety">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Read Our Full Safety & Ethics Policy <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-[#EDE8DF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="default">Frequently Asked Questions</Badge>
            <h2 className="font-display text-3xl font-bold text-[#173737]">
              Common Questions About CareWatch AI
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is CareWatch AI a replacement for a doctor?",
                a: "No. CareWatch AI is a supportive triage and navigation assistant. It helps you understand the urgency of your concern, provides evidence-informed comfort and monitoring steps, and checks back to ensure you don't deteriorate. It does not replace medical doctors.",
              },
              {
                q: "What makes CareWatch different from ChatGPT or WebMD?",
                a: "Standard LLMs and symptom checkers give you a single response and end the conversation. CareWatch creates an ongoing health journey with scheduled follow-ups, compares your condition against baseline severity, and triggers reassessments if your situation changes.",
              },
              {
                q: "Can I use CareWatch in languages other than English?",
                a: "Yes! CareWatch AI supports both English and Roman Urdu, allowing diverse communities to describe symptoms and receive culturally accessible care navigation.",
              },
              {
                q: "What happens during a check-in?",
                a: "When your follow-up is due, you receive an in-app prompt. You indicate whether you feel better, same, worse, or have new symptoms, along with a 1-10 severity rating. If worsening is detected, our Reassessment Agent immediately updates your guidance.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-2">
                <h3 className="font-display text-lg font-bold text-[#173737]">{faq.q}</h3>
                <p className="text-sm text-[#657777] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-[#2A6F6F] p-8 sm:p-14 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm">
            <HeartPulse className="w-4 h-4 text-[#8FB996]" />
            <span>Start Your Care Journey Today</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
            Understand today. Check in tomorrow. Act when it matters.
          </h2>

          <p className="text-white/80 max-w-xl mx-auto text-base sm:text-lg">
            Experience how continuous follow-up and safe agentic triage change health navigation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-white text-[#2A6F6F] hover:bg-neutral-100 shadow-md">
                Start a Health Check <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Explore Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
