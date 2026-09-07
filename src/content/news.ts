/**
 * News / announcement entries rendered by `/news`.
 *
 * Authoring an announcement means appending one object to `newsItems`.
 * `body` accepts the lightweight Markdown subset supported by
 * `src/app/news/markdown.tsx`:
 *   - blank line separated paragraphs (single newlines are kept as line breaks)
 *   - unordered lists: a block whose every line starts with `- `
 *   - inline links: `[ラベル](https://example.com)`
 *
 * Refs:
 *   - Issue #21
 *   - docs/architecture.md
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
    date: "2026-07-19",
    title: "ido-bata Discord サーバーを開設しました",
    tags: ["お知らせ"],
    body: `「井戸端」のように気軽に集まって話せる場所として、ido-bata Discord サーバーを開設しました。
技術の話も雑談も、通りがかりのひとことから始められる場所を目指しています。

参加方法や雰囲気については [GitHub のリポジトリ](https://github.com/ido-bata/ido-bata.github.io) も参照してください。`,
  },
  {
    date: "2026-08-11",
    title: "チャンネル構成を整理しました",
    tags: ["お知らせ"],
    body: `話題が増えてきたため、雑談 / 技術 / 作業ログのチャンネルを分けました。過去のログはそのまま残しています。

はじめて参加する方は、自己紹介チャンネルにひとこと書き込むところから始めてみてください。`,
  },
  {
    date: "2026-08-30",
    title: "もくもく会を毎週土曜の夜に開催します",
    tags: ["イベント", "もくもく会"],
    body: `毎週土曜 21:00 から、Discord のボイスチャンネルでもくもく会を開催します。作業する内容は自由です。

- 途中参加・途中退出は自由
- マイクなし / 画面共有なしでも歓迎
- 開始時に「今日やること」をテキストチャンネルに書き込むだけで OK`,
  },
  {
    date: "2026-09-06",
    title: "サイト v0.2.0 を公開しました",
    tags: ["リリース"],
    body: `ido-bata 公式サイトの v0.2.0 を公開しました。
ヘッダーとフッターに Discord への参加リンクを常設したので、どのページからでもサーバーに参加できます。

次のスプリントでは、このお知らせページやコミュニティガイドラインの整備を進めます。`,
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
