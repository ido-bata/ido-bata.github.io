import type { Metadata } from "next";
import Link from "next/link";
import { css } from "@/styled-system/css";
import { DISCORD_INVITE } from "@/lib/env";

export const metadata: Metadata = {
  title: "About | ido-bata",
  description: "ido-bata コミュニティの紹介ページ。",
};

/**
 * About ページ。
 *
 * NOTE: For v0.3.0 the page is a minimal placeholder. Operator identity,
 * philosophy, and operating-principle copy are populated by the community
 * owner in a follow-up issue.
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
        maxW: "1100px",
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
          ido-bata
        </h1>
        <p
          className={css({
            color: "fg.muted",
            fontSize: { base: "md", md: "lg" },
            lineHeight: "relaxed",
            maxW: "640px",
          })}
        >
          コミュニティ紹介・理念・運営体制などの詳細は準備中です。
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
          <p className={bodyStyle}>招待リンクから Discord サーバに参加できます。</p>
          <a href={invite} target="_blank" rel="noopener noreferrer" className={ctaButtonStyle}>
            Discord サーバに参加する
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
  maxW: "720px",
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
