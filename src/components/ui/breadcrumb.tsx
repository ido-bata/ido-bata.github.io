import Link from "next/link";
import { css } from "@/styled-system/css";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

/**
 * One step in the breadcrumb trail.
 *
 * `href` is omitted on the last item — it becomes the current page,
 * rendered as `<span aria-current="page">` so assistive tech
 * announces it correctly.
 */
export type BreadcrumbItem = { href?: string; label: string };

/**
 * Site-wide breadcrumb nav.
 *
 * Renders a small horizontal strip with a chevron separator, sized
 * to sit *inside* whatever container the caller wraps it in (so the
 * left edge lines up with the page's content rail). Every non-home
 * page composes this at the top of `<main>` so the user always has
 * a single-click path back to `/` and to intermediate sections on
 * deeper pages (e.g. `/community/rules`).
 *
 * The strip is `position: sticky` directly under the Header
 * (`top` matches the Header's resolved height — py:3 + content 32px
 * = ~56px). Previously the breadcrumb scrolled out of view on long
 * pages, forcing users to scroll back to the top to navigate out
 * of a deep section; the sticky treatment keeps it pinned as long
 * as the page header is visible and then docks under it.
 *
 * Background + `backdrop-filter: blur` — exactly the same chrome
 * treatment the Header uses. Without a backdrop, content scrolling
 * under a sticky strip overlaps the breadcrumb text and makes it
 * unreadable; with a backdrop, the strip stays legible without
 * pulling the visual weight a solid `bg.muted` (or a hairline
 * border) would. The breadcrumb now reads as a continuation of the
 * sticky header chrome rather than its own surface.
 *
 * The outer `<nav aria-label="パンくずリスト">` plus `<ol> > <li>`
 * exposes the structure to assistive tech without extra ARIA
 * plumbing. Separator is a Material Icons `chevron_right` ligature
 * so it inherits the same font / weight / size system as the rest of
 * the iconography. The current-page span uses `fg.muted` + medium
 * weight so the eye lands on the active position.
 *
 * Refs: .agents/skills/layout-system
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="パンくずリスト"
      className={css({
        width: "100%",
        position: "sticky",
        // Header chrome height is registered as `--chrome-height` in
        // `src/app/layout.tsx` (py:3 + content 32px = 56px). Reference
        // the variable instead of inlining a magic number so Header
        // and Breadcrumb stay docked in lockstep if either changes.
        // If you tune the Header's vertical padding, update the
        // `--chrome-height` declaration rather than this top value.
        top: "var(--chrome-height)",
        // Below Header (100) so any page-level sticky sibling slots in
        // predictably between the docked chrome and the page content.
        zIndex: "90",
        paddingBlock: "3",
        bg: "bg.canvas",
        // Hairline border keeps a visible bottom edge even when the
        // strip sits over a section that uses the same `bg.canvas`
        // token — `backdrop-filter` only produces an edge against
        // content actively scrolling underneath, so at rest we still
        // need a static separator.
        borderBottom: "1px solid",
        borderColor: "border.hairline",
        backdropFilter: "saturate(180%) blur(8px)",
      })}
    >
      <ol
        className={css({
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        })}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className={css({
                display: "inline-flex",
                alignItems: "center",
                fontSize: "xs",
                color: isLast ? "fg.muted" : "fg.DEFAULT",
              })}
            >
              <span
                className={css({
                  fontWeight: isLast ? "medium" : "normal",
                })}
              >
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={css({
                      color: "fg.muted",
                      textDecoration: "none",
                      _hover: { color: "fg.DEFAULT" },
                    })}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                )}
              </span>
              {!isLast ? (
                <MaterialIcon
                  name="chevron_right"
                  size={14}
                  aria-hidden="true"
                  className={css({
                    color: "fg.subtle",
                    marginInline: "2",
                  })}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
