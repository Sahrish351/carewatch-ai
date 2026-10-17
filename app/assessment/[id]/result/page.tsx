"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import { evidenceAgent } from "@/lib/ai/agents/evidence-agent";
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Calendar,
  Share2,
} from "lucide-react";
import { Suspense } from "react";
import type { RiskAssessment, ActionPlan, Assessment, EvidenceSource, FollowUp } from "@/types/database";

function AssessmentResultContent() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params?.id as string;

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [risk, setRisk] = useState<RiskAssessment | null>(null);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [evidenceList, setEvidenceList] = useState<EvidenceSource[]>([]);
  const [followUp, setFollowUp] = useState<FollowUp | null>(null);

  // Risk Reveal visual transition state: "revealing" -> "revealed"
  const [revealState, setRevealState] = useState<"revealing" | "revealed">("revealing");

  useEffect(() => {
    if (!assessmentId) return;

    const loadData = async () => {
      let a = healthStore.getAssessmentById(assessmentId);
      let r = healthStore.getRiskAssessment(assessmentId);
      let p = healthStore.getActionPlan(assessmentId);
      let fu = healthStore.getFollowUps().find((f) => f.assessment_id === assessmentId);
      let symptoms = healthStore.getSymptoms(assessmentId);

      if (!a || !r || !p) {
        try {
          const res = await fetch(`/api/assessment/${assessmentId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.assessment) {
              a = data.assessment;
              r = data.riskAssessment || null;
              p = data.actionPlan || null;
              fu = data.followUp || null;
              symptoms = data.symptoms || [];

              // Sync into client store
              healthStore.syncFromServer({
                assessments: [a!],
                riskAssessments: r ? [r] : [],
                actionPlans: p ? [p] : [],
                followUps: fu ? [fu] : [],
              });
            }
          }
        } catch {
          // fallback
        }
      }

      if (!a) {
        router.push("/dashboard");
        return;
      }

      setAssessment(a);
      setRisk(r || null);
      setActionPlan(p || null);
      setFollowUp(fu || null);

      evidenceAgent({
        primaryConcern: a.primary_concern,
        symptoms,
        tier: r?.tier || "monitor",
      }).then((ev) => setEvidenceList(ev));

      const timer = setTimeout(() => {
        setRevealState("revealed");
      }, 1000);

      return () => clearTimeout(timer);
    };

    loadData();
  }, [assessmentId, router]);

  if (!assessment || !risk || !actionPlan) {
    return (
      <AppShell>
        <div className="py-24 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#657777]">Loading clinical result...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* RISK REVEAL HEADER SECTION */}
        <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] shadow-md transition-all duration-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EDE8DF]">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#657777] mb-1">
                {revealState === "revealing" ? "Assessment Analysis Complete" : "Your Recommended Next Step"}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#173737]">
                {assessment.title}
              </h1>
            </div>

            {/* Urgency Tier Badge with smooth reveal */}
            <div className={`transition-all duration-700 ${revealState === "revealing" ? "opacity-40 scale-95" : "opacity-100 scale-100"}`}>
              <RiskBadge tier={risk.tier} size="lg" />
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F] block mb-1">
                Clinical Urgency Summary
              </span>
              <p className="text-sm text-[#173737] font-medium leading-relaxed">
                {risk.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#657777]">
              <span>Primary Recommendation: <strong>{risk.recommended_next_step}</strong></span>
              <div className="flex items-center gap-2">
                <span className="bg-[#EBF3ED] text-[#24542E] px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#2A6F6F]" /> Gemini 3.8 Flash
                </span>
                <span className="bg-[#F0F7F7] text-[#2A6F6F] px-3 py-1 rounded-full font-medium">
                  Follow-up interval: {risk.follow_up_hours} hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SCHEDULED FOLLOW-UP CALLOUT (CORE DIFFERENTIATOR) */}
        {followUp && (
          <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-900 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-amber-800" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-amber-950">
                    Follow-Up Loop Activated
                  </h3>
                  <Badge variant="warning">Scheduled</Badge>
                </div>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  CareWatch has scheduled a check-in for this concern. You will receive an in-app prompt in {risk.follow_up_hours} hours to measure whether your symptoms improved or worsened.
                </p>
              </div>
            </div>

            <Link href="/follow-ups">
              <Button size="sm" className="bg-amber-800 hover:bg-amber-900 text-white shrink-0">
                View Check-in Details
              </Button>
            </Link>
          </div>
        )}

        {/* EVIDENCE-INFORMED ACTION PLAN (Sections 27 & 28) */}
        <div className="p-8 rounded-3xl bg-white border border-[#EDE8DF] space-y-8 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2A6F6F] bg-[#F0F7F7] px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Pathway</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#173737]">
              Evidence-Informed Action Plan
            </h2>
            <p className="text-xs text-[#657777] mt-1">
              {actionPlan.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. What to do now */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-3">
              <h3 className="font-display text-base font-bold text-[#173737] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#2A6F6F] text-white text-xs flex items-center justify-center">1</span>
                What to Do Now
              </h3>
              <ul className="space-y-2 text-xs text-[#173737] leading-relaxed">
                {actionPlan.immediate_steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6F6F] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. What to monitor */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-3">
              <h3 className="font-display text-base font-bold text-[#173737] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#2A6F6F] text-white text-xs flex items-center justify-center">2</span>
                What to Monitor
              </h3>
              <ul className="space-y-2 text-xs text-[#173737] leading-relaxed">
                {actionPlan.monitoring_guidance.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8FB996] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. When to seek emergency care */}
            <div className="p-5 rounded-2xl bg-[#FDF0ED] border border-[#E0674B]/30 space-y-3">
              <h3 className="font-display text-base font-bold text-[#AB371C] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#E0674B] text-white text-xs flex items-center justify-center">3</span>
                When to Seek Help
              </h3>
              <ul className="space-y-2 text-xs text-[#AB371C] leading-relaxed font-medium">
                {actionPlan.when_to_seek_care.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#E0674B] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* EXPLAINABILITY FACTORS (Section 25) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Why this recommendation */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-base font-bold text-[#173737]">
              Why this recommendation?
            </h3>
            <p className="text-[11px] text-[#657777]">Observable factors provided by you:</p>
            <ul className="space-y-2 text-xs text-[#173737]">
              {risk.key_factors.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A6F6F] shrink-0 mt-1.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What is uncertain */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-base font-bold text-[#173737]">
              What is uncertain?
            </h3>
            <p className="text-[11px] text-[#657777]">Clinical remote limits:</p>
            <ul className="space-y-2 text-xs text-[#173737]">
              {risk.uncertainties.map((u, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What could change this */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] space-y-3 shadow-xs">
            <h3 className="font-display text-base font-bold text-[#173737]">
              What could change this?
            </h3>
            <p className="text-[11px] text-[#657777]">Triggers for immediate reassessment:</p>
            <ul className="space-y-2 text-xs text-[#173737]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0674B] shrink-0 mt-1.5" />
                <span>Severity score increasing by 2 or more points.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0674B] shrink-0 mt-1.5" />
                <span>Emergence of dizziness, stiff neck, or fever.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0674B] shrink-0 mt-1.5" />
                <span>Failure to improve after the {risk.follow_up_hours}h check-in window.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* EVIDENCE AND SOURCES (Section 26 & 67) */}
        <div className="p-6 rounded-3xl bg-white border border-[#EDE8DF] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#173737]">
              Curated Evidence & Clinical References
            </h3>
            <Badge variant="secondary">Verified Guidelines</Badge>
          </div>
          <p className="text-xs text-[#657777]">
            CareWatch recommendations reference published peer-reviewed healthcare standards:
          </p>

          <div className="space-y-3">
            {evidenceList.map((source) => (
              <div
                key={source.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-[#173737]">{source.title}</div>
                  <div className="text-[#657777]">{source.source_name} — Last reviewed: {source.last_reviewed}</div>
                  <p className="text-[11px] text-[#657777] leading-relaxed pt-0.5">{source.summary}</p>
                </div>
                <a
                  href={source.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EDE8DF] bg-white text-[#2A6F6F] font-semibold hover:bg-[#F0F7F7] shrink-0"
                >
                  View Source <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EDE8DF]">
          <Link href="/dashboard">
            <Button variant="outline">
              Return to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/timeline">
              <Button variant="outline">
                View Timeline Record
              </Button>
            </Link>
            <Link href={`/follow-ups/${followUp?.id || ""}`}>
              <Button>
                View Follow-Up Status <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

export default function AssessmentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="w-8 h-8 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AssessmentResultContent />
    </Suspense>
  );
}

