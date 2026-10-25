import React from "react";

const badgeVariants = {
  neutral:
    "bg-surfaceElevated text-textSecondary border-borderSubtle",
  crimson:
    "bg-crimson-muted text-crimson-soft border-crimson/30",
  telemetry:
    "bg-telemetry-muted text-telemetry border-telemetry/30",
};

const Badge = ({
  variant = "neutral",
  pulse = false,
  className = "",
  children,
}) => {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[12px] font-medium px-3 py-1 rounded-full border ${
        badgeVariants[variant] || badgeVariants.neutral
      } ${className}`}
    >
      {pulse && (
        <span
          className="w-2 h-2 rounded-full bg-telemetry animate-pulse"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
