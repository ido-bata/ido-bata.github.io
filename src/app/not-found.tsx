import type { Metadata } from "next";
import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";

export const metadata: Metadata = {
  title: "404 — ページが見つかりません",
  description: "お探しのページは見つかりませんでした。",
  robots: { index: false, follow: false },
};

const NAV_LINKS = [
  { href: "/", label: "トップへ戻る" },
  { href: "/about", label: "About を見る" },
  { href: "/faq", label: "FAQ を見る" },
  { href: "/community/rules", label: "サーバルールを見る" },
  { href: "/channels", label: "チャネル一覧を見る" },
  { href: "/news", label: "News を見る" },
] as const;

/**
 * 404 ページ。
 *
 * Layout:
 *   - breadcrumb strip (ホーム / 見つかりません) at the top of
 *     `<main>` so the user can recover with one click even on a 404
 *   - page-opening band on `container({ size: "content" })` (same
 *     width as the rest of the site): left rail (404 mark → h1 →
 *     lede → CTA) plus right rail (page metadata surface). Left-
 *     aligned grid composition — no centred hero band.
 *   - balanced 2-up grid of nav cards (`grid({ cols: 2 })`) below.
 *
 * The nav links are constrained to routes that actually exist so the
 * page never advertises a 404 destination.
 *
 * Refs: .agents/skills/layout-system
 */
export default function NotFound() {
  const invite = DISCORD_INVITE;

  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "見つかりません" }]} />

      <section className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(stack({ gap: 5 }), css({ gridColumn: { base: "1", md: "span 7" } }))}>
            <p
              aria-hidden="true"
              className={css({
                fontSize: "5xl",
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.04em",
                color: "fg.muted",
                fontFamily: "mono",
              })}
            >
              404
            </p>

            <h1
              className={css({
                fontSize: { base: "2xl", md: "3xl" },
                fontWeight: "semibold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              ページが見つかりません
            </h1>

            <p
              className={css({
                fontSize: "md",
                lineHeight: "relaxed",
                color: "fg.muted",
                maxW: "48ch",
              })}
            >
              お探しのページは移動・削除されたか、URL が正しくない可能性があります。
              下のリンクから他のページへお進みください。
            </p>

            {invite ? (
              <div>
                <Button asChild variant="solid" size="lg">
                  <a href={invite} target="_blank" rel="noopener noreferrer">
                    <DiscordIcon size={18} />
                    <span>Discord サーバに参加</span>
                  </a>
                </Button>
              </div>
            ) : null}
          </div>

          <aside
            aria-label="ページ情報"
            className={cx(
              stack({ gap: 3 }),
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
              ページ情報
            </p>
            <dl
              className={css({
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "4",
                rowGap: "3",
                margin: 0,
                fontSize: "sm",
              })}
            >
              <dt className={css({ color: "fg.muted" })}>ステータス</dt>
              <dd className={css({ color: "fg.DEFAULT", fontFamily: "mono", margin: 0 })}>404</dd>
              <dt className={css({ color: "fg.muted" })}>種別</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>Not Found</dd>
            </dl>
          </aside>
        </div>
      </section>

      <section className={cx(section({ variant: "flow" }))}>
        <h2
          className={css({
            fontSize: "sm",
            fontWeight: "medium",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "fg.muted",
          })}
        >
          サイト内ナビゲーション
        </h2>
        <ul
          className={cx(
            grid({ cols: 2, gap: 3 }),
            css({ listStyle: "none", margin: 0, padding: 0 }),
          )}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cx(
                  cluster({ justify: "center" }),
                  css({
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "10",
                    px: "4",
                    borderRadius: "md",
                    border: "1px solid",
                    borderColor: "border",
                    bg: "bg.canvas",
                    color: "fg.DEFAULT",
                    fontSize: "sm",
                    fontWeight: "medium",
                    textDecoration: "none",
                    textAlign: "center",
                    _hover: { bg: "bg.subtle", borderColor: "border.strong" },
                    _focusVisible: {
                      outlineWidth: "2px",
                      outlineStyle: "solid",
                      outlineColor: "accent",
                      outlineOffset: "2px",
                    },
                  }),
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
