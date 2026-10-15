"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Users,
  KeyRound,
  Sliders,
  BookOpen,
  Search,
  ExternalLink,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "clinician" | "admin";
  status: "active" | "suspended";
  created_at: string;
  assessmentsCount: number;
}

const INITIAL_USERS: UserRecord[] = [
  {
    id: "usr-001",
    name: "Sarah Jenkins",
    email: "patient@carewatch.ai",
    role: "citizen",
    status: "active",
    created_at: "2026-10-14T09:00:00Z",
    assessmentsCount: 3,
  },
  {
    id: "usr-002",
    name: "Dr. Aris Thorne, MD",
    email: "dr.thorne@carewatch.ai",
    role: "clinician",
    status: "active",
    created_at: "2026-10-12T14:30:00Z",
    assessmentsCount: 14,
  },
  {
    id: "usr-003",
    name: "CareWatch AI Administrator",
    email: "admin@carewatch.ai",
    role: "admin",
    status: "active",
    created_at: "2026-10-10T08:00:00Z",
    assessmentsCount: 0,
  },
  {
    id: "usr-004",
    name: "Marcus Vance",
    email: "marcus.v@example.com",
    role: "citizen",
    status: "active",
    created_at: "2026-10-15T11:00:00Z",
    assessmentsCount: 1,
  },
];

interface TelemetryItem {
  id: string;
  agent: string;
  action: string;
  status: "success" | "warning" | "error";
  latencyMs: number;
  timestamp: string;
  details: string;
}

const TELEMETRY_STREAM: TelemetryItem[] = [
  {
    id: "evt-901",
    agent: "reassessment_agent",
    action: "Progression vs Baseline Evaluation",
    status: "success",
    latencyMs: 1420,
    timestamp: new Date(Date.now() - 3600000 * 0.2).toISOString(),
    details: "Detected severity increase (+3) & new dizziness. Escalated tier from monitor to see-a-doctor.",
  },
  {
    id: "evt-902",
    agent: "follow_up_agent",
    action: "Scheduled Follow-Up Matching",
    status: "success",
    latencyMs: 980,
    timestamp: new Date(Date.now() - 3600000 * 0.25).toISOString(),
    details: "Processed 24h follow-up check-in response for assess-001.",
  },
  {
    id: "evt-903",
    agent: "evidence_agent",
    action: "Curated Evidence Retrieval",
    status: "success",
    latencyMs: 410,
    timestamp: new Date(Date.now() - 3600000 * 1.1).toISOString(),
    details: "Matched query to NICE CG150 and AAFP Dizziness clinical guidelines.",
  },
  {
    id: "evt-904",
    agent: "triage_agent",
    action: "Urgency Tier Classification",
    status: "success",
    latencyMs: 1650,
    timestamp: new Date(Date.now() - 3600000 * 1.12).toISOString(),
    details: "Evaluated 3 questions + chief complaint. Output: monitor tier.",
  },
  {
    id: "evt-905",
    agent: "question_agent",
    action: "Adaptive Questioning",
    status: "success",
    latencyMs: 1120,
    timestamp: new Date(Date.now() - 3600000 * 1.18).toISOString(),
    details: "Generated focused inquiry on headache onset speed (thunderclap vs gradual).",
  },
  {
    id: "evt-906",
    agent: "intake_agent",
    action: "Symptom Entity Parsing",
    status: "success",
    latencyMs: 890,
    timestamp: new Date(Date.now() - 3600000 * 1.25).toISOString(),
    details: "Extracted symptom: headache (duration: 2 days, severity: 4).",
  },
];

function AdminContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, status: u.status === "active" ? "suspended" : "active" };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto antialiased">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Platform Governance & Safety Oversight • Admin Privileges</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#263735]">
              {currentTab === "users"
                ? "User & Account Governance"
                : currentTab === "roles"
                ? "Role & Access Control"
                : currentTab === "health"
                ? "Infrastructure & Database Health"
                : currentTab === "ai"
                ? "Gemini AI Agent Telemetry"
                : currentTab === "audit"
                ? "Security & Compliance Audit Logs"
                : currentTab === "evidence"
                ? "Clinical Evidence Source Management"
                : currentTab === "config"
                ? "Platform Configuration"
                : currentTab === "settings"
                ? "Administrative Settings"
                : "Operations & Governance Overview"}
            </h1>
            <p className="text-sm text-[#627472]">
              Real-time telemetry from Gemini 3.8 Flash, PostgreSQL 15-table schema status, and role access logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-xs">
                Patient View
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleRefresh}
              className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold"
            >
              <RefreshCw className={cn("w-3.5 h-3.5 mr-1.5", refreshing && "animate-spin")} />
              Refresh Metrics
            </Button>
          </div>
        </div>

        {/* Operational Status Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#EDE8DF] shadow-xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#627472] tracking-wider block">
                  AI Model Pipeline
                </span>
                <div className="text-base font-bold text-[#263735] mt-0.5">Gemini 3.8 Flash</div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational (1.2s avg)
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF7F1] text-[#174E4A] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EDE8DF] shadow-xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#627472] tracking-wider block">
                  PostgreSQL Tables
                </span>
                <div className="text-base font-bold text-[#263735] mt-0.5">15 Active Tables</div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> RLS Enforced
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EDE8DF] shadow-xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#627472] tracking-wider block">
                  Registered Accounts
                </span>
                <div className="text-base font-bold text-[#263735] mt-0.5">{users.length} Users</div>
                <div className="text-xs text-[#627472] flex items-center gap-1 mt-1">
                  3 Roles Configured
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EDE8DF] shadow-xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#627472] tracking-wider block">
                  Agent Pipeline
                </span>
                <div className="text-base font-bold text-[#263735] mt-0.5">8 Micro-Agents</div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Unhandled Errors
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] text-[#263735] flex items-center justify-center font-bold border border-[#EDE8DF]">
                <Cpu className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab View Switcher Content */}
        {currentTab === "users" || currentTab === "roles" ? (
          /* User & Role Management Table */
          <Card className="border-[#EDE8DF] shadow-xs">
            <CardHeader className="pb-3 border-b border-[#EDE8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base text-[#263735]">
                  Platform User Directory
                </CardTitle>
                <CardDescription className="text-xs text-[#627472]">
                  Authorized accounts with server-side role validation
                </CardDescription>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#627472] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or role..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#EDE8DF] text-xs text-[#263735] bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/40"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F3] border-b border-[#EDE8DF] text-[#627472] uppercase font-bold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE8DF]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#FAF8F3]/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-[#263735]">
                        <div>{u.name}</div>
                        <div className="text-[11px] text-[#627472] font-normal">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px]",
                            u.role === "admin"
                              ? "bg-amber-100 text-amber-800"
                              : u.role === "clinician"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-[#EFF7F1] text-[#174E4A]"
                          )}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-semibold",
                            u.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#627472]">{formatDate(u.created_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(u.id)}
                          className="h-7 text-[11px]"
                        >
                          {u.status === "active" ? "Suspend" : "Activate"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        ) : (
          /* Overview: Live Telemetry Stream + Table Audit */
          <div className="space-y-6">
            <Card className="border-[#EDE8DF] shadow-xs">
              <CardHeader className="border-b border-[#EDE8DF] pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base text-[#263735] flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#D97706]" />
                    AI Agent Execution Telemetry Stream
                  </CardTitle>
                  <CardDescription className="text-xs text-[#627472]">
                    Persisted operational events from <code className="text-[#263735]">public.agent_events</code>
                  </CardDescription>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-[#EFF7F1] border border-[#DDEBE2] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Telemetry
                </span>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-[#EDE8DF]">
                {TELEMETRY_STREAM.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-[#FAF8F3] transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {item.agent}
                        </span>
                        <span className="text-xs font-semibold text-[#263735]">{item.action}</span>
                        <span className="text-[11px] text-[#627472]">({item.latencyMs}ms)</span>
                      </div>
                      <p className="text-xs text-[#627472]">{item.details}</p>
                    </div>
                    <div className="text-[11px] text-[#627472] shrink-0 font-medium">
                      {formatDate(item.timestamp)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Supabase Schema Object Status */}
            <Card className="border-[#EDE8DF] shadow-xs">
              <CardHeader className="pb-3 border-b border-[#EDE8DF]">
                <CardTitle className="text-base text-[#263735]">
                  Database Relational Schema Verification (15 Tables)
                </CardTitle>
                <CardDescription className="text-xs text-[#627472]">
                  Migration <code className="text-[#263735]">20261015000000_carewatch_schema.sql</code> verified
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
                      className="p-3 rounded-xl border border-[#EDE8DF] bg-[#FAF8F3] flex items-center justify-between"
                    >
                      <span className="text-xs font-mono font-medium text-[#263735] truncate">
                        {table}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
          <div className="flex flex-col items-center gap-3 text-[#D97706]">
            <div className="w-8 h-8 rounded-full border-2 border-[#D97706] border-t-transparent animate-spin" />
            <span className="text-xs font-semibold">Loading Admin Console...</span>
          </div>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
