export type ProjectLinkKind = "repository" | "releases" | "guide";

export type ProjectLink = {
  label: string;
  href: string;
  /**
   * Optional link kind. When present, the project detail page renders
   * the link with a primary "solid" button for `repository` and an
   * outline button otherwise. Internal cross-references
   * (`relatedLinks`) intentionally omit `kind` and always render as
   * outline buttons, so a single `ProjectLink` shape covers both.
   */
  kind?: ProjectLinkKind;
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
  /**
   * Internal cross-references. Typed without `kind` so the
   * "always render as outline" contract in `ProjectLink.kind`
   * JSDoc is enforced at the type level — if a future content
   * entry tries to set `kind` here, the build breaks instead of
   * silently ignoring it.
   */
  relatedLinks?: readonly Omit<ProjectLink, "kind">[];
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

/**
 * Maximum number of projects shown on the home page's "featured" row.
 *
 * `src/app/page.tsx` renders `FEATURED_PROJECTS` next to `IDOBATA_TIME`
 * inside a 3-column grid (1 IDOBATA_TIME + N projects). Increasing
 * this value will break that row's layout, so any addition of a third
 * featured project must be paired with a layout change here.
 */
export const HOMEPAGE_FEATURED_PROJECTS_LIMIT = 2;

export const FEATURED_PROJECTS: readonly Project[] = PROJECTS.filter(
  (project) => project.featured,
).slice(0, HOMEPAGE_FEATURED_PROJECTS_LIMIT);

/**
 * Slug → project lookup. Only `getProject` reads from it (called
 * from `generateMetadata` and the page component);
 * `generateStaticParams` maps over `PROJECTS` directly.
 */
const PROJECT_BY_SLUG: ReadonlyMap<string, Project> = new Map(
  PROJECTS.map((project) => [project.slug, project] as const),
);

export function getProjectPath(project: Pick<Project, "slug">): string {
  return `/projects/${project.slug}`;
}

export function getProject(slug: string): Project | undefined {
  return PROJECT_BY_SLUG.get(slug);
}
