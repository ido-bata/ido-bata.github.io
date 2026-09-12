"use client";

/**
 * Accordion primitive.
 *
 * Headless, accessible collapsible group built on Ark UI's
 * `Accordion.Root` + `Item` + `Trigger` + `Content` + `Indicator`.
 *
 * The primitive is intentionally minimal — the visual treatment lives in
 * Panda recipes and is composed by the consumer (e.g. FAQ page) so the
 * same primitive can be reused by rules / channels / news without
 * locking those pages into a single look.
 *
 * The FAQ page (`src/app/faq/page.tsx`) is the only v0.3.0 consumer.
 *
 * Why Ark UI here and not a hand-rolled <details>:
 *   - Ark UI gives keyboard navigation (Arrow keys, Home, End),
 *     focus management, single/multiple expansion policy, and roving
 *     tabindex for free — `<details>` does not match the WAI-ARIA
 *     Accordion pattern by default.
 *   - It keeps a single a11y / interaction story across the site
 *     (cf. Button primitive) so assistive tech users get consistent
 *     behaviour everywhere.
 *
 * Refs:
 *   - docs/adr/0002-headless-ui-ark.md
 *   - Issue #90
 */

import { Accordion as ArkAccordion } from "@ark-ui/react";
import { cx } from "@/styled-system/css";
import { css } from "@/styled-system/css";

export const Accordion = ArkAccordion.Root;

export interface AccordionItemProps {
  /** Stable id; mirrors `faq.id` (URL anchor target). */
  id: string;
  /** Visible question text. */
  question: string;
  /** Answer body. */
  children: React.ReactNode;
}

/**
 * Note on "open by default":
 *   Ark UI's `AccordionItem` does not accept a per-item `defaultOpen`
 *   prop. The default-expanded state is controlled at the parent
 *   `Accordion.Root` via `defaultValue` (an array of item ids) — see
 *   `src/app/faq/page.tsx`. Consumers that need to seed an open item
 *   should pass `defaultValue={[id]}` rather than relying on a per-item
 *   flag.
 */

/**
 * One collapsible question + answer pair. Renders the trigger as a
 * styled `<button>` and the content panel below.
 *
 * Visual treatment lives in the `triggerStyle` / `contentStyle` blocks
 * here so the FAQ page does not need its own Panda definitions; if a
 * second consumer needs a different look, fork the styles into a
 * dedicated recipe rather than inlining them.
 */
export function AccordionItem({ id, question, children }: AccordionItemProps) {
  return (
    <ArkAccordion.Item
      value={id}
      className={css({
        borderTop: "1px solid",
        borderColor: "border",
        _first: { borderTop: "none" },
      })}
    >
      <ArkAccordion.ItemTrigger
        className={cx(
          css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4",
            width: "100%",
            py: "5",
            fontSize: "lg",
            fontWeight: "semibold",
            textAlign: "left",
            color: "fg.DEFAULT",
            cursor: "pointer",
            bg: "transparent",
            border: "none",
            _hover: { color: "accent.DEFAULT" },
          }),
        )}
      >
        <span>{question}</span>
        <ArkAccordion.ItemIndicator
          className={css({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "6",
            height: "6",
            color: "fg.muted",
            transition: "transform",
            _open: { transform: "rotate(45deg)" },
          })}
          aria-hidden="true"
        >
          {/* Plus sign rotated 45° by the indicator's transform. */}
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M8 2v12M2 8h12" />
          </svg>
        </ArkAccordion.ItemIndicator>
      </ArkAccordion.ItemTrigger>
      <ArkAccordion.ItemContent
        className={css({
          pb: "5",
          color: "fg.muted",
          lineHeight: "relaxed",
        })}
      >
        <div className={css({ display: "flex", flexDirection: "column", gap: "3" })}>
          {children}
        </div>
      </ArkAccordion.ItemContent>
    </ArkAccordion.Item>
  );
}
