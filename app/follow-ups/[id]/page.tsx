"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import { AgentStatus } from "@/components/ui/agent-status";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import {
  Clock,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { Suspense } from "react";
import type { FollowUp, Assessment, RiskAssessment, Reassessment } from "@/types/database";

function FollowUpDetailContent() {
  const params = useParams();
  const router = useRouter();
  const followUpId = params?.id as string;

  const [followUp, setFollowUp] = useState<FollowUp | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [risk, setRisk] = useState<RiskAssessment | null>(null);

  // Form inputs
  const [outcome, setOutcome] = useState<"better" | "same" | "worse" | "new_symptoms">("worse");
  const [severity, setSeverity] = useState<number>(7);
  const [notes, setNotes] = useState("Headache intensified and I started feeling dizzy when standing up.");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["Dizziness / Lightheadedness"]);

  // Processing & Reassessment Results
  const [submitting, setSubmitting] = useState(false);
  const [reassessmentResult, setReassessmentResult] = useState<Reassessment | null>(null);
  const [completedSuccess, setCompletedSuccess] = useState(false);

  useEffect(() => {
    if (!followUpId) return;

    const fu = healthStore.getFollowUpById(followUpId);
    if (!fu) {
      router.push("/follow-ups");
      return;
    }
    setFollowUp(fu);

    const a = healthStore.getAssessmentById(fu.assessment_id);
    if (a) {
      setAssessment(a);
      setRisk(healthStore.getRiskAssessment(a.id) || null);
    }

    // Check if reassessment already exists for this assessment
    const existing = healthStore.getReassessments(fu.assessment_id);
    if (existing.length > 0) {
      setReassessmentResult(existing[0]);
    }
  }, [followUpId, router]);

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSubmitCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUp || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/assessment/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followUpId: followUp.id,
          outcome,
          severity,
          notes,
          newSymptoms: selectedSymptoms,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.reassessment) {
        setReassessmentResult(data.reassessment);
      }
      setCompletedSuccess(true);
    } catch (err: any) {
      alert("Error submitting check-in: " + (err.message || "Please try again"));
    } finally {
      setSubmitting(false);
    }
  };

  if (!followUp || !assessment) {
    return (
      <AppShell>
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#657777]">Loading follow-up session...</p>
        </div>
      </AppShell>
    );
  }

  const baselineSeverity = 4;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Scheduled Recovery Check-in</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#173737]">
            How are you feeling now?
          </h1>
          <p className="text-xs sm:text-sm text-[#657777] mt-1">
            Tracking episode: <strong>&quot;{assessment.title}&quot;</strong> (Started: {formatDate(assessment.started_at)})
          </p>
        </div>

        {/* If Reassessment Result exists, show the Visual Comparison */}
        {reassessmentResult ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Reassessment Banner */}
            <div className="p-6 rounded-3xl bg-[#FFF8EE] border border-[#F2C99C] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F2C99C]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-900 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A5B13]">
                      Reassessment Triggered
                    </span>
                    <h2 className="font-display text-xl font-bold text-[#173737]">
                      Care Pathway Escalated
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-[#EBF3ED] text-[#24542E] px-2.5 py-1 rounded-full border border-[#8FB996]/40">
                    <Sparkles className="w-3 h-3 text-[#2A6F6F]" /> Gemini 3.8 Flash
                  </span>
                  <RiskBadge tier={reassessmentResult.updated_tier} size="md" />
                </div>
              </div>

              {/* CHANGE VISUALIZATION (Section 34) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Previous State */}
                <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#657777] block">
                    Previous State
                  </span>
                  <div className="text-2xl font-bold font-display text-[#173737]">
                    {reassessmentResult.previous_severity}/10
                  </div>
                  <span className="text-xs text-[#2A6F6F] font-medium bg-[#EBF3ED] px-2 py-0.5 rounded">
                    Tier: Monitor
                  </span>
                </div>

                {/* Delta / Shift Indicator */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DF] text-center space-y-1 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-bold uppercase text-[#657777] block">
                    Change Direction
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FDF0ED] text-[#AB371C]">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{reassessmentResult.current_severity - reassessmentResult.previous_severity} Worsened</span>
                  </div>
                  <span className="text-[11px] text-[#657777] block pt-1">
                    New symptoms reported
                  </span>
                </div>

                {/* Current State */}
                <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#657777] block">
                    Current Check-in
                  </span>
                  <div className="text-2xl font-bold font-display text-[#AB371C]">
                    {reassessmentResult.current_severity}/10
                  </div>
                  <span className="text-xs text-[#9A5B13] font-medium bg-[#FFF8EE] border border-[#F2C99C] px-2 py-0.5 rounded">
                    Tier: See Doctor
                  </span>
                </div>
              </div>

              {/* Updated Guidance */}
              <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#173737] block">
                  Updated Next Step:
                </span>
                <p className="text-sm font-semibold text-[#173737] leading-relaxed">
                  {reassessmentResult.updated_next_step}
                </p>
                <p className="text-xs text-[#657777] leading-relaxed">
                  <strong>Clinical Rationale:</strong> {reassessmentResult.change_summary}
                </p>
              </div>

              {/* Updated Monitoring Guidelines */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#173737] block">
                  Updated Safety Precautions:
                </span>
                <ul className="space-y-1.5 text-xs text-[#657777]">
                  {reassessmentResult.updated_monitoring_guidance?.map((guidance: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6F6F] shrink-0 mt-0.5" />
                      <span>{guidance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link href="/timeline">
                <Button variant="outline" size="sm">
                  View Timeline Record
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm">
                  Return to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* CHECK-IN FORM */
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Progress Questionnaire</CardTitle>
              <p className="text-xs text-[#657777]">
                Compare your current sensation with the baseline of {baselineSeverity}/10 logged on Day 1.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitCheckIn} className="space-y-6">
                {/* 1. Outcome Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#173737] block">
                    Overall Status:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "better", label: "Better / Improving", icon: TrendingDown },
                      { id: "same", label: "About the Same", icon: Minus },
                      { id: "worse", label: "Worse", icon: TrendingUp },
                      { id: "new_symptoms", label: "New Symptoms", icon: AlertTriangle },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = outcome === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setOutcome(opt.id as any)}
                          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#2A6F6F] bg-[#F0F7F7] text-[#2A6F6F] ring-2 ring-[#2A6F6F]/20"
                              : "border-[#EDE8DF] bg-white text-[#173737] hover:bg-[#FAF8F5]"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? "text-[#2A6F6F]" : "text-[#657777]"}`} />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Severity Slider (1-10) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-[#173737]">
                      Discomfort Severity Right Now (1–10 scale):
                    </label>
                    <span className="font-bold text-sm text-[#2A6F6F] bg-[#EBF3ED] px-2.5 py-0.5 rounded-lg">
                      {severity} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                    className="w-full accent-[#2A6F6F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#657777]">
                    <span>1 (Very mild)</span>
                    <span>4 (Previous Baseline)</span>
                    <span>7 (Moderate-Severe)</span>
                    <span>10 (Emergency level)</span>
                  </div>
                </div>

                {/* 3. New Symptoms Checkboxes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#173737] block">
                    Have you noticed any of these additional symptoms today?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Dizziness / Lightheadedness",
                      "Nausea or Vomiting",
                      "Sensitivity to light or sound",
                      "Fever or Chills",
                      "Neck Stiffness",
                      "Visual blurriness",
                    ].map((sym) => {
                      const isChecked = selectedSymptoms.includes(sym);
                      return (
                        <button
                          key={sym}
                          type="button"
                          onClick={() => toggleSymptom(sym)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            isChecked
                              ? "bg-[#EBF3ED] border-[#8FB996] text-[#24542E] font-semibold"
                              : "bg-white border-[#EDE8DF] text-[#657777] hover:bg-[#FAF8F5]"
                          }`}
                        >
                          {isChecked ? "✓ " : "+ "}
                          {sym}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Notes textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#173737] block">
                    Optional notes or remarks:
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe how your symptoms changed..."
                    className="w-full p-3 rounded-xl border border-[#EDE8DF] text-xs text-[#173737] bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6F6F]/40 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-between">
                  <Disclaimer variant="inline" />
                  <Button type="submit" size="md" isLoading={submitting}>
                    Submit Check-in <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Disclaimer />
      </div>
    </AppShell>
  );
}

export default function FollowUpDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="w-8 h-8 border-4 border-[#2A6F6F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FollowUpDetailContent />
    </Suspense>
  );
}

