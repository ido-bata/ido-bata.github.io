import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";
import { CHANNELS, CHANNEL_CATEGORIES } from "@/content/channels";

/**
 * Home page — utility-first navigator.
 *
 * Audience is the server member (most accesses come from current
 * members), with first-time visitors an important secondary audience.
 * The page is structured as an at-a-glance index of the things this
 * site actually lets you reach, not a pitch / "what is this community"
 * landing.
 *
 * Layout follows the project's "left-aligned grid composition"
 * principle — the page-opening band uses the shared 12-col grid (left
 * rail with the functional hero, right rail with a server-context
 * card) instead of a centred hero. Below the fold:
 *   - Channels index (primary utility surface, inline from
 *     `src/content/channels.ts`) — categories as compact rows with
 *     channel counts and a 3-channel preview; full detail lives at
 *     /channels
 *   - News / Rules empty-state surfaces (placeholder until content
 *     fills in)
 *   - Memo line: "正本は Discord サーバ側" stays as a single short
 *     line so the navigator doesn't pretend to be canonical
 *
 * The "初めての方へ" entry point lives in the page-opening band
 * itself, not as a separate home section. About does not have a home
 * section — /about is the operator-voice reference for server members,
 * not a recruitment page.
 *
 * Refs: Issue #103, .agents/skills/layout-system
 */
export default function Home() {
  const invite = DISCORD_INVITE;

  const grouped = CHANNEL_CATEGORIES.map((category) => ({
    category,
    channels: CHANNELS.filter((channel) => channel.category === category),
  }));

  return (
    <main className={cx(container({ size: "content" }))}>
      {/* ───── Page-opening band (functional hero + server-context rail) ───── */}
      <section aria-labelledby="hero-heading" className={cx(section({ variant: "flow" }))}>
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
              いど端
            </p>
            <h1
              id="hero-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
                maxW: "18ch",
              })}
            >
              関心領域を各自で調べて書く、共有と下書きの場。
            </h1>
            <p
              className={css({
                fontSize: { base: "md", md: "lg" },
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "44ch",
              })}
            >
              Discord で動いてるサーバーのインデックス。 チャネル・告知・ルールを 1 か所に集約。
            </p>
            <div className={cx(cluster({ gap: 3 }))}>
              {invite ? (
                <Button asChild variant="solid" size="lg">
                  <a href={invite} target="_blank" rel="noopener noreferrer">
                    <DiscordIcon size={18} />
                    <span>Discord に参加</span>
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline" size="lg">
                <Link href="/channels">チャネルを見る</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/welcome">初めての方へ</Link>
              </Button>
            </div>
          </div>

          <aside
            aria-label="サーバーの概要"
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
              Server
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
              <dt className={css({ color: "fg.muted" })}>名前</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>いど端 (ido-bata)</dd>
              <dt className={css({ color: "fg.muted" })}>プラットフォーム</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>Discord</dd>
              <dt className={css({ color: "fg.muted" })}>カテゴリ</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0, fontFamily: "mono" })}>
                {CHANNEL_CATEGORIES.length}
              </dd>
              <dt className={css({ color: "fg.muted" })}>チャネル</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0, fontFamily: "mono" })}>
                {CHANNELS.length}
              </dd>
            </dl>
          </aside>
        </div>
      </section>

      {/* ───── Channels index (primary utility surface) ───── */}
      <section aria-labelledby="channels-heading" className={cx(section({ variant: "flow" }))}>
        <div
          className={cx(
            cluster({ justify: "between" }),
            css({ width: "100%", alignItems: "baseline", gap: "3" }),
          )}
        >
          <h2
            id="channels-heading"
            className={css({
              fontSize: { base: "xl", md: "2xl" },
              fontWeight: "semibold",
              letterSpacing: "-0.01em",
              color: "fg.DEFAULT",
            })}
          >
            チャネル
          </h2>
          <Link
            href="/channels"
            className={css({
              fontSize: "sm",
              fontWeight: "medium",
              color: "accent.DEFAULT",
              textDecoration: "none",
              _hover: { textDecoration: "underline" },
            })}
          >
            チャネル一覧ページへ →
          </Link>
        </div>
        <ul
          className={cx(
            grid({ cols: 3, gap: 3 }),
            css({ listStyle: "none", margin: 0, padding: 0 }),
          )}
        >
          {grouped.map(({ category, channels }) =>
            channels.length === 0 ? null : (
              <li
                key={category}
                className={cx(
                  stack({ gap: 2 }),
                  css({
                    p: "4",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "border",
                    bg: "bg.canvas",
                  }),
                )}
              >
                <div className={cx(cluster({ justify: "between" }))}>
                  <span
                    className={css({
                      fontSize: "md",
                      fontWeight: "semibold",
                      color: "fg.DEFAULT",
                      letterSpacing: "-0.01em",
                    })}
                  >
                    {category}
                  </span>
                  <span
                    className={css({
                      fontSize: "xs",
                      color: "fg.subtle",
                      fontFamily: "mono",
                    })}
                  >
                    {channels.length}
                  </span>
                </div>
                <p
                  className={css({
                    fontSize: "xs",
                    color: "fg.muted",
                    fontFamily: "mono",
                    lineHeight: "relaxed",
                  })}
                >
                  {channels
                    .slice(0, 3)
                    .map((c) => `#${c.name}`)
                    .join("  /  ")}
                  {channels.length > 3 ? "  …" : ""}
                </p>
              </li>
            ),
          )}
        </ul>
      </section>

      {/* ───── News / Rules (empty-state utility surfaces) ───── */}
      <section aria-label="最新の動きとルール" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 4 }))}>
          <div
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 6" },
                p: "5",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "border",
                bg: "bg.subtle",
              }),
            )}
          >
            <div className={cx(cluster({ justify: "between" }))}>
              <h2
                className={css({
                  fontSize: "xl",
                  fontWeight: "semibold",
                  color: "fg.DEFAULT",
                  letterSpacing: "-0.01em",
                })}
              >
                最新の動き
              </h2>
              <Link
                href="/news"
                className={css({
                  fontSize: "sm",
                  fontWeight: "medium",
                  color: "accent.DEFAULT",
                  textDecoration: "none",
                  _hover: { textDecoration: "underline" },
                })}
              >
                News →
              </Link>
            </div>
            <p
              className={css({
                fontSize: "sm",
                color: "fg.muted",
                lineHeight: "relaxed",
              })}
            >
              現在、掲載中の告知はありません。 動きがあれば Discord サーバ側にも投稿します。
            </p>
          </div>
          <div
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 6" },
                p: "5",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "border",
                bg: "bg.subtle",
              }),
            )}
          >
            <div className={cx(cluster({ justify: "between" }))}>
              <h2
                className={css({
                  fontSize: "xl",
                  fontWeight: "semibold",
                  color: "fg.DEFAULT",
                  letterSpacing: "-0.01em",
                })}
              >
                ルール・ガイドライン
              </h2>
              <Link
                href="/community/rules"
                className={css({
                  fontSize: "sm",
                  fontWeight: "medium",
                  color: "accent.DEFAULT",
                  textDecoration: "none",
                  _hover: { textDecoration: "underline" },
                })}
              >
                Rules →
              </Link>
            </div>
            <p
              className={css({
                fontSize: "sm",
                color: "fg.muted",
                lineHeight: "relaxed",
              })}
            >
              推奨・禁止・チャネル別運用方針はサーバルールページに掲載します。
              現時点で確定済みの項目はありません。
            </p>
          </div>
        </div>
      </section>

      {/* ───── Memo (正本は Discord サーバ側) ───── */}
      <section aria-label="正本について" className={cx(section({ variant: "flow" }))}>
        <p
          className={css({
            fontSize: "sm",
            color: "fg.subtle",
            lineHeight: "relaxed",
            maxW: "60ch",
          })}
        >
          理念と運営の正本は Discord サーバ側。 ここはインデックスだけ。
        </p>
      </section>
    </main>
  );
}
