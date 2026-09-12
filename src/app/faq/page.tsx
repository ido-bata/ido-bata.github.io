import type { Metadata } from "next";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { DISCORD_INVITE } from "@/lib/env";
import { FAQ_ITEMS } from "@/content/faq";

export const metadata: Metadata = {
  title: "よくある質問 | ido-bata",
  description: "ido-bata コミュニティへのよくある質問。",
};

/**
 * FAQ ページ。
 *
 * Layout:
 *   - breadcrumb strip (ホーム / FAQ) at the top of `<main>`
 *   - page-opening band on `container({ size: "content" })` (same
 *     width as the home page so the page-edge alignment is held
 *     across the site): left rail (eyebrow → h1 → lede) plus right
 *     rail (page metadata surface). Left-aligned grid composition —
 *     no centred hero band.
 *   - left-aligned accordion shell (reading flow) below.
 *
 * Collapsible items are rendered through the project-wide `Accordion`
 * primitive (Ark UI based). When `FAQ_ITEMS` is empty the page renders
 * a single empty-state paragraph instead of an empty accordion shell.
 *
 * Refs:
 *   - Issue #18
 *   - Issue #90 (Ark UI adoption)
 *   - .agents/skills/layout-system
 */
export default function FaqPage() {
  const invite = DISCORD_INVITE;

  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "FAQ" }]} />

      <section aria-labelledby="faq-heading" className={cx(section({ variant: "flow" }))}>
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
              FAQ
            </p>
            <h1
              id="faq-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              よくある質問
            </h1>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "48ch",
              })}
            >
              コミュニティへのよくある質問を準備しています。具体的な質問と回答はオーナーの正本化後に掲載します。
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
              <dt className={css({ color: "fg.muted" })}>件数</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>{FAQ_ITEMS.length}</dd>
              <dt className={css({ color: "fg.muted" })}>並び順</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>正本化順</dd>
            </dl>
          </aside>
        </div>
      </section>

      {FAQ_ITEMS.length === 0 ? (
        <section className={cx(section({ variant: "tight" }))}>
          <p
            className={css({
              fontSize: "md",
              color: "fg.muted",
              lineHeight: "relaxed",
            })}
          >
            現在、掲載中の質問はありません。
          </p>
        </section>
      ) : (
        <section className={cx(section({ variant: "tight" }))}>
          <Accordion
            multiple
            collapsible
            defaultValue={[FAQ_ITEMS[0]?.id].filter(Boolean) as string[]}
            className={cx(css({ width: "100%" }))}
          >
            {FAQ_ITEMS.map((faq) => (
              <AccordionItem key={faq.id} id={faq.id} question={faq.question}>
                {faq.answer.map((paragraph) => (
                  <p key={paragraph} className={css({ fontSize: "md", lineHeight: "relaxed" })}>
                    {paragraph}
                  </p>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {invite ? (
        <section className={cx(section({ variant: "prose" }))}>
          <div className={cx(stack({ gap: 4 }))}>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
              })}
            >
              Discord サーバで活動しています。
            </p>
            <div>
              <Button asChild variant="solid" size="lg">
                <a href={invite} target="_blank" rel="noopener noreferrer">
                  <DiscordIcon size={18} />
                  <span>Discord サーバに参加</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
