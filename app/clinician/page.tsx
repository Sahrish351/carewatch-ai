"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  ClipboardList,
  BookOpen,
  History,
  Settings,
  FileCheck2,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  evidenceUrl: string;
  clinicalNotes?: string[];
}

const INITIAL_QUEUE: TriagePatient[] = [
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
    evidenceSource: "NICE CG150 - Headaches in over 12s: diagnosis and management",
    evidenceUrl: "https://www.nice.org.uk/guidance/cg150",
    clinicalNotes: ["Initial intake recorded gradual onset. 24h follow-up reported postural dizziness."],
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
    aiRationale: "Immediate red-flag acute coronary syndrome indicator detected. Patient instructed to contact emergency services immediately.",
    evidenceSource: "AHA/ACC Secondary Acute Coronary Syndrome Criteria",
    evidenceUrl: "https://www.ahajournals.org",
    clinicalNotes: ["Emergency protocol displayed. Patient contact flagged for triage dispatch."],
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
    aiRationale: "Consistent with viral upper respiratory tract infection. Scheduled 24h safety follow-up due in 2 hours.",
    evidenceSource: "CDC Adult Viral Respiratory Illness Guidelines",
    evidenceUrl: "https://www.cdc.gov/respiratory-viruses/guidance/",
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
    aiRationale: "Focal lower quadrant discomfort warrants in-person palpation and ultrasound to rule out surgical acute abdomen.",
    evidenceSource: "WHO Surgical Primary Care Abdominal Protocol",
    evidenceUrl: "https://www.who.int",
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
    evidenceUrl: "https://www.aafp.org/pubs/afp/issues/2017/0201/p154.html",
  },
];

function ClinicianContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const [patients, setPatients] = useState<TriagePatient[]>(INITIAL_QUEUE);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("pat-001");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [newNote, setNewNote] = useState("");
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleAcknowledge = (id: string) => {
    setAcknowledged((prev) => ({ ...prev, [id]: true }));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === selectedPatientId) {
          return {
            ...p,
            clinicalNotes: [...(p.clinicalNotes || []), `Clinician Note (${new Date().toLocaleTimeString()}): ${newNote.trim()}`],
          };
        }
        return p;
      })
    );
    setNewNote("");
  };

  const filteredPatients = patients.filter((pat) => {
    if (currentTab === "escalations") return pat.status === "escalated";
    if (currentTab === "followups") return pat.status === "checkin_due";
    if (filterTier !== "all") return pat.tier === filterTier;
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto antialiased">
        {/* Clinician Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Provider Clinical Workspace • Authorized Access</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#263735]">
              {currentTab === "queue"
                ? "Assigned Case Queue"
                : currentTab === "review"
                ? "Patient Case Review"
                : currentTab === "followups"
                ? "Scheduled Follow-Up Reviews"
                : currentTab === "escalations"
                ? "Urgent Safety Escalations"
                : currentTab === "evidence"
                ? "Clinical Evidence References"
                : currentTab === "history"
                ? "Clinical Activity History"
                : currentTab === "settings"
                ? "Provider Settings"
                : "Clinical Triage & Oversight Overview"}
            </h1>
            <p className="text-sm text-[#627472]">
              Real-time monitoring of patient symptom trajectories, automated follow-up check-ins, and escalation criteria.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-xs">
                Patient View
              </Button>
            </Link>
            <Button size="sm" className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Roster
            </Button>
          </div>
        </div>

        {/* Clinical Advisory Protocol */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 flex items-start gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Clinical Decision Support Guardrail:</strong> AI classifications assist in monitoring progression and detecting secondary red flags against NICE, CDC, and AAFP guidelines. Clinical judgment remains the definitive authority for patient care.
          </div>
        </div>

        {/* Quick Triage Cohort Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#EDE8DF]">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#627472] tracking-wider block">
                  Active Cohort
                </span>
                <div className="text-2xl font-bold text-[#263735] mt-1">{patients.length} Patients</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                {patients.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/40">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-red-700 tracking-wider block">
                  Escalations
                </span>
                <div className="text-2xl font-bold text-red-950 mt-1">2 Urgent</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/40">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider block">
                  Check-ins Due
                </span>
                <div className="text-2xl font-bold text-amber-950 mt-1">1 Ready</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/40">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider block">
                  Resolved
                </span>
                <div className="text-2xl font-bold text-emerald-950 mt-1">1 Closed</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinical Workspace: Queue on Left, Case Review on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Patient Queue Table */}
          <div className="lg:col-span-7">
            <Card className="border-[#EDE8DF] shadow-xs">
              <CardHeader className="pb-3 border-b border-[#EDE8DF]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base text-[#263735]">
                      Active Patient Roster
                    </CardTitle>
                    <CardDescription className="text-xs text-[#627472]">
                      Click a record to open the Clinical Case File
                    </CardDescription>
                  </div>

                  {/* Tier filter */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {["all", "urgent", "see-a-doctor", "monitor"].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setFilterTier(tier)}
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-full font-semibold transition-all capitalize cursor-pointer",
                          filterTier === tier
                            ? "bg-[#0284C7] text-white"
                            : "bg-[#FAF8F3] text-[#627472] hover:bg-[#EDE8DF]"
                        )}
                      >
                        {tier === "all" ? "All" : tier.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 divide-y divide-[#EDE8DF]">
                {filteredPatients.map((patient) => {
                  const isSelected = selectedPatient.id === patient.id;
                  const isAck = acknowledged[patient.id];

                  return (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={cn(
                        "p-4 transition-all cursor-pointer flex items-center justify-between gap-3",
                        isSelected
                          ? "bg-sky-50/70 border-l-4 border-l-[#0284C7]"
                          : "hover:bg-[#FAF8F3]"
                      )}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#263735]">
                            {patient.patientName}
                          </span>
                          <span className="text-xs text-[#627472]">
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
                        <p className="text-xs text-[#627472] truncate max-w-md">
                          {patient.concern}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-[#627472]">
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

                      <div className="flex items-center gap-2 shrink-0">
                        <RiskBadge tier={patient.tier} size="sm" />
                        <ChevronRight className="w-4 h-4 text-[#A0AEC0]" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right: Detailed Patient Case File & Clinical Note Tool */}
          <div className="lg:col-span-5">
            <Card className="border-[#EDE8DF] shadow-xs sticky top-24">
              <CardHeader className="pb-3 border-b border-[#EDE8DF]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#0284C7] tracking-wider">
                      Patient Case File
                    </span>
                    <CardTitle className="text-xl text-[#263735] mt-0.5">
                      {selectedPatient.patientName}
                    </CardTitle>
                  </div>
                  <RiskBadge tier={selectedPatient.tier} size="md" />
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {/* Chief Complaint */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
                  <span className="text-[11px] uppercase font-bold text-[#627472] block mb-1">
                    Chief Complaint & Trajectory
                  </span>
                  <p className="text-xs font-semibold text-[#263735]">
                    &quot;{selectedPatient.concern}&quot;
                  </p>
                </div>

                {/* Severity comparison score */}
                <div className="p-3.5 rounded-xl bg-white border border-[#EDE8DF] space-y-2">
                  <span className="text-[11px] uppercase font-bold text-[#627472] block">
                    Symptom Severity Progression
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#627472]">Baseline Intake Severity:</span>
                    <span className="font-bold text-[#263735]">
                      {selectedPatient.previousSeverity || selectedPatient.severity}/10
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#627472]">Latest Follow-Up Score:</span>
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

                {/* AI Triage Provenance */}
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-200 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#0284C7]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Urgency Assessment Rationale</span>
                  </div>
                  <p className="text-[#263735] leading-relaxed">
                    {selectedPatient.aiRationale}
                  </p>
                  <div className="pt-2 border-t border-sky-200 text-[11px] text-[#627472] flex items-center justify-between">
                    <span className="truncate">Source: {selectedPatient.evidenceSource}</span>
                    <a
                      href={selectedPatient.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0284C7] hover:underline flex items-center gap-1 shrink-0 ml-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Existing Clinical Notes */}
                {selectedPatient.clinicalNotes && selectedPatient.clinicalNotes.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] uppercase font-bold text-[#627472] block">
                      Recorded Clinical Notes ({selectedPatient.clinicalNotes.length})
                    </span>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {selectedPatient.clinicalNotes.map((note, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-[#FAF8F3] border border-[#EDE8DF] text-xs text-[#263735]">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Clinical Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2 pt-1 border-t border-[#EDE8DF]">
                  <label className="text-[11px] font-bold text-[#263735] block">
                    Add Authorized Clinical Review Note
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="e.g. Advised in-person evaluation today; BP check pending."
                      className="flex-1 px-3 py-2 rounded-xl border border-[#EDE8DF] text-xs text-[#263735] bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
                    />
                    <Button type="submit" size="sm" className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs shrink-0">
                      Save Note
                    </Button>
                  </div>
                </form>

                {/* Sign-Off / Acknowledge Button */}
                <Button
                  onClick={() => handleAcknowledge(selectedPatient.id)}
                  disabled={acknowledged[selectedPatient.id]}
                  className="w-full bg-[#174E4A] hover:bg-[#103835] text-white text-xs font-semibold"
                >
                  {acknowledged[selectedPatient.id] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Escalation Signed Off
                    </>
                  ) : (
                    <>Sign Off on Care Pathway & Notification</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function ClinicianDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
          <div className="flex flex-col items-center gap-3 text-[#0284C7]">
            <div className="w-8 h-8 rounded-full border-2 border-[#0284C7] border-t-transparent animate-spin" />
            <span className="text-xs font-semibold">Loading Clinician Workspace...</span>
          </div>
        </div>
      }
    >
      <ClinicianContent />
    </Suspense>
  );
}
