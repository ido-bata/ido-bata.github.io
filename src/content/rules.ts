/**
 * サーバルール / ガイドライン - コンテンツデータ
 *
 * ページ (`src/app/community/rules/page.tsx`) はこのページを import する。
 * 文言はプロジェクト全体の方針 (`docs/code-of-conduct.md`,
 * `docs/privacy.md`) と整合させる。変更時は Issue 経由で運用に確認する。
 *
 * データ形状は「markdown frontmatter 風」: 各エントリは
 * `{ name, purpose, rules[] }` を最小単位とし、配列で列挙する。
 *
 * refs:
 *   - Issue #19
 *   - docs/code-of-conduct.md
 */

export type ChannelRule = {
  /** チャネル名 (Discord 上の表記) */
  name: string;
  /** そのチャネルの目的 / 位置付け */
  purpose: string;
  /** 当該チャネル固有の運用ルール (短い箇条書き) */
  rules: string[];
};

export type RuleSection = {
  /** 見出しアンカー (slug) */
  id: string;
  /** 見出し (日本語) */
  title: string;
  /** 段落本文。必要に応じて改行を含む */
  body?: string;
  /** 箇条書き (なしなら空配列) */
  bullets?: string[];
};

export type RulesContent = {
  /** ページ全体の最終更新日 (ISO 8601 日付) */
  lastUpdated: string;
  /** 理念セクション */
  philosophy: RuleSection;
  /** 推奨されるふるまい */
  recommended: RuleSection;
  /** 禁止行為 */
  prohibited: RuleSection;
  /** チャネル別運用ルール */
  channels: {
    intro: string;
    items: ChannelRule[];
  };
  /** 違反時の対応 */
  enforcement: RuleSection;
  /** 改定・問い合わせ先 */
  meta: RuleSection;
};

export const rules: RulesContent = {
  lastUpdated: "2026-09-07",

  philosophy: {
    id: "philosophy",
    title: "サーバの理念",
    body: "ido-bata Discord サーバは、Web サイトや関連リポジトリと同じく「実利重視・情報共有主体・自由参加脱退」を理念とする。議論は「誰の何の課題をどう解決するか」を軸に進め、感想や世間話だけで終わるチャネルは基本的に用意しない。各自の発言・知見・成果物はコミュニティの資産として公開・共有する前提で扱う。",
  },

  recommended: {
    id: "recommended",
    title: "推奨されるふるまい",
    bullets: [
      "リアクション (`✅` `👀` `🙏` など) を活用し、テキスト量を抑える",
      "他者の発言を引用するときは返信 (引用) 機能を使い、文脈を明示する",
      "外部情報を共有するときは出典 (URL / 書籍 / commit 等) を添える",
      "質問はできるかぎり再現手順・前提・期待値を書き込む",
      "未熟な領域はその旨を明示し、レビュー・補完を求める",
      "得た知見は Issue / PR / Discussions / 自ブログなど、後から検索できる形で残す",
      "多言語・多文化・異なる経験値を前提に、用語はできるかぎり定義する",
    ],
  },

  prohibited: {
    id: "prohibited",
    title: "禁止行為",
    body: "以下は歓迎しない。悪意の有無に関わらず、起こった時点で運営に通知し、改善が見られない場合は参加の制限を検討する。",
    bullets: [
      "個人攻撃・差別・ハラスメント・脅迫・性的な嫌がらせ",
      "業務上・私生活上の機密情報・PII・認証情報 (token / API key / パスワード等) の投稿",
      "スパム・荒らし・宣伝・Scam リンクの配布",
      "DM スパム・無許諾の招待・他サーバへの組織的な誘導",
      "他者の発言・成果物の無許諾転載 (出典と許諾を明示すれば可)",
      "特定の政治的・宗教的立場への組織的な布教・扇動",
      "運営の判断に対する、公開チャネルでの人格を否定する形での抗議 (建設的な異議申し立ては歓迎)",
    ],
  },

  channels: {
    intro:
      "チャネル構成は運営の裁量で随時見直す。各チャネルの `#<name>` は Discord 上の表記に対応する。",
    items: [
      {
        name: "#general",
        purpose: "サーバ全体のお知らせ・運用連絡・質問の入口。",
        rules: [
          "質問はまずここで。各トピック用チャネルへの誘導は運営が行う",
          "個人的な相談は DM を利用し、このチャネルに貼らない",
          "サーバ全体に影響する告知は運営からしか投稿しない",
        ],
      },
      {
        name: "#tech-<topic>",
        purpose:
          "技術トピック別の議論チャネル (`#tech-web`, `#tech-llm` 等)。実利的な相談・情報共有の場。",
        rules: [
          "トピック外の話題は別チャネルへ誘導する",
          "質問にはできるかぎり再現手順・コード・実行結果を添える",
          "回答は短く・ピンポイントに。長くなる場合は Issue / Discussions へ移す",
          "未検証の情報には『未検証』『推測』と明示する",
        ],
      },
      {
        name: "#share",
        purpose: "記事・OSS・ツール・登壇資料など、外部の有用情報の発見・共有。",
        rules: [
          "URL だけでなく「なぜ有用か」の 1 行サマリを添える",
          "自分の成果物も歓迎 (宣伝目的のみの連投は控える)",
          "出典・著者・公開日を明記する",
        ],
      },
      {
        name: "#jobs",
        purpose: "募集・求職・案件情報。実利本位かつ短期間に収束する用途。",
        rules: [
          "テンプレート (募集/求職、報酬レンジ、期間、連絡先) を埋めて投稿する",
          "成立したら編集で `closed` を冒頭に付け、一定期間後に削除する",
          "DM への一方的な誘導は禁止",
        ],
      },
      {
        name: "#random",
        purpose:
          "運用判断として『感想・世間話専用チャネル』は基本置かないが、議論の息抜き程度は許容する補助チャネル。",
        rules: [
          "他チャネルに分散できる話題は誘導する",
          "連投・長文セッションは別部屋 (Stage Channel 等) へ移す",
        ],
      },
      {
        name: "#mod-log",
        purpose: "モデレーション履歴のミラー公開。運営のみ閲覧可のロール制限あり。",
        rules: [
          "一般メンバーは閲覧のみ。投稿は運営ロールのみが行う",
          "異議申し立ては `#general` ではなく運営 DM / Issue 経由で行う",
        ],
      },
    ],
  },

  enforcement: {
    id: "enforcement",
    title: "違反時の対応",
    body: "違反を見つけた場合、または違反の対象になった場合は、チャンネルに晒さず運営に通報する。通報窓口と運用フローは行動規範 (`docs/code-of-conduct.md`) §6 に従う。",
    bullets: [
      "軽微な違反: 運営から DM で注意 / 是正依頼",
      "継続的な違反: 一時的なミュート / ロール剥奪",
      "悪質または影響が大きい違反: 警告なしで永久追放",
      "機密情報の誤投稿: 投稿削除依頼を優先し、必要に応じて Discord の編集ログを参照",
      "モデレーション履歴は `#mod-log` にミラー記録される (透明性目的)",
    ],
  },

  meta: {
    id: "meta",
    title: "改定・問い合わせ",
    body: "本ルールはコミュニティの運用状況に応じて不定期に見直す。改定は本リポジトリの `docs/code-of-conduct.md` / Web ページの更新 Pull Request で行い、Discord サーバ内と本ページ上部に告知する。問い合わせ窓口は行動規範 §6 に集約する。",
  },
};
