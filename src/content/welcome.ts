import type { ChannelCategory } from "@/content/channels";

/**
 * Welcome-page content (single source of truth).
 *
 * The `/welcome` page imports from this file. Categories reference the
 * canonical `ChannelCategory` union from `@/content/channels` so the
 * page cannot reference a category that has been renamed / removed
 * from the channels listing — a category typo here is a build-time
 * error rather than a silently dropped section.
 *
 * `body` is the onboarding blurb for someone who just joined the
 * server; the page renders it alongside the category name.
 */

export type StartGuideEntry = {
  /** Must match an entry in `CHANNEL_CATEGORIES`. */
  category: ChannelCategory;
  /** One-line onboarding blurb for someone who just joined the server. */
  body: string;
};

export const START_GUIDE: readonly StartGuideEntry[] = [
  {
    category: "話題",
    body: "専門分野の質問や会話をする場所です。分野をまたぐ話題にも専用のチャンネルがあります。",
  },
  {
    category: "共有",
    body: "素材、ツール、資料、作品の公開や募集に使います。",
  },
  {
    category: "雑",
    body: "雑談、制作途中のもの、まとまる前の考えを書けます。",
  },
  {
    category: "PDCA",
    body: "やることを宣言し、進捗や評価、次の改善を記録する場所です。",
  },
];

export type RelatedEntry = {
  href: string;
  label: string;
  hint: string;
};

export const RELATED_LINKS: readonly RelatedEntry[] = [
  { href: "/channels", label: "チャネル一覧", hint: "カテゴリ別のチャネル構成" },
  { href: "/community/rules", label: "サーバルール", hint: "推奨・禁止・運用方針" },
  { href: "/about", label: "About", hint: "サーバーの考え方" },
  { href: "/faq", label: "FAQ", hint: "よくある質問" },
];
