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

export type RuleLink = {
  /** Visible label for the link (Japanese). */
  label: string;
  /** Target href — relative for in-site pages, absolute for external docs. */
  href: string;
};

export type RuleSection = {
  /** Heading anchor (slug). */
  id: string;
  /** Heading text (Japanese). */
  title: string;
  /** Body paragraph (optional). */
  body?: string;
  /** Inline links rendered at the end of `body` (optional). When
   *  present, the page renders them as anchor tags instead of leaving
   *  plain-text references like "see docs/code-of-conduct.md §3". */
  links?: readonly RuleLink[];
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
      "フィードバックは相手の人格ではなく、対象の発言・成果物・挙動に向ける",
      "文脈・前提・再現手順をできるかぎり明文化する",
      "自分が未熟な領域はそれを明示し、レビューや補完を求める",
      "得た知見は後から検索できる形 (記事・ADR・Issue など) で残す",
      "多言語・多文化・異なる経験値の人を前提に、用語はできるかぎり定義する",
    ],
  },

  prohibited: {
    id: "prohibited",
    title: "禁止行為",
    body:
      "禁止行為の全体は次の行動規範を参照してください。主なものは次の通りです。",
    links: [
      {
        label: "行動規範",
        href: "https://github.com/ido-bata/ido-bata.github.io/blob/main/docs/code-of-conduct.md",
      },
    ],
    bullets: [
      "個人攻撃・差別・ハラスメント・脅迫・性的な嫌がらせ",
      "業務上・私生活上の機密情報、PII、認証情報 (token / API key / パスワード等) の投稿",
      "スパム・荒らし・宣伝・Scam リンクの配布",
      "他者の発言・成果物の無許諾転載 (出典と許諾を明示すれば可)",
      "特定の政治的・宗教的立場への組織的な布教・扇動",
      "運営の判断に対する、公開チャネルでの人格を否定する形での抗議 (建設的な異議申し立ては歓迎)",
    ],
  },

  channels: {
    intro: "各チャネルの説明を確認し、話題に合う場所を使ってください。",
    items: [
      {
        name: "wip",
        purpose: "制作途中のものを共有する場所です。",
        rules: ["未完成の状態で投稿できます", "求める反応があれば本文に添えてください"],
      },
      {
        name: "転送-補足",
        purpose: "評価対象への補足やフィードバックをまとめるフォーラムです。",
        rules: [
          "対象と困っている点を具体的に書いてください",
          "人ではなく成果物や実装を扱ってください",
        ],
      },
      {
        name: "宣伝・拡散希望",
        purpose: "公開した作品やツールを知らせる場所です。",
        rules: ["内容が分かる説明とリンクを添えてください", "同じ内容の連投は控えてください"],
      },
    ],
  },

  enforcement: {
    id: "enforcement",
    title: "違反時の対応",
    body: "運営は内容を確認し、必要に応じて投稿の削除、警告、一時停止、追放などを判断します。報告方法は次の行動規範を参照してください。",
    links: [
      {
        label: "行動規範 (報告方法)",
        href: "https://github.com/ido-bata/ido-bata.github.io/blob/main/docs/code-of-conduct.md",
      },
    ],
  },

  meta: {
    id: "meta",
    title: "改定・問い合わせ",
    body: "運用に合わせて内容を更新します。違反の報告や問い合わせ窓口は行動規範に記載しています。",
  },
};
