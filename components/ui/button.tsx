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
        "bg-[#174E4A] hover:bg-[#103835] text-white focus-visible:ring-[#174E4A]",
      secondary:
        "bg-[#DDEBE2] hover:bg-[#cbe0d2] text-[#174E4A] focus-visible:ring-[#174E4A]",
      outline:
        "border border-[#EDE8DF] bg-white hover:bg-[#FAF8F3] text-[#263735] focus-visible:ring-[#174E4A]",
      ghost:
        "text-[#263735] hover:bg-[#EFF7F1] focus-visible:ring-[#174E4A]",
      urgent:
        "bg-[#DC2626] hover:bg-[#B91C1C] text-white focus-visible:ring-[#DC2626]",
      subtle:
        "bg-[#EFF7F1] text-[#174E4A] hover:bg-[#DDEBE2] focus-visible:ring-[#174E4A]",
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

