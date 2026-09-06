import { defineConfig } from "@pandacss/dev";

/**
 * Panda CSS configuration.
 *
 * Design tokens, semantic tokens, and recipes for the ido-bata website.
 * Generated code lives in `src/styled-system/` and is NOT committed.
 *
 * Refs:
 *   - docs/architecture.md#デザインシステム
 *   - Issue #40
 */
export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude (use glob patterns; regex is not JSON-serializable in
  // panda's config serializer and triggers "Expected a string" on Node 24)
  exclude: [
    "**/styled-system/**",
    "**/next-env.d.ts",
    "**/.tmp/**",
    "**/node_modules/**",
  ],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          // Brand-neutral palette. Swap freely.
          neutral: {
            50: { value: "#fafafa" },
            100: { value: "#f4f4f5" },
            200: { value: "#e4e4e7" },
            300: { value: "#d4d4d8" },
            400: { value: "#a1a1aa" },
            500: { value: "#71717a" },
            600: { value: "#52525b" },
            700: { value: "#3f3f46" },
            800: { value: "#27272a" },
            900: { value: "#18181b" },
            950: { value: "#09090b" },
          },
          accent: {
            50: { value: "#eff6ff" },
            500: { value: "#3b82f6" },
            600: { value: "#2563eb" },
            700: { value: "#1d4ed8" },
          },
        },
        spacing: {
          "0": { value: "0" },
          "1": { value: "0.25rem" },
          "2": { value: "0.5rem" },
          "3": { value: "0.75rem" },
          "4": { value: "1rem" },
          "5": { value: "1.25rem" },
          "6": { value: "1.5rem" },
          "8": { value: "2rem" },
          "10": { value: "2.5rem" },
          "12": { value: "3rem" },
          "16": { value: "4rem" },
          "20": { value: "5rem" },
          "24": { value: "6rem" },
          "32": { value: "8rem" },
        },
        radii: {
          none: { value: "0" },
          sm: { value: "0.25rem" },
          md: { value: "0.375rem" },
          lg: { value: "0.5rem" },
          xl: { value: "0.75rem" },
          "2xl": { value: "1rem" },
          full: { value: "9999px" },
        },
        fonts: {
          sans: { value: "var(--font-geist-sans), system-ui, sans-serif" },
          mono: { value: "var(--font-geist-mono), ui-monospace, monospace" },
        },
        fontSizes: {
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          md: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.25rem" },
          "2xl": { value: "1.5rem" },
          "3xl": { value: "1.875rem" },
          "4xl": { value: "2.25rem" },
          "5xl": { value: "3rem" },
        },
        fontWeights: {
          normal: { value: "400" },
          medium: { value: "500" },
          semibold: { value: "600" },
          bold: { value: "700" },
        },
        lineHeights: {
          tight: { value: "1.2" },
          normal: { value: "1.5" },
          relaxed: { value: "1.75" },
        },
        shadows: {
          sm: { value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
          md: {
            value:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          lg: {
            value:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: {
              value: { base: "white", _dark: "{colors.neutral.950}" },
            },
            subtle: {
              value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.900}" },
            },
            muted: {
              value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" },
            },
          },
          fg: {
            DEFAULT: {
              value: { base: "{colors.neutral.900}", _dark: "{colors.neutral.50}" },
            },
            muted: {
              value: { base: "{colors.neutral.600}", _dark: "{colors.neutral.400}" },
            },
            subtle: {
              value: { base: "{colors.neutral.500}", _dark: "{colors.neutral.500}" },
            },
            onAccent: {
              value: { base: "white", _dark: "white" },
            },
          },
          border: {
            DEFAULT: {
              value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.800}" },
            },
            strong: {
              value: { base: "{colors.neutral.300}", _dark: "{colors.neutral.700}" },
            },
          },
          accent: {
            DEFAULT: {
              value: { base: "{colors.accent.600}", _dark: "{colors.accent.500}" },
            },
            fg: {
              value: { base: "white", _dark: "white" },
            },
          },
        },
      },
    },
  },

  globalCss: {
    "html, body": {
      height: "100%",
      margin: "0",
      padding: "0",
    },
    body: {
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "sans",
      lineHeight: "normal",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
    },
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});