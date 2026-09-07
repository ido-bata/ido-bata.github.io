/**
 * Discord サーバのチャネル定義データ。
 *
 * 招待前にどんな話題があるか分かるよう、`/channels` ページから参照する。
 * 並び順は配列の定義順で表示する。各カテゴリ内は配列順を維持すること。
 */

export type ChannelCategory = "共有" | "質問" | "告知" | "趣味" | "運営";

export interface Channel {
  /** Discord 上の表示名（先頭の # は付けない） */
  name: string;
  /** チャネルの用途・トピック */
  description: string;
  /** 属するカテゴリ */
  category: ChannelCategory;
}

/**
 * 表示順序を制御するためタプルとして定義。
 * 先頭の要素がサイドバー / ページ先頭で優先される。
 */
export const CHANNEL_CATEGORIES: readonly ChannelCategory[] = [
  "共有",
  "質問",
  "告知",
  "趣味",
  "運営",
] as const;

export const CHANNELS: readonly Channel[] = [
  // 共有
  {
    name: "general",
    description: "自己紹介・近況報告など、雑談全般のエントリーチャネル。",
    category: "共有",
  },
  {
    name: "links",
    description: "面白かった記事・動画・ツールなどの URL を共有するチャネル。",
    category: "共有",
  },
  {
    name: "show-and-tell",
    description: "作っているもの・作ったものを自慢したりフィードバックをもらうチャネル。",
    category: "共有",
  },

  // 質問
  {
    name: "questions",
    description: "技術的な質問・相談全般。回答は誰でも OK。",
    category: "質問",
  },
  {
    name: "code-review",
    description: "Pull Request やコード片を貼って気軽にレビューし合うチャネル。",
    category: "質問",
  },

  // 告知
  {
    name: "announcements",
    description: "ido-bata 主催のイベント・リリース・重要なお知らせの公式告知チャネル。",
    category: "告知",
  },
  {
    name: "events",
    description: "勉強会・もくもく会・オンライン会合などのスケジュールを共有するチャネル。",
    category: "告知",
  },

  // 趣味
  {
    name: "games",
    description: "ゲームの話をするチャネル。タイトル縛りなし。",
    category: "趣味",
  },
  {
    name: "music",
    description: "好きな音楽・アーティスト・プレイリストを共有するチャネル。",
    category: "趣味",
  },
  {
    name: "food",
    description: "おすすめの店・レシピ・料理写真を共有するチャネル。",
    category: "趣味",
  },

  // 運営
  {
    name: "rules",
    description: "コミュニティの行動規範・ガイドラインへの導線。必ず一読してください。",
    category: "運営",
  },
  {
    name: "feedback",
    description: "サーバ運営への要望・提案・バグ報告を受け付けるチャネル。",
    category: "運営",
  },
];
