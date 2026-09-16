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
