import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "urgent" | "success" | "warning";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#2A6F6F]/10 text-[#2A6F6F] border border-[#2A6F6F]/20",
    secondary: "bg-[#8FB996]/20 text-[#24542E] border border-[#8FB996]/30",
    outline: "border border-[#EDE8DF] text-[#657777] bg-white",
    urgent: "bg-[#E0674B]/15 text-[#AB371C] border border-[#E0674B]/30 font-semibold",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

