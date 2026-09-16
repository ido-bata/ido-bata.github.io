export type ProjectLinkKind = "repository" | "releases" | "guide";

export type ProjectLink = {
  label: string;
  href: string;
  kind: ProjectLinkKind;
};

export type ProjectRelatedLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  features: readonly string[];
  status: string;
  featured?: boolean;
  links: readonly ProjectLink[];
  relatedLinks?: readonly ProjectRelatedLink[];
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "layer-note",
    name: "LayerNote",
    eyebrow: "After Effects extension",
    featured: true,
    summary: "After Effectsのレイヤーにメモを残し、プロジェクトの中で管理できる拡張機能です。",
    features: [
      "レイヤーごとのメモをプロジェクト内に保存し、あとから編集できる",
      "プロパティやエクスプレッションを一覧で確認・編集できる",
      "検索、整形、検証をひとつのパネルから行える",
    ],
    status:
      "署名済みZXPをGitHub Releasesで配布する設計です。公開状況と導入手順はリポジトリで確認できます。",
    links: [
      {
        label: "GitHubでソースを見る",
        href: "https://github.com/ido-bata/Ae_LayerNote",
        kind: "repository",
      },
      {
        label: "Releasesを確認する",
        href: "https://github.com/ido-bata/Ae_LayerNote/releases",
        kind: "releases",
      },
      {
        label: "使い方を読む",
        href: "https://github.com/ido-bata/Ae_LayerNote/blob/main/docs/users.md",
        kind: "guide",
      },
    ],
  },
  {
    slug: "server-bot",
    name: "ido-bata-server-bot",
    eyebrow: "Discord bot",
    featured: true,
    summary:
      "いど端のDiscord運営を支えるBotです。現在は「いど端 底力 タイム」の進行を担っています。",
    features: [
      "作業と休憩の開始を音声とテキストで知らせる",
      "ボイスチャンネルとステージチャンネルのどちらでも進行できる",
      "リアクションロールなど、サーバー運営機能の基盤を備える",
    ],
    status:
      "底力タイムのタイムキーパーを毎日運用しています。リアクションロールはサーバー設定に応じて使う機能です。",
    links: [
      {
        label: "GitHubでソースを見る",
        href: "https://github.com/ido-bata/ido-bata-server-bot",
        kind: "repository",
      },
    ],
    relatedLinks: [
      {
        label: "底力タイムの時間割を見る",
        href: "/activities/idobata-time",
      },
    ],
  },
];

export const FEATURED_PROJECTS: readonly Project[] = PROJECTS.filter(
  (project) => project.featured,
).slice(0, 2);

export function getProjectPath(project: Pick<Project, "slug">): string {
  return `/projects/${project.slug}`;
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
