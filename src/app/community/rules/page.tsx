import type { Metadata } from "next";
import Link from "next/link";
import { css } from "@/styled-system/css";
import { rules, type ChannelRule, type RuleSection } from "@/content/rules";

/**
 * /community/rules - サーバルール / ガイドライン
 *
 * refs:
 *   - Issue #19
 *   - docs/code-of-conduct.md (理念・禁止行為は本規範と整合)
 *   - docs/privacy.md (Discord 側のデータ取り扱いの前提)
 *
 * 実装メモ:
 *   - Panda CSS のトークン (`colors.*`, `spacing.*`, `fontSizes.*`) のみ使用。
 *     生の CSS / CSS Modules は併用しない。
 *   - Header / Footer は `app/layout.tsx` で自動付与されるため本ファイルでは
 *     レンダリングしない。
 *   - ページ文言は `src/content/rules.ts` に集約し、UI とデータを分離する。
 */

export const metadata: Metadata = {
  title: "サーバルール / ガイドライン | ido-bata",
  description:
    "ido-bata Discord コミュニティのサーバルール・運用ガイドライン。実利重視・情報共有主体の理念、各チャネルの運用方針、違反時の対応について記載する。",
};

const styles = {
  page: css({
    maxWidth: "768px",
    mx: "auto",
    px: { base: "4", md: "6" },
    py: { base: "8", md: "12" },
  }),
  header: css({
    mb: "10",
    pb: "6",
    borderBottom: "1px solid",
    borderColor: "border",
  }),
  eyebrow: css({
    fontSize: "sm",
    fontWeight: "medium",
    color: "fg.muted",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    mb: "2",
  }),
  title: css({
    fontSize: { base: "3xl", md: "4xl" },
    fontWeight: "bold",
    lineHeight: "tight",
    color: "fg",
    mb: "3",
  }),
  lede: css({
    fontSize: "md",
    color: "fg.muted",
    lineHeight: "relaxed",
  }),
  meta: css({
    mt: "4",
    fontSize: "xs",
    color: "fg.subtle",
  }),
  section: css({
    mt: "12",
  }),
  sectionTitle: css({
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "semibold",
    color: "fg",
    mb: "3",
    lineHeight: "tight",
  }),
  paragraph: css({
    fontSize: "md",
    color: "fg",
    lineHeight: "relaxed",
    mb: "4",
  }),
  list: css({
    listStyle: "disc",
    pl: "6",
    display: "flex",
    flexDirection: "column",
    gap: "2",
    fontSize: "md",
    color: "fg",
    lineHeight: "relaxed",
  }),
  channelsIntro: css({
    fontSize: "md",
    color: "fg.muted",
    lineHeight: "relaxed",
    mb: "6",
  }),
  channelCard: css({
    bg: "bg.canvas",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "lg",
    p: { base: "4", md: "5" },
    mb: "4",
  }),
  channelHeader: css({
    display: "flex",
    flexDirection: "column",
    gap: "1",
    mb: "3",
  }),
  channelName: css({
    fontFamily: "mono",
    fontSize: "md",
    fontWeight: "semibold",
    color: "accent.DEFAULT",
  }),
  channelPurpose: css({
    fontSize: "sm",
    color: "fg.muted",
    lineHeight: "relaxed",
  }),
  channelRules: css({
    listStyle: "circle",
    pl: "5",
    display: "flex",
    flexDirection: "column",
    gap: "1",
    fontSize: "sm",
    color: "fg",
    lineHeight: "relaxed",
  }),
  channelLabel: css({
    fontSize: "xs",
    fontWeight: "semibold",
    color: "fg.subtle",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    mt: "3",
    mb: "1",
  }),
  backLink: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    fontSize: "sm",
    color: "accent.DEFAULT",
    mt: "10",
    pt: "6",
    borderTop: "1px solid",
    borderColor: "border",
    _hover: { textDecoration: "underline" },
  }),
};

function Section({ section }: { section: RuleSection }) {
  return (
    <section id={section.id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{section.title}</h2>
      {section.body ? <p className={styles.paragraph}>{section.body}</p> : null}
      {section.bullets && section.bullets.length > 0 ? (
        <ul className={styles.list}>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function ChannelCard({ channel }: { channel: ChannelRule }) {
  return (
    <article className={styles.channelCard}>
      <header className={styles.channelHeader}>
        <span className={styles.channelName}>{channel.name}</span>
        <p className={styles.channelPurpose}>{channel.purpose}</p>
      </header>
      <p className={styles.channelLabel}>運用ルール</p>
      <ul className={styles.channelRules}>
        {channel.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </article>
  );
}

export default function CommunityRulesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Community</p>
        <h1 className={styles.title}>サーバルール / ガイドライン</h1>
        <p className={styles.lede}>
          ido-bata の Discord
          コミュニティに参加する前に、サーバの理念・運営方針・禁止行為を確認してください。本ページは行動規範
          ( コード・オブ・コンダクト / `docs/code-of-conduct.md`)
          と整合する形で運用されており、変更は本リポジトリの Pull Request で行います。
        </p>
        <p className={styles.meta}>最終更新日: {rules.lastUpdated}</p>
      </header>

      <Section section={rules.philosophy} />
      <Section section={rules.recommended} />
      <Section section={rules.prohibited} />

      <section id="channels" className={styles.section}>
        <h2 className={styles.sectionTitle}>チャネル別運用ルール</h2>
        <p className={styles.channelsIntro}>{rules.channels.intro}</p>
        {rules.channels.items.map((channel) => (
          <ChannelCard key={channel.name} channel={channel} />
        ))}
      </section>

      <Section section={rules.enforcement} />
      <Section section={rules.meta} />

      <Link href="/" className={styles.backLink}>
        トップへ戻る
      </Link>
    </main>
  );
}
