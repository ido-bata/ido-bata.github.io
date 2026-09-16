import type { Metadata } from "next";
import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PROJECTS, getProjectPath } from "@/content/projects";

export const metadata: Metadata = {
  title: "プロジェクト | ido-bata",
  description: "ido-bataで開発・運用しているプロジェクトの一覧。",
};

export default function ProjectsPage() {
  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "プロジェクト" }]} />

      {/* Page-opening band — left rail (eyebrow / h1 / lede) + right
          rail (page metadata surface). Same 7 + 5 split the rest of
          the content pages use (channels / faq / news / rules / welcome
          / not-found) so the page-edge alignment is held across the
          site. Previously the header was a plain `stack` which read
          as visually narrower than every other content page header
          because it didn't share the same column axis. */}
      <section aria-labelledby="projects-heading" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div
            className={cx(
              stack({ gap: 4 }),
              css({ gridColumn: { base: "1", md: "span 7" } }),
            )}
          >
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.muted",
              })}
            >
              Projects
            </p>
            <h1
              id="projects-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                letterSpacing: "-0.02em",
                color: "fg.DEFAULT",
              })}
            >
              プロジェクト
            </h1>
            <p
              className={css({
                fontSize: "md",
                color: "fg.muted",
                lineHeight: "relaxed",
                maxW: "48ch",
              })}
            >
              ido-bataで開発・運用しているツールやBotです。各ページから利用方法や公開状況を確認できます。
            </p>
          </div>

          <aside
            aria-label="ページ情報"
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 5" },
                bg: "bg.subtle",
                borderRadius: "lg",
                padding: { base: "5", md: "6" },
                border: "1px solid",
                borderColor: "border.subtle",
                alignSelf: "stretch",
              }),
            )}
          >
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.subtle",
              })}
            >
              ページ情報
            </p>
            <dl
              className={css({
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "4",
                rowGap: "3",
                margin: 0,
                fontSize: "sm",
              })}
            >
              <dt className={css({ color: "fg.muted" })}>件数</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>{PROJECTS.length}</dd>
              <dt className={css({ color: "fg.muted" })}>並び順</dt>
              <dd className={css({ color: "fg.DEFAULT", margin: 0 })}>追加順</dd>
            </dl>
          </aside>
        </div>
      </section>

      {/* Project cards — 2-up grid on the 12-col coordinate system so
          each card is half the rail width. Uses the shared `grid({})`
          recipe (with `minmax(0, 1fr)`) so cards never overflow their
          column. Previously the list was an inline `display: grid`
          that wasn't using the project's coordinate primitive. */}
      <section aria-label="プロジェクト一覧" className={cx(section({ variant: "flow" }))}>
        <ul
          className={cx(
            grid({ cols: 2, gap: 6 }),
            css({ listStyle: "none", margin: 0, padding: 0 }),
          )}
        >
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link
                href={getProjectPath(project)}
                className={cx(
                  stack({ gap: 3 }),
                  css({
                    display: "flex",
                    height: "100%",
                    padding: { base: "5", md: "6" },
                    border: "1px solid",
                    borderColor: "border.subtle",
                    borderRadius: "lg",
                    color: "fg.DEFAULT",
                    textDecoration: "none",
                    _hover: { borderColor: "border.strong" },
                  }),
                )}
              >
                <span className={css({ fontSize: "xs", color: "fg.muted" })}>
                  {project.eyebrow}
                </span>
                <strong className={css({ fontSize: "xl" })}>{project.name}</strong>
                <span className={css({ color: "fg.muted", lineHeight: "relaxed" })}>
                  {project.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
