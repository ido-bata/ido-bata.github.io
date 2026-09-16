import Image from "next/image";
import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Button } from "@/components/ui/button";
import { CommunityVisual } from "@/components/CommunityVisual";
import { DiscordJoinButton } from "@/components/DiscordJoinButton";
import { DISCORD_INVITE } from "@/lib/env";
import { CHANNELS, CHANNEL_CATEGORIES } from "@/content/channels";
import { IDOBATA_TIME } from "@/content/activities";
import { FEATURED_PROJECTS, getProjectPath } from "@/content/projects";
import { ADMINISTRATOR, CONTRIBUTION_LINKS } from "@/content/community";

/**
 * Pick a few representative channels per category for the home-page
 * Discord preview. The home page shouldn't dump the whole server
 * tree (that's `/channels`'s job); it should let a visitor see the
 * shape of the place.
 *
 * Categories chosen to span text + forum + voice so the preview
 * hints at the medium, not just the topic.
 */
const CHANNEL_PREVIEW: ReadonlyArray<{
  category: string;
  channels: ReadonlyArray<{ name: string; description: string; type: string }>;
}> = [
  {
    category: "PDCA",
    channels: [
      {
        name: "ꓑlan-計画",
        description: "やりたいことや目標を宣言する。",
        type: "text",
      },
      {
        name: "ꓓo-実行",
        description: "試したことや制作の進み具合を共有する。",
        type: "text",
      },
      {
        name: "転送-補足",
        description: "評価対象への補足やフィードバックをまとめる。",
        type: "forum",
      },
    ],
  },
  {
    category: "共有",
    channels: [
      {
        name: "素材・配布",
        description: "制作に使える素材を共有・配布する。",
        type: "text",
      },
      {
        name: "チートシート",
        description: "手元で参照できる資料を共有する。",
        type: "text",
      },
      {
        name: "宣伝・拡散希望",
        description: "公開した作品やツールを知らせる。",
        type: "text",
      },
    ],
  },
  {
    category: "作業",
    channels: [
      {
        name: "作業（無言）",
        description: "会話せず同じ場所で作業する音声チャンネル。",
        type: "voice",
      },
      {
        name: "作業（雑）",
        description: "雑談を交えながら作業する音声チャンネル。",
        type: "voice",
      },
      {
        name: "聞き専",
        description: "作業中の音声を聞く人向けのテキストチャンネル。",
        type: "text",
      },
    ],
  },
];

const sectionLabel = css({
  fontSize: "xs",
  color: "fg.muted",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

/**
 * Section header label + heading block. Pinned to the left rail
 * (span 3) so every section reads with the same alignment axis.
 *
 * `alignSelf: start` keeps the heading column at its intrinsic
 * height instead of stretching to match the right rail's row
 * height. Without this the heading floated at the top of its
 * column with a tall band of empty space below the h2 — that
 * empty band read as "wasted margin" and made the heading look
 * detached from the content beside it (the very misalignment
 * the user flagged on the "使えるもの" and "運営とサイト"
 * sections).
 */
const sectionHeading = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  alignSelf: "start",
});

/**
 * Feature link used inside the right rail of each section (span 9).
 *
 * Intentionally surface-less: no padding, no minH, no border, no
 * background. The card sits flush with the section heading's left
 * edge so its eyebrow / title / description align to the same
 * y-axis as the rest of the column — previously a 12rem minH +
 * padding 5/6 turned each card into its own boxed region that
 * read as misaligned with the rest of the page rhythm. The hover
 * signal comes from the colour shift on the link text alone.
 */
const featureLink = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
  color: "fg.DEFAULT",
  textDecoration: "none",
  transition: "color 150ms ease",
  _hover: { color: "accent.default" },
  _focusVisible: { outline: "2px solid", outlineColor: "accent.default", outlineOffset: "2px" },
});

/**
 * Small "view all" link rendered as part of a section header row,
 * never as a standalone CTA button. Lives next to the section label
 * so it reads as a navigational affordance for the section, not a
 * detached action.
 */
const viewAllLink = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "1",
  color: "fg.muted",
  fontSize: "sm",
  textDecoration: "none",
  width: "fit-content",
  _hover: { color: "accent.default" },
});

/**
 * Profile block. Reads as a "hero statement" rather than a boxed
 * card: large 96px avatar next to an xl name + role, bio underneath,
 * X link as a clear CTA at the bottom. No background, no border,
 * no radius — it lives in the column rhythm and uses scale to
 * stand out from the contribution links beside it.
 */

/**
 * Contribution link row. The arrow is inlined with the label (on the
 * same row) instead of floated into a second grid column, so all
 * three arrows always share the label baseline — wrapping the
 * description underneath never drags the arrow down on its own row.
 */
const contributionLink = css({
  display: "flex",
  flexDirection: "column",
  gap: "1",
  color: "fg.DEFAULT",
  textDecoration: "none",
  _hover: { color: "accent.default" },
});

/**
 * Label + arrow inline cluster. The arrow sits at the label's
 * baseline so it reads as a directional suffix of the link rather
 * than an independent affordance floating on the right.
 */
const contributionLinkHeading = css({
  display: "inline-flex",
  alignItems: "baseline",
  gap: "2",
  width: "fit-content",
});

const contributionLinkArrow = css({
  color: "fg.subtle",
  fontSize: "sm",
});

export default function Home() {
  return (
    <main>
      {/* Hero ───────────────────────────────────────────────
          Page-opening band breaks out of the content container
          and uses the wide container (84rem) so the chat mockup
          can extend toward the right page edge. Without the wider
          composition the right rail sat centred inside the 72rem
          content container and the visual had orphan whitespace
          on its right that read as an accident rather than a
          deliberate margin.

          Grid follows the spec: left-rail (span 5, text) +
          right-rail (span 7, visual). The chat mockup is a primary
          surface (not an accent thumbnail), so giving the visual
          the wider column lets the channels list / message stream
          read as a real Discord surface rather than a thumbnailed
          illustration. The remaining sections below stay inside
          the content container so the Hero's wider composition
          reads as a band, not the default width for the whole
          page. */}
      <section
        aria-labelledby="hero-heading"
        className={cx(section({ variant: "flow" }))}
      >
        <div className={cx(container({ size: "wide" }))}>
          <div className={cx(grid({ cols: 12, gap: 6 }), css({ alignItems: "center" }))}>
            <div
              className={cx(
                stack({ gap: 5 }),
                css({ gridColumn: { base: "1", md: "span 5" } }),
              )}
            >
              {/* Eyebrow + h1 is the page-opening identity, not a
                  catchphrase. "つくる途中を、持ち寄る。" and the
                  long descriptive lede were removed — the community
                  runs on direct identity (samuido's practical server,
                  called いど端) rather than aspirational copy, so the
                  Hero just states what the place is and lets the
                  Discord-window visual to its right carry the rest
                  of the "what it feels like to be here" weight. */}
              <p className={sectionLabel}>samuido の実利サーバー</p>
              <h1
                id="hero-heading"
                className={css({
                  fontSize: { base: "4xl", md: "5xl" },
                  fontWeight: "bold",
                  lineHeight: "tight",
                  letterSpacing: "-0.02em",
                  color: "fg.DEFAULT",
                })}
              >
                いど端
              </h1>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  lineHeight: "relaxed",
                  color: "fg.muted",
                  maxW: "38ch",
                })}
              >
                Discord 上で、制作と開発を前に進めるための小さなコミュニティ。
              </p>
              <div className={cx(cluster({ gap: 3 }))}>
                {DISCORD_INVITE ? (
                  <DiscordJoinButton href={DISCORD_INVITE} label="Discordに参加" size="lg" />
                ) : null}
                <Button asChild variant="outline" size="lg">
                  <Link href="/welcome">初めての方へ</Link>
                </Button>
              </div>
            </div>
            <div className={css({ gridColumn: { base: "1", md: "span 7" }, minW: 0 })}>
              <CommunityVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page — content container ─────────────── */}
      <div className={cx(container({ size: "content" }))}>
        {/* Tools & activities ───────────────────────────────── */}
      <section
        aria-labelledby="utility-heading"
        className={cx(
          section({ variant: "flow" }),
          css({ borderTop: "1px solid", borderColor: "border.hairline" }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(sectionHeading, css({ gridColumn: { base: "1", md: "span 3" } }))}>
            <p className={sectionLabel}>Tools &amp; activities</p>
            <h2
              id="utility-heading"
              className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
            >
              使えるもの
            </h2>
          </div>
          <div className={cx(stack({ gap: 5 }), css({ gridColumn: { base: "1", md: "span 9" } }))}>
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                gap: "5",
              })}
            >
              <Link href={IDOBATA_TIME.path} className={featureLink}>
                <span className={sectionLabel}>毎日 {IDOBATA_TIME.time}</span>
                <strong className={css({ fontSize: "xl" })}>{IDOBATA_TIME.name}</strong>
                <span className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
                  {IDOBATA_TIME.summary}
                </span>
              </Link>
              {FEATURED_PROJECTS.map((project) => (
                <Link key={project.slug} href={getProjectPath(project)} className={featureLink}>
                  <span className={sectionLabel}>{project.eyebrow}</span>
                  <strong className={css({ fontSize: "xl" })}>{project.name}</strong>
                  <span className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
                    {project.summary}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/projects" className={viewAllLink}>
              すべてのプロジェクトを見る <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Discord ─────────────────────────────────────────── */}
      <section
        aria-labelledby="channels-heading"
        className={cx(
          section({ variant: "flow" }),
          css({ borderTop: "1px solid", borderColor: "border.hairline" }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(sectionHeading, css({ gridColumn: { base: "1", md: "span 3" } }))}>
            <p className={sectionLabel}>Discord</p>
            <h2
              id="channels-heading"
              className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
            >
              チャネルから探す
            </h2>
          </div>
          <div className={css({ gridColumn: { base: "1", md: "span 9" } })}>
            <div className={cx(stack({ gap: 5 }))}>
              <p className={css({ color: "fg.muted", lineHeight: "relaxed", maxW: "60ch" })}>
                {CHANNEL_CATEGORIES.length}
                カテゴリ、{CHANNELS.length}
                チャネル。テキスト、フォーラム、音声、ステージを用途で分けています。
              </p>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: {
                    base: "1fr",
                    md: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: "5",
                })}
              >
                {CHANNEL_PREVIEW.map((group) => (
                  <div
                    key={group.category}
                    className={cx(
                      stack({ gap: 3 }),
                      css({
                        padding: "5",
                        bg: "bg.subtle",
                        borderRadius: "lg",
                      }),
                    )}
                  >
                    <p
                      className={css({
                        fontSize: "2xs",
                        color: "fg.subtle",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: "semibold",
                      })}
                    >
                      {group.category}
                    </p>
                    <ul
                      className={cx(
                        stack({ gap: 3 }),
                        css({ listStyle: "none", margin: 0, padding: 0 }),
                      )}
                    >
                      {group.channels.map((channel) => (
                        <li
                          key={channel.name}
                          className={css({
                            display: "grid",
                            gridTemplateColumns: "1rem minmax(0, 1fr)",
                            gap: "2",
                            alignItems: "start",
                          })}
                        >
                          <span
                            aria-hidden="true"
                            className={css({
                              fontFamily: "mono",
                              color: "fg.subtle",
                              fontSize: "sm",
                              lineHeight: "tight",
                            })}
                          >
                            {channel.type === "voice" ? "◉" : "#"}
                          </span>
                          <div
                            className={css({
                              display: "flex",
                              flexDirection: "column",
                              minW: 0,
                            })}
                          >
                            <p
                              className={css({
                                fontSize: "sm",
                                fontWeight: "semibold",
                                color: "fg.DEFAULT",
                                lineHeight: "tight",
                              })}
                            >
                              {channel.name}
                            </p>
                            <p
                              className={css({
                                fontSize: "xs",
                                color: "fg.muted",
                                lineHeight: "relaxed",
                                margin: 0,
                              })}
                            >
                              {channel.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link href="/channels" className={viewAllLink}>
                すべてのチャネルを見る <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* People & source ────────────────────────────────────
          Outer grid uses the same 3 + 9 axis as Tools / Discord /
          Reference, so the section title column width stays in
          step with the rest of the page. The right rail (span 9)
          then drops into its own sub-grid: profile in 5fr and the
          three contribution links stacked in 4fr. Profile gets
          the wider share because the avatar + bio + X link needs
          room to breathe; the link labels are short enough to fit
          in the narrower column.

          The two sub-grids each manage their own internal
          alignment, so the title column doesn't have to
          renegotiate its width to "match" the profile — the
          outer 12-col rhythm is the alignment axis, and the
          inner sub-grid handles the content split. */}
      <section
        aria-labelledby="people-heading"
        className={cx(
          section({ variant: "flow" }),
          css({ borderTop: "1px solid", borderColor: "border.hairline" }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(sectionHeading, css({ gridColumn: { base: "1", md: "span 3" } }))}>
            <p className={sectionLabel}>People &amp; source</p>
            <h2
              id="people-heading"
              className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
            >
              運営とサイト
            </h2>
          </div>
          <div
            className={css({
              gridColumn: { base: "1", md: "span 9" },
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "5fr 4fr" },
              gap: { base: "8", md: "6" },
              alignItems: { base: "stretch", md: "start" },
            })}
          >
            <div className={cx(stack({ gap: 5 }), css({ minW: 0 }))}>
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0, 1fr)",
                  gap: "5",
                  alignItems: "center",
                })}
              >
                <Image
                  src={ADMINISTRATOR.profileImageUrl}
                  alt={`${ADMINISTRATOR.name}のプロフィール写真`}
                  width={96}
                  height={96}
                  className={css({
                    width: "24",
                    height: "24",
                    borderRadius: "full",
                    objectFit: "cover",
                  })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: "2xl",
                      fontWeight: "bold",
                      color: "fg.DEFAULT",
                      lineHeight: "tight",
                    })}
                  >
                    {ADMINISTRATOR.name}
                  </p>
                  <p className={css({ fontSize: "sm", color: "fg.muted" })}>
                    {ADMINISTRATOR.role}
                  </p>
                </div>
              </div>
              <p
                className={css({
                  fontSize: "md",
                  color: "fg.muted",
                  lineHeight: "relaxed",
                  maxW: "44ch",
                })}
              >
                {ADMINISTRATOR.summary}
              </p>
              <a
                href={ADMINISTRATOR.xUrl}
                target="_blank"
                rel="noreferrer"
                className={css({
                  color: "accent.default",
                  fontWeight: "semibold",
                  fontSize: "md",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1",
                  width: "fit-content",
                })}
              >
                X {ADMINISTRATOR.xHandle} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={cx(stack({ gap: 6 }))}>
              {CONTRIBUTION_LINKS.map((link) => (
                <a
                  key={link.kind}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={contributionLink}
                >
                  <span className={contributionLinkHeading}>
                    <strong className={css({ fontSize: "lg", fontWeight: "semibold" })}>
                      {link.label}
                    </strong>
                    <span aria-hidden="true" className={contributionLinkArrow}>
                      ↗
                    </span>
                  </span>
                  <span
                    className={css({ fontSize: "sm", color: "fg.muted", lineHeight: "relaxed" })}
                  >
                    {link.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reference ──────────────────────────────────────────
          Inner grid uses the same 3-col layout Tools / Discord
          use, so every section's right rail first card sits in
          a column the same width as the title column (span 3).
          The title column carries the same eyebrow + h2 shape
          as the other sections so the left rail reads as a
          consistent label column, not an inconsistent stub. */}
      <section
        aria-labelledby="reference-heading"
        className={cx(
          section({ variant: "flow" }),
          css({ borderTop: "1px solid", borderColor: "border.hairline" }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(sectionHeading, css({ gridColumn: { base: "1", md: "span 3" } }))}>
            <p className={sectionLabel}>Reference</p>
            <h2
              id="reference-heading"
              className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
            >
              参考ページ
            </h2>
          </div>
          <div
            className={css({
              gridColumn: { base: "1", md: "span 9" },
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
              gap: "5",
            })}
          >
            <Link href="/news" className={featureLink}>
              <span className={sectionLabel}>News</span>
              <h2 className={css({ fontSize: "xl", fontWeight: "bold" })}>最新の動き</h2>
              <span className={css({ color: "fg.muted" })}>サイトとサーバーに関する更新</span>
            </Link>
            <Link href="/welcome" className={featureLink}>
              <span className={sectionLabel}>Welcome</span>
              <h2 className={css({ fontSize: "xl", fontWeight: "bold" })}>初めての方へ</h2>
              <span className={css({ color: "fg.muted" })}>参加前後に読む案内</span>
            </Link>
            <Link href="/community/rules" className={featureLink}>
              <span className={sectionLabel}>Guide</span>
              <h2 className={css({ fontSize: "xl", fontWeight: "bold" })}>ルール・ガイドライン</h2>
              <span className={css({ color: "fg.muted" })}>参加前に確認しておきたいこと</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
