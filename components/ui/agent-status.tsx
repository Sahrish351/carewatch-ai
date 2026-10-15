import React from "react";
import { Sparkles, Brain, Search, Clock, FileCheck } from "lucide-react";

interface AgentStatusProps {
  status:
    | "intake"
    | "questioning"
    | "triage"
    | "evidence"
    | "planning"
    | "reassessing"
    | "idle";
  customMessage?: string;
}

export function AgentStatus({ status, customMessage }: AgentStatusProps) {
  if (status === "idle") return null;

  const statusConfigs = {
    intake: {
      label: "Understanding your concern...",
      agent: "Intake Agent",
      icon: Brain,
    },
    questioning: {
      label: "Identifying what information is missing...",
      agent: "Question Agent",
      icon: Search,
    },
    triage: {
      label: "Evaluating clinical urgency...",
      agent: "Triage Agent",
      icon: Sparkles,
    },
    evidence: {
      label: "Reviewing relevant clinical guidance...",
      agent: "Evidence Agent",
      icon: Search,
    },
    planning: {
      label: "Preparing your evidence-informed action plan...",
      agent: "Action Plan Agent",
      icon: FileCheck,
    },
    reassessing: {
      label: "Comparing follow-up changes with baseline...",
      agent: "Reassessment Agent",
      icon: Clock,
    },
  };

  const current = statusConfigs[status];
  const Icon = current.icon;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F0F7F7] border border-[#BDDEDC]/60 text-[#2A6F6F] text-xs md:text-sm animate-pulse-subtle">
      <div className="w-6 h-6 rounded-lg bg-[#2A6F6F]/10 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-[#2A6F6F] animate-spin-slow" />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-[#173737]">
          {customMessage || current.label}
        </span>
        <span className="text-[11px] text-[#657777]">
          Active Service: {current.agent}
        </span>
      </div>
    </div>
  );
}

