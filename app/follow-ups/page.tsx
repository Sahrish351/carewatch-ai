"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Hourglass,
} from "lucide-react";
import type { FollowUp, Assessment } from "@/types/database";

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [assessmentsMap, setAssessmentsMap] = useState<Record<string, Assessment>>({});
  const [filter, setFilter] = useState<"all" | "due" | "scheduled" | "completed">("all");

  useEffect(() => {
    const fus = healthStore.getFollowUps();
    setFollowUps(fus);

    const assts = healthStore.getAssessments();
    const map: Record<string, Assessment> = {};
    assts.forEach((a) => {
      map[a.id] = a;
    });
    setAssessmentsMap(map);
  }, []);

  const filteredFollowUps = followUps.filter((f) => {
    if (filter === "all") return true;
    return f.status === filter;
  });

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Continuity Engine</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#173737]">
              Recovery Follow-ups & Check-ins
            </h1>
            <p className="text-sm text-[#657777]">
              Scheduled check-ins to monitor symptom trajectories and detect deterioration early.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#EDE8DF]">
            {(["all", "due", "scheduled", "completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-[#2A6F6F] text-white shadow-xs"
                    : "text-[#657777] hover:text-[#173737]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List of Follow-up Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFollowUps.map((fu) => {
            const assessment = assessmentsMap[fu.assessment_id];
            const isDue = fu.status === "due";
            const isCompleted = fu.status === "completed";

            return (
              <Card
                key={fu.id}
                className={`transition-all duration-300 ${
                  isDue ? "border-amber-300 bg-amber-50/40 shadow-sm" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#657777] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2A6F6F]" />
                      {isDue ? "Due Now" : isCompleted ? "Completed" : "Scheduled Check-in"}
                    </span>
                    {isDue ? (
                      <Badge variant="warning">Action Required</Badge>
                    ) : isCompleted ? (
                      <Badge variant="success">Completed</Badge>
                    ) : (
                      <Badge variant="outline">Scheduled</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-1">
                    {assessment ? assessment.title : "Health Follow-up"}
                  </CardTitle>
                  <CardDescription>
                    Scheduled for {formatDate(fu.scheduled_for)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="p-3 rounded-xl bg-white border border-[#EDE8DF] text-xs text-[#657777]">
                    <span className="font-semibold text-[#173737] block mb-0.5">
                      Baseline Concern:
                    </span>
                    &quot;{assessment?.primary_concern || "Reported health discomfort"}&quot;
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#657777]">
                      {isCompleted ? "Status: Checked in" : "Estimated time: 30 seconds"}
                    </span>
                    <Link href={`/follow-ups/${fu.id}`}>
                      <Button
                        size="sm"
                        variant={isDue ? "primary" : "outline"}
                        className={isDue ? "bg-amber-800 hover:bg-amber-900 text-white" : ""}
                      >
                        {isCompleted ? "View Check-in" : "Start Check-in"}{" "}
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredFollowUps.length === 0 && (
            <div className="col-span-2 py-16 text-center space-y-3 bg-white rounded-3xl border border-[#EDE8DF]">
              <CheckCircle2 className="w-10 h-10 text-[#8FB996] mx-auto" />
              <h3 className="font-bold text-base text-[#173737]">No follow-ups found in this view</h3>
              <p className="text-xs text-[#657777] max-w-sm mx-auto">
                Completed check-ins and scheduled reminders will automatically appear here as you log assessments.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

