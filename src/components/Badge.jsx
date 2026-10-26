/**
 * @file src/components/Badge.jsx
 * @description Reusable status badge primitive with support for neutral, accent, and telemetry variants.
 * @responsibility Render small metadata tags with optional animated telemetry status indicators.
 */

import React from "react";

const badgeVariants = {
  neutral:
    "bg-surfaceElevated text-textSecondary border-borderSubtle",
  pink:
    "bg-pink/15 text-pink-soft border-pink/35",
  crimson:
    "bg-pink/15 text-pink-soft border-pink/35",
  telemetry:
    "bg-accent/10 text-accent border-accent/30",
  accent:
    "bg-accent/10 text-accent border-accent/30",
};

/**
 * @param {Object} props
 * @param {'neutral'|'accent'|'telemetry'|'pink'|'crimson'} [props.variant='neutral'] - Visual badge theme.
 * @param {boolean} [props.pulse=false] - Whether to show an animated pulsing telemetry dot.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @param {React.ReactNode} props.children - Badge content.
 */
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
          className={`w-2 h-2 rounded-full ${
            variant === "pink" || variant === "crimson" ? "bg-pink" : "bg-accent"
          } animate-pulse`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
