import type { Metadata } from "next";
import Image from "next/image";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ABOUT_SECTIONS, ADMINISTRATOR } from "@/content/community";

export const metadata: Metadata = {
  title: "About | ido-bata",
  description: "いど端 Discord サーバーの運営スタンス、 管理者、 このサイトへの貢献方法。",
};

const eyebrow = css({
  fontSize: "xs",
  fontWeight: "medium",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "fg.muted",
});

const ledeParagraph = css({
  fontSize: { base: "md", md: "lg" },
  color: "fg.muted",
  lineHeight: "relaxed",
});

const roleStyle = css({
  color: "fg.muted",
  lineHeight: "relaxed",
});

const contributionLink = css({
  display: "flex",
  flexDirection: "column",
  gap: "1",
  color: "fg.DEFAULT",
  textDecoration: "none",
  _hover: { color: "accent.DEFAULT" },
  _focusVisible: { outline: "2px solid", outlineColor: "accent.DEFAULT", outlineOffset: "2px" },
});

const contributionLinkHeading = css({
  display: "inline-flex",
  alignItems: "baseline",
  gap: "2",
  width: "fit-content",
});

const contributionLinkArrow = css({
  color: "fg.subtle",
  fontSize: "sm",
});

function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

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
              <p className={ledeParagraph}>
                クリエイターやエンジニアが、制作や開発を実際に進めるためのDiscordサーバーです。
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
                <p className={roleStyle}>{ADMINISTRATOR.role}</p>
              </div>
              <p className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
                {ADMINISTRATOR.summary}
              </p>
              <a
                href={ADMINISTRATOR.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  color: "accent.DEFAULT",
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

      {ABOUT_SECTIONS.map((item, index) => (
        <section
          key={item.kind}
          aria-labelledby={`about-${item.kind.toLowerCase()}`}
          className={cx(
            section({ variant: "flow" }),
            css({ borderTop: "1px solid", borderColor: "border.hairline" }),
          )}
        >
          <div className={cx(grid({ cols: 12, gap: 6 }))}>
            <p className={cx(eyebrow, css({ gridColumn: { base: "1", md: "span 4" } }))}>
              {sectionNumber(index)} / {item.kind}
            </p>
            <div
              className={cx(
                stack({ gap: 4 }),
                css({ gridColumn: { base: "1", md: "span 8" }, maxW: "64ch" }),
              )}
            >
              <h2
                id={`about-${item.kind.toLowerCase()}`}
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
              {item.links ? (
                <div className={cx(cluster({ gap: 5 }))}>
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contributionLink}
                    >
                      <span className={contributionLinkHeading}>
                        <strong className={css({ fontSize: "lg", fontWeight: "semibold" })}>
                          {link.label}
                        </strong>
                        <span aria-hidden="true" className={contributionLinkArrow}>
                          ↗
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
