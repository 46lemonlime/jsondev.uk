/**
 * @file tailwind.config.js
 * @description Tailwind CSS configuration for the jsondev.uk Caribbean green design system.
 * @responsibility Define design tokens, custom colors, typography families, and theme extensions.
 */

import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base canvas and layered dark surfaces
        canvas: "#101110",
        surface: "#181A17",
        surfaceElevated: "#20231E",
        borderSubtle: "#30342C",
        borderAccent: "rgba(0, 204, 153, 0.35)",

        // Typography
        textPrimary: "#F1F2EC",
        textSecondary: "#A2A69C",
        textMuted: "#72776C",

        // Primary Accent: Caribbean Green Palette
        accent: {
          DEFAULT: "#00CC99",
          hover: "#00B588",
          dark: "#009E77",
          deep: "#005A44",
          highlight: "#17D1A3",
          soft: "#81E8CE",
          greenBlack: "#001611",
          muted: "rgba(0, 204, 153, 0.12)",
        },

        // Backward compatibility mappings for existing tokens
        primary: "#101110",
        secondary: "#00CC99",
        tertiary: "#81E8CE",
        dimWhite: "#A2A69C",
        dimBlue: "rgba(0, 204, 153, 0.08)",

        // Secondary Accent: Vivid Pink
        pink: {
          DEFAULT: "#F62975",
          hover: "#D81E63",
          dark: "#8A1240",
          soft: "#FFB2D1",
          muted: "rgba(246, 41, 117, 0.15)",
        },
        crimson: {
          DEFAULT: "#F62975",
          muted: "#D81E63",
          dark: "#8A1240",
          soft: "#FFB2D1",
        },
        telemetry: {
          DEFAULT: "#00CC99",
          emerald: "#17D1A3",
          muted: "rgba(0, 204, 153, 0.12)",
        },
      },
      fontFamily: {
        poppins: ["Inter", "Poppins", "sans-serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        pixel: [
          '"Silkscreen"',
          '"Geist Pixel Square"',
          "JetBrains Mono",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 20px 50px -12px rgba(0, 0, 0, 0.6)",
        accent: "0 0 25px -5px rgba(0, 204, 153, 0.25)",
        crimson: "0 0 25px -5px rgba(0, 204, 153, 0.25)",
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
