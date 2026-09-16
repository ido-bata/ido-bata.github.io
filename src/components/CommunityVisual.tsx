import Image from "next/image";
import { css, cx } from "@/styled-system/css";
import { grid, stack } from "@/styles/recipes";
import { ADMINISTRATOR } from "@/content/community";

/**
 * Discord-style chat preview that anchors the home page Hero.
 *
 * Reads as a real channel from the server rather than a placeholder
 * demo:
 * - The channel is `#ひとりごと` (category `雑`), with the same
 *   description as in `src/content/channels.ts`. The sidebar shows
 *   the surrounding `雑` channels so the context (wip, ひとりごと,
 *   世迷言) is visible rather than a single-channel island.
 * - samuido posts an actual message they sent on 2026/03/21 in
 *   `#ひとりごと` — preserved verbatim, including the "(唐突)"
 *   aside and the second-paragraph line break. This is a real
 *   post, not a fabricated wip / GitHub-PR demo.
 * - The samuido avatar uses the real profile photo from
 *   `ADMINISTRATOR`. There is no fabricated second participant
 *   and no fabricated GitHub link embed.
 *
 * What this is NOT (intentional negative design notes):
 *
 * - It does NOT carry a "this is just an example" disclaimer.
 *   The wrapper that existed only to host that caption was
 *   removed. Discord windows are not deceptive, they are
 *   stylized surfaces — the chat just IS the surface.
 *
 * - It does NOT carry a "LIVE" badge. This is a static mockup of
 *   an activity surface, not a realtime feed. A live indicator
 *   would be misleading because nothing here is actually
 *   streaming — it would imply a freshness the page doesn't
 *   deliver.
 *
 * - It does NOT carry a "scheduled event" embed card. That was
 *   previously used as a visual filler for the bottom of the
 *   stream, but `#ひとりごと` is a low-noise channel — adding a
 *   scheduled-event banner would imply the channel is more
 *   structured than it actually is.
 *
 * - The chat line is declarative, not a request for reaction. It
 *   states samuido's view on VSCode UX without inviting
 *   agreement. This is consistent with the community's
 *   "褒めない wip" stance: even outside wip, posts don't ask to
 *   be graded.
 *
 * Layout notes:
 * - The sidebar / main split uses the shared `grid({ cols: 12,
 *   gap: 3 })` recipe. Sidebar occupies 12-cols 1–3, main
 *   occupies 4–12 — the same 3/9 split as the rest of the site.
 *
 * - Each sidebar channel row uses `grid-template-columns: 1rem
 *   minmax(0, 1fr)` so the icon column (`#`) has a fixed width
 *   and every channel name starts at the same x.
 *
 * Hierarchy note:
 * - Borders are intentionally minimal. The outer aside uses
 *   `border.subtle` + `boxShadow` for chrome; the internal
 *   sidebar/header boundaries rely on `bg.muted` vs `bg.canvas`
 *   differences instead of hairline strokes. Channel names
 *   truncate with `whiteSpace: "nowrap"` + `textOverflow:
 *   "ellipsis"` (set in `channelName`) so a long channel label
 *   doesn't wrap to a second line in the narrow sidebar.
 */

const sidebarChannel = css({
  display: "grid",
  gridTemplateColumns: "1rem minmax(0, 1fr)",
  alignItems: "center",
  gap: "2",
  color: "fg.muted",
  fontSize: "xs",
  paddingX: "2",
  paddingY: "1",
  borderRadius: "sm",
});

const sidebarChannelIcon = css({
  color: "fg.subtle",
  fontFamily: "mono",
  fontSize: "sm",
  lineHeight: "tight",
  textAlign: "center",
});

const channelName = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minW: 0,
});

const message = css({
  display: "grid",
  gridTemplateColumns: "2rem minmax(0, 1fr)",
  gap: "3",
  alignItems: "start",
});

export function CommunityVisual() {
  return (
    <aside
      aria-label="いど端の活動イメージ"
      className={css({
        position: "relative",
        margin: 0,
        minW: 0,
        borderRadius: "2xl",
        bg: "bg.canvas",
        border: "1px solid",
        borderColor: "border.subtle",
        boxShadow: "0 24px 64px rgba(12, 14, 22, 0.14)",
        overflow: "hidden",
      })}
    >
      {/* Sidebar / main split — on the shared 12-col grid. Sidebar
          occupies cols 1–3 on md+, cols 1–2 on mobile; main occupies
          the rest. The recipe's responsive collapse to a single
          column at base is acceptable here — at mobile the Discord
          window visually compresses to one rail rather than the
          desktop 2-rail chrome, which matches how most Discord
          clients adapt. */}
      <div className={cx(grid({ cols: 12, gap: 3 }))}>
        {/* Sidebar — shows the `雑` category from channels.ts with
            wip / ひとりごと / 世迷言 so the channel context is
            visible. ひとりご と is the currently-viewed channel
            (matching the header on the right). */}
        <div
          className={cx(
            stack({ gap: 4 }),
            css({
              padding: { base: "2", sm: "3" },
              bg: "bg.muted",
              gridColumn: { base: "1", md: "1 / span 3" },
              minW: 0,
            }),
          )}
        >
          <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
            <Image
              src="/ido-bata-icon.jpg"
              alt=""
              width={24}
              height={24}
              className={css({ width: "6", height: "6", borderRadius: "full", flexShrink: 0 })}
            />
            <span
              className={css({
                display: { base: "none", sm: "inline" },
                fontSize: "2xs",
                fontWeight: "semibold",
                color: "fg.DEFAULT",
              })}
            >
              いど端
            </span>
          </div>
          <div className={cx(stack({ gap: 1 }))}>
            <p
              className={css({
                fontSize: "2xs",
                color: "fg.subtle",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                paddingX: "2",
              })}
            >
              雑
            </p>
            <span className={sidebarChannel}>
              <span aria-hidden="true" className={sidebarChannelIcon}>
                #
              </span>
              <span className={channelName}>wip</span>
            </span>
            <span
              className={cx(
                sidebarChannel,
                css({ bg: "bg.subtle", color: "fg.DEFAULT", fontWeight: "semibold" }),
              )}
            >
              <span aria-hidden="true" className={sidebarChannelIcon}>
                #
              </span>
              <span className={channelName}>ひとりごと</span>
            </span>
            <span className={sidebarChannel}>
              <span aria-hidden="true" className={sidebarChannelIcon}>
                #
              </span>
              <span className={channelName}>世迷言</span>
            </span>
          </div>
        </div>

        {/* Main */}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            minW: 0,
            gridColumn: { base: "1", md: "4 / span 9" },
          })}
        >
          <header
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "3",
              minH: "3rem",
              paddingX: { base: "3", sm: "4" },
            })}
          >
            <div className={css({ minW: 0 })}>
              <p
                className={css({
                  fontWeight: "semibold",
                  color: "fg.DEFAULT",
                  fontSize: "sm",
                  lineHeight: "tight",
                })}
              >
                # ひとりごと
              </p>
              <p
                className={css({
                  display: { base: "none", sm: "block" },
                  fontSize: "2xs",
                  color: "fg.subtle",
                  lineHeight: "tight",
                })}
              >
                作業中に考えたことを気軽に書く。
              </p>
            </div>
          </header>

          <div className={cx(stack({ gap: 4 }), css({ padding: { base: "3", sm: "4" } }))}>
            {/* Samuido's real post in #ひとりごと from 2026/03/21.
                Preserved verbatim, including the "(唐突)" aside and
                the blank-line paragraph break. The line break
                inside each paragraph uses a literal `<br />` to
                match how Discord renders consecutive non-empty
                lines; the blank line between the two paragraphs is
                expressed as a `<p>` boundary with `marginBlockStart`
                so the visual separation reads as paragraph spacing,
                not extra line spacing inside one paragraph. */}
            <div className={message}>
              <Image
                src={ADMINISTRATOR.profileImageUrl}
                alt={`${ADMINISTRATOR.name}のアバター`}
                width={32}
                height={32}
                className={css({
                  width: "8",
                  height: "8",
                  borderRadius: "full",
                  flexShrink: 0,
                  objectFit: "cover",
                })}
              />
              <div className={cx(stack({ gap: 1 }))}>
                <div className={css({ display: "flex", gap: "2", alignItems: "baseline" })}>
                  <strong className={css({ fontSize: "sm", color: "fg.DEFAULT", fontWeight: "semibold" })}>
                    {ADMINISTRATOR.name}
                  </strong>
                  <span className={css({ fontSize: "2xs", color: "fg.subtle" })}>
                    2026/03/21 17:58
                  </span>
                </div>
                <div
                  className={css({
                    fontSize: "xs",
                    color: "fg.muted",
                    lineHeight: "relaxed",
                    "& p": { margin: 0 },
                    "& p + p": { marginBlockStart: "2" },
                  })}
                >
                  <p>
                    私はVSCodeのUXデザインが一番のお手本だと思ってる(唐突)
                    <br />
                    大量の機能があるわりに認知負荷が低くて自由度が高い
                  </p>
                  <p>
                    目指すべき高みである
                    <br />
                    この世のUIすべてがVSCodeになってほしい
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

