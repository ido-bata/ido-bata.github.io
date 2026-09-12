import type { Metadata } from "next";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";
import { CHANNELS, CHANNEL_CATEGORIES, type ChannelCategory } from "@/content/channels";

export const metadata: Metadata = {
  title: "チャネル一覧 | ido-bata",
  description: "ido-bata Discord サーバのチャネル構成。",
};

function groupByCategory(): ReadonlyArray<{
  category: ChannelCategory;
  channels: typeof CHANNELS;
}> {
  return CHANNEL_CATEGORIES.map((category) => ({
    category,
    channels: CHANNELS.filter((channel) => channel.category === category),
  }));
}

/**
 * チャネル一覧ページ。
 *
 * Layout:
 *   - breadcrumb strip (ホーム / Channels) at the top of `<main>`
 *   - page-opening band on `container({ size: "content" })`: left
 *     rail (eyebrow → h1 → lede → CTA) plus right rail (page
 *     metadata surface). Left-aligned grid composition — no centred
 *     hero band.
 *   - per-category band with a 2-up grid (`grid({ cols: 2 })`) so the
 *     cards don't collapse into a single left-aligned column
 *
 * When `CHANNELS` is empty (the v0.3.0 placeholder state) the page
 * renders an empty-state paragraph instead of empty category headers.
 *
 * Refs:
 *   - Issue #20
 *   - .agents/skills/layout-system
 */
export default function ChannelsPage() {
  const invite = DISCORD_INVITE;
  const grouped = groupByCategory();
  const hasChannels = grouped.some(({ channels }) => channels.length > 0);

  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "Channels" }]} />

      <section aria-labelledby="channels-heading" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          {/* Left rail — copy + actions */}
          <div className={cx(stack({ gap: 4 }), css({ gridColumn: { base: "1", md: "span 7" } }))}>
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.muted",
              })}
            >
              Channels
            </p>
            <h1
              id="channels-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              チャネル一覧
            </h1>
            <p
              className={css({
                maxW: "52ch",
                fontSize: { base: "md", md: "lg" },
                lineHeight: "relaxed",
                color: "fg.muted",
              })}
            >
              チャネル一覧は準備中です。実在のチャネル構成は Discord サーバ側で参照できます。
            </p>
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

          {/* Right rail — page metadata */}
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
              <dt className={css({ color: "fg.muted" })}>カテゴリ</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>
                {CHANNEL_CATEGORIES.length}
              </dd>
              <dt className={css({ color: "fg.muted" })}>チャネル数</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>{CHANNELS.length}</dd>
              <dt className={css({ color: "fg.muted" })}>最終更新</dt>
              <dd className={css({ color: "fg.DEFAULT", fontFamily: "mono", margin: 0 })}>
                2026-09-13
              </dd>
            </dl>
          </aside>
        </div>
      </section>

      {hasChannels ? (
        <section aria-label="カテゴリ別チャネル" className={cx(section({ variant: "flow" }))}>
          {grouped.map(({ category, channels }) =>
            channels.length === 0 ? null : (
              <div key={category} className={cx(stack({ gap: 4 }))}>
                <div
                  className={cx(
                    cluster({ justify: "between" }),
                    css({ pb: "2", borderBottom: "1px solid", borderColor: "border.subtle" }),
                  )}
                >
                  <h2
                    className={css({
                      fontSize: "xl",
                      fontWeight: "semibold",
                      color: "fg.DEFAULT",
                      letterSpacing: "-0.01em",
                    })}
                  >
                    {category}
                  </h2>
                  <span
                    className={css({ fontSize: "sm", color: "fg.subtle", whiteSpace: "nowrap" })}
                  >
                    {channels.length} チャネル
                  </span>
                </div>
                <ul
                  className={cx(
                    grid({ cols: 2, gap: 4 }),
                    css({ listStyle: "none", margin: 0, padding: 0 }),
                  )}
                >
                  {channels.map((channel) => (
                    <li
                      key={channel.name}
                      className={cx(
                        css({
                          display: "flex",
                          flexDirection: "column",
                          gap: "2",
                          p: "4",
                          borderRadius: "lg",
                          border: "1px solid",
                          borderColor: "border",
                          bg: "bg.canvas",
                        }),
                      )}
                    >
                      <div className={cx(cluster(), css({ fontFamily: "mono" }))}>
                        <span aria-hidden="true" className={css({ color: "fg.subtle" })}>
                          #
                        </span>
                        <span
                          className={css({
                            fontSize: "md",
                            fontWeight: "semibold",
                            color: "fg.DEFAULT",
                          })}
                        >
                          {channel.name}
                        </span>
                      </div>
                      <p
                        className={css({
                          fontSize: "sm",
                          lineHeight: "relaxed",
                          color: "fg.muted",
                        })}
                      >
                        {channel.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </section>
      ) : (
        <section className={cx(section({ variant: "flow" }))}>
          <p
            className={css({
              fontSize: "md",
              color: "fg.muted",
              lineHeight: "relaxed",
              textAlign: "center",
            })}
          >
            現在、掲載中のチャネルはありません。
          </p>
        </section>
      )}
    </main>
  );
}
