import { cx } from "@/styled-system/css";

/**
 * Material Icon (ligature).
 *
 * Renders a `<span>` whose text is the icon's ligature name. Because
 * the Material Icons font maps ligatures to glyphs, the text content
 * drives the visible icon — no SVG sprite, no separate `<i>` library.
 *
 * Glyph reference: https://fonts.google.com/icons
 *
 * Refs:
 *   - panda.config.mjs#globalCss (`.material-icons` rules)
 *   - src/app/layout.tsx (font registration)
 */
export interface MaterialIconProps {
  /** Material Icons ligature name, e.g. `"home"`, `"wb_sunny"`. */
  name: string;
  /** Visual size in px. Material Icons default to 24. */
  size?: number;
  /** Optional accessible label. When omitted the icon is decorative
   *  and hidden from assistive tech — provide one for icon-only
   *  controls. */
  "aria-label"?: string;
  /** Icon family variant. The Google Fonts CDN only serves the
   *  filled "Material Icons" face, so callers should leave this at
   *  the default and use the ligature name to pick a glyph. */
  variant?: "filled" | "outlined" | "round" | "sharp";
  className?: string;
}

const VARIANT_CLASS: Record<NonNullable<MaterialIconProps["variant"]>, string> = {
  filled: "material-icons",
  outlined: "material-icons-outlined",
  round: "material-icons-round",
  sharp: "material-icons-sharp",
};

export function MaterialIcon({
  name,
  size = 18,
  "aria-label": ariaLabel,
  variant = "filled",
  className,
}: MaterialIconProps) {
  const a11y = ariaLabel
    ? { role: "img" as const, "aria-label": ariaLabel }
    : { "aria-hidden": true as const };

  return (
    <span
      className={cx(VARIANT_CLASS[variant], className)}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
      {...a11y}
    >
      {name}
    </span>
  );
}
