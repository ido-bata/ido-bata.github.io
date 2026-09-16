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
 * /welcome — a short entry point for people who have not joined yet.
 *
 * Layout:
 *   - breadcrumb strip
 *   - left-aligned page-opening band: h1 + lede + Discord CTA
 *   - right rail showing where to start in the server
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
              いど端に参加する
            </h1>
            <div className={cx(stack({ gap: 4 }), css({ maxW: "52ch" }))}>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                いど端は、クリエイターやエンジニアが制作・開発を進めるための Discord
                サーバーです。専門分野の話、制作途中の共有、作業の記録などに使われています。
              </p>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                参加後は、興味のある分野や使っているツールのロールを選び、必要なチャンネルから使ってください。
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
            aria-labelledby="getting-started-heading"
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
            <h2
              id="getting-started-heading"
              className={css({
                fontSize: "lg",
                fontWeight: "semibold",
                color: "fg.DEFAULT",
              })}
            >
              参加したら
            </h2>
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
              {START_GUIDE.map((item) => (
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

const START_GUIDE = [
  {
    title: "話題",
    body: "専門分野の質問や会話をする場所です。分野をまたぐ話題にも専用のチャンネルがあります。",
  },
  {
    title: "共有",
    body: "素材、ツール、資料、作品の公開や募集に使います。",
  },
  {
    title: "雑",
    body: "雑談、制作途中のもの、まとまる前の考えを書けます。",
  },
  {
    title: "PDCA",
    body: "やることを宣言し、進捗や評価、次の改善を記録する場所です。",
  },
] as const;

const RELATED = [
  { href: "/channels", label: "チャネル一覧", hint: "カテゴリ別のチャネル構成" },
  { href: "/community/rules", label: "サーバルール", hint: "推奨・禁止・運用方針" },
  { href: "/about", label: "About", hint: "サーバーの考え方" },
  { href: "/faq", label: "FAQ", hint: "よくある質問" },
] as const;
