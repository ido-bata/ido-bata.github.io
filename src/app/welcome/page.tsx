import type { Metadata } from "next";
import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";

export const metadata: Metadata = {
  title: "初めての方へ | ido-bata",
  description: "いど端 Discord サーバーへの参加案内。",
};

/**
 * /welcome — newcomer guidance.
 *
 * Audience: first-time visitor who hasn't joined the Discord server yet.
 * Distinct from /about (operator-voice reference for server members):
 *   - /welcome is the warm on-ramp, Discord CTA is prominent
 *   - /about  is the operator's stance / origin reference, no CTA
 *
 * Layout:
 *   - breadcrumb strip
 *   - left-aligned page-opening band: h1 + lede + Discord CTA
 *   - right rail ("参加前に") listing cultural defaults a newcomer
 *     benefits from seeing upfront — server members already know these
 *     by experience, so this is the only place on the site that names
 *     them as a guide
 *   - "関連するページ" rail to /channels / /community/rules / /about / /faq
 *
 * Refs: Issue #103
 */
export default function WelcomePage() {
  const invite = DISCORD_INVITE;

  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "初めての方へ" }]} />

      <section aria-labelledby="welcome-heading" className={cx(section({ variant: "flow" }))}>
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
              Welcome
            </p>
            <h1
              id="welcome-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              いど端へ。
            </h1>
            <div className={cx(stack({ gap: 4 }), css({ maxW: "52ch" }))}>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                いど端は Discord で動いてる小さいサーバー。 名前は井戸端会議の響きだけ借りてる。
                うちは交流じゃなくて情報共有のためのサーバーってとこでやってる。
              </p>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                招待リンクから参加できます。 入ったらチャネル一覧 / ルール / FAQ
                を順に眺めてもらえれば、 場の使い方はだいたい分かる。
              </p>
            </div>
            {invite ? (
              <div className={cx(cluster({ gap: 3 }))}>
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
            aria-label="参加前に知っておきたいこと"
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
              参加前に
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
              {EXPECTATIONS.map((item) => (
                <li
                  key={item.title}
                  className={css({
                    fontSize: "sm",
                    lineHeight: "relaxed",
                    color: "fg.muted",
                  })}
                >
                  <span
                    className={css({
                      fontWeight: "semibold",
                      color: "fg.DEFAULT",
                      display: "block",
                      mb: "1",
                    })}
                  >
                    {item.title}
                  </span>
                  {item.body}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="welcome-related-heading"
        className={cx(section({ variant: "flow" }))}
      >
        <h2
          id="welcome-related-heading"
          className={css({
            fontSize: { base: "xl", md: "2xl" },
            fontWeight: "semibold",
            color: "fg.DEFAULT",
            letterSpacing: "-0.01em",
          })}
        >
          関連するページ
        </h2>
        <ul
          className={cx(
            grid({ cols: 3, gap: 4 }),
            css({ listStyle: "none", margin: 0, padding: 0 }),
          )}
        >
          {RELATED.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cx(
                  stack({ gap: 2 }),
                  css({
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
                <span className={css({ fontSize: "md", fontWeight: "semibold" })}>
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

const EXPECTATIONS = [
  {
    title: "ウェルカム無し / 匿名",
    body: "ウェルカムメッセージや入会の儀式は作ってない。 入退会は完全に自由で、 誰が来たかは誰にも分からない。 投稿の匿名性が基本。",
  },
  {
    title: "ひとりごと / wip は反応より書くことが優先",
    body: "リアクションを気にせず、 書きたいことをそのまま書けるチャネル。 反応 (返信 / リアクション) を求めない。",
  },
  {
    title: "各自で調べて書く、 共有する",
    body: "関心領域は映像 / プログラミング / デザインあたり。 交流の場じゃなくて、 情報共有のための場所として使ってる。",
  },
] as const;

const RELATED = [
  { href: "/channels", label: "チャネル一覧", hint: "カテゴリ別のチャネル構成" },
  { href: "/community/rules", label: "サーバルール", hint: "推奨・禁止・運用方針" },
  { href: "/about", label: "About", hint: "運営スタンス・経緯" },
  { href: "/faq", label: "FAQ", hint: "よくある質問" },
] as const;
