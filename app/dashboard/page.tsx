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
} from "lucide-react";
import type { Assessment, FollowUp, TimelineEvent, ActionPlan, RiskAssessment } from "@/types/database";

export default function DashboardPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | undefined>();

  useEffect(() => {
    // Load state from healthStore
    const userAssessments = healthStore.getAssessments();
    const userFollowUps = healthStore.getFollowUps();
    const userTimeline = healthStore.getTimelineEvents();
    const userPlans = healthStore.getAllActionPlans();

    setAssessments(userAssessments);
    setFollowUps(userFollowUps);
    setTimeline(userTimeline);
    setActionPlans(userPlans);

    if (userAssessments.length > 0) {
      setRiskAssessment(healthStore.getRiskAssessment(userAssessments[0].id));
    }
  }, []);

  const activeAssessment = assessments.find((a) => a.status !== "resolved");
  const dueFollowUp = followUps.find((f) => f.status === "due" || f.status === "scheduled");

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Recovery Assistant</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#173737]">
              Good day, Dr. Sarah
            </h1>
            <p className="text-sm text-[#657777]">
              How are you feeling today? CareWatch is monitoring your continuous care journey.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/assessment/new">
              <Button size="md" className="shadow-sm">
                <PlusCircle className="w-4 h-4 mr-1.5" /> Start a Health Check
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Banner Alert if Check-in is due */}
        {dueFollowUp && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Follow-Up Check-in Due Now
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                    Action Needed
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  Your 24-hour check-in for <strong>&quot;{activeAssessment?.title || "Persistent Headache"}&quot;</strong> is ready. Please report how your symptoms have progressed.
                </p>
              </div>
            </div>
            <Link href={`/follow-ups/${dueFollowUp.id}`}>
              <Button size="sm" className="bg-amber-800 hover:bg-amber-900 text-white shrink-0">
                Complete Check-in <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        )}

        {/* Grid: Active Journey & Upcoming Check-in */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Health Journey */}
          <div className="lg:col-span-7">
            <Card className="h-full flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
                    Current Episode
                  </span>
                  <CardTitle className="text-xl mt-1">
                    {activeAssessment ? activeAssessment.title : "No Active Journey"}
                  </CardTitle>
                </div>
                {riskAssessment && (
                  <RiskBadge tier={riskAssessment.tier} size="sm" />
                )}
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                {activeAssessment ? (
                  <>
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF]">
                      <span className="text-[11px] font-semibold uppercase text-[#657777] block mb-1">
                        Reported Concern
                      </span>
                      <p className="text-sm font-medium text-[#173737]">
                        &quot;{activeAssessment.primary_concern}&quot;
                      </p>
                    </div>

                    {riskAssessment && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#657777]">Triage Guidance:</span>
                          <span className="font-semibold text-[#173737]">
                            {riskAssessment.recommended_next_step}
                          </span>
                        </div>
                        <p className="text-xs text-[#657777] leading-relaxed">
                          {riskAssessment.summary}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs text-[#657777] border-t border-[#F4EFEB]">
                      <span>Started: {formatDate(activeAssessment.started_at)}</span>
                      <Link
                        href={`/assessment/${activeAssessment.id}/result`}
                        className="text-[#2A6F6F] font-semibold hover:underline flex items-center gap-1"
                      >
                        View Full Clinical Plan <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#8FB996] mx-auto" />
                    <h3 className="font-bold text-sm text-[#173737]">Your care journey starts here</h3>
                    <p className="text-xs text-[#657777] max-w-sm mx-auto">
                      Describe what&apos;s bothering you and CareWatch will guide you through an adaptive, safety-informed assessment.
                    </p>
                    <Link href="/assessment/new">
                      <Button size="sm" className="mt-2">
                        Start Your First Health Check
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Passport Overview */}
          <div className="lg:col-span-5 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Direct shortcuts to your care records</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 pt-0">
                <Link
                  href="/assessment/new"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#2A6F6F]/40 hover:bg-[#F0F7F7] transition-all flex flex-col gap-2"
                >
                  <PlusCircle className="w-5 h-5 text-[#2A6F6F]" />
                  <span className="text-xs font-bold text-[#173737]">New Assessment</span>
                </Link>
                <Link
                  href="/timeline"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#2A6F6F]/40 hover:bg-[#F0F7F7] transition-all flex flex-col gap-2"
                >
                  <Milestone className="w-5 h-5 text-[#2A6F6F]" />
                  <span className="text-xs font-bold text-[#173737]">View Timeline</span>
                </Link>
                <Link
                  href="/follow-ups"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#2A6F6F]/40 hover:bg-[#F0F7F7] transition-all flex flex-col gap-2"
                >
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span className="text-xs font-bold text-[#173737]">Follow-up Loop</span>
                </Link>
                <Link
                  href="/health-passport"
                  className="p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#2A6F6F]/40 hover:bg-[#F0F7F7] transition-all flex flex-col gap-2"
                >
                  <FileBadge2 className="w-5 h-5 text-[#2A6F6F]" />
                  <span className="text-xs font-bold text-[#173737]">Health Passport</span>
                </Link>
              </CardContent>
            </Card>

            {/* Active Action Plan Snippet */}
            {actionPlans.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-[#2A6F6F]" />
                      Active Action Plan
                    </CardTitle>
                    <Link href="/action-plans" className="text-xs text-[#2A6F6F] font-semibold hover:underline">
                      View all
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <p className="text-xs text-[#657777]">
                    {actionPlans[0].summary}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {actionPlans[0].immediate_steps.slice(0, 2).map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#173737]">
                        <span className="w-4 h-4 rounded-full bg-[#EBF3ED] text-[#2A6F6F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Timeline Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Care Activity</CardTitle>
              <CardDescription>Chronological events from your active assessments and follow-ups</CardDescription>
            </div>
            <Link href="/timeline">
              <Button variant="ghost" size="sm" className="text-xs">
                Full Timeline <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeline.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#2A6F6F]/10 text-[#2A6F6F] flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#173737] truncate">
                      {event.title}
                    </span>
                    <span className="text-[11px] text-[#657777] shrink-0">
                      {formatDate(event.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-[#657777] mt-0.5">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Global Disclaimer */}
        <Disclaimer />
      </div>
    </AppShell>
  );
}

