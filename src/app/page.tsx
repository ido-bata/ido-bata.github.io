import Image from "next/image";
import Link from "next/link";
import { css } from "@/styled-system/css";
import { button } from "@/styles";
import { DISCORD_INVITE } from "@/lib/env";

/**
 * Landing page for the ido-bata organization.
 *
 * Structure:
 *   - Hero (org name + tagline)
 *   - "ido-bata について" — placeholder, populated after owner confirms copy
 *   - Discord join CTA (only when DISCORD_INVITE env is configured)
 *   - Related links
 *
 * Header / Footer are auto-applied via `src/app/layout.tsx` and are not
 * re-rendered here.
 *
 * NOTE: For v0.3.0 the highlight cards render a single "content in
 * preparation" placeholder. Concrete copy (philosophy, schedule, role
 * claims) is added by the community owner in a follow-up issue.
 */
export default function Home() {
  const invite = DISCORD_INVITE;

  return (
    <main className={page}>
      <section aria-labelledby="hero-heading" className={hero}>
        <p className={eyebrow}>ido-bata 公式ポータル</p>
        <h1 id="hero-heading" className={title}>
          ido-bata
        </h1>
        <p className={subtitle}>コミュニティの公式ポータル</p>
        <p className={lede}>
          本サイトはコミュニティに関する情報公開のためのポータルです。
          各ページの内容は段階的に整えていきます。
        </p>
      </section>

      <section aria-labelledby="about-heading" className={section}>
        <h2 id="about-heading" className={sectionTitle}>
          ido-bata について
        </h2>
        <p className={lede}>
          コミュニティ紹介・理念・運営体制などの詳細は準備中です。 Discord
          サーバ側で先行して共有している内容と、本ページの公開内容は順次整合させていきます。
        </p>
      </section>

      {invite ? (
        <section aria-labelledby="cta-heading" className={ctaSection}>
          <h2 id="cta-heading" className={sectionTitle}>
            参加する
          </h2>
          <p className={ctaBody}>
            Discord サーバで活動しています。招待リンクは本ページの環境変数で設定されています。
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
            Discord サーバに参加する
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
              <span className={linkHint}>コミュニティ紹介</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/faq">
              FAQ
              <span className={linkHint}>よくある質問</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/community/rules">
              Rules
              <span className={linkHint}>サーバルールと利用ガイド</span>
            </Link>
          </li>
          <li>
            <Link className={linkCard} href="/channels">
              Channels
              <span className={linkHint}>チャネル構成</span>
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
