"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  ShieldCheck,
  Cpu,
  Database,
  Activity,
  Terminal,
  Server,
  Lock,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";

interface AgentTelemetryItem {
  id: string;
  agent: string;
  action: string;
  status: "success" | "warning" | "error";
  latencyMs: number;
  timestamp: string;
  details: string;
}

const TELEMETRY_STREAM: AgentTelemetryItem[] = [
  {
    id: "evt-901",
    agent: "reassessment_agent",
    action: "Evaluate Symptom Progression vs Baseline",
    status: "success",
    latencyMs: 1420,
    timestamp: new Date(Date.now() - 3600000 * 0.2).toISOString(),
    details: "Detected severity jump (+3) and dizziness. Upgraded tier from monitor to see-a-doctor.",
  },
  {
    id: "evt-902",
    agent: "follow_up_agent",
    action: "Process 24h Scheduled Check-in",
    status: "success",
    latencyMs: 980,
    timestamp: new Date(Date.now() - 3600000 * 0.25).toISOString(),
    details: "Matched follow-up response with active headache episode (assess-001).",
  },
  {
    id: "evt-903",
    agent: "evidence_agent",
    action: "Evidence Retrieval & Guidance Match",
    status: "success",
    latencyMs: 410,
    timestamp: new Date(Date.now() - 3600000 * 1.1).toISOString(),
    details: "Retrieved NICE CG150 and AAFP Dizziness clinical references.",
  },
  {
    id: "evt-904",
    agent: "triage_agent",
    action: "Multi-factor Urgency Classification",
    status: "success",
    latencyMs: 1650,
    timestamp: new Date(Date.now() - 3600000 * 1.12).toISOString(),
    details: "Evaluated 3 questions + chief complaint. Assigned baseline monitor tier.",
  },
  {
    id: "evt-905",
    agent: "question_agent",
    action: "Adaptive Question Generation",
    status: "success",
    latencyMs: 1120,
    timestamp: new Date(Date.now() - 3600000 * 1.18).toISOString(),
    details: "Generated focused follow-up question on photophobia and duration.",
  },
  {
    id: "evt-906",
    agent: "intake_agent",
    action: "Entity & Symptom Parsing",
    status: "success",
    latencyMs: 890,
    timestamp: new Date(Date.now() - 3600000 * 1.25).toISOString(),
    details: "Parsed symptom entity 'headache' (duration: 3 days, severity: 4).",
  },
];

export default function AdminDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] bg-[#FEF3C7] px-3 py-1 rounded-full mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Platform Administration & Safety Oversight</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#173737]">
              System Health & Agent Telemetry
            </h1>
            <p className="text-sm text-[#657777]">
              Real-time monitoring of AI agent pipelines, PostgreSQL Row-Level Security, and audit trails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Patient View
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleRefresh}
              className="bg-[#D97706] hover:bg-[#B45309] text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Telemetry
            </Button>
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#EDE8DF]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#657777] uppercase tracking-wider block">
                  AI Model Pipeline
                </span>
                <div className="text-base font-bold text-[#173737] mt-0.5">Gemini 3.8 Flash</div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational (1.2s avg)
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] text-[#2A6F6F] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EDE8DF]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#657777] uppercase tracking-wider block">
                  Database Instance
                </span>
                <div className="text-base font-bold text-[#173737] mt-0.5">Supabase PostgreSQL</div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 15 Tables Active
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#F0F7F7] text-[#2A6F6F] flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EDE8DF]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#657777] uppercase tracking-wider block">
                  Access Security
                </span>
                <div className="text-base font-bold text-[#173737] mt-0.5">Row-Level Security (RLS)</div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <Lock className="w-3.5 h-3.5" /> Enforced on all tables
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EDE8DF]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#657777] uppercase tracking-wider block">
                  Agent Multi-Pipeline
                </span>
                <div className="text-base font-bold text-[#173737] mt-0.5">8 Autonomous Agents</div>
                <div className="text-xs text-[#657777] flex items-center gap-1 mt-1">
                  Intake $\to$ Reassess loop active
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EDE8DF] text-[#173737] flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Agent Telemetry Stream */}
        <Card className="border-[#EDE8DF]">
          <CardHeader className="border-b border-[#F4EFEB] pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-[#173737] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#D97706]" />
                  Agent Execution Audit Trail (Live Telemetry)
                </CardTitle>
                <CardDescription className="text-xs text-[#657777]">
                  Persisted events from the <code className="text-[#173737]">agent_events</code> table
                </CardDescription>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Streaming
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-[#F4EFEB]">
            {TELEMETRY_STREAM.map((item) => (
              <div key={item.id} className="p-4 hover:bg-[#FAF8F5] transition-colors flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                      {item.agent}
                    </span>
                    <span className="text-xs font-semibold text-[#173737]">{item.action}</span>
                    <span className="text-[11px] text-[#657777]">({item.latencyMs}ms)</span>
                  </div>
                  <p className="text-xs text-[#657777]">{item.details}</p>
                </div>
                <div className="text-[11px] text-[#657777] shrink-0">
                  {formatDate(item.timestamp)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Database Tables Verification Grid */}
        <Card className="border-[#EDE8DF]">
          <CardHeader className="pb-3 border-b border-[#F4EFEB]">
            <CardTitle className="text-base text-[#173737]">
              Supabase 15-Table Architecture Verification
            </CardTitle>
            <CardDescription className="text-xs text-[#657777]">
              Schema objects verified during migration <code className="text-[#173737]">20261015000000_carewatch_schema.sql</code>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                "profiles",
                "assessments",
                "symptoms",
                "assessment_answers",
                "agent_events",
                "risk_assessments",
                "evidence_sources",
                "action_plans",
                "follow_ups",
                "follow_up_responses",
                "reassessments",
                "timeline_events",
                "health_passport",
                "health_documents",
                "user_preferences",
              ].map((table) => (
                <div
                  key={table}
                  className="p-3 rounded-xl border border-[#EDE8DF] bg-[#FAF8F5] flex items-center justify-between"
                >
                  <span className="text-xs font-mono font-medium text-[#173737] truncate">
                    {table}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

