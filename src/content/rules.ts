/**
 * Server rules / guidelines — content data.
 *
 * The page (`src/app/community/rules/page.tsx`) imports from this file.
 * Copy stays consistent with `docs/code-of-conduct.md` and `docs/privacy.md`;
 * changes go through an Issue first.
 *
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

export const rules: RulesContent = {
  lastUpdated: "2026-09-16",

  philosophy: {
    id: "philosophy",
    title: "理念",
    body: "制作や開発を実際に進めるための場です。互いの時間と成果物を尊重し、相談や共有が次の作業につながる状態を保ちます。",
  },

  recommended: {
    id: "recommended",
    title: "推奨されるふるまい",
    bullets: [
      "相手の立場や経験の違いを踏まえて、具体的に伝える",
      "批評するときは、対象と理由を明確にする",
      "知見や制作途中の内容を、適したチャネルで共有する",
    ],
  },

  prohibited: {
    id: "prohibited",
    title: "禁止行為",
    bullets: [
      "嫌がらせ、差別、脅迫、個人攻撃",
      "本人の同意なく個人情報や非公開情報を共有する行為",
      "スパム、荒らし、運営や会話を妨げる行為",
    ],
  },

  channels: {
    intro: "各チャネルの説明を確認し、話題に合う場所を使ってください。",
    items: [
      {
        name: "WIP",
        purpose: "制作途中のものを共有する場所です。",
        rules: ["未完成の状態で投稿できます", "求める反応があれば本文に添えてください"],
      },
      {
        name: "technical-critique",
        purpose: "技術面の相談や批評を扱います。",
        rules: ["対象と困っている点を具体的に書いてください", "人ではなく成果物や実装を扱ってください"],
      },
      {
        name: "宣伝・共有",
        purpose: "作品、記事、イベントなどを知らせる場所です。",
        rules: ["内容が分かる説明とリンクを添えてください", "同じ内容の連投は控えてください"],
      },
    ],
  },

  enforcement: {
    id: "enforcement",
    title: "違反時の対応",
    body: "運営は内容を確認し、必要に応じて投稿の削除、警告、一時停止、追放などを判断します。報告方法は行動規範に記載しています。",
  },

  meta: {
    id: "meta",
    title: "改定・問い合わせ",
    body: "運用に合わせて内容を更新します。違反の報告や問い合わせ窓口は行動規範に記載しています。",
  },
};
