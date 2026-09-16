import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { rules, type ChannelRule, type RuleSection } from "@/content/rules";

/**
 * /community/rules - サーバルール / ガイドライン
 *
 * Composes the shared layout recipes (`container content` / `grid` /
 * `section` / `stack`) so the page-edge alignment matches the home
 * page. Page-opening band is a left-aligned 12-col split (left rail:
 * eyebrow → h1 → lede; right rail: page metadata surface) instead of
 * a centred hero. Reading rhythm stays comfortable because the inner
 * prose is capped via the `<Section>` card width inside the
 * long-form sub-flow.
 *
 * Cards and the metadata surface use `bg.subtle` + padding for
 * separation instead of `borderColor` rules. The earlier
 * `border` / `border.subtle` hairlines read as prominent lines on
 * the page (especially in dark mode where `border.subtle` resolves
 * to neutral.900) and clashed with the project-wide hairline
 * rhythm; a soft background gives the same grouping without the
 * visual weight. Section rhythm between the header and the rules
 * body comes from the section / stack recipes' vertical padding,
 * not from `<Separator />` rules — so the page reads as one
 * continuous band rather than a series of boxed regions.
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
      {section.body || (section.links && section.links.length > 0) ? (
        <p
          className={css({
            fontSize: "md",
            color: "fg.DEFAULT",
            lineHeight: "relaxed",
          })}
        >
          {section.body}
          {section.body && section.links && section.links.length > 0 ? " " : null}
          {section.links?.map((link, index) => (
            <span key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  color: "accent.DEFAULT",
                  fontWeight: "semibold",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                })}
              >
                {link.label}
              </a>
              {index < (section.links?.length ?? 0) - 1 ? " / " : ""}
            </span>
          ))}
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
          bg: "bg.subtle",
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
              サーバーを制作や開発に使い続けるための、基本的なふるまいと運用をまとめています。
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

      {/*
        Body — wrapped in a 12-col grid that puts ~1/6 of the page
        width into the left rail as deliberate negative space. Without
        this the long-form rules stretched across the full 1152px
        content area and the reading rhythm flattened (lines wrapping
        late, channels cards stacked edge-to-edge). Anchoring the body
        at cols 3–12 gives an 10/12 (≈83%) reading rail — left margin
        at 1/6 keeps the page visibly anchored to the design system
        without crowding the long-form copy. The inner 2-col grid for
        channel cards uses the same coordinate primitive, so each card
        is half the reading rail.
      */}
      <section className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 8 }))}>
          <div
            className={cx(
              stack({ gap: 12 }),
              css({ gridColumn: { base: "1", md: "3 / span 10" } }),
            )}
          >
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
                <ul
                  className={cx(
                    grid({ cols: 2, gap: 4 }),
                    css({ listStyle: "none", padding: 0, margin: 0, width: "100%" }),
                  )}
                >
                  {rules.channels.items.map((channel) => (
                    <li key={channel.name}>
                      <ChannelCard channel={channel} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <Section section={rules.enforcement} />
            <Section section={rules.meta} />
          </div>
        </div>
      </section>
    </main>
  );
}
