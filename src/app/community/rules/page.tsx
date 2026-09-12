import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { rules, type ChannelRule, type RuleSection } from "@/content/rules";

/**
 * /community/rules - サーバルール / ガイドライン
 *
 * Composes the shared layout recipes (`container content` / `grid` /
 * `section` / `stack`) so the page-edge alignment matches the home
 * page. Page-opening band is a left-aligned 12-col split (left rail:
 * eyebrow → h1 → lede; right rail: page metadata surface) instead of
 * a centred hero. Section dividers come from the project-wide
 * `Separator` primitive (Ark UI styled). Reading rhythm stays
 * comfortable because the inner prose is capped via the
 * `<Section>` card width inside the long-form sub-flow.
 *
 * Page copy lives in `src/content/rules.ts`. UI and data are kept
 * separate so additions / reordering stay in the data file.
 *
 * refs:
 *   - Issue #19
 *   - docs/code-of-conduct.md
 *   - docs/privacy.md
 *   - .agents/skills/layout-system
 */
export const metadata: Metadata = {
  title: "サーバルール / ガイドライン | ido-bata",
  description: "ido-bata コミュニティのサーバルール・ガイドライン。",
};

function Section({ section }: { section: RuleSection }) {
  return (
    <section id={section.id} className={cx(stack({ gap: 3 }))}>
      <h2
        className={css({
          fontSize: { base: "xl", md: "2xl" },
          fontWeight: "semibold",
          color: "fg.DEFAULT",
          lineHeight: "tight",
        })}
      >
        {section.title}
      </h2>
      {section.body ? (
        <p
          className={css({
            fontSize: "md",
            color: "fg.DEFAULT",
            lineHeight: "relaxed",
          })}
        >
          {section.body}
        </p>
      ) : null}
      {section.bullets && section.bullets.length > 0 ? (
        <ul
          className={css({
            listStyle: "disc",
            pl: "6",
            display: "flex",
            flexDirection: "column",
            gap: "2",
            fontSize: "md",
            color: "fg.DEFAULT",
            lineHeight: "relaxed",
          })}
        >
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function ChannelCard({ channel }: { channel: ChannelRule }) {
  return (
    <article
      className={cx(
        css({
          bg: "bg.canvas",
          border: "1px solid",
          borderColor: "border",
          borderRadius: "lg",
          p: { base: "4", md: "5" },
          display: "flex",
          flexDirection: "column",
          gap: "3",
        }),
      )}
    >
      <header className={cx(stack({ gap: 1 }))}>
        <span
          className={css({
            fontFamily: "mono",
            fontSize: "md",
            fontWeight: "semibold",
            color: "accent.DEFAULT",
          })}
        >
          {channel.name}
        </span>
        <p
          className={css({
            fontSize: "sm",
            color: "fg.muted",
            lineHeight: "relaxed",
          })}
        >
          {channel.purpose}
        </p>
      </header>
      <p
        className={css({
          fontSize: "xs",
          fontWeight: "semibold",
          color: "fg.subtle",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        })}
      >
        運用ルール
      </p>
      <ul
        className={css({
          listStyle: "circle",
          pl: "5",
          display: "flex",
          flexDirection: "column",
          gap: "1",
          fontSize: "sm",
          color: "fg.DEFAULT",
          lineHeight: "relaxed",
        })}
      >
        {channel.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </article>
  );
}

export default function CommunityRulesPage() {
  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "サーバルール" }]} />

      <header className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
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
              Community
            </p>
            <h1
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              サーバルール / ガイドライン
            </h1>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "48ch",
              })}
            >
              本ページは行動規範 (Code of Conduct)
              と整合する形で段階的に整えていきます。具体的な理念・推奨・禁止行為・チャネル別運用は、オーナーの正本化後に掲載します。
            </p>
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
              <dt className={css({ color: "fg.muted" })}>最終更新</dt>
              <dd className={css({ color: "fg.DEFAULT", fontFamily: "mono", margin: 0 })}>
                {rules.lastUpdated}
              </dd>
              <dt className={css({ color: "fg.muted" })}>関連</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>行動規範 / プライバシー</dd>
            </dl>
          </aside>
        </div>
      </header>

      <Separator />

      <div className={cx(section({ variant: "flow" }), stack({ gap: 12 }))}>
        <Section section={rules.philosophy} />
        <Section section={rules.recommended} />
        <Section section={rules.prohibited} />

        {rules.channels.items.length > 0 ? (
          <section id="channels" className={cx(stack({ gap: 4 }))}>
            <h2
              className={css({
                fontSize: { base: "xl", md: "2xl" },
                fontWeight: "semibold",
                color: "fg.DEFAULT",
                lineHeight: "tight",
                letterSpacing: "-0.01em",
              })}
            >
              チャネル別運用ルール
            </h2>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
              })}
            >
              {rules.channels.intro}
            </p>
            <div className={cx(stack({ gap: 4 }))}>
              {rules.channels.items.map((channel) => (
                <ChannelCard key={channel.name} channel={channel} />
              ))}
            </div>
          </section>
        ) : null}

        <Section section={rules.enforcement} />
        <Section section={rules.meta} />
      </div>

      <Separator />
    </main>
  );
}
