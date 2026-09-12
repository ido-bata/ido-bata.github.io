import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";

/**
 * Landing page for the ido-bata organization.
 *
 * Layout follows the project's "left-aligned grid composition"
 * principle — the design system prefers deliberate asymmetric grid
 * alignment over centred hero bands:
 *
 *   - a 12-col page-opening band: left rail (eyebrow → headline →
 *     lede → buttons) plus right rail (Status surface), so the hero
 *     participates in the shared coordinate system instead of
 *     floating dead-centre on the canvas
 *   - a balanced 3-up link grid (Linear-style cards) on the same
 *     12-col rhythm
 *
 * Composes the shared `container` / `section` / `stack` / `grid` /
 * `cluster` recipes so the page participates in the grid system
 * defined in `.agents/skills/layout-system/`.
 *
 * Refs: Issue #8, .agents/skills/layout-system
 */
export default function Home() {
  const invite = DISCORD_INVITE;

  return (
    <main className={cx(container({ size: "content" }))}>
      {/* ───── Page-opening band (left copy + right status) ───── */}
      <section aria-labelledby="hero-heading" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          {/* Left rail — copy + actions */}
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
              Community Portal
            </p>
            <h1
              id="hero-heading"
              className={css({
                fontSize: { base: "4xl", md: "5xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.03em",
                color: "fg.DEFAULT",
                maxW: "16ch",
              })}
            >
              井戸端会議のための、居場所。
            </h1>
            <p
              className={css({
                fontSize: { base: "md", md: "lg" },
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "44ch",
              })}
            >
              ido-bata は Discord
              上で動くコミュニティです。本サイトは、その活動内容・ルール・最新の動きを
              ひとつの場所にまとめるためのポータルとして運営されています。
            </p>
            <div className={cx(cluster({ gap: 3 }))}>
              {invite ? (
                <Button asChild variant="solid" size="lg">
                  <a href={invite} target="_blank" rel="noopener noreferrer">
                    <DiscordIcon size={18} />
                    <span>Discord サーバに参加</span>
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline" size="lg">
                <Link href="/about">ido-bata について</Link>
              </Button>
            </div>
          </div>

          {/* Right rail — Status surface */}
          <aside
            aria-label="ステータス"
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
              Status
            </p>
            <ul
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "3",
                listStyle: "none",
                margin: 0,
                padding: 0,
              })}
            >
              {STATUS_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={css({
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "3",
                    borderBottom: "1px solid",
                    borderColor: "border.subtle",
                    paddingBottom: "2",
                    _last: { borderBottom: "none", paddingBottom: 0 },
                  })}
                >
                  <span className={css({ fontSize: "sm", color: "fg.DEFAULT" })}>{item.label}</span>
                  <span
                    className={css({
                      fontSize: "xs",
                      color: "fg.muted",
                      fontFamily: "mono",
                      whiteSpace: "nowrap",
                    })}
                  >
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ───── About (split section — left copy, right surface) ───── */}
      <section aria-labelledby="about-heading" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 4 }))}>
          <div className={cx(stack({ gap: 3 }), css({ gridColumn: { base: "1", md: "span 5" } }))}>
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
            <h2
              id="about-heading"
              className={css({
                fontSize: { base: "2xl", md: "3xl" },
                fontWeight: "semibold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              何を大切にする場所か
            </h2>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
              })}
            >
              コミュニティ紹介・理念・運営体制などの詳細は準備中です。Discord
              サーバ側で先行して共有している内容と、本ページの公開内容は順次整合させていきます。
            </p>
            <div>
              <Link
                href="/about"
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1",
                  fontSize: "sm",
                  fontWeight: "medium",
                  color: "accent.DEFAULT",
                  textDecoration: "none",
                  _hover: { textDecoration: "underline" },
                })}
              >
                About ページを読む →
              </Link>
            </div>
          </div>
          <aside
            aria-label="コミュニティの運営メモ"
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 7" },
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
              Memo
            </p>
            <p
              className={css({
                fontSize: "md",
                lineHeight: "relaxed",
                color: "fg.DEFAULT",
              })}
            >
              サーバの理念・運営体制・更新フローは順次このページに反映していきます。 Discord
              サーバ側で先に共有された内容と本ページの公開内容が食い違う場合は、 Discord
              側の投稿を一次情報として扱います。
            </p>
          </aside>
        </div>
      </section>

      {/* ───── Related links (balanced 3-up grid) ───── */}
      <section aria-labelledby="links-heading" className={cx(section({ variant: "flow" }))}>
        <div
          className={cx(
            cluster({ justify: "between" }),
            css({ width: "100%", alignItems: "baseline", gap: "3" }),
          )}
        >
          <h2
            id="links-heading"
            className={css({
              fontSize: { base: "2xl", md: "3xl" },
              fontWeight: "semibold",
              lineHeight: "tight",
              letterSpacing: "-0.02em",
              color: "fg.DEFAULT",
            })}
          >
            関連リンク
          </h2>
          <p
            className={css({
              fontSize: "xs",
              fontWeight: "medium",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "fg.muted",
            })}
          >
            Explore
          </p>
        </div>

        <ul
          className={cx(
            grid({ cols: 3, gap: 4 }),
            css({ listStyle: "none", margin: 0, padding: 0 }),
          )}
        >
          {RELATED_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  gap: "2",
                  p: "5",
                  borderRadius: "lg",
                  border: "1px solid",
                  borderColor: "border",
                  bg: "bg.canvas",
                  color: "fg.DEFAULT",
                  height: "100%",
                  textDecoration: "none",
                  _motionSafe: {
                    transitionProperty: "background-color, border-color, transform",
                    transitionDuration: "150ms",
                  },
                  _hover: { bg: "bg.subtle", borderColor: "border.strong" },
                  _focusVisible: {
                    outlineWidth: "2px",
                    outlineStyle: "solid",
                    outlineColor: "accent",
                    outlineOffset: "2px",
                  },
                })}
                href={link.href}
              >
                <span
                  className={css({
                    fontSize: "md",
                    fontWeight: "semibold",
                    letterSpacing: "-0.01em",
                  })}
                >
                  {link.label}
                </span>
                <span
                  className={css({
                    fontSize: "sm",
                    fontWeight: "normal",
                    color: "fg.muted",
                    lineHeight: "relaxed",
                  })}
                >
                  {link.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

const RELATED_LINKS = [
  { href: "/about", label: "About", hint: "コミュニティ紹介" },
  { href: "/faq", label: "FAQ", hint: "よくある質問" },
  { href: "/community/rules", label: "Rules", hint: "サーバルールと利用ガイド" },
  { href: "/channels", label: "Channels", hint: "チャネル構成" },
  { href: "/news", label: "News", hint: "更新情報・告知" },
] as const;

const STATUS_ITEMS = [
  { label: "リリース", value: "v0.3.0" },
  { label: "お知らせ", value: "近日掲載" },
  { label: "最終更新", value: "2026-09-13" },
] as const;
