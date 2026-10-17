"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import {
  PlusCircle,
  Clock,
  Compass,
  Milestone,
  FileCheck2,
  FileBadge2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Activity,
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  GitCompare,
  FileText,
  Lock,
} from "lucide-react";
import type { Assessment, FollowUp, TimelineEvent, ActionPlan, RiskAssessment, HealthDocument, HealthPassport } from "@/types/database";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string; isDemo?: boolean } | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | undefined>();
  const [passport, setPassport] = useState<HealthPassport | undefined>();
  const [documents, setDocuments] = useState<HealthDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch current user session and isolate roles
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          // Strict role isolation: redirect clinicians and admins to their respective workspaces
          if (data.user.role === "admin") {
            window.location.href = "/admin";
            return;
          }
          if (data.user.role === "clinician") {
            window.location.href = "/clinician";
            return;
          }
          setUser(data.user);
        }
      })
      .catch(() => {});

    // 2. Fetch all user assessments from server and sync
    const loadHealthData = async () => {
      try {
        const res = await fetch("/api/assessment/list");
        if (res.ok) {
          const apiData = await res.json();
          healthStore.syncFromServer({
            assessments: apiData.assessments,
            riskAssessments: apiData.riskAssessments,
            actionPlans: apiData.actionPlans,
            followUps: apiData.followUps,
            timelineEvents: apiData.timelineEvents,
          });
        }
      } catch (e) {
        console.warn("Failed to fetch assessment list", e);
      } finally {
        const userAssessments = healthStore.getAssessments();
        const userFollowUps = healthStore.getFollowUps();
        const userTimeline = healthStore.getTimelineEvents();
        const userPlans = healthStore.getAllActionPlans();
        const userPassport = healthStore.getHealthPassport("demo-user-carewatch");
        const userDocs = healthStore.getDocuments();

        setAssessments(userAssessments);
        setFollowUps(userFollowUps);
        setTimeline(userTimeline);
        setActionPlans(userPlans);
        setPassport(userPassport);
        setDocuments(userDocs);

        if (userAssessments.length > 0) {
          // Always pick latest assessment's triage
          setRiskAssessment(healthStore.getRiskAssessment(userAssessments[0].id));
        }
        setLoading(false);
      }
    };

    loadHealthData();
  }, []);

  const activeAssessment = assessments[0];
  const dueFollowUp = followUps.find((f) => f.status === "due" || f.status === "scheduled");

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto antialiased">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174E4A] bg-[#EFF7F1] border border-[#DDEBE2] px-3 py-1 rounded-full mb-2">
              <HeartPulse className="w-3.5 h-3.5 text-[#174E4A]" />
              <span>Personal Recovery Journey</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#263735]">
              Welcome back, {user?.name || "Patient"}
            </h1>
            <p className="text-sm text-[#627472]">
              CareWatch AI is monitoring your symptoms and scheduled safety checks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/assessment/new">
              <Button size="md" className="shadow-xs font-bold bg-[#174E4A] hover:bg-[#103835] text-white text-xs">
                <PlusCircle className="w-4 h-4 mr-1.5" /> Start New Assessment
              </Button>
            </Link>
          </div>
        </div>

        {/* Follow-Up Due Notification Banner */}
        {dueFollowUp && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Follow-Up Check-in Due Now
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">
                    Action Needed
                  </span>
                </div>
                <p className="text-xs text-amber-950 mt-1 leading-relaxed">
                  Your scheduled check-in for <strong>&quot;{activeAssessment?.title || "Persistent Headache"}&quot;</strong> is ready. Please report how your symptoms have progressed.
                </p>
              </div>
            </div>
            <Link href={`/follow-ups/${dueFollowUp.id}`}>
              <Button size="sm" className="bg-amber-800 hover:bg-amber-900 text-white shrink-0 text-xs font-bold">
                Complete Check-in <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        )}

        {/* Main Grid: Current Episode & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Current Health Episode */}
          <div className="lg:col-span-7">
            <Card className="h-full flex flex-col justify-between border-[#EDE8DF] shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[#EDE8DF]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174E4A]">
                    Current Health Episode
                  </span>
                  <CardTitle className="text-xl mt-1 text-[#263735]">
                    {activeAssessment ? activeAssessment.title : "No Active Journey"}
                  </CardTitle>
                </div>
                {riskAssessment && (
                  <RiskBadge tier={riskAssessment.tier} size="sm" />
                )}
              </CardHeader>

              <CardContent className="space-y-4 flex-1 p-5">
                {activeAssessment ? (
                  <>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#EDE8DF]">
                      <span className="text-[10px] font-bold uppercase text-[#627472] block mb-1">
                        Reported Concern
                      </span>
                      <p className="text-xs font-semibold text-[#263735]">
                        &quot;{activeAssessment.primary_concern}&quot;
                      </p>
                    </div>

                    {riskAssessment && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#627472]">Guidance:</span>
                          <span className="font-bold text-[#263735]">
                            {riskAssessment.recommended_next_step}
                          </span>
                        </div>
                        <p className="text-[#627472] leading-relaxed">
                          {riskAssessment.summary}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs text-[#627472] border-t border-[#EDE8DF]">
                      <span>Started: {formatDate(activeAssessment.started_at)}</span>
                      <Link
                        href={`/assessment/${activeAssessment.id}/result`}
                        className="text-[#174E4A] font-bold hover:underline flex items-center gap-1"
                      >
                        View Full Clinical Plan <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </>
                ) : (
                  /* Clean Empty State */
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#EFF7F1] text-[#174E4A] flex items-center justify-center mx-auto">
                      <HeartPulse className="w-6 h-6 text-[#174E4A]" />
                    </div>
                    <h3 className="font-bold text-sm text-[#263735]">No active health assessments</h3>
                    <p className="text-xs text-[#627472] max-w-sm mx-auto">
                      Whenever you experience a symptom or concern, start a health check to get adaptive triage and a structured recovery follow-up.
                    </p>
                    <Link href="/assessment/new">
                      <Button size="sm" className="mt-2 text-xs bg-[#174E4A] hover:bg-[#103835] text-white">
                        Start Your First Assessment
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-[#EDE8DF] shadow-xs">
              <CardHeader className="pb-3 border-b border-[#EDE8DF]">
                <CardTitle className="text-base text-[#263735]">Care Shortcuts</CardTitle>
                <CardDescription className="text-xs text-[#627472]">
                  Direct access to your health records and follow-ups
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 p-4">
                <Link
                  href="/assessment/new"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#174E4A]/40 hover:bg-[#EFF7F1] transition-all flex flex-col gap-2"
                >
                  <PlusCircle className="w-5 h-5 text-[#174E4A]" />
                  <span className="text-xs font-bold text-[#263735]">New Assessment</span>
                </Link>
                <Link
                  href="/timeline"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#174E4A]/40 hover:bg-[#EFF7F1] transition-all flex flex-col gap-2"
                >
                  <Milestone className="w-5 h-5 text-[#174E4A]" />
                  <span className="text-xs font-bold text-[#263735]">Recovery Timeline</span>
                </Link>
                <Link
                  href="/follow-ups"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#174E4A]/40 hover:bg-[#EFF7F1] transition-all flex flex-col gap-2"
                >
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span className="text-xs font-bold text-[#263735]">Follow-Up Loop</span>
                </Link>
                <Link
                  href="/health-passport"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#174E4A]/40 hover:bg-[#EFF7F1] transition-all flex flex-col gap-2"
                >
                  <FileBadge2 className="w-5 h-5 text-[#174E4A]" />
                  <span className="text-xs font-bold text-[#263735]">Health Passport</span>
                </Link>
              </CardContent>
            </Card>

            {/* Health Passport Compact Preview */}
            <Card className="border-[#EDE8DF] shadow-xs">
              <CardHeader className="pb-2 border-b border-[#EDE8DF] flex flex-row items-center justify-between">
                <CardTitle className="text-base text-[#263735] flex items-center gap-2">
                  <FileBadge2 className="w-4 h-4 text-[#174E4A]" />
                  Health Passport Summary
                </CardTitle>
                <Link href="/health-passport" className="text-xs font-bold text-[#174E4A] hover:underline">
                  Edit
                </Link>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#627472]">Allergies:</span>
                  <span className="font-semibold text-[#263735]">
                    {passport?.allergies?.length ? passport.allergies.join(", ") : "None reported"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#627472]">Medications:</span>
                  <span className="font-semibold text-[#263735]">
                    {passport?.medications?.length ? passport.medications.join(", ") : "None reported"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#627472]">Conditions:</span>
                  <span className="font-semibold text-[#263735]">
                    {passport?.conditions?.length ? passport.conditions.join(", ") : "None reported"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Recorded Health Assessments */}
        {assessments.length > 0 && (
          <Card className="border-[#EDE8DF] shadow-xs">
            <CardHeader className="pb-3 border-b border-[#EDE8DF] flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base text-[#263735] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#174E4A]" />
                  All Recorded Health Assessments ({assessments.length})
                </CardTitle>
                <CardDescription className="text-xs text-[#627472]">
                  Every assessment you complete is tracked and preserved across your continuous recovery journey
                </CardDescription>
              </div>
              <Link href="/journeys" className="text-xs text-[#174E4A] font-bold hover:underline flex items-center gap-1">
                View All Journeys <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-3">
                {assessments.map((a, idx) => {
                  const risk = healthStore.getRiskAssessment(a.id);
                  return (
                    <div
                      key={a.id}
                      className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF] hover:border-[#174E4A]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#263735]">{a.title}</span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold bg-[#EFF7F1] text-[#174E4A] border border-[#DDEBE2] px-2 py-0.5 rounded-full">
                              Latest
                            </span>
                          )}
                          {risk && <RiskBadge tier={risk.tier} size="sm" />}
                        </div>
                        <p className="text-xs text-[#627472] line-clamp-1">
                          &quot;{a.primary_concern}&quot;
                        </p>
                        <span className="text-[10px] text-[#627472]/80">
                          Started: {formatDate(a.started_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <Link href={`/assessment/${a.id}/result`}>
                          <Button size="sm" variant="outline" className="text-xs h-8 border-[#EDE8DF] text-[#174E4A]">
                            View Plan <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Symptom Trajectory Comparison Section */}
        {activeAssessment && (
          <Card className="border-[#EDE8DF] shadow-xs">
            <CardHeader className="pb-3 border-b border-[#EDE8DF] flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base text-[#263735] flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-[#174E4A]" />
                  Symptom Trajectory Analysis
                </CardTitle>
                <CardDescription className="text-xs text-[#627472]">
                  Tracking baseline severity against active check-in progression for &quot;{activeAssessment.title}&quot;
                </CardDescription>
              </div>
              <Link href="/timeline" className="text-xs text-[#174E4A] font-bold hover:underline flex items-center gap-1">
                View Detailed Timeline <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-5">
              {(() => {
                const activeSymptoms = healthStore.getSymptoms(activeAssessment.id);
                const baselineSeverity = activeSymptoms[0]?.severity ?? 5;
                const activeFollowUp = followUps.find((f) => f.assessment_id === activeAssessment.id);
                const activeResponse = activeFollowUp
                  ? healthStore.getFollowUpResponses().find((r) => r.follow_up_id === activeFollowUp.id)
                  : undefined;
                const diff = activeResponse ? activeResponse.severity - baselineSeverity : 0;

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EDE8DF]">
                      <span className="text-[10px] font-bold uppercase text-[#627472] block">Baseline Severity</span>
                      <div className="text-2xl font-bold text-[#263735] mt-1">{baselineSeverity} / 10</div>
                      <div className="text-[11px] text-[#627472] mt-0.5">Recorded at initial assessment</div>
                    </div>

                    <div className={cn(
                      "p-4 rounded-2xl border",
                      activeResponse
                        ? diff > 0
                          ? "bg-amber-50 border-amber-200"
                          : "bg-emerald-50 border-emerald-200"
                        : "bg-[#FAF8F3] border-[#EDE8DF]"
                    )}>
                      <span className={cn(
                        "text-[10px] font-bold uppercase block",
                        activeResponse && diff > 0 ? "text-amber-900" : "text-[#627472]"
                      )}>
                        Check-in Severity
                      </span>
                      <div className={cn(
                        "text-2xl font-bold mt-1",
                        activeResponse && diff > 0 ? "text-amber-950" : "text-[#263735]"
                      )}>
                        {activeResponse ? `${activeResponse.severity} / 10` : "Pending"}
                      </div>
                      <div className={cn(
                        "text-[11px] mt-0.5",
                        activeResponse && diff > 0 ? "text-amber-800" : "text-[#627472]"
                      )}>
                        {activeResponse
                          ? `${diff > 0 ? `+${diff} escalation` : diff < 0 ? `${diff} improvement` : "Stable"} (${activeResponse.outcome.replace("_", " ")})`
                          : `Scheduled in ${riskAssessment?.follow_up_hours || 24} hours`}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#EFF7F1] border border-[#DDEBE2]">
                      <span className="text-[10px] font-bold uppercase text-[#174E4A] block">Care Pathway Status</span>
                      <div className="text-sm font-bold text-[#174E4A] mt-2">
                        {riskAssessment
                          ? riskAssessment.tier === "urgent"
                            ? "Urgent Medical Care"
                            : riskAssessment.tier === "see-a-doctor"
                            ? "In-Person Clinic Evaluation"
                            : riskAssessment.tier === "monitor"
                            ? "Structured 24h Monitoring"
                            : "Supportive Self-Care"
                          : "Active Recovery"}
                      </div>
                      <div className="text-[11px] text-[#627472] mt-0.5 line-clamp-1">
                        {riskAssessment?.recommended_next_step || "Monitoring symptoms"}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Timeline Events Snippet */}
        <Card className="border-[#EDE8DF] shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#EDE8DF] pb-3">
            <div>
              <CardTitle className="text-base text-[#263735]">Recent Health Timeline</CardTitle>
              <CardDescription className="text-xs text-[#627472]">
                Audit trail of reported symptoms, adaptive questions, and scheduled follow-ups
              </CardDescription>
            </div>
            <Link href="/timeline" className="text-xs text-[#174E4A] font-bold hover:underline flex items-center gap-1">
              Full Timeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-5">
            {timeline.length > 0 ? (
              <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EDE8DF]">
                {timeline.slice(0, 3).map((event) => (
                  <div key={event.id} className="relative">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#174E4A] ring-4 ring-white" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="text-xs font-bold text-[#263735]">{event.title}</span>
                      <span className="text-[11px] text-[#627472]">{formatDate(event.created_at)}</span>
                    </div>
                    <p className="text-xs text-[#627472] mt-1">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#627472] text-center py-4">No events recorded yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Clinical Disclaimer */}
        <Disclaimer variant="card" />
      </div>
    </AppShell>
  );
}
