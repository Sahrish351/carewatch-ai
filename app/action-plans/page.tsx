"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/navigation/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/ui/disclaimer";
import { healthStore } from "@/lib/services/storage-service";
import { formatDate } from "@/lib/utils";
import { FileCheck2, CheckCircle2, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import type { ActionPlan, Assessment } from "@/types/database";

export default function ActionPlansPage() {
  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [assessmentsMap, setAssessmentsMap] = useState<Record<string, Assessment>>({});

  useEffect(() => {
    const list = healthStore.getAllActionPlans();
    setPlans(list);

    const assts = healthStore.getAssessments();
    const map: Record<string, Assessment> = {};
    assts.forEach((a) => {
      map[a.id] = a;
    });
    setAssessmentsMap(map);
  }, []);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6F6F] bg-[#EBF3ED] px-3 py-1 rounded-full mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Structured Care Protocols</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#173737]">
            Active Action Plans
          </h1>
          <p className="text-sm text-[#657777]">
            Evidence-informed next-step pathways, monitoring instructions, and red-flag escalation rules.
          </p>
        </div>

        <div className="space-y-6">
          {plans.map((plan) => {
            const assessment = assessmentsMap[plan.assessment_id];
            return (
              <Card key={plan.id} className="p-6 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EDE8DF]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2A6F6F]">
                      Plan for Episode
                    </span>
                    <h2 className="font-display text-xl font-bold text-[#173737]">
                      {assessment?.title || "Clinical Action Plan"}
                    </h2>
                  </div>
                  <Badge variant="outline">
                    Updated {formatDate(plan.updated_at)}
                  </Badge>
                </div>

                <p className="text-sm text-[#657777] leading-relaxed">
                  {plan.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-2">
                    <span className="text-xs font-bold text-[#173737] block">
                      Immediate Comfort Steps
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#657777]">
                      {plan.immediate_steps.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6F6F] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE8DF] space-y-2">
                    <span className="text-xs font-bold text-[#173737] block">
                      What to Monitor
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#657777]">
                      {plan.monitoring_guidance.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8FB996] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FDF0ED] border border-[#E0674B]/30 space-y-2">
                    <span className="text-xs font-bold text-[#AB371C] block">
                      When to Seek Help
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#AB371C]">
                      {plan.when_to_seek_care.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#E0674B] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#EDE8DF] text-xs">
                  <span className="text-[#657777] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2A6F6F]" />
                    {plan.follow_up_timing}
                  </span>
                  <Link href={`/assessment/${plan.assessment_id}/result`}>
                    <Button variant="ghost" size="sm">
                      View Full Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}

