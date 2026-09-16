export type ActivityPhase = {
  label: string;
  time: string;
  minutes: number;
  kind: "work" | "break";
};

export type Activity = {
  slug: string;
  name: string;
  path: string;
  summary: string;
  time: string;
  channel: string;
  participation: string;
  botPath: string;
  schedule: readonly ActivityPhase[];
};

export const IDOBATA_TIME: Activity = {
  slug: "idobata-time",
  name: "いど端 底力 タイム",
  path: "/activities/idobata-time",
  summary:
    "仕事以外の何かに集中するため、毎日決まった時間に開いている作業時間です。",
  time: "21:00–22:40",
  channel: "いど底-ステージ",
  participation:
    "発言やリアクションは必要ありません。必要な日に、自分の作業時間として参加できます。",
  botPath: "/projects/server-bot",
  schedule: [
    { label: "作業 1", time: "21:00–21:15", minutes: 15, kind: "work" },
    { label: "休憩", time: "21:15–21:20", minutes: 5, kind: "break" },
    { label: "作業 2", time: "21:20–21:50", minutes: 30, kind: "work" },
    { label: "休憩", time: "21:50–21:55", minutes: 5, kind: "break" },
    { label: "作業 3", time: "21:55–22:40", minutes: 45, kind: "work" },
  ],
};
