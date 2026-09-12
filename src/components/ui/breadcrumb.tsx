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
        paddingBlock: "3",
        borderBottom: "1px solid",
        borderColor: "border.hairline",
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
