import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Button } from "@/components/ui/button";
import { DiscordJoinButton } from "@/components/DiscordJoinButton";
import { DISCORD_INVITE } from "@/lib/env";
import { CHANNELS, CHANNEL_CATEGORIES } from "@/content/channels";
import { IDOBATA_TIME } from "@/content/activities";
import { PROJECTS } from "@/content/projects";

const cardStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
  padding: { base: "5", md: "6" },
  border: "1px solid",
  borderColor: "border.subtle",
  borderRadius: "lg",
  bg: "bg.surface",
  color: "fg.DEFAULT",
  textDecoration: "none",
  transition: "border-color 150ms ease, transform 150ms ease",
  _hover: { borderColor: "border.strong", transform: "translateY(-2px)" },
  _focusVisible: { outline: "2px solid", outlineColor: "accent.default", outlineOffset: "2px" },
});

export default function Home() {
  const voiceChannels = CHANNELS.filter(({ type }) => type === "voice" || type === "stage");
  const textChannels = CHANNELS.length - voiceChannels.length;

  return (
    <main className={cx(container({ size: "content" }))}>
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
              Creator / Engineer community
            </p>
            <h1
              id="hero-heading"
              className={css({
                fontSize: { base: "4xl", md: "5xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.03em",
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
                maxW: "42ch",
              })}
            >
              制作や開発を進める人が、作業途中のものや知見を持ち寄るDiscordサーバーです。
            </p>
            <div className={cx(cluster({ gap: 3 }))}>
              {DISCORD_INVITE ? (
                <DiscordJoinButton href={DISCORD_INVITE} label="Discordに参加" size="lg" />
              ) : null}
              <Button asChild variant="outline" size="lg">
                <Link href="/channels">チャネル一覧</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/welcome">初めての方へ</Link>
              </Button>
            </div>
          </div>
          <aside
            aria-label="今日使えるもの"
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 5" },
                bg: "bg.subtle",
                border: "1px solid",
                borderColor: "border.subtle",
                borderRadius: "lg",
                padding: { base: "5", md: "6" },
              }),
            )}
          >
            <p className={css({ fontSize: "xs", color: "fg.muted", letterSpacing: "0.08em" })}>
              TODAY
            </p>
            <p className={css({ fontSize: "xl", fontWeight: "bold", color: "fg.DEFAULT" })}>
              {IDOBATA_TIME.name}
            </p>
            <p className={css({ color: "fg.muted" })}>
              毎日 {IDOBATA_TIME.time} · {IDOBATA_TIME.channel}
            </p>
            <Link
              href={IDOBATA_TIME.path}
              className={css({
                color: "accent.default",
                fontWeight: "semibold",
                width: "fit-content",
              })}
            >
              時間割と参加方法を見る →
            </Link>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="utility-heading"
        className={cx(section({ variant: "flow" }), stack({ gap: 6 }))}
      >
        <div className={cx(stack({ gap: 2 }))}>
          <p className={css({ fontSize: "xs", color: "fg.muted", letterSpacing: "0.08em" })}>
            TOOLS &amp; ACTIVITIES
          </p>
          <h2
            id="utility-heading"
            className={css({
              fontSize: { base: "2xl", md: "3xl" },
              fontWeight: "bold",
              color: "fg.DEFAULT",
            })}
          >
            使えるもの
          </h2>
          <p className={css({ color: "fg.muted" })}>いど端で運用・開発している活動とツールです。</p>
        </div>
        <div className={cx(grid({ cols: 3, gap: 4 }))}>
          <Link href={IDOBATA_TIME.path} className={cardStyle}>
            <span className={css({ fontSize: "xs", color: "fg.muted" })}>毎日の作業時間</span>
            <strong className={css({ fontSize: "xl" })}>{IDOBATA_TIME.name}</strong>
            <span className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
              {IDOBATA_TIME.summary}
            </span>
          </Link>
          {PROJECTS.map((project) => (
            <Link key={project.slug} href={project.path} className={cardStyle}>
              <span className={css({ fontSize: "xs", color: "fg.muted" })}>{project.eyebrow}</span>
              <strong className={css({ fontSize: "xl" })}>{project.name}</strong>
              <span className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
                {project.summary}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="channels-heading"
        className={cx(section({ variant: "flow" }), stack({ gap: 6 }))}
      >
        <div
          className={cx(
            cluster({ gap: 4 }),
            css({ justifyContent: "space-between", alignItems: "end" }),
          )}
        >
          <div className={cx(stack({ gap: 2 }))}>
            <h2
              id="channels-heading"
              className={css({
                fontSize: { base: "2xl", md: "3xl" },
                fontWeight: "bold",
                color: "fg.DEFAULT",
              })}
            >
              チャネルから探す
            </h2>
            <p className={css({ color: "fg.muted" })}>
              {CHANNEL_CATEGORIES.length}カテゴリ、{CHANNELS.length}チャネルを掲載しています。
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/channels">すべてのチャネルを見る</Link>
          </Button>
        </div>
        <div className={cx(grid({ cols: 2, gap: 4 }))}>
          <div
            className={cx(
              stack({ gap: 3 }),
              css({ padding: "5", borderRadius: "lg", bg: "bg.subtle" }),
            )}
          >
            <h3 className={css({ fontSize: "lg", fontWeight: "semibold", color: "fg.DEFAULT" })}>
              テキスト・フォーラム
            </h3>
            <p className={css({ color: "fg.muted" })}>
              {textChannels}チャネル。相談、制作途中の共有、告知など。
            </p>
          </div>
          <div
            className={cx(
              stack({ gap: 3 }),
              css({ padding: "5", borderRadius: "lg", bg: "bg.subtle" }),
            )}
          >
            <h3 className={css({ fontSize: "lg", fontWeight: "semibold", color: "fg.DEFAULT" })}>
              音声・ステージ
            </h3>
            <p className={css({ color: "fg.muted" })}>
              {voiceChannels.length}チャネル。作業、LT、底力タイムに利用できます。
            </p>
          </div>
        </div>
      </section>

      <section aria-label="案内" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 2, gap: 4 }))}>
          <Link href="/news" className={cardStyle}>
            <span className={css({ fontSize: "xs", color: "fg.muted" })}>NEWS</span>
            <h2 className={css({ fontSize: "xl", fontWeight: "bold" })}>最新の動き</h2>
            <span className={css({ color: "fg.muted" })}>
              サイトとサーバーに関する更新を確認する
            </span>
          </Link>
          <Link href="/community/rules" className={cardStyle}>
            <span className={css({ fontSize: "xs", color: "fg.muted" })}>GUIDE</span>
            <h2 className={css({ fontSize: "xl", fontWeight: "bold" })}>ルール・ガイドライン</h2>
            <span className={css({ color: "fg.muted" })}>参加前に確認しておきたいことを読む</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
