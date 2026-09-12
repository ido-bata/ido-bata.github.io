import type { Metadata } from "next";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";

export const metadata: Metadata = {
  title: "About | ido-bata",
  description: "ido-bata コミュニティの紹介ページ。",
};

/**
 * About ページ。
 *
 * Layout:
 *   - breadcrumb strip (Home / About) at the top of `<main>` so the
 *     user always has a single-click path back to `/`
 *   - page-opening band on `container({ size: "content" })` (same
 *     width as the home page so the page-edge alignment is held
 *     across the site): left rail (eyebrow → h1 → lede) plus right
 *     rail (CTA surface). Left-aligned grid composition — no centred
 *     hero band.
 *
 * The CTA uses the project-wide `Button` primitive plus the inline
 * `DiscordIcon` SVG so the icon inherits the brand-coloured button
 * text.
 *
 * NOTE: For v0.3.0 the page is a minimal placeholder. Operator identity,
 * philosophy, and operating-principle copy are populated by the community
 * owner in a follow-up issue.
 *
 * Refs:
 *   - Issue #14
 *   - .agents/skills/layout-system
 */
export default function AboutPage() {
  const invite = DISCORD_INVITE;

  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "About" }]} />

      <section aria-labelledby="about-hero-title" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(stack({ gap: 5 }), css({ gridColumn: { base: "1", md: "span 7" } }))}>
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.muted",
              })}
            >
              About
            </p>
            <h1
              id="about-hero-title"
              className={css({
                fontSize: { base: "4xl", md: "5xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.03em",
                color: "fg.DEFAULT",
              })}
            >
              ido-bata
            </h1>
            <p
              className={css({
                fontSize: { base: "md", md: "lg" },
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "48ch",
              })}
            >
              コミュニティ紹介・理念・運営体制などの詳細は準備中です。
            </p>
          </div>

          <aside
            aria-label="参加する"
            className={cx(
              stack({ gap: 4 }),
              css({
                gridColumn: { base: "1", md: "span 5" },
                bg: "bg.subtle",
                borderRadius: "lg",
                padding: { base: "5", md: "6" },
                border: "1px solid",
                borderColor: "border.subtle",
                alignSelf: "stretch",
              }),
            )}
          >
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.subtle",
              })}
            >
              参加する
            </p>
            <p
              className={css({
                fontSize: "md",
                color: "fg.DEFAULT",
                lineHeight: "relaxed",
              })}
            >
              招待リンクから Discord サーバに参加できます。
            </p>
            {invite ? (
              <Button asChild variant="solid" size="lg">
                <a href={invite} target="_blank" rel="noopener noreferrer">
                  <DiscordIcon size={18} />
                  <span>Discord サーバに参加</span>
                </a>
              </Button>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
