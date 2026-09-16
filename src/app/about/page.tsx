import type { Metadata } from "next";
import { css, cx } from "@/styled-system/css";
import { container, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "About | ido-bata",
  description: "いど端 Discord サーバーの考え方と使い方。",
};

/**
 * About page. This is supporting information; the home page remains the
 * working directory for the site.
 *
 * Refs:
 *   - Issue #14
 *   - .agents/skills/layout-system
 */
export default function AboutPage() {
  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "About" }]} />

      <section aria-labelledby="about-hero-title" className={cx(section({ variant: "flow" }))}>
        <div className={cx(stack({ gap: 5 }), css({ maxW: "64ch" }))}>
          <p
            className={css({
              fontSize: "xs",
              fontWeight: "medium",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "fg.muted",
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
              letterSpacing: "-0.03em",
              color: "fg.DEFAULT",
            })}
          >
            いど端について
          </h1>
          <p
            className={css({
              fontSize: { base: "md", md: "lg" },
              color: "fg.muted",
              lineHeight: "relaxed",
              maxW: "48ch",
            })}
          >
            いど端は、クリエイターやエンジニアが制作や開発を進めるための Discord サーバーです。
          </p>
        </div>
      </section>

      <section aria-labelledby="about-principle" className={cx(section({ variant: "flow" }))}>
        <div className={cx(stack({ gap: 4 }), css({ maxW: "64ch" }))}>
          <h2
            id="about-principle"
            className={css({ fontSize: "2xl", fontWeight: "semibold", color: "fg.DEFAULT" })}
          >
            実利を重視する
          </h2>
          <p className={css({ fontSize: "md", color: "fg.muted", lineHeight: "relaxed" })}>
            交流そのものより、制作や開発が前に進むことを大切にしています。専門分野の質問をする、制作途中のものを見せる、使える資料を共有する。必要なときに、必要な相手と対話します。
          </p>
          <p className={css({ fontSize: "md", color: "fg.muted", lineHeight: "relaxed" })}>
            肩書や所属より、作ったもの、知っていること、できることを重く見ます。
          </p>
        </div>
      </section>

      <section aria-labelledby="about-use" className={cx(section({ variant: "flow" }))}>
        <div className={cx(stack({ gap: 4 }), css({ maxW: "64ch" }))}>
          <h2
            id="about-use"
            className={css({ fontSize: "2xl", fontWeight: "semibold", color: "fg.DEFAULT" })}
          >
            各自のために使う
          </h2>
          <p className={css({ fontSize: "md", color: "fg.muted", lineHeight: "relaxed" })}>
            話題、共有、WIP、PDCA、作業時間など、用途ごとに場所を分けています。決まった活動への参加を求めるのではなく、それぞれがやりたいことを始め、続けるために使うサーバーです。
          </p>
        </div>
      </section>
    </main>
  );
}
