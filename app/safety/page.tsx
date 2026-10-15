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
} from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#173737]">
      <PublicNav />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="urgent">Clinical Safety & Ethics</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#173737]">
            Safety, Limitations & Clinical Governance
          </h1>
          <p className="text-base sm:text-lg text-[#657777] max-w-2xl mx-auto leading-relaxed">
            Our guiding philosophy: Humility over hype. We prioritize patient safety and appropriate clinical escalation above all else.
          </p>
        </div>

        {/* Prominent Safety Banner */}
        <div className="p-6 rounded-3xl bg-[#FDF0ED] border border-[#E0674B]/30 space-y-3">
          <div className="flex items-center gap-2.5 text-[#AB371C]">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-display text-lg font-bold">Important Emergency Statement</h2>
          </div>
          <p className="text-sm text-[#AB371C] leading-relaxed">
            CareWatch AI is <strong>NOT an emergency response system</strong> and does not provide formal medical diagnoses. If you are experiencing sudden severe chest pain, shortness of breath, sudden facial drooping or weakness, uncontrolled bleeding, or loss of consciousness, call your local emergency service (e.g. 911, 999, 112) immediately.
          </p>
        </div>

        {/* 4 Pillars of Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <h3 className="font-display text-lg font-bold text-[#173737]">1. We Do Not Diagnose</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              CareWatch assesses clinical urgency and navigation tiers (Self-Care, Monitor, See-a-Doctor, Urgent). We intentionally avoid labeling a specific pathology (e.g. &ldquo;You have Meningitis&rdquo;) because accurate differential diagnosis requires physical examination and diagnostic testing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <h3 className="font-display text-lg font-bold text-[#173737]">2. We Do Not Prescribe</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              CareWatch never recommends prescription dosages or medications. We provide safe, supportive comfort measures (hydration, resting in dark spaces, posture management) and advise on when to visit licensed clinicians.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <h3 className="font-display text-lg font-bold text-[#173737]">3. Transparent Uncertainty</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              Every assessment explicitly lists what is uncertain. For instance, we highlight that blood pressure, core temperature, and neurological palpation cannot be performed through a computer screen.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3">
            <h3 className="font-display text-lg font-bold text-[#173737]">4. The Follow-up Safety Net</h3>
            <p className="text-xs text-[#657777] leading-relaxed">
              A symptom checker that provides one answer and ceases communication exposes the user to risk if the condition silently deteriorates. Our automated check-in guarantees that symptom evolution is caught early.
            </p>
          </div>
        </div>

        {/* Clinical Evidence Sources */}
        <div id="evidence" className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#173737]">
            Peer-Reviewed Clinical Sources
          </h2>
          <p className="text-xs text-[#657777] leading-relaxed">
            CareWatch AI grounds its assessment criteria in established clinical standards:
          </p>
          <ul className="space-y-3 text-xs text-[#173737]">
            <li className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF]">
              <span><strong>NICE Clinical Guideline 150:</strong> Headaches in over 12s diagnosis and triage.</span>
              <ExternalLink className="w-4 h-4 text-[#2A6F6F]" />
            </li>
            <li className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF]">
              <span><strong>AAFP Guidelines:</strong> Evaluation of acute dizziness, vertigo, and red flags.</span>
              <ExternalLink className="w-4 h-4 text-[#2A6F6F]" />
            </li>
            <li className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF]">
              <span><strong>CDC Respiratory Care:</strong> Upper respiratory tract viral progression timelines.</span>
              <ExternalLink className="w-4 h-4 text-[#2A6F6F]" />
            </li>
            <li className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE8DF]">
              <span><strong>WHO Acute Abdomen Practice:</strong> Distinguishing benign from surgical abdominal pain.</span>
              <ExternalLink className="w-4 h-4 text-[#2A6F6F]" />
            </li>
          </ul>
        </div>

        <Disclaimer />
      </main>

      <PublicFooter />
    </div>
  );
}

