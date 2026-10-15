"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/ui/risk-badge";
import { formatDate } from "@/lib/utils";
import {
  Stethoscope,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  User,
} from "lucide-react";

interface TriagePatient {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  concern: string;
  tier: "urgent" | "see-a-doctor" | "monitor" | "self-care";
  severity: number;
  previousSeverity?: number;
  status: "escalated" | "active" | "checkin_due" | "resolved";
  reportedAt: string;
  aiRationale: string;
  evidenceSource: string;
}

const DEMO_TRIAGE_QUEUE: TriagePatient[] = [
  {
    id: "pat-001",
    patientName: "Sarah Jenkins",
    age: 34,
    gender: "Female",
    concern: "Severe throbbing headache with light sensitivity and new dizziness",
    tier: "see-a-doctor",
    severity: 7,
    previousSeverity: 4,
    status: "escalated",
    reportedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    aiRationale: "Escalated from Monitor to See-a-Doctor due to 24h follow-up reporting severity jump (+3) with secondary neurological complaint (dizziness).",
    evidenceSource: "NICE CG150 - Secondary headache red flag evaluation",
  },
  {
    id: "pat-002",
    patientName: "Marcus Vance",
    age: 52,
    gender: "Male",
    concern: "Substernal chest tightness radiating to left shoulder on exertion",
    tier: "urgent",
    severity: 8,
    status: "escalated",
    reportedAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    aiRationale: "Immediate red-flag acute coronary syndrome indicator detected. Emergency guidance presented to patient.",
    evidenceSource: "AHA/ACC Acute Coronary Evaluation Criteria",
  },
  {
    id: "pat-003",
    patientName: "Elena Rostova",
    age: 28,
    gender: "Female",
    concern: "Dry non-productive cough, mild fatigue, low-grade temperature 37.8C",
    tier: "monitor",
    severity: 3,
    status: "checkin_due",
    reportedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    aiRationale: "Consistent with early viral upper respiratory tract infection. Scheduled 24h safety follow-up due in 2 hours.",
    evidenceSource: "CDC Adult Viral Respiratory Illness Guidelines",
  },
  {
    id: "pat-004",
    patientName: "David Chen",
    age: 41,
    gender: "Male",
    concern: "Intermittent right lower quadrant abdominal cramping after meals",
    tier: "see-a-doctor",
    severity: 5,
    status: "active",
    reportedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    aiRationale: "Focal lower quadrant tenderness requires in-person palpation and ultrasound/lab workup to rule out appendicitis.",
    evidenceSource: "WHO Surgical Primary Care Abdominal Protocol",
  },
  {
    id: "pat-005",
    patientName: "Amira Patel",
    age: 23,
    gender: "Female",
    concern: "Mild tension forehead pressure resolving after hydration and rest",
    tier: "self-care",
    severity: 2,
    previousSeverity: 5,
    status: "resolved",
    reportedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    aiRationale: "Symptom resolution confirmed via 48h check-in. Condition marked resolved.",
    evidenceSource: "AAFP Tension Headache Conservative Management",
  },
];

export default function ClinicianDashboardPage() {
  const [filterTier, setFilterTier] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState<TriagePatient | null>(DEMO_TRIAGE_QUEUE[0]);
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const filteredPatients = DEMO_TRIAGE_QUEUE.filter((pat) => {
    if (filterTier === "all") return true;
    return pat.tier === filterTier;
  });

  const handleAcknowledge = (id: string) => {
    setAcknowledged((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Clinician Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] bg-[#E0F2FE] px-3 py-1 rounded-full mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Provider Clinical Triage Portal</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#173737]">
              Physician Triage & Escalation Queue
            </h1>
            <p className="text-sm text-[#657777]">
              Review active patient cohorts, safety escalations, and automated symptom follow-up trajectory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Patient View
              </Button>
            </Link>
            <Button size="sm" className="bg-[#0284C7] hover:bg-[#0369A1] text-white">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Cohort
            </Button>
          </div>
        </div>

        {/* Clinical Safety Protocol Strip */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-sky-950 flex items-start gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Clinical Decision Support Advisory:</span> CareWatch AI classifies patient urgency using standardized criteria from NICE, CDC, and AAFP. AI outputs provide continuous safety monitoring and escalation flags; clinical judgment and in-person assessment remain decisive.
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#EDE8DF]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#657777] uppercase tracking-wider">
                  Active Monitoring
                </span>
                <div className="text-2xl font-bold text-[#173737] mt-1">14 Patients</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] text-[#2A6F6F] flex items-center justify-center font-bold">
                14
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/30">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">
                  Urgent Escalations
                </span>
                <div className="text-2xl font-bold text-red-900 mt-1">2 Active</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/30">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Check-ins Due (24h)
                </span>
                <div className="text-2xl font-bold text-amber-900 mt-1">4 Due Now</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Resolved Cohort
                </span>
                <div className="text-2xl font-bold text-emerald-900 mt-1">8 Closed</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Triage Queue & Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Table: Triage Queue */}
          <div className="lg:col-span-7">
            <Card className="border-[#EDE8DF]">
              <CardHeader className="pb-3 border-b border-[#F4EFEB]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base text-[#173737]">
                      Incoming Triage Roster
                    </CardTitle>
                    <CardDescription className="text-xs text-[#657777]">
                      Select a patient to inspect symptom trajectory and clinical explanation
                    </CardDescription>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {["all", "urgent", "see-a-doctor", "monitor"].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setFilterTier(tier)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all capitalize ${
                          filterTier === tier
                            ? "bg-[#0284C7] text-white"
                            : "bg-[#F4F1EA] text-[#657777] hover:bg-[#E5E0D6]"
                        }`}
                      >
                        {tier === "all" ? "All Tiers" : tier.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-[#F4EFEB]">
                {filteredPatients.map((patient) => {
                  const isSelected = selectedPatient?.id === patient.id;
                  const isAck = acknowledged[patient.id];

                  return (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`p-4 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[#F0F9FF] border-l-4 border-l-[#0284C7]"
                          : "hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#173737]">
                            {patient.patientName}
                          </span>
                          <span className="text-xs text-[#657777]">
                            ({patient.age}y, {patient.gender})
                          </span>
                          {patient.status === "escalated" && (
                            <span className="text-[10px] font-bold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded">
                              Escalated
                            </span>
                          )}
                          {isAck && (
                            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Reviewed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#657777] truncate max-w-md">
                          {patient.concern}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-[#657777]">
                          <span>Reported: {formatDate(patient.reportedAt)}</span>
                          <span>•</span>
                          <span>
                            Severity: <strong>{patient.severity}/10</strong>
                            {patient.previousSeverity && (
                              <span className="text-red-600 font-semibold ml-1">
                                (was {patient.previousSeverity}/10)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <RiskBadge tier={patient.tier} size="sm" />
                        <ChevronRight className="w-4 h-4 text-[#A0AEC0]" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Detailed Patient Inspector */}
          <div className="lg:col-span-5">
            {selectedPatient ? (
              <Card className="border-[#EDE8DF] sticky top-24">
                <CardHeader className="pb-3 border-b border-[#F4EFEB]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-[#0284C7] tracking-wider">
                        Patient Case File
                      </span>
                      <CardTitle className="text-xl text-[#173737] mt-0.5">
                        {selectedPatient.patientName}
                      </CardTitle>
                    </div>
                    <RiskBadge tier={selectedPatient.tier} size="md" />
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Chief Complaint */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF]">
                    <span className="text-[11px] uppercase font-bold text-[#657777] block mb-1">
                      Chief Complaint & Progression
                    </span>
                    <p className="text-xs font-semibold text-[#173737]">
                      &quot;{selectedPatient.concern}&quot;
                    </p>
                  </div>

                  {/* Severity Trajectory */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#EDE8DF] space-y-2">
                    <span className="text-[11px] uppercase font-bold text-[#657777] block">
                      Symptom Severity Trend
                    </span>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#657777]">Baseline Score:</span>
                      <span className="font-bold text-[#173737]">
                        {selectedPatient.previousSeverity || selectedPatient.severity}/10
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#657777]">Current Follow-up Score:</span>
                      <span className="font-bold text-red-600">
                        {selectedPatient.severity}/10
                      </span>
                    </div>
                    <div className="w-full bg-[#EDE8DF] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0284C7] h-full rounded-full transition-all"
                        style={{ width: `${selectedPatient.severity * 10}%` }}
                      />
                    </div>
                  </div>

                  {/* AI Clinical Reasoning */}
                  <div className="p-3.5 rounded-xl bg-[#F0F7F7] border border-[#BDDEDC] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A6F6F]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Triage Decision Provenance</span>
                    </div>
                    <p className="text-xs text-[#173737] leading-relaxed">
                      {selectedPatient.aiRationale}
                    </p>
                    <div className="pt-2 border-t border-[#BDDEDC]/60 text-[11px] text-[#657777]">
                      Evidence Citation: <em>{selectedPatient.evidenceSource}</em>
                    </div>
                  </div>

                  {/* Clinician Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button
                      onClick={() => handleAcknowledge(selectedPatient.id)}
                      className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold"
                      disabled={acknowledged[selectedPatient.id]}
                    >
                      {acknowledged[selectedPatient.id] ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Escalation Acknowledged
                        </>
                      ) : (
                        <>Acknowledge & Sign Off on Care Pathway</>
                      )}
                    </Button>
                    <Link href={`/journeys`}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Open Full Episode Timeline <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 text-center text-[#657777] border border-dashed border-[#EDE8DF] rounded-2xl">
                Select a patient from the queue to view clinical telemetry.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

