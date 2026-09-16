/**
 * News / announcement entries rendered by `/news`.
 *
 * Authoring an announcement means appending one object to `newsItems`.
 * `body` accepts the lightweight Markdown subset supported by
 * `src/app/news/markdown.tsx`:
 *   - blank line separated paragraphs (single newlines are kept as line breaks)
 *   - unordered lists: a block whose every line starts with `- `
 *   - inline links: `[label](https://example.com)`
 *
 */

export interface NewsItem {
  /** Publication date. ISO 8601 date part only (`YYYY-MM-DD`). */
  date: string;
  /** Headline shown in the list. */
  title: string;
  /** Markdown-subset body. See the module doc comment for what is supported. */
  body: string;
  /** Optional labels such as `リリース` / `イベント`. */
  tags?: string[];
}

export const newsItems: NewsItem[] = [
  {
    date: "2026-09-16",
    title: "活動とツールの案内を追加しました",
    body: "トップページから、いど端 底力 タイム、LayerNote、ido-bata-server-botの案内を確認できるようになりました。\n\nチャネル一覧には、現在使われている音声・ステージチャネルも掲載しています。",
    tags: ["サイト更新"],
  },
];

/**
 * Announcements ordered newest first.
 *
 * `date` is an ISO 8601 date, whose lexicographic order matches chronological
 * order, so a plain string comparison is enough (no `Date` parsing, therefore
 * no timezone drift between build machine and browser).
 */
export function getNewsSortedByDateDesc(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
}
