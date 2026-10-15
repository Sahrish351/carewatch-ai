"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import {
  HeartPulse,
  Clock,
  Sparkles,
  ArrowRight,
  GitCompare,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Check,
  Search,
  ShieldAlert,
  Activity,
  Milestone,
  FileBadge2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecoveryJourneyPage() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: "Step 1: Baseline Assessment",
      subtitle: "Intake concern & adaptive clinical rule-outs",
      badge: "Intake Recorded",
      badgeColor: "bg-[#EFF7F1] text-[#174E4A] border-[#DDEBE2]",
      patientQuote: "Persistent dull headache behind forehead for 2 days, mild light sensitivity.",
      aiAnalysis: "Gradual onset over 48 hours without high fever, neck stiffness, or sudden thunderclap onset. Tension-type pattern.",
      tier: "Monitor Closely",
      actions: ["Hydrate with 500ml water", "Rest in dark room for 30 minutes", "Limit screens"],
      nextWindow: "24-Hour Follow-Up Armed",
    },
    {
      num: 2,
      title: "Step 2: Structured Care Plan",
      subtitle: "Home management & safety checkpoints",
      badge: "Care Plan Active",
      badgeColor: "bg-sky-50 text-[#0284C7] border-sky-200",
      patientQuote: "Following home care guidance while working remotely.",
      aiAnalysis: "Monitoring for red flags: sudden escalation to 8+/10, visual aura, or unsteadiness. In-app timer scheduled.",
      tier: "Monitor Closely",
      actions: ["Take regular screen breaks", "Record pain rating every 6h", "Watch for dizziness"],
      nextWindow: "Check-in Due in 24 Hours",
    },
    {
      num: 3,
      title: "Step 3: 24-Hour Check-In",
      subtitle: "Patient reports symptom progression",
      badge: "Symptom Deterioration Flagged",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      patientQuote: "Severity increased from 4/10 to 7/10. Feeling unsteady and dizzy on standing.",
      aiAnalysis: "Delta alert: Severity jump of +3 and newly reported vestibular symptom (postural dizziness) within 24h window.",
      tier: "Reassessment Triggered",
      actions: ["Immediate clinical trajectory comparison calculated", "Trigger pathway upgrade agent"],
      nextWindow: "Immediate Action Required",
    },
    {
      num: 4,
      title: "Step 4: Reassessment & Clinical Escalation",
      subtitle: "Care tier upgraded to in-person physician review",
      badge: "Tier Upgraded: See a Doctor",
      badgeColor: "bg-red-100 text-red-800 border-red-300",
      patientQuote: "Reviewing updated care pathway and preparing for primary care visit.",
      aiAnalysis: "Escalated from Monitor to 'See a Doctor Today' per NICE CG150 guidelines. In-person neurological screening recommended within 8–12 hours.",
      tier: "See a Doctor Today",
      actions: ["Locate nearest urgent care clinic", "Export Health Passport emergency summary", "Seek emergency room if speech or vision fails"],
      nextWindow: "Follow-up After Physician Visit",
    },
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased">
      <PublicNav />

      {/* Header */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EDE8DF] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] text-xs font-bold">
            <HeartPulse className="w-3.5 h-3.5 text-[#174E4A]" />
            <span>The Continuous Care Safety Net</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#263735] leading-tight">
            How CareWatch Accompanies Your Entire Recovery
          </h1>

          <p className="text-base sm:text-lg text-[#627472] max-w-2xl mx-auto leading-relaxed">
            Illness does not stand still—symptoms evolve over hours and days. Explore how CareWatch AI tracks trajectory deltas and updates care pathways when it matters most.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-[#174E4A] hover:bg-[#103835] text-white text-xs font-bold shadow-md">
                Begin Live Assessment <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-xs font-semibold border-[#EDE8DF]">
                View Patient Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Recovery Simulator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
            Interactive Scenario Simulation
          </span>
          <h2 className="font-display text-3xl font-bold text-[#263735]">
            Walk Through an Illustrative Recovery Case
          </h2>
          <p className="text-xs text-[#627472]">
            Select each step below to inspect how CareWatch captures symptoms, verifies changes, and safely escalates.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={cn(
                "p-4 rounded-2xl text-left border transition-all cursor-pointer space-y-1",
                activeStep === s.num
                  ? "bg-[#174E4A] text-white border-[#174E4A] shadow-md"
                  : "bg-white text-[#263735] border-[#EDE8DF] hover:border-[#174E4A]/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-extrabold font-mono", activeStep === s.num ? "text-emerald-300" : "text-[#174E4A]")}>
                  STAGE 0{s.num}
                </span>
                {activeStep === s.num && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              </div>
              <div className="text-xs font-bold line-clamp-1">{s.title.split(": ")[1]}</div>
            </button>
          ))}
        </div>

        {/* Detailed Stage Card */}
        <Card className="border-[#EDE8DF] shadow-lg bg-white overflow-hidden p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE8DF] pb-6">
            <div>
              <span className="text-xs font-bold uppercase text-[#174E4A] tracking-wider font-mono">
                Stage 0{current.num} Deep Dive
              </span>
              <h3 className="font-display text-2xl font-bold text-[#263735] mt-0.5">
                {current.title}
              </h3>
              <p className="text-xs text-[#627472]">{current.subtitle}</p>
            </div>
            <div className={cn("px-3.5 py-1.5 rounded-full text-xs font-bold border shrink-0", current.badgeColor)}>
              {current.badge}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Patient Experience */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-[#627472] block">
                Patient Report & Perspective
              </span>
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs space-y-2">
                <span className="font-bold text-[#263735] block">Patient Symptom Note:</span>
                <p className="italic text-[#627472] text-sm leading-relaxed">&ldquo;{current.patientQuote}&rdquo;</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-[#174E4A]">
                  <span>Safety Status & Window</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDEBE2]">Active</span>
                </div>
                <div className="text-[#263735] font-semibold">{current.nextWindow}</div>
              </div>
            </div>

            {/* Right: AI Clinical Decision Engine */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-[#627472] block">
                CareWatch Engine Rationale
              </span>
              <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] shadow-2xs space-y-2 text-xs">
                <span className="font-bold text-[#174E4A] block">Clinical Evaluation:</span>
                <p className="text-[#263735] leading-relaxed">{current.aiAnalysis}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#263735] block">Prescribed Action Steps:</span>
                <div className="space-y-1.5">
                  {current.actions.map((act, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs text-[#263735] flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-[#627472]">
              Episode tracking remains active until symptoms resolve or care is transferred to a licensed clinician.
            </span>
            <div className="flex items-center gap-2">
              {activeStep > 1 && (
                <Button variant="outline" size="sm" onClick={() => setActiveStep(activeStep - 1)}>
                  Previous Stage
                </Button>
              )}
              {activeStep < 4 ? (
                <Button size="sm" className="bg-[#174E4A] hover:bg-[#103835] text-white" onClick={() => setActiveStep(activeStep + 1)}>
                  Next Stage <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Link href="/assessment/new">
                  <Button size="sm" className="bg-[#174E4A] hover:bg-[#103835] text-white">
                    Start Your Live Journey <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* Safety Notice */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#EDE8DF]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Disclaimer variant="inline" />
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

