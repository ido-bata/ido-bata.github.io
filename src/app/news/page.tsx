import type { Metadata } from "next";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getNewsSortedByDateDesc } from "@/content/news";
import { MarkdownBody } from "./markdown";

export const metadata: Metadata = {
  title: "お知らせ | ido-bata",
  description: "ido-bata コミュニティのお知らせ。",
};

/**
 * `2026-09-06` -> `2026年9月6日`.
 *
 * Formatted by hand instead of `toLocaleDateString` so the output does not
 * depend on the ICU data of whichever machine runs the static export.
 */
function formatNewsDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) {
    return isoDate;
  }
  return `${year}年${Number(month)}月${Number(day)}日`;
}

/**
 * お知らせページ。
 *
 * Layout:
 *   - breadcrumb strip (ホーム / News) at the top of `<main>`
 *   - page-opening band on `container({ size: "content" })`: left
 *     rail (eyebrow → h1 → lede) plus right rail (page metadata
 *     surface). Left-aligned grid composition — no centred hero band.
 *   - left-aligned chronological list (`variant: "flow"`) below so
 *     the reading rhythm matches the rest of the site. Each entry
 *     sits on the `surface` recipe and items are separated by the
 *     project-wide `Separator` primitive.
 *
 * Refs:
 *   - Issue #21
 *   - .agents/skills/layout-system
 */
export default function NewsPage() {
  const items = getNewsSortedByDateDesc();
  const latestDate = items[0]?.date ?? "—";

  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "News" }]} />

      <section className={cx(section({ variant: "flow" }))}>
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
              News
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
              お知らせ
            </h1>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "48ch",
              })}
            >
              コミュニティからの告知や更新情報を掲載します。具体的な告知はオーナーの正本化後に追加されます。
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
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>{items.length}</dd>
              <dt className={css({ color: "fg.muted" })}>最新</dt>
              <dd className={css({ color: "fg.DEFAULT", fontFamily: "mono", margin: 0 })}>
                {latestDate}
              </dd>
              <dt className={css({ color: "fg.muted" })}>並び順</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>新しい順</dd>
            </dl>
          </aside>
        </div>
      </section>

      {items.length === 0 ? (
        <section className={cx(section({ variant: "flow" }))}>
          <p
            className={css({
              fontSize: "md",
              color: "fg.muted",
              lineHeight: "relaxed",
              textAlign: "center",
            })}
          >
            まだお知らせはありません。
          </p>
        </section>
      ) : (
        <section className={cx(section({ variant: "flow" }))}>
          <ol
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: { base: "5", md: "6" },
              margin: 0,
              padding: 0,
              listStyleType: "none",
            })}
          >
            {items.map((item, index) => (
              <li key={`${item.date}-${item.title}`}>
                <article
                  className={cx(
                    css({
                      display: "flex",
                      flexDirection: "column",
                      gap: "4",
                      padding: { base: "5", md: "6" },
                      borderRadius: "lg",
                      border: "1px solid",
                      borderColor: "border",
                      bg: "bg.canvas",
                    }),
                  )}
                >
                  <div
                    className={cx(
                      css({
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "3",
                      }),
                    )}
                  >
                    <time
                      className={css({
                        color: "fg.subtle",
                        fontFamily: "mono",
                        fontSize: "sm",
                      })}
                      dateTime={item.date}
                    >
                      {formatNewsDate(item.date)}
                    </time>
                    {item.tags && item.tags.length > 0 ? (
                      <ul
                        aria-label="タグ"
                        className={css({
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "2",
                          margin: 0,
                          padding: 0,
                          listStyleType: "none",
                        })}
                      >
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className={css({
                              display: "inline-flex",
                              alignItems: "center",
                              bg: "bg.muted",
                              color: "fg.muted",
                              borderRadius: "full",
                              paddingInline: "3",
                              paddingBlock: "1",
                              fontSize: "xs",
                              fontWeight: "medium",
                            })}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <h2
                    className={css({
                      margin: 0,
                      fontSize: { base: "xl", md: "2xl" },
                      fontWeight: "semibold",
                      lineHeight: "tight",
                    })}
                  >
                    {item.title}
                  </h2>
                  <MarkdownBody source={item.body} />
                </article>
                {index < items.length - 1 ? <Separator className={css({ mt: "5" })} /> : null}
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}
