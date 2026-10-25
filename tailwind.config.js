/**
 * @file tailwind.config.js
 * @description Tailwind CSS configuration for the Direction C obsidian/crimson design system.
 * @responsibility Define design tokens, custom colors, typography families, and theme extensions.
 */

import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy & Core Brand Tokens
        primary: "#07090e",
        secondary: "#ff004f",
        tertiary: "#fda4af",
        dimWhite: "#94a3b8",
        dimBlue: "rgba(255, 0, 79, 0.08)",

        // Direction C: Dual Accent (Crimson Protocol + Tactical Telemetry)
        canvas: "#07090e",
        surface: "#0f131d",
        surfaceElevated: "#161b28",
        borderSubtle: "rgba(255, 255, 255, 0.08)",
        borderAccent: "rgba(255, 0, 79, 0.45)",
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
        textMuted: "#64748b",
        crimson: {
          DEFAULT: "#ff004f",
          hover: "#ff1a66",
          soft: "#fda4af",
          muted: "rgba(255, 0, 79, 0.12)",
        },
        telemetry: {
          DEFAULT: "#a3e635",
          emerald: "#10b981",
          muted: "rgba(163, 230, 53, 0.12)",
        },
      },
      fontFamily: {
        poppins: ["Inter", "Poppins", "sans-serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 20px 50px -12px rgba(0, 0, 0, 0.6)",
        crimson: "0 0 25px -5px rgba(255, 0, 79, 0.35)",
      },
    },
    screens: {
      xs: "360px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [forms],
};
