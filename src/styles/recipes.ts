/**
 * Recipes - reusable component style definitions (cva).
 *
 * Add new recipes here when more than one component needs the same
 * variant logic. Keep primitive styling in `panda.config.ts` globalCss
 * and token-styleable inline patterns in CSS calls.
 *
 * Layout recipes (`container`, `section`, `stack`, `grid`, `cluster`)
 * implement the shared coordinate system described in
 * `.agents/skills/layout-system/SKILL.md`. The composition is roughly
 * modelled on Linear's site: a single source of truth for max-width
 * and gutter, with deliberate asymmetry inside sections (centered
 * hero bands, balanced 2-col splits, dense card grids). All pages
 * MUST compose these instead of hand-rolled maxWidth / padding
 * values.
 *
 * Refs:
 *   - panda.config.ts
 *   - docs/architecture.md#デザインシステム
 *   - .agents/skills/layout-system/SKILL.md
 */

import { cva } from "@/styled-system/css";

/**
 * Button recipe.
 * Variants: solid | outline | ghost
 * Sizes:    sm | md | lg
 */
export const button = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    fontWeight: "medium",
    borderRadius: "full",
    transition: "colors",
    cursor: "pointer",
    textDecoration: "none",
    border: "1px solid",
    borderColor: "transparent",
  },
  variants: {
    variant: {
      solid: {
        bg: "accent.DEFAULT",
        color: "accent.fg",
        _hover: { bg: "bg.muted" },
      },
      outline: {
        bg: "bg.canvas",
        color: "fg.DEFAULT",
        borderColor: "border",
        _hover: { bg: "bg.subtle" },
      },
      ghost: {
        bg: "transparent",
        color: "fg.DEFAULT",
        _hover: { bg: "bg.subtle" },
      },
    },
    size: {
      sm: { height: "8", px: "4", fontSize: "sm" },
      md: { height: "10", px: "4", fontSize: "sm" },
      lg: { height: "12", px: "6", fontSize: "md" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

/**
 * Surface recipe.
 * A neutral card / panel container.
 */
export const surface = cva({
  base: {
    bg: "bg.canvas",
    color: "fg.DEFAULT",
    borderRadius: "lg",
    border: "1px solid",
    borderColor: "border",
  },
  variants: {
    elevation: {
      flat: {},
      raised: { shadow: "md" },
    },
  },
  defaultVariants: {
    elevation: "flat",
  },
});

/**
 * Container recipe.
 *
 * Single source of truth for content width + horizontal gutter. Every
 * page-level `<main>` and full-width banner must compose this rather
 * than rolling its own maxWidth / padding.
 *
 * Sizes (resolve to CSS variables registered by Panda from
 * `panda.config.mjs#theme.extend.tokens.layout`):
 *   - narrow:  48rem (768px)  — long-form reading (FAQ / rules / about)
 *   - content: 72rem (1152px) — portal pages (home / channels / news)
 *   - wide:    84rem (1344px) — hero / marketing bands with extra breathing room
 *
 * Note: the values are referenced via the generated CSS variables
 * (`var(--layout-content-max)` etc.) instead of the dotted token
 * path because Panda emits the path as a literal CSS value when it
 * comes from a non-standard token namespace — which the browser then
 * ignores. The CSS-variable indirection always resolves correctly.
 */
export const container = cva({
  base: {
    mx: "auto",
    width: "100%",
    px: { base: "4", md: "6", lg: "8" },
  },
  variants: {
    size: {
      narrow: { maxW: "var(--layout-narrow-max)" },
      content: { maxW: "var(--layout-content-max)" },
      wide: { maxW: "var(--layout-wide-max)" },
    },
  },
  defaultVariants: {
    size: "content",
  },
});

/**
 * Section recipe.
 *
 * A top-level page block. Each variant sets its own vertical padding
 * so sections stack into a predictable rhythm without ad-hoc mt/mb
 * overrides in callers.
 *
 * Variants:
 *   - flow:   default — left-aligned with generous vertical room.
 *             Page-opening band, channel cards, news list, sub-sections.
 *             Use with `grid({ cols: 12 })` for asymmetric compositions
 *             (left rail for copy / actions, right rail for an accent
 *             surface) rather than centering — the design system
 *             prefers deliberate grid alignment over centred hero
 *             bands.
 *   - prose:  left-aligned reading flow with reduced vertical padding.
 *             FAQ / rules / about long-form copy.
 *   - tight:  minimal vertical padding for stacked content inside an
 *             already-spaced page.
 */
export const section = cva({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    variant: {
      flow: {
        alignItems: "flex-start",
        gap: { base: "6", md: "8" },
        py: { base: "10", md: "16" },
      },
      prose: {
        alignItems: "flex-start",
        gap: { base: "5", md: "6" },
        py: { base: "10", md: "12" },
      },
      tight: {
        alignItems: "flex-start",
        gap: { base: "4", md: "4" },
        py: { base: "6", md: "8" },
      },
    },
  },
  defaultVariants: {
    variant: "flow",
  },
});

/**
 * Stack recipe.
 *
 * Vertical rhythm with a configurable gap. Use for sub-block layout
 * inside a section (eyebrow + heading + lede, etc.).
 *
 * `align` matches `align-items` on the flex column — Linear's hero
 * pattern uses `center` to centre every child, while `feature`
 * sections use the default `start` (matching normal reading flow).
 */
export const stack = cva({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    gap: {
      1: { gap: "1" },
      2: { gap: "2" },
      3: { gap: "3" },
      4: { gap: "4" },
      5: { gap: "5" },
      6: { gap: "6" },
      8: { gap: "8" },
      10: { gap: "10" },
      12: { gap: "12" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center", textAlign: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },
  },
  defaultVariants: {
    gap: 4,
    align: "start",
  },
});

/**
 * Cluster recipe.
 *
 * Horizontal flex that wraps onto multiple rows when the viewport
 * gets narrow. Used for button rows, pill lists, and the footer's
 * link row — i.e. anywhere we want items to sit shoulder-to-shoulder
 * with a consistent gap but still collapse gracefully on mobile.
 *
 * `justify` mirrors `justify-content`. The default `start` keeps
 * items left of the rail; `center` produces the centred button-row
 * pattern seen in hero CTAs.
 */
export const cluster = cva({
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  variants: {
    gap: {
      1: { gap: "1" },
      2: { gap: "2" },
      3: { gap: "3" },
      4: { gap: "4" },
      5: { gap: "5" },
      6: { gap: "6" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
    },
  },
  defaultVariants: {
    gap: 3,
    justify: "start",
  },
});

/**
 * Grid recipe.
 *
 * 12-column responsive grid. Mobile collapses to a single column.
 * `cols` lets a caller request a smaller base unit (e.g. 2 or 3
 * columns of cards) without re-declaring the responsive breakpoint.
 */
export const grid = cva({
  base: {
    display: "grid",
    gap: { base: "4", md: "6" },
    gridTemplateColumns: { base: "1fr", md: "repeat(12, minmax(0, 1fr))" },
  },
  variants: {
    cols: {
      1: { gridTemplateColumns: { base: "1fr" } },
      2: { gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" } },
      3: { gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" } },
      4: { gridTemplateColumns: { base: "1fr", md: "repeat(4, minmax(0, 1fr))" } },
      6: { gridTemplateColumns: { base: "1fr", md: "repeat(6, minmax(0, 1fr))" } },
      12: {},
    },
    gap: {
      3: { gap: { base: "3", md: "4" } },
      4: { gap: { base: "4", md: "6" } },
      6: { gap: { base: "4", md: "8" } },
      8: { gap: { base: "5", md: "10" } },
    },
  },
  defaultVariants: {
    cols: 12,
    gap: 4,
  },
});

/**
 * Separator recipe (visual).
 *
 * A horizontal rule used between sections / list items. Width / color
 * come from the design tokens so dark mode flips automatically.
 */
export const separator = cva({
  base: {
    border: "none",
    borderTop: "1px solid",
    borderColor: "border",
    width: "100%",
  },
});
