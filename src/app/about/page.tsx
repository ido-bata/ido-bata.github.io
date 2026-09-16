import type { Metadata } from "next";
import Image from "next/image";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ADMINISTRATOR, CONTRIBUTION_LINKS } from "@/content/community";

export const metadata: Metadata = {
  title: "About | ido-bata",
  description: "いど端 Discord サーバーの考え方、管理者、サイトへの参加方法。",
};

const eyebrow = css({
  fontSize: "xs",
  fontWeight: "medium",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "fg.muted",
});

export default function AboutPage() {
  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "About" }]} />

      <section aria-labelledby="about-title" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }), css({ alignItems: "end" }))}>
          <div className={cx(stack({ gap: 5 }), css({ gridColumn: { base: "1", md: "span 5" } }))}>
            <p className={eyebrow}>About ido-bata</p>
            <h1
              id="about-title"
              className={css({
                fontSize: { base: "3xl", md: "5xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.03em",
                color: "fg.DEFAULT",
              })}
            >
              いど端について
            </h1>
            <div className={cx(stack({ gap: 4 }), css({ maxW: "52ch" }))}>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                いど端、 Discord で動いてる小さいサーバー。 名前は井戸端会議の響きだけ借りてる。
                うちは交流じゃなくて情報共有のためのサーバーってとこでやってる。
              </p>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                関心領域は映像 / プログラミング / デザインあたり、 各自で調べて書いて共有する。
                ウェルカムも入会の儀式もないし、 誰が来たかは誰にも分からない。
                ひとりごと / wip は反応より書くことを優先するチャネル。
              </p>
            </div>
          </div>
          <aside
            aria-label="管理者"
            className={cx(
              stack({ gap: 5 }),
              css({
                gridColumn: { base: "1", md: "6 / span 7" },
                display: "grid",
                gridTemplateColumns: { base: "1fr", sm: "auto 1fr" },
                alignItems: "center",
                padding: { base: "5", md: "7" },
                bg: "bg.subtle",
                borderRadius: "xl",
              }),
            )}
          >
            <Image
              src={ADMINISTRATOR.profileImageUrl}
              alt={`${ADMINISTRATOR.name}のプロフィール写真`}
              width={112}
              height={112}
              className={css({
                width: { base: "20", md: "28" },
                height: { base: "20", md: "28" },
                borderRadius: "full",
                objectFit: "cover",
              })}
            />
            <div className={cx(stack({ gap: 3 }))}>
              <p className={eyebrow}>Administrator</p>
              <div>
                <h2 className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}>
                  {ADMINISTRATOR.name}
                </h2>
                <p className={css({ color: "fg.muted" })}>{ADMINISTRATOR.role}</p>
              </div>
              <p className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
                {ADMINISTRATOR.summary}
              </p>
              <a
                href={ADMINISTRATOR.xUrl}
                target="_blank"
                rel="noreferrer"
                className={css({
                  color: "accent.default",
                  fontWeight: "semibold",
                  width: "fit-content",
                })}
              >
                X {ADMINISTRATOR.xHandle} ↗
              </a>
            </div>
          </aside>
        </div>
      </section>

      {[
        {
          id: "principle",
          label: "01 / Principle",
          title: "実利を重視する",
          body: "専門分野の質問をする、制作途中のものを見せる、使える資料を共有する。必要なときに必要な相手と対話し、制作や開発が前へ進むことを大切にしています。",
        },
        {
          id: "use",
          label: "02 / Use",
          title: "各自のために使う",
          body: "話題、共有、WIP、PDCA、作業時間など、用途ごとに場所を分けています。それぞれがやりたいことを始め、続けるために使うサーバーです。",
        },
      ].map((item) => (
        <section
          key={item.id}
          aria-labelledby={item.id}
          className={cx(
            section({ variant: "flow" }),
            css({ borderTop: "1px solid", borderColor: "border.hairline" }),
          )}
        >
          <div className={cx(grid({ cols: 12, gap: 6 }))}>
            <p className={cx(eyebrow, css({ gridColumn: { base: "1", md: "span 4" } }))}>
              {item.label}
            </p>
            <div
              className={cx(
                stack({ gap: 4 }),
                css({ gridColumn: { base: "1", md: "span 8" }, maxW: "64ch" }),
              )}
            >
              <h2
                id={item.id}
                className={css({
                  fontSize: { base: "2xl", md: "3xl" },
                  fontWeight: "bold",
                  color: "fg.DEFAULT",
                })}
              >
                {item.title}
              </h2>
              <p
                className={css({
                  fontSize: { base: "md", md: "lg" },
                  color: "fg.muted",
                  lineHeight: "relaxed",
                })}
              >
                {item.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section
        aria-labelledby="contribute-title"
        className={cx(
          section({ variant: "flow" }),
          css({ borderTop: "1px solid", borderColor: "border.hairline" }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(stack({ gap: 2 }), css({ gridColumn: { base: "1", md: "span 4" } }))}>
            <p className={eyebrow}>03 / Contribute</p>
            <h2
              id="contribute-title"
              className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
            >
              このサイトを改善する
            </h2>
          </div>
          <div className={cx(stack({ gap: 6 }), css({ gridColumn: { base: "1", md: "span 8" } }))}>
            {CONTRIBUTION_LINKS.map((link) => (
              <a
                key={link.kind}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cx(
                  stack({ gap: 1 }),
                  css({
                    color: "fg.DEFAULT",
                    textDecoration: "none",
                    _hover: { color: "accent.default" },
                  }),
                )}
              >
                <span
                  className={css({
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "2",
                    width: "fit-content",
                  })}
                >
                  <strong className={css({ fontSize: "lg", fontWeight: "semibold" })}>
                    {link.label}
                  </strong>
                  <span
                    aria-hidden="true"
                    className={css({ color: "fg.subtle", fontSize: "sm" })}
                  >
                    ↗
                  </span>
                </span>
                <span
                  className={css({ fontSize: "sm", color: "fg.muted", lineHeight: "relaxed" })}
                >
                  {link.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
