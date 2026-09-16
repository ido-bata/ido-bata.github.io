export const ADMINISTRATOR = {
  name: "samuido",
  role: "サーバー管理者 / ido-bata organizer",
  xHandle: "@361do_sleep",
  xUrl: "https://x.com/361do_sleep",
  // 管理者のプロフィール写真は Twitter (pbs.twimg.com) から直接読み込む。
  // 配信側で CDN が長期キャッシュしてくれるため静的書き出しと相性が良い。
  // next.config.ts の images.remotePatterns でこの hostname のみ許可している。
  profileImageUrl:
    "https://pbs.twimg.com/profile_images/2034243179176960000/ZcmwOt4U_400x400.jpg",
  summary: "いど端の運営と、サーバーを支えるツール・活動の設計を行っています。",
} as const;

export type ContributionLink = {
  kind: "repository" | "issues" | "guide";
  label: string;
  description: string;
  href: string;
};

export const CONTRIBUTION_LINKS: readonly ContributionLink[] = [
  {
    kind: "repository",
    label: "GitHubリポジトリ",
    description: "サイトのソースコードと変更履歴を見る",
    href: "https://github.com/ido-bata/ido-bata.github.io",
  },
  {
    kind: "issues",
    label: "Issues",
    description: "不具合や改善案を確認・提案する",
    href: "https://github.com/ido-bata/ido-bata.github.io/issues",
  },
  {
    kind: "guide",
    label: "コントリビューションガイド",
    description: "変更を提案する前に手順を確認する",
    href: "https://github.com/ido-bata/ido-bata.github.io/blob/main/CONTRIBUTING.md",
  },
];

/**
 * Featured post shown in the home-page Hero's Discord-window mockup.
 *
 * Pulled into a content module so copy edits / typo fixes land in
 * `src/content/` rather than in a presentational `.tsx` file, and so
 * the surface can be tested / data-driven without touching the
 * component layout.
 *
 * The shape preserves the original Discord rendering: a single
 * message with multiple `<p>` paragraphs, each paragraph optionally
 * containing `<br />`-separated lines. `dateTime` is ISO 8601 in
 * JST so screen readers and crawlers can parse it; the visible
 * timestamp stays in the Discord-style `YYYY/MM/DD HH:mm` format.
 */
export type FeaturedPostParagraph = {
  lines: readonly string[];
};

export type FeaturedPost = {
  /** Author display name. Rendered in the message header. */
  author: string;
  /** ISO 8601 datetime (JST offset) for the post. */
  dateTime: string;
  /** Visible timestamp in Discord's `YYYY/MM/DD HH:mm` format. */
  dateLabel: string;
  /** Post body — each entry becomes a `<p>`, each `lines` entry a `<br />`-separated run. */
  paragraphs: readonly FeaturedPostParagraph[];
};

export const FEATURED_POST: FeaturedPost = {
  author: "samuido",
  dateTime: "2026-03-21T17:58+09:00",
  dateLabel: "2026/03/21 17:58",
  paragraphs: [
    {
      lines: [
        "私はVSCodeのUXデザインが一番のお手本だと思ってる(唐突)",
        "大量の機能があるわりに認知負荷が低くて自由度が高い",
      ],
    },
    {
      lines: ["目指すべき高みである", "この世のUIすべてがVSCodeになってほしい"],
    },
  ],
};

/**
 * About-page section content (single source of truth).
 *
 * The `/about` page renders these as a `01 / Principle` →
 * `02 / Use` → `03 / Contribute` sequence. `kind` is the section
 * label after the leading number, so reordering or removing an
 * entry only needs editing this array — the leading number is
 * derived from the array index, and the `kind` value is shared
 * with the section heading so the two stay in sync.
 */
export type AboutSection = {
  kind: string;
  title: string;
  body: string;
  links?: readonly { href: string; label: string }[];
};

export const ABOUT_SECTIONS: readonly AboutSection[] = [
  {
    kind: "Principle",
    title: "実利を重視する",
    body: "専門分野の質問をする、制作途中のものを見せる、使える資料を共有する。必要なときに必要な相手と対話し、制作や開発が前へ進むことを大切にしています。",
  },
  {
    kind: "Use",
    title: "各自のために使う",
    body: "話題、共有、WIP、PDCA、作業時間など、用途ごとに場所を分けています。それぞれがやりたいことを始め、続けるために使うサーバーです。",
  },
  {
    kind: "Contribute",
    title: "このサイトを改善する",
    body: "サイトの変更は Issue 経由で提案します。 変更が小さくても、まず Issue を立てると背景と影響範囲を他のメンバーと揃えられます。",
    links: [
      { href: "https://github.com/ido-bata/ido-bata.github.io/issues", label: "Issues" },
      {
        href: "https://github.com/ido-bata/ido-bata.github.io/blob/main/CONTRIBUTING.md",
        label: "コントリビューションガイド",
      },
    ],
  },
];
