"use client";

/**
 * Button primitive.
 *
 * Headless, accessible button built on top of Ark UI's `ark.button`
 * factory. The factory adds `asChild` support so the same component can
 * render as `<button>`, `<Link>`, or `<a>` without losing styling — Ark
 * UI handles ref forwarding / prop merging / a11y, and we layer the
 * Panda `button` recipe on top.
 *
 * Why `ark.button` rather than a hand-rolled `<button>`:
 *   - `asChild` merges our `className`, `onClick`, `aria-*`, etc. with
 *     the child element's own props, so `<Button asChild><Link href="..."/></Button>`
 *     works without manually cloning the child.
 *   - Ark UI's factory is forwardRef-aware and SSR-safe, which matches
 *     the project's `output: "export"` + React 19 setup.
 *
 * Why not use a CSS Modules / Tailwind preset:
 *   - There is no `@pandacss/preset-ark` on npm. The integration with
 *     Panda is intentionally manual — see ADR-0002 for the slot-recipe
 *     pattern that multi-part primitives (Dialog, Menu, …) follow.
 *
 * Refs:
 *   - docs/adr/0002-headless-ui-ark.md
 *   - docs/architecture.md#ark-ui-との統合v030-以降
 *   - Issue #90
 */

import type { ComponentProps } from "react";
import { ark } from "@ark-ui/react";
import { cx } from "@/styled-system/css";
import { button } from "@/styles/recipes";

type ArkButtonProps = ComponentProps<typeof ark.button>;

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ArkButtonProps, "className"> {
  /**
   * Visual variant.
   * @default "solid"
   */
  variant?: ButtonVariant;
  /**
   * Size token.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Extra className appended to the recipe output. Use sparingly —
   * prefer extending the `button` recipe in `src/styles/recipes.ts`
   * for anything that's reused.
   */
  className?: string;
}

/**
 * Polymorphic button primitive.
 *
 * Render-as-button by default. Pass `asChild` to wrap a single child
 * element (`<a>`, `<Link>`, …) while preserving our styling.
 *
 * @example
 *   <Button onClick={...}>Click me</Button>
 * @example
 *   <Button asChild variant="outline"><Link href="/foo">Foo</Link></Button>
 */
export function Button({ variant = "solid", size = "md", className, ...props }: ButtonProps) {
  return <ark.button {...props} className={cx(button({ variant, size }), className)} />;
}
