import type { Metadata } from "next";
import { css } from "@/styled-system/css";
import { DISCORD_INVITE } from "@/lib/env";
import { FAQ_ITEMS } from "@/content/faq";

export const metadata: Metadata = {
  title: "よくある質問 | ido-bata",
  description: "ido-bata コミュニティへのよくある質問。",
};

const page = css({
  maxWidth: "48rem",
  mx: "auto",
  px: "6",
  py: { base: "12", md: "20" },
});

const heading = css({
  fontSize: { base: "3xl", md: "4xl" },
  fontWeight: "bold",
  lineHeight: "tight",
  letterSpacing: "-0.01em",
});

const lead = css({
  mt: "4",
  fontSize: "md",
  lineHeight: "relaxed",
  color: "fg.muted",
});

const list = css({
  mt: { base: "10", md: "12" },
  display: "flex",
  flexDirection: "column",
  gap: "8",
});

const item = css({
  borderTop: "1px solid",
  borderColor: "border",
  pt: "8",
  _first: { borderTop: "none", pt: "0" },
});

const question = css({
  fontSize: "xl",
  fontWeight: "semibold",
  lineHeight: "tight",
  scrollMarginTop: "6",
});

const answer = css({
  mt: "3",
  fontSize: "md",
  lineHeight: "relaxed",
  color: "fg.muted",
});

const ctaSection = css({
  mt: { base: "12", md: "16" },
  pt: "8",
  borderTop: "1px solid",
  borderColor: "border",
});

const ctaText = css({
  fontSize: "md",
  lineHeight: "relaxed",
  color: "fg.muted",
});

const ctaLink = css({
  mt: "5",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "12",
  px: "6",
  borderRadius: "full",
  bg: "accent",
  color: "accent.fg",
  fontSize: "md",
  fontWeight: "medium",
  _hover: { opacity: 0.9 },
});

export default function FaqPage() {
  const invite = DISCORD_INVITE;

  return (
    <main className={page}>
      <h1 className={heading}>よくある質問</h1>
      <p className={lead}>
        コミュニティへのよくある質問を準備しています。具体的な質問と回答はオーナーの正本化後に掲載します。
      </p>

      <dl className={list}>
        {FAQ_ITEMS.map((faq) => (
          <div key={faq.id} className={item}>
            <dt id={faq.id} className={question}>
              {faq.question}
            </dt>
            <dd className={css({ m: "0" })}>
              {faq.answer.map((paragraph) => (
                <p key={paragraph} className={answer}>
                  {paragraph}
                </p>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      {FAQ_ITEMS.length === 0 ? <p className={lead}>現在、掲載中の質問はありません。</p> : null}

      {invite ? (
        <section className={ctaSection}>
          <p className={ctaText}>Discord サーバで活動しています。</p>
          <a className={ctaLink} href={invite} target="_blank" rel="noopener noreferrer">
            Discord サーバに参加する
          </a>
        </section>
      ) : null}
    </main>
  );
}
