import type { Metadata } from "next";
import { css, cx } from "@/styled-system/css";
import { surface } from "@/styles";
import { getNewsSortedByDateDesc } from "@/content/news";
import { MarkdownBody } from "./markdown";

export const metadata: Metadata = {
  title: "お知らせ | ido-bata",
  description: "ido-bata コミュニティからの告知・アナウンスを新しい順に掲載しています。",
};

const pageStyle = css({
  width: "100%",
  maxWidth: "1100px",
  marginInline: "auto",
  paddingInline: "6",
  paddingBlock: { base: "10", md: "16" },
  display: "flex",
  flexDirection: "column",
  gap: { base: "8", md: "12" },
});

const introStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
});

const titleStyle = css({
  margin: "0",
  fontSize: { base: "3xl", md: "4xl" },
  fontWeight: "bold",
  lineHeight: "tight",
  letterSpacing: "-0.01em",
});

const leadStyle = css({
  margin: "0",
  color: "fg.muted",
  fontSize: "md",
  lineHeight: "relaxed",
});

const listStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: { base: "5", md: "6" },
  margin: "0",
  padding: "0",
  listStyleType: "none",
});

const cardStyle = cx(
  surface({ elevation: "flat" }),
  css({
    display: "flex",
    flexDirection: "column",
    gap: "4",
    padding: { base: "5", md: "6" },
  }),
);

const metaStyle = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "3",
});

const dateStyle = css({
  color: "fg.subtle",
  fontFamily: "mono",
  fontSize: "sm",
});

const tagListStyle = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2",
  margin: "0",
  padding: "0",
  listStyleType: "none",
});

const tagStyle = css({
  display: "inline-flex",
  alignItems: "center",
  bg: "bg.muted",
  color: "fg.muted",
  borderRadius: "full",
  paddingInline: "3",
  paddingBlock: "1",
  fontSize: "xs",
  fontWeight: "medium",
});

const itemTitleStyle = css({
  margin: "0",
  fontSize: { base: "xl", md: "2xl" },
  fontWeight: "semibold",
  lineHeight: "tight",
});

const emptyStyle = css({
  margin: "0",
  color: "fg.muted",
  fontSize: "md",
});

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

export default function NewsPage() {
  const items = getNewsSortedByDateDesc();

  return (
    <main className={pageStyle}>
      <div className={introStyle}>
        <h1 className={titleStyle}>お知らせ</h1>
        <p className={leadStyle}>
          ido-bata コミュニティからの告知やイベント情報を、新しいものから順に掲載しています。
        </p>
      </div>

      {items.length === 0 ? (
        <p className={emptyStyle}>まだお知らせはありません。</p>
      ) : (
        <ol className={listStyle}>
          {items.map((item) => (
            <li key={`${item.date}-${item.title}`}>
              <article className={cardStyle}>
                <div className={metaStyle}>
                  <time className={dateStyle} dateTime={item.date}>
                    {formatNewsDate(item.date)}
                  </time>
                  {item.tags && item.tags.length > 0 ? (
                    <ul className={tagListStyle} aria-label="タグ">
                      {item.tags.map((tag) => (
                        <li key={tag} className={tagStyle}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <h2 className={itemTitleStyle}>{item.title}</h2>
                <MarkdownBody source={item.body} />
              </article>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
