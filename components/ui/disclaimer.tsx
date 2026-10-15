import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  className?: string;
  variant?: "banner" | "card" | "inline";
}

export function Disclaimer({ className, variant = "banner" }: DisclaimerProps) {
  if (variant === "inline") {
    return (
      <p className={cn("text-xs text-[#657777] flex items-center gap-1.5", className)}>
        <Info className="w-3.5 h-3.5 text-[#2A6F6F] shrink-0" />
        <span>CareWatch does not diagnose or prescribe. In emergencies, call emergency services immediately.</span>
      </p>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-[#EDE8DF] bg-[#FAF8F5] p-3.5 flex items-start gap-3 text-xs text-[#657777] leading-relaxed",
        className
      )}
    >
      <div className="w-5 h-5 rounded-md bg-[#2A6F6F]/10 flex items-center justify-center shrink-0 mt-0.5">
        <Info className="w-3.5 h-3.5 text-[#2A6F6F]" />
      </div>
      <div>
        <strong className="text-[#173737] font-semibold">Important Health & Safety Notice: </strong>
        CareWatch AI provides informational triage navigation and supportive recovery tracking. It does not provide formal medical diagnoses or prescribe medication. If you experience severe or life-threatening symptoms, seek immediate emergency medical care.
      </div>
    </div>
  );
}

