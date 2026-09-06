/**
 * Recipes - reusable component style definitions (cva).
 *
 * Add new recipes here when more than one component needs the same
 * variant logic. Keep primitive styling in `panda.config.ts` globalCss
 * and token-styleable inline patterns in CSS calls.
 *
 * Refs:
 *   - panda.config.ts
 *   - docs/architecture.md#デザインシステム
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
        bg: "bg.fg",
        color: "bg.canvas",
        _hover: { bg: "bg.muted" },
      },
      outline: {
        bg: "bg.canvas",
        color: "fg",
        borderColor: "border",
        _hover: { bg: "bg.subtle" },
      },
      ghost: {
        bg: "transparent",
        color: "fg",
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
    color: "fg",
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