"use client";

import React from "react";
import Link from "next/link";
import { PublicNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import {
  ShieldAlert,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  FileText,
  ExternalLink,
  Lock,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#263735] selection:bg-[#DDEBE2] antialiased">
      <PublicNav />

      <main className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Clinical Safety & Ethics Governance</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#263735] leading-tight">
            Safety, Limitations & Clinical Governance
          </h1>
          <p className="text-base sm:text-lg text-[#627472] max-w-2xl mx-auto leading-relaxed">
            Our guiding philosophy: Humility over hype. We prioritize patient safety and appropriate clinical escalation above all else.
          </p>
        </div>

        {/* Prominent Safety Banner */}
        <div className="p-6 rounded-3xl bg-red-50 border border-red-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-red-900 font-bold">
            <PhoneCall className="w-5 h-5 text-red-600" />
            <h2 className="font-display text-lg">Important Emergency Statement</h2>
          </div>
          <p className="text-xs sm:text-sm text-red-950 leading-relaxed">
            CareWatch AI is <strong>NOT an emergency response system</strong> and does not provide formal medical diagnoses. If you are experiencing sudden severe chest pain, shortness of breath, sudden facial drooping or weakness, uncontrolled bleeding, or loss of consciousness, call your local emergency service (e.g. 911, 999, 112) immediately.
          </p>
        </div>

        {/* 4 Pillars of Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-lg font-bold text-[#263735]">1. We Do Not Diagnose</h3>
            <p className="text-xs text-[#627472] leading-relaxed">
              CareWatch assesses clinical urgency and navigation tiers (Self-Care, Monitor, See-a-Doctor, Urgent). We intentionally avoid labeling a specific pathology (e.g. &ldquo;You have Meningitis&rdquo;) because accurate differential diagnosis requires physical examination and diagnostic testing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-lg font-bold text-[#263735]">2. We Do Not Prescribe</h3>
            <p className="text-xs text-[#627472] leading-relaxed">
              CareWatch never recommends prescription dosages or medications. We provide safe, supportive comfort measures (hydration, resting in dark spaces, posture management) and advise on when to visit licensed clinicians.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-lg font-bold text-[#263735]">3. Grounded in Evidence</h3>
            <p className="text-xs text-[#627472] leading-relaxed">
              All triage rules, escalation criteria, and next-step recommendations are grounded in established clinical guidelines from NICE (UK), CDC (US), AAFP, and the WHO.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-lg font-bold text-[#263735]">4. Privacy & Row-Level Security</h3>
            <p className="text-xs text-[#627472] leading-relaxed">
              Your data is protected by Supabase Row-Level Security (RLS). Only your authenticated session can access your health episode records. We never monetize or sell personal health logs.
            </p>
          </div>
        </div>

        {/* Evidence Sources */}
        <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-4 shadow-xs">
          <h2 className="font-display text-xl font-bold text-[#263735]">Curated Clinical Evidence Frameworks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
              <span className="font-bold text-[#263735] block">NICE CG150 Guidelines</span>
              <span className="text-[#627472]">Headaches in over 12s diagnosis & triage</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
              <span className="font-bold text-[#263735] block">CDC Respiratory Virus Framework</span>
              <span className="text-[#627472]">Symptom progression & isolation criteria</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
              <span className="font-bold text-[#263735] block">AAFP Red Flag Screening</span>
              <span className="text-[#627472]">Acute neurological & cardiac emergency rules</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
              <span className="font-bold text-[#263735] block">WHO Primary Care Protocol</span>
              <span className="text-[#627472]">Community triage & safe escalation pathways</span>
            </div>
          </div>
        </div>

        {/* Full Disclaimer */}
        <div className="pt-4">
          <Disclaimer variant="card" />
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
