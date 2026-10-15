import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "urgent" | "subtle";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 shadow-xs",
      md: "text-sm px-4 py-2.5 gap-2 shadow-xs",
      lg: "text-base px-6 py-3.5 gap-2.5 shadow-sm",
    };

    const variantStyles = {
      primary:
        "bg-[#2A6F6F] hover:bg-[#225959] text-white focus-visible:ring-[#2A6F6F]",
      secondary:
        "bg-[#8FB996] hover:bg-[#7ca883] text-[#173737] focus-visible:ring-[#8FB996]",
      outline:
        "border border-[#D1DDD3] bg-white hover:bg-[#F2F7F4] text-[#173737] focus-visible:ring-[#2A6F6F]",
      ghost:
        "text-[#173737] hover:bg-[#EBF3ED] focus-visible:ring-[#2A6F6F]",
      urgent:
        "bg-[#E0674B] hover:bg-[#cb4628] text-white focus-visible:ring-[#E0674B]",
      subtle:
        "bg-[#EBF3ED] text-[#2A6F6F] hover:bg-[#d8e8dc] focus-visible:ring-[#2A6F6F]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

