import type { Metadata } from "next";
import Link from "next/link";
import { css } from "@/styled-system/css";
import { DISCORD_INVITE } from "@/lib/env";

export const metadata: Metadata = {
  title: "About | ido-bata",
  description:
    "ido-bata（いど端）は、クリエイター・エンジニア向けの情報交換主体の Discord コミュニティ。交流より情報共有、入るも出るも自由を掲げ、さむいど（samuido）が運営しています。",
};

/**
 * About ページ。
 *
 * Discord コミュニティ「ido-bata（いど端）」の紹介と運営理念を明文化する。
 * スタイルは Panda CSS のトークン / レシピで賄う（`output: "export"` でも
 * ランタイム CSS-in-JS を増やさないため）。Header / Footer は root layout
 * から自動付与されるため本ページでは描画しない。
 *
 * Refs:
 *   - Issue #14
 *   - docs/architecture.md#デザインシステム
 */
export default function AboutPage() {
  const invite = DISCORD_INVITE;

  return (
    <main
      className={css({
        mx: "auto",
        maxWidth: "1100px",
        px: "6",
        py: "12",
        display: "flex",
        flexDirection: "column",
        gap: "16",
      })}
    >
      {/* ───── Hero ───── */}
      <section
        aria-labelledby="about-hero-title"
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
        })}
      >
        <p
          className={css({
            color: "fg.muted",
            fontSize: "sm",
            fontWeight: "medium",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          })}
        >
          About
        </p>
        <h1
          id="about-hero-title"
          className={css({
            fontSize: { base: "4xl", md: "5xl" },
            fontWeight: "bold",
            lineHeight: "tight",
            letterSpacing: "-0.02em",
          })}
        >
          ido-bata（いど端）
        </h1>
        <p
          className={css({
            color: "fg.muted",
            fontSize: { base: "md", md: "lg" },
            lineHeight: "relaxed",
            maxWidth: "640px",
          })}
        >
          クリエイター・エンジニア向けの情報交換主体の Discord コミュニティ。
          「交流より情報共有」「入るも出るも自由」を掲げ、
          コミュ障にも優しい場所を、さむいど（samuido）が運営しています。
        </p>
      </section>

      {/* ───── 概要 ───── */}
      <section aria-labelledby="about-overview-title" className={sectionStyle}>
        <h2 id="about-overview-title" className={headingStyle}>
          ido-bata とは
        </h2>
        <p className={bodyStyle}>
          自分の領域（いど）と、隣の領域（端）を行き来しながら知見を交換する—— そんな意図で名付けた
          Discord サーバーです。話題は Web / アプリ開発、 デザイン、生成
          AI、ゲーム、ガジェットなど、エンジニアリングと創作の 接点付近に寄っています。
        </p>
        <p className={bodyStyle}>
          堅いルールやレベル制限はありません。ROM 専も歓迎、質問の作法に
          とらわれず「いま気になっていること」をそのまま投げて大丈夫です。
        </p>
      </section>

      {/* ───── 4 つの柱 ───── */}
      <section aria-labelledby="about-pillars-title" className={sectionStyle}>
        <h2 id="about-pillars-title" className={headingStyle}>
          4 つの柱
        </h2>
        <ul
          className={css({
            display: "grid",
            gap: "4",
            gridTemplateColumns: { base: "1", md: "repeat(2, minmax(0, 1fr))" },
            listStyle: "none",
            padding: "0",
            margin: "0",
          })}
        >
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "2",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "border",
                bg: "bg.subtle",
                p: "6",
              })}
            >
              <h3
                className={css({
                  fontSize: "lg",
                  fontWeight: "semibold",
                  lineHeight: "tight",
                })}
              >
                {pillar.title}
              </h3>
              <p
                className={css({
                  color: "fg.muted",
                  fontSize: "sm",
                  lineHeight: "relaxed",
                })}
              >
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── 運営者 ───── */}
      <section aria-labelledby="about-operator-title" className={sectionStyle}>
        <h2 id="about-operator-title" className={headingStyle}>
          運営者
        </h2>
        <p className={bodyStyle}>
          <strong className={css({ fontWeight: "semibold", color: "fg" })}>
            さむいど（samuido）
          </strong>
          が個人で運営しており、企業・団体のステークホルダーは存在しません。
          入会審査はなく、参加・退出・沈黙はすべて自由です。 意思決定に困ったときは{" "}
          <Link href="/about" className={inlineLinkStyle}>
            About
          </Link>{" "}
          の理念に立ち返ることを原則とします。
        </p>
      </section>

      {/* ───── CTA ───── */}
      {invite ? (
        <section
          aria-labelledby="about-cta-title"
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4",
            borderRadius: "xl",
            border: "1px solid",
            borderColor: "border.strong",
            bg: "bg.subtle",
            p: "8",
          })}
        >
          <h2 id="about-cta-title" className={headingStyle}>
            参加する
          </h2>
          <p className={bodyStyle}>
            どのチャンネルから見て回っても OK。いきなり書き込まなくても大丈夫です。
            気が向いたときに覗きに来てください。
          </p>
          <a href={invite} target="_blank" rel="noopener noreferrer" className={ctaButtonStyle}>
            Discord サーバーに参加する
          </a>
        </section>
      ) : null}

      {/* ───── 戻る導線 ───── */}
      <nav aria-label="About ページの補助導線">
        <Link href="/" className={inlineLinkStyle}>
          ← ホームへ戻る
        </Link>
      </nav>
    </main>
  );
}

type Pillar = {
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    title: "交流より情報共有",
    description:
      "雑談を目的とした場ではなく、知見・Tips・失敗談のやり取りが中心。読まれることを前提に投稿してOK。",
  },
  {
    title: "入るも出るも自由",
    description:
      "入会審査・レベル制限はありません。ROM 専歓迎、沈黙歓迎。気が向いたら戻ってきてください。",
  },
  {
    title: "コミュ障への優しさ",
    description:
      "挨拶・定型文は不要。質問作法に厳しくありません。読んでくれる誰かが反応してくれるのを待ちます。",
  },
  {
    title: "実利重視",
    description:
      "「ためになった」「自分の作業が進んだ」を最優先。ノイズが多い話題は自然と流れていきます。",
  },
];

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
});

const headingStyle = css({
  fontSize: "2xl",
  fontWeight: "semibold",
  lineHeight: "tight",
  letterSpacing: "-0.01em",
});

const bodyStyle = css({
  color: "fg.muted",
  fontSize: "md",
  lineHeight: "relaxed",
  maxWidth: "720px",
});

const inlineLinkStyle = css({
  color: "accent",
  fontWeight: "medium",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  _hover: { textDecorationThickness: "2px" },
});

const ctaButtonStyle = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "12",
  px: "6",
  borderRadius: "full",
  bg: "accent",
  color: "accent.fg",
  fontWeight: "semibold",
  fontSize: "md",
  textDecoration: "none",
  transition: "colors",
  _hover: { opacity: "0.9" },
});
