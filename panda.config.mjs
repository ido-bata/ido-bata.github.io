import { defineConfig } from "@pandacss/dev";

/**
 * Panda CSS configuration.
 *
 * Design tokens, semantic tokens, and recipes for the ido-bata website.
 * Generated code lives in `src/styled-system/` and is NOT committed.
 *
 * Refs:
 *   - docs/architecture.md#デザインシステム
 *   - Issue #22 (theme switching)
 *   - Issue #40
 */
export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude (use glob patterns; regex is not JSON-serializable in
  // panda's config serializer and triggers "Expected a string" on Node 24)
  exclude: ["**/styled-system/**", "**/next-env.d.ts", "**/.tmp/**", "**/node_modules/**"],

  // Custom selectors that drive conditional CSS.
  // Issue #22: dark theme is toggled by setting `data-theme="dark"` on
  // `<html>` (so a single attribute flip switches the entire page, and
  // the FOUC-prevention script can apply it before paint without needing
  // to manage a separate class). The `_darkTheme` / `_lightTheme`
  // condition keys then resolve to `[data-theme="dark"] &` and
  // `[data-theme="light"] &` respectively inside semantic tokens.
  // `motionSafe` / `motionReduce` wrap `prefers-reduced-motion` so
  // animations / transitions can be gated to honour WCAG 2.3.3.
  conditions: {
    extend: {
      darkTheme: '[data-theme="dark"] &',
      lightTheme: '[data-theme="light"] &',
      motionSafe: "@media (prefers-reduced-motion: no-preference)",
      motionReduce: "@media (prefers-reduced-motion: reduce)",
    },
  },

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
          0: { value: "0" },
          1: { value: "0.25rem" },
          2: { value: "0.5rem" },
          3: { value: "0.75rem" },
          4: { value: "1rem" },
          5: { value: "1.25rem" },
          6: { value: "1.5rem" },
          8: { value: "2rem" },
          10: { value: "2.5rem" },
          12: { value: "3rem" },
          16: { value: "4rem" },
          20: { value: "5rem" },
          24: { value: "6rem" },
          32: { value: "8rem" },
        },
        // Layout primitives. See .agents/skills/layout-system.
        // Single source of truth for content width / gutter / rhythm.
        // Recipes (`container`, `section`, `stack`, `grid`, `cluster`
        // in `src/styles/recipes.ts`) consume these so that no page
        // hard-codes a width.
        layout: {
          contentMax: { value: "72rem" }, // 1152px — portal pages
          narrowMax: { value: "48rem" }, // 768px — FAQ / rules
          wideMax: { value: "84rem" }, // 1344px — hero / marketing bands
          sectionGap: { value: "4rem" }, // 64px — rhythm between page sections
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
          // Body font: Noto Sans JP — high legibility for mixed
          // Japanese / Latin copy. CSS variable is registered by
          // `next/font/google` in `src/app/layout.tsx`.
          sans: { value: "var(--font-noto-sans-jp), system-ui, sans-serif" },
          // Display font: Zen Kaku Gothic New — heavier, geometric
          // sans-serif reserved for headings (h1–h6) so the page
          // reads as a marketing LP rather than a docs site.
          display: { value: "var(--font-zen-kaku), system-ui, sans-serif" },
          // Material Icons font — referenced by `.material-icons` /
          // `.material-icons-outlined` utility classes so any span
          // can render an icon glyph by its ligature name. The font
          // is loaded from the Google Fonts CDN (see layout.tsx) so
          // we point at the literal family name rather than a CSS
          // variable.
          icon: { value: "'Material Icons'" },
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
            value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          lg: {
            value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: {
              value: {
                base: "white",
                _darkTheme: "{colors.neutral.950}",
                _lightTheme: "white",
              },
            },
            subtle: {
              value: {
                base: "{colors.neutral.50}",
                _darkTheme: "{colors.neutral.900}",
                _lightTheme: "{colors.neutral.50}",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.100}",
                _darkTheme: "{colors.neutral.800}",
                _lightTheme: "{colors.neutral.100}",
              },
            },
          },
          fg: {
            DEFAULT: {
              value: {
                base: "{colors.neutral.900}",
                _darkTheme: "{colors.neutral.50}",
                _lightTheme: "{colors.neutral.900}",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.600}",
                _darkTheme: "{colors.neutral.400}",
                _lightTheme: "{colors.neutral.600}",
              },
            },
            subtle: {
              value: {
                base: "{colors.neutral.500}",
                _darkTheme: "{colors.neutral.500}",
                _lightTheme: "{colors.neutral.500}",
              },
            },
            onAccent: {
              value: {
                base: "white",
                _darkTheme: "white",
                _lightTheme: "white",
              },
            },
          },
          border: {
            DEFAULT: {
              value: {
                base: "{colors.neutral.200}",
                _darkTheme: "{colors.neutral.800}",
                _lightTheme: "{colors.neutral.200}",
              },
            },
            // Subtle hairline used inside cards / list rows where a
            // quiet inner separator is desired without being invisible.
            subtle: {
              value: {
                base: "{colors.neutral.100}",
                _darkTheme: "{colors.neutral.900}",
                _lightTheme: "{colors.neutral.100}",
              },
            },
            // Page-chrome hairline (Header bottom, Footer top, inner
            // legal row). Lower contrast than `subtle` — it is a
            // structural divider, not a content edge, so it should
            // recede into the canvas. Uses low-alpha neutral so the
            // line stays consistent across light / dark and isn't
            // affected by the sticky header's backdrop blur.
            hairline: {
              value: {
                base: "rgba(0, 0, 0, 0.06)",
                _darkTheme: "rgba(255, 255, 255, 0.06)",
                _lightTheme: "rgba(0, 0, 0, 0.06)",
              },
            },
            strong: {
              value: {
                base: "{colors.neutral.300}",
                _darkTheme: "{colors.neutral.700}",
                _lightTheme: "{colors.neutral.300}",
              },
            },
          },
          accent: {
            DEFAULT: {
              value: {
                base: "{colors.accent.600}",
                _darkTheme: "{colors.accent.500}",
                _lightTheme: "{colors.accent.600}",
              },
            },
            fg: {
              value: {
                base: "white",
                _darkTheme: "white",
                _lightTheme: "white",
              },
            },
          },
        },
      },
    },
  },

  globalCss: {
    "html, body": {
      margin: "0",
      padding: "0",
    },
    // Tell the browser the page supports both color schemes so native
    // chrome (form controls, scrollbars, default link colors) follows
    // the active theme. Issue #22.
    html: {
      height: "100%",
      colorScheme: "light dark",
    },
    body: {
      // Sticky-footer shell. body is a flex column that is at least
      // the viewport tall; `<main>` (declared below) takes the slack
      // via `flex: 1`, so when content is short the Footer still
      // sits at the bottom of the viewport instead of right under
      // the last paragraph. When content overflows, body grows with
      // it (min-height, not height) so the page scrolls normally.
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "sans",
      lineHeight: "normal",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    // Page-level `<main>` expands inside the body flex column so the
    // footer is pushed to the bottom of the viewport on short pages.
    main: {
      flex: "1 0 auto",
      display: "flex",
      flexDirection: "column",
    },
    // Heading typography: switch the family to the Zen Kaku Gothic
    // New variable so every page heading shares a consistent
    // geometric display voice. Weight / size / letter-spacing are
    // set per-call via Panda recipes so callers stay in control.
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "display",
      fontWeight: "bold",
      letterSpacing: "-0.02em",
      lineHeight: "tight",
    },
    // Material Icons ligature class. The font is loaded via
    // `next/font/google` (Material_Icons) and registered as a CSS
    // variable in `src/app/layout.tsx`. Components render icons by
    //    <span className={iconClass}>icon_name</span>
    // and the font's ligatures substitute the glyph automatically.
    ".material-icons, .material-icons-outlined, .material-icons-round, .material-icons-sharp": {
      fontFamily: "icon",
      fontWeight: "normal",
      fontStyle: "normal",
      display: "inline-block",
      lineHeight: "1",
      textTransform: "none",
      letterSpacing: "normal",
      wordWrap: "normal",
      whiteSpace: "nowrap",
      direction: "ltr",
      WebkitFontSmoothing: "antialiased",
      textRendering: "optimizeLegibility",
      MozOsxFontSmoothing: "grayscale",
      fontFeatureSettings: "liga",
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
