// src/components/styles/theme.ts

export const theme = {
  colors: {
    // Background
    bgPrimary: "#050816",
    bgSecondary: "#020308",
    bgCard: "rgba(10, 14, 36, 0.96)",
    bgOverlay: "rgba(5, 8, 22, 0.9)",

    // Text
    textPrimary: "#f5f5f5",
    textSecondary: "#ccccdd",
    textAccent: "#cfd3ff",
    textHighlight: "#8fffe0",
    textTime: "#ffd98f",
    textMuted: "#9ba0d0",

    // Accents
    accentBlue: "#a9b0ff",
    accentGreen: "rgba(118, 255, 218, 0.9)",
    accentOrange: "#ffdca8",

    // Borders
    borderLight: "rgba(255, 255, 255, 0.08)",
    borderMedium: "rgba(255, 255, 255, 0.15)",
    borderHeavy: "rgba(255, 255, 255, 0.4)",

    // World: Miller
    millerCore: "radial-gradient(circle at 30% 20%, #ffffff, #7bd1ff, #1b344d)",
    millerOrbit:
      "radial-gradient(circle at 30% 20%, #ffffff, #b5e6ff, #4a8ad1)",
    millerGlow: "rgba(123, 209, 255, 0.9)",
    millerGlowOuter: "rgba(70, 160, 255, 0.6)",

    // World: Endurance
    enduranceCore:
      "radial-gradient(circle at 30% 20%, #ffffff, #ffd27b, #4d341b)",
    enduranceOrbit:
      "radial-gradient(circle at 30% 20%, #ffffff, #ffe2b5, #d18a4a)",
    enduranceGlow: "rgba(255, 210, 123, 0.9)",
    enduranceGlowOuter: "rgba(255, 186, 70, 0.6)",

    // Observer
    observerBg: "radial-gradient(circle at 30% 20%, #ffffff, #76ffda, #167d65)",
    observerGlow: "rgba(118, 255, 218, 0.9)",
    observerGlowOuter: "rgba(118, 255, 218, 0.4)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  borderRadius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    full: "999px",
  },

  fontSize: {
    xs: "10px",
    sm: "11px",
    md: "12px",
    base: "13px",
    lg: "20px",
  },

  shadows: {
    card: "0 18px 40px rgba(0, 0, 0, 0.8)",
    menu: "0 16px 32px rgba(0, 0, 0, 0.65)",
    glow: "0 0 12px",
  },

  breakpoints: {
    mobile: "720px",
  },

  transitions: {
    fast: "0.14s ease-out",
    medium: "0.2s ease-out",
  },
} as const;

export type Theme = typeof theme;
