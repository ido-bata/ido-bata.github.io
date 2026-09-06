import Image from "next/image";
import Link from "next/link";
import { css } from "@/styled-system/css";
import { button } from "@/styles";
import { DISCORD_INVITE } from "@/lib/env";

/**
 * Landing page for ido-bata organization.
 *
 * Replaces the `create-next-app` starter with portal content:
 *   - Hero with org name + value proposition
 *   - Community highlights (key points)
 *   - Discord join CTA (only when DISCORD_INVITE env is configured)
 *   - Related links to about / faq / rules / channels / news / CoC / privacy
 *
 * Header / Footer are auto-applied via `src/app/layout.tsx` and are not
 * re-rendered here.
 *
 * Refs: Issue #8.
 */
export default function Home() {
  const invite = DISCORD_INVITE;

  return (
    <main className={page}>
      <section aria-labelledby="hero-heading" className={hero}>
        <p className={eyebrow}>ido-bata 公式ポータル</p>
        <h1 id="hero-heading" className={title}>
          ido-bata（いど端）
        </h1>
        <p className={subtitle}>クリエイター・エンジニアのための実利 Discord コミュニティ。</p>
        <p className={lede}>
          作り、学び、共有する循環を大切にしながら、静かに・誠実に長く続く居場所を育てます。
        </p>
      </section>

      <section aria-labelledby="about-heading" className={section}>
        <h2 id="about-heading" className={sectionTitle}>
          ido-bata について
        </h2>
        <ul className={cardGrid}>
          <li className={card}>
            <h3 className={cardTitle}>実利重視</h3>
            <p className={cardBody}>
              アウトプットと学びが循環する場。制作物の共有・コードレビュー・実験の記録を歓迎します。
            </p>
          </li>
          <li className={card}>
            <h3 className={cardTitle}>居場所としての安心</h3>
            <p className={cardBody}>
              Code of
              Conductに基づく運用とモデレーション。新参・久しぶりの参加でも参加しやすい空気をつくります。
            </p>
          </li>
          <li className={card}>
            <h3 className={cardTitle}>オープンな運営</h3>
            <p className={cardBody}>
              ルール・FAQ・サーバー設定は GitHub
              で公開。意思決定の背景が追える透明なコミュニティ運営を目指します。
            </p>
          </li>
          <li className={card}>
            <h3 className={cardTitle}>穏やかな開発時間</h3>
            <p className={cardBody}>
              雑談・相談・集中時間が同居するチャンネル構成。昼夜逆転や休憩も自然に受け入れます。
            </p>
          </li>
        </ul>
      </section>

      {invite ? (
        <section aria-labelledby="cta-heading" className={ctaSection}>
          <h2 id="cta-heading" className={sectionTitle}>
            参加する
          </h2>
          <p className={ctaBody}>
            Discord サーバーで自己紹介と最近の制作物・気になっていることを共有して始めましょう。
          </p>
          <a
            className={button({ variant: "solid", size: "lg" })}
            href={invite}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/discord.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className={ctaIcon}
            />
            ido-bata Discord に参加する
          </a>
        </section>
      ) : null}

      <section aria-labelledby="links-heading" className={section}>
        <h2 id="links-heading" className={sectionTitle}>
          関連リンク
        </h2>
        <ul className={linkGrid}>
          <li>
            <Link className={linkCard} href="/about">
              About
              <span className={linkHint}>コミュニティの理念と運営体制</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/faq">
              FAQ
              <span className={linkHint}>よくある質問と回答</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/rules">
              Rules
              <span className={linkHint}>サーバールールと利用ガイド</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/channels">
              Channels
              <span className={linkHint}>チャンネル構成と用途</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/news">
              News
              <span className={linkHint}>更新情報・告知</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/code-of-conduct">
              Code of Conduct
              <span className={linkHint}>行動規範</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/privacy">
              Privacy
              <span className={linkHint}>プライバシーポリシー</span>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}

const page = css({
  mx: "auto",
  maxW: "1100px",
  px: { base: "6", md: "8" },
  py: { base: "12", md: "20" },
  display: "flex",
  flexDirection: "column",
  gap: { base: "16", md: "20" },
});

const hero = css({
  display: "flex",
  flexDirection: "column",
  gap: "4",
  alignItems: "flex-start",
});

const eyebrow = css({
  fontSize: "xs",
  fontWeight: "medium",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "fg.muted",
});

const title = css({
  fontSize: { base: "4xl", md: "5xl" },
  fontWeight: "bold",
  lineHeight: "tight",
  color: "fg.DEFAULT",
});

const subtitle = css({
  fontSize: { base: "md", md: "lg" },
  color: "fg.DEFAULT",
  lineHeight: "relaxed",
});

const lede = css({
  fontSize: { base: "sm", md: "md" },
  color: "fg.muted",
  lineHeight: "relaxed",
  maxW: "640px",
});

const section = css({
  display: "flex",
  flexDirection: "column",
  gap: "6",
});

const sectionTitle = css({
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: "semibold",
  lineHeight: "tight",
  color: "fg.DEFAULT",
});

const cardGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1", md: "repeat(2, minmax(0, 1fr))" },
  gap: "4",
  listStyle: "none",
  m: 0,
  p: 0,
});

const card = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  p: "6",
  borderRadius: "lg",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border",
  bg: "bg.subtle",
});

const cardTitle = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "fg.DEFAULT",
});

const cardBody = css({
  fontSize: "sm",
  color: "fg.muted",
  lineHeight: "relaxed",
});

const ctaSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "4",
  alignItems: "flex-start",
  p: { base: "6", md: "8" },
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border",
  bg: "bg.subtle",
});

const ctaBody = css({
  fontSize: "md",
  color: "fg.muted",
  lineHeight: "relaxed",
});

const ctaIcon = css({
  display: "inline-block",
  // `/discord.svg` is dark-on-transparent, so invert in light mode (where
  // the surrounding panel is light) and keep it natural in dark mode
  // (where the panel is dark). `filter: none` in dark mode lets the
  // original dark icon remain visible against the dark panel.
  filter: { base: "invert(1)", _darkTheme: "none" },
});

const linkGrid = css({
  display: "grid",
  gridTemplateColumns: {
    base: "1",
    sm: "repeat(2, minmax(0, 1fr))",
    md: "repeat(3, minmax(0, 1fr))",
  },
  gap: "3",
  listStyle: "none",
  m: 0,
  p: 0,
});

const linkCard = css({
  display: "flex",
  flexDirection: "column",
  gap: "1",
  p: "4",
  borderRadius: "md",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border",
  bg: "bg.canvas",
  color: "fg.DEFAULT",
  fontSize: "sm",
  fontWeight: "medium",
  textDecoration: "none",
  // Respect WCAG 2.3.3 (Animation from Interactions): only animate
  // when the user has NOT requested reduced motion.
  _motionSafe: {
    transitionProperty: "background-color, border-color",
    transitionDuration: "150ms",
  },
  _hover: {
    bg: "bg.subtle",
    borderColor: "border.strong",
  },
  _focusVisible: {
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineColor: "accent",
    outlineOffset: "2px",
  },
});

const linkHint = css({
  fontSize: "xs",
  fontWeight: "normal",
  color: "fg.muted",
});
