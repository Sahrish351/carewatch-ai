"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import {
  Milestone,
  PlusCircle,
  Clock,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowRight,
} from "lucide-react";
import type { TimelineEvent } from "@/types/database";

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const res = await fetch("/api/assessment/list");
        if (res.ok) {
          const apiData = await res.json();
          healthStore.syncFromServer({
            timelineEvents: apiData.timelineEvents,
          });
        }
      } catch {}

      setEvents(healthStore.getTimelineEvents());
    };

    loadTimeline();
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "assessment_started":
        return PlusCircle;
      case "triage_completed":
        return Sparkles;
      case "follow_up_scheduled":
      case "follow_up_due":
        return Clock;
      case "check_in_completed":
        return Activity;
      case "reassessment_completed":
        return RefreshCw;
      case "resolved":
        return CheckCircle2;
      default:
        return Milestone;
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
              <Milestone className="w-3.5 h-3.5" />
              <span>Chronological Health Record</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#173737]">
              Health Timeline
            </h1>
            <p className="text-sm text-[#657777]">
              A complete chronological audit trail of all symptom assessments, adaptive questions, check-ins, and pathway escalations.
            </p>
          </div>

          <Link href="/assessment/new">
            <Button size="md">
              <PlusCircle className="w-4 h-4 mr-1.5" /> New Assessment
            </Button>
          </Link>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#EDE8DF] space-y-8 my-8 ml-3 sm:ml-4">
          {events.map((event, index) => {
            const Icon = getEventIcon(event.event_type);
            const isReassessment = event.event_type === "reassessment_completed";
            const isTriage = event.event_type === "triage_completed";

            return (
              <div key={event.id} className="relative group">
                {/* Timeline Node Pin */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${
                    isReassessment
                      ? "bg-amber-600 text-white"
                      : isTriage
                      ? "bg-[#2A6F6F] text-white"
                      : "bg-[#EBF3ED] text-[#2A6F6F]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Event Card */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isReassessment
                      ? "bg-[#FFF8EE] border-[#F2C99C]"
                      : "bg-white border-[#EDE8DF] hover:border-[#2A6F6F]/30"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-display text-base font-bold text-[#173737]">
                      {event.title}
                    </span>
                    <span className="text-xs text-[#657777] font-medium">
                      {formatDate(event.created_at)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#657777] leading-relaxed">
                    {event.description}
                  </p>

                  {event.assessment_id && (
                    <div className="pt-3 mt-3 border-t border-[#EDE8DF]/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#657777]">
                        Episode: {event.assessment_id}
                      </span>
                      <Link
                        href={`/assessment/${event.assessment_id}/result`}
                        className="text-[#2A6F6F] font-semibold hover:underline flex items-center gap-1"
                      >
                        View Episode Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

