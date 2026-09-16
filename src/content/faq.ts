/**
 * FAQ content (single source of truth).
 *
 * The `/faq` page only imports from this file. Adding / editing / reordering
 * questions happens entirely here (no JSX changes needed in the page).
 *
 * - `question`: heading text. Short, in question form.
 * - `answer`: array of paragraphs. Each element renders as one paragraph.
 * - `id`: anchor (e.g. `/faq#some-id`). Do not change once published.
 *
 * Activity-name and time references pull from `IDOBATA_TIME` in
 * `src/content/activities.ts` so a rebrand of the activity (or a
 * schedule change) only has to land in one place.
 */

import { IDOBATA_TIME } from "./activities";

export type FaqItem = {
  /** Stable id used as URL anchor. Do not change once published. */
  readonly id: string;
  /** Question text (Japanese). */
  readonly question: string;
  /** Answer paragraphs. */
  readonly answer: readonly string[];
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "who-can-join",
    question: "誰が参加できますか？",
    answer: [
      "クリエイターやエンジニアを中心に、制作や開発を進めたい人が参加できます。",
      "参加後は、興味のあるチャネルを必要なときに使ってください。",
    ],
  },
  {
    id: "what-to-post",
    question: "何を投稿できますか？",
    answer: [
      "制作途中のもの、技術的な相談、知見、告知、雑談などを、話題に合うチャネルへ投稿できます。",
      "完成した成果だけでなく、進める途中の相談や共有にも使われています。",
    ],
  },
  {
    id: "voice-required",
    question: "ボイスチャネルで話す必要はありますか？",
    answer: [
      `必要ありません。無言作業向けのチャネルもあり、${IDOBATA_TIME.name}も発言やリアクションなしで参加できます。`,
    ],
  },
  {
    id: "idobata-time",
    question: `${IDOBATA_TIME.name}とは何ですか？`,
    answer: [
      `毎日${IDOBATA_TIME.time}まで、仕事以外の何かに集中するための作業時間です。`,
      "Bot が作業と休憩の切り替わりを案内します。",
    ],
  },
];
