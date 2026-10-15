"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import {
  Sparkles,
  Search,
  Clock,
  ShieldCheck,
  GitCompare,
  FileBadge2,
  RefreshCw,
  ArrowRight,
  BookOpen,
  Activity,
  HeartPulse,
  Lock,
  Stethoscope,
  CheckCircle2,
  Layers,
  PhoneCall,
  UserCheck,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased">
      <PublicNav />

      {/* Header */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EDE8DF] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#174E4A]" />
            <span>Comprehensive Clinical Care Toolkit</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#263735] leading-tight">
            Built for Clinical Precision & Patient Follow-Through
          </h1>

          <p className="text-base sm:text-lg text-[#627472] max-w-2xl mx-auto leading-relaxed">
            CareWatch AI is more than a conversational symptom checker. Every feature is engineered to provide continuous recovery tracking, emergency detection, and clinical guidance.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-[#174E4A] hover:bg-[#103835] text-white text-xs font-bold shadow-md">
                Try Live Assessment <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/recovery-journey">
              <Button variant="outline" size="lg" className="text-xs font-semibold border-[#EDE8DF]">
                Explore Recovery Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Core Feature Showcases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Feature 1 & 2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-center justify-center text-[#174E4A]">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Dynamic Triage
              </span>
              <h2 className="font-display text-2xl font-bold text-[#263735]">
                Adaptive Emergency Rule-Out Intake
              </h2>
              <p className="text-xs text-[#627472] leading-relaxed">
                Rather than forcing users through rigid 40-question questionnaires, the intake agent analyzes free-form natural language and generates targeted clinical rule-out questions to screen for red flags (sudden thunderclap onset, focal neurological deficits, cardiac indicators).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs space-y-2">
              <div className="font-semibold text-[#263735]">Example Intake Dialogue:</div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EDE8DF] text-[#627472]">
                &quot;Did the headache start with a thunderclap sensation or build up gradually?&quot;
              </div>
              <div className="p-2.5 rounded-xl bg-[#EFF7F1] border border-[#DDEBE2] text-[#174E4A] font-medium">
                Patient: &quot;Gradually over 2 days after screen work.&quot;
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-center justify-center text-[#174E4A]">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Safety Net
              </span>
              <h2 className="font-display text-2xl font-bold text-[#263735]">
                Automated 12h, 24h & 48h Follow-Up Windows
              </h2>
              <p className="text-xs text-[#627472] leading-relaxed">
                Most platforms abandon patients once an initial answer is generated. CareWatch locks in scheduled check-ins based on the natural history of your symptoms, sending in-app alerts and notifications to ensure changes are actively tracked.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] text-xs space-y-2">
              <div className="flex items-center justify-between text-[#174E4A] font-bold">
                <span>Active Safety Checkpoint</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDEBE2]">Scheduled</span>
              </div>
              <p className="text-[#263735] text-[11px] leading-relaxed">
                Persistent Headache Episode: 24h check-in due tomorrow at 10:00 AM. In-app reminder armed.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 & 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-center justify-center text-[#174E4A]">
                <GitCompare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Delta Analytics
              </span>
              <h2 className="font-display text-2xl font-bold text-[#263735]">
                Baseline vs Check-In Trajectory Engine
              </h2>
              <p className="text-xs text-[#627472] leading-relaxed">
                When you check in, the system compares your current severity rating, functional status, and secondary symptoms directly against your intake baseline. It flags improvements, persistence, or dangerous deterioration in real time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
                <span className="text-[10px] uppercase font-bold text-[#627472] block">Baseline</span>
                <span className="text-sm font-bold text-[#263735] block mt-0.5">Severity 4/10</span>
                <span className="text-[10px] text-[#174E4A]">Monitor Closely</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-900 block">24h Follow-up</span>
                <span className="text-sm font-bold text-amber-950 block mt-0.5">Severity 7/10 (+3)</span>
                <span className="text-[10px] text-red-700 font-bold">Escalated to Doctor</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-center justify-center text-[#174E4A]">
                <FileBadge2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Emergency Readiness
              </span>
              <h2 className="font-display text-2xl font-bold text-[#263735]">
                Personal Health Passport
              </h2>
              <p className="text-xs text-[#627472] leading-relaxed">
                Maintain an encrypted digital summary of your current medications, known drug allergies, active health conditions, and emergency directives. Export or present directly to paramedics or clinic receptionists during in-person visits.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-[#263735]">
                <span>Health Passport Preview</span>
                <span className="text-emerald-700 font-semibold text-[10px]">Encrypted & Ready</span>
              </div>
              <div className="text-[11px] text-[#627472]">• 2 Active Prescriptions (Amoxicillin, Lisinopril)</div>
              <div className="text-[11px] text-[#627472]">• 1 Confirmed Drug Allergy (Penicillin - mild rash)</div>
            </div>
          </div>
        </div>

        {/* Feature 5 & 6 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Feature 5 */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-center justify-center text-[#174E4A]">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Evidence-Grounded
              </span>
              <h2 className="font-display text-2xl font-bold text-[#263735]">
                Canonical Clinical Evidence Sources
              </h2>
              <p className="text-xs text-[#627472] leading-relaxed">
                No ungrounded generative hallucinations. Every clinical assessment cites canonical public guidelines from NICE (National Institute for Health and Care Excellence), CDC, AAFP, and WHO with verified direct URLs and clinical evidence rationale.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] text-xs text-[#174E4A] flex items-center justify-between">
              <span className="font-semibold">NICE CG150: Headaches in over 12s</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2] flex items-center justify-center text-[#174E4A]">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174E4A] bg-[#EFF7F1] px-2.5 py-1 rounded-full border border-[#DDEBE2]">
                Data Sovereignty
              </span>
              <h2 className="font-display text-2xl font-bold text-[#263735]">
                PostgreSQL Row-Level Security (RLS)
              </h2>
              <p className="text-xs text-[#627472] leading-relaxed">
                Your medical data is protected across 15 relational tables with strict database-level policies. No third-party ad tracking, no data reselling, and no unencrypted external transfers.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] text-xs text-[#263735] flex items-center justify-between">
              <span className="font-semibold">15 PostgreSQL Tables with User Isolation</span>
              <ShieldCheck className="w-4 h-4 text-[#174E4A] shrink-0" />
            </div>
          </div>
        </div>

      </section>

      {/* Safety Notice & CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#EDE8DF]">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <Disclaimer variant="card" />

          <div className="pt-4">
            <Link href="/assessment/new">
              <Button size="lg" className="bg-[#174E4A] hover:bg-[#103835] text-white text-sm font-bold shadow-md h-12 px-8">
                Start Your Health Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

