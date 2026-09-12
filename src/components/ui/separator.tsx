import { css, cx } from "@/styled-system/css";
import { separator } from "@/styles/recipes";

/**
 * Separator primitive.
 *
 * A horizontal rule used between page sections / list items. There is no
 * equivalent in Ark UI's interactive primitive set (no Separator / Divider
 * component), so this is intentionally a thin styled `<hr>` that pulls its
 * border colour from the design system tokens so it follows the active
 * theme without per-page overrides.
 *
 * The `data-orientation` attribute is kept on the element so that any
 * later Ark UI multi-part primitive (e.g. `<Accordion.ItemSeparator>`)
 * can still target it without markup changes.
 *
 * Refs:
 *   - docs/architecture.md#デザインシステム
 */
export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Visual prominence. `default` is a hairline rule; `strong` uses the
   *  heavier `border.strong` token for emphasis sections. */
  emphasis?: "default" | "strong";
}

export function Separator({ emphasis = "default", className, ...props }: SeparatorProps) {
  return (
    <hr
      data-orientation="horizontal"
      data-emphasis={emphasis}
      className={cx(
        separator(),
        emphasis === "strong" ? css({ borderColor: "border.strong" }) : undefined,
        className,
      )}
      {...props}
    />
  );
}
