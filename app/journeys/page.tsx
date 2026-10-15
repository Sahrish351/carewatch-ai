"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/ui/risk-badge";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import { PlusCircle, Compass, ArrowRight, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import type { Assessment, RiskAssessment } from "@/types/database";

export default function JourneysPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [riskMap, setRiskMap] = useState<Record<string, RiskAssessment>>({});

  useEffect(() => {
    const list = healthStore.getAssessments();
    setAssessments(list);

    const map: Record<string, RiskAssessment> = {};
    list.forEach((a) => {
      const r = healthStore.getRiskAssessment(a.id);
      if (r) map[a.id] = r;
    });
    setRiskMap(map);
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Persistent Health Journeys</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-[#173737]">
              My Health Journeys
            </h1>
            <p className="text-sm text-[#657777]">
              Every health concern is tracked as a persistent journey with intake, questions, triage, follow-up, and resolution.
            </p>
          </div>

          <Link href="/assessment/new">
            <Button size="md">
              <PlusCircle className="w-4 h-4 mr-1.5" /> Start New Journey
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((a) => {
            const risk = riskMap[a.id];
            return (
              <Card key={a.id} className="hover:border-[#2A6F6F]/40 transition-all flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#657777]">
                      Started {formatDate(a.started_at)}
                    </span>
                    {risk && <RiskBadge tier={risk.tier} size="sm" />}
                  </div>
                  <CardTitle className="text-xl">{a.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs text-[#657777] leading-relaxed line-clamp-2">
                    &quot;{a.primary_concern}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EDE8DF] text-xs">
                    <span className="capitalize px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#EDE8DF] text-[#173737] font-medium">
                      Status: {a.status.replace("_", " ")}
                    </span>
                    <Link href={`/assessment/${a.id}/result`}>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Plan <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

