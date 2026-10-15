import React from "react";
import { cn } from "@/lib/utils";
import type { TriageTier } from "@/types/database";
import { ShieldCheck, Eye, Stethoscope, AlertTriangle } from "lucide-react";

interface RiskBadgeProps {
  tier: TriageTier;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function RiskBadge({
  tier,
  size = "md",
  showIcon = true,
  className,
}: RiskBadgeProps) {
  const configs = {
    "self-care": {
      label: "Self-Care",
      desc: "Supportive home recovery",
      icon: ShieldCheck,
      classes: "bg-[#EBF3ED] text-[#24542E] border-[#8FB996]/40",
      dotClass: "bg-[#52815A]",
    },
    monitor: {
      label: "Monitor Closely",
      desc: "Structured follow-up required",
      icon: Eye,
      classes: "bg-[#F0F7F7] text-[#2A6F6F] border-[#8FC5C2]/40",
      dotClass: "bg-[#2A6F6F]",
    },
    "see-a-doctor": {
      label: "See a Healthcare Professional",
      desc: "Clinical evaluation recommended",
      icon: Stethoscope,
      classes: "bg-[#FFF8EE] text-[#9A5B13] border-[#F2C99C]/50",
      dotClass: "bg-[#C4751A]",
    },
    urgent: {
      label: "Urgent Attention Needed",
      desc: "Prompt emergency/urgent evaluation",
      icon: AlertTriangle,
      classes: "bg-[#FDF0ED] text-[#AB371C] border-[#E0674B]/40",
      dotClass: "bg-[#E0674B]",
    },
  };

  const config = configs[tier] || configs["monitor"];
  const Icon = config.icon;

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1 gap-1.5",
    md: "text-sm px-3.5 py-1.5 gap-2",
    lg: "text-base px-4.5 py-2.5 gap-2.5 font-semibold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium shadow-xs",
        config.classes,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <Icon className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{config.label}</span>
    </div>
  );
}

