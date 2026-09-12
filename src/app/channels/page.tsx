import type { Metadata } from "next";
import Image from "next/image";
import { css } from "@/styled-system/css";
import { DISCORD_INVITE } from "@/lib/env";
import { CHANNELS, CHANNEL_CATEGORIES, type ChannelCategory } from "@/content/channels";

export const metadata: Metadata = {
  title: "チャネル一覧 | ido-bata",
  description: "ido-bata Discord サーバのチャネル構成。",
};

function groupByCategory(): ReadonlyArray<{
  category: ChannelCategory;
  channels: typeof CHANNELS;
}> {
  return CHANNEL_CATEGORIES.map((category) => ({
    category,
    channels: CHANNELS.filter((channel) => channel.category === category),
  }));
}

export default function ChannelsPage() {
  const invite = DISCORD_INVITE;
  const grouped = groupByCategory();

  return (
    <main
      className={css({
        mx: "auto",
        maxW: "5xl",
        px: { base: "6", md: "8" },
        py: { base: "12", md: "16" },
      })}
    >
      <header className={headerClass}>
        <p className={eyebrowClass}>Channels</p>
        <h1 className={titleClass}>チャネル一覧</h1>
        <p className={leadClass}>
          チャネル一覧は準備中です。実在のチャネル構成は Discord サーバ側で参照できます。
        </p>
        {invite ? (
          <a className={ctaClass} href={invite} target="_blank" rel="noopener noreferrer">
            <Image
              src="/discord.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className={css({ display: "inline-block", w: "5", h: "5" })}
            />
            <span>ido-bata に参加する</span>
          </a>
        ) : null}
      </header>

      <section
        aria-label="カテゴリ別チャネル"
        className={css({ display: "flex", flexDirection: "column", gap: "12" })}
      >
        {grouped.length === 0 ? (
          <p className={leadClass}>現在、掲載中のチャネルはありません。</p>
        ) : (
          grouped.map(({ category, channels }) => (
            <section
              key={category}
              aria-labelledby={`category-${category}`}
              className={categorySectionClass}
            >
              <div className={categoryHeaderClass}>
                <h2 id={`category-${category}`} className={categoryTitleClass}>
                  {category}
                </h2>
                <span className={categoryCountClass}>{channels.length} チャネル</span>
              </div>
              <ul className={channelListClass}>
                {channels.map((channel) => (
                  <li key={channel.name} className={channelItemClass}>
                    <div className={channelNameRowClass}>
                      <span aria-hidden="true" className={hashMarkClass}>
                        #
                      </span>
                      <span className={channelNameClass}>{channel.name}</span>
                    </div>
                    <p className={channelDescriptionClass}>{channel.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </section>
    </main>
  );
}

// --- Panda CSS classes (kept colocated for readability) ---

const headerClass = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4",
  pb: "10",
  borderBottom: "1px solid",
  borderColor: "border",
  mb: "10",
});

const eyebrowClass = css({
  fontSize: "sm",
  fontWeight: "semibold",
  letterSpacing: "wide",
  textTransform: "uppercase",
  color: "accent",
});

const titleClass = css({
  fontSize: { base: "3xl", md: "4xl" },
  fontWeight: "bold",
  lineHeight: "tight",
  color: "fg",
});

const leadClass = css({
  maxW: "2xl",
  fontSize: { base: "md", md: "lg" },
  lineHeight: "relaxed",
  color: "fg.muted",
});

const ctaClass = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2",
  mt: "4",
  px: "5",
  h: "11",
  borderRadius: "full",
  bg: "accent",
  color: "accent.fg",
  fontWeight: "semibold",
  textDecoration: "none",
  transition: "colors",
  _hover: { opacity: "0.9" },
});

const categorySectionClass = css({
  display: "flex",
  flexDirection: "column",
  gap: "4",
});

const categoryHeaderClass = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "4",
  pb: "2",
  borderBottom: "1px solid",
  borderColor: "border",
});

const categoryTitleClass = css({
  fontSize: "xl",
  fontWeight: "semibold",
  color: "fg",
});

const categoryCountClass = css({
  fontSize: "sm",
  color: "fg.subtle",
  whiteSpace: "nowrap",
});

const channelListClass = css({
  display: "grid",
  gap: "3",
  gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" },
  listStyle: "none",
  p: "0",
  m: "0",
});

const channelItemClass = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  p: "4",
  bg: "bg.canvas",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border",
  borderRadius: "lg",
});

const channelNameRowClass = css({
  display: "inline-flex",
  alignItems: "baseline",
  gap: "1",
});

const hashMarkClass = css({
  color: "fg.subtle",
  fontFamily: "mono",
});

const channelNameClass = css({
  fontSize: "md",
  fontWeight: "semibold",
  fontFamily: "mono",
  color: "fg",
});

const channelDescriptionClass = css({
  fontSize: "sm",
  lineHeight: "relaxed",
  color: "fg.muted",
});
