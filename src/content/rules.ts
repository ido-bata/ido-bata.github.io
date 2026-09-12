/**
 * Server rules / guidelines — content data.
 *
 * The page (`src/app/community/rules/page.tsx`) imports from this file.
 * Copy stays consistent with `docs/code-of-conduct.md` and `docs/privacy.md`;
 * changes go through an Issue first.
 *
 * NOTE: Content is intentionally a minimal placeholder for the v0.3.0
 * release. The community owner populates philosophy / recommended /
 * prohibited / channel-by-channel rules after confirming what actually
 * applies. Until then, the `/community/rules` page renders an empty shell.
 * See follow-up issue.
 */

export type ChannelRule = {
  /** Channel name (Discord display). */
  name: string;
  /** Channel purpose / role. */
  purpose: string;
  /** Channel-specific operating rules (short bullets). */
  rules: string[];
};

export type RuleSection = {
  /** Heading anchor (slug). */
  id: string;
  /** Heading text (Japanese). */
  title: string;
  /** Body paragraph (optional). */
  body?: string;
  /** Bullets (optional). Empty array allowed. */
  bullets?: string[];
};

export type RulesContent = {
  /** Last-updated date for the page (ISO 8601 date). */
  lastUpdated: string;
  /** Philosophy section. */
  philosophy: RuleSection;
  /** Recommended behaviour. */
  recommended: RuleSection;
  /** Prohibited behaviour. */
  prohibited: RuleSection;
  /** Per-channel operating rules. */
  channels: {
    intro: string;
    items: ChannelRule[];
  };
  /** Enforcement. */
  enforcement: RuleSection;
  /** Revisions / contact. */
  meta: RuleSection;
};

/**
 * Minimal placeholder. Fields are still typed so the page renders without
 * runtime errors; copy is explicitly honest about being a stub.
 */
export const rules: RulesContent = {
  lastUpdated: "2026-09-13",

  philosophy: {
    id: "philosophy",
    title: "理念",
    body: "本セクションは準備中です。コミュニティの理念はオーナーの正本化後に掲載します。",
  },

  recommended: {
    id: "recommended",
    title: "推奨されるふるまい",
    bullets: [],
  },

  prohibited: {
    id: "prohibited",
    title: "禁止行為",
    body: "本セクションは準備中です。禁止行為の具体はオーナーの正本化後に掲載します。",
  },

  channels: {
    intro:
      "チャネル別運用ルールはオーナーの正本化後に掲載します。実在チャネル一覧は Discord サーバ側で参照できます。",
    items: [],
  },

  enforcement: {
    id: "enforcement",
    title: "違反時の対応",
    body: "本セクションは準備中です。",
  },

  meta: {
    id: "meta",
    title: "改定・問い合わせ",
    body: "本ページはコミュニティの実態に合わせて段階的に更新します。問い合わせ窓口は行動規範 (Code of Conduct) に集約します。",
  },
};
