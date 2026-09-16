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
      <section aria-labelledby="projects-heading" className={cx(section({ variant: "flow" }))}>
        <div className={cx(stack({ gap: 4 }))}>
          <p className={css({ fontSize: "xs", color: "fg.muted", letterSpacing: "0.08em" })}>
            PROJECTS
          </p>
          <h1
            id="projects-heading"
            className={css({
              fontSize: { base: "3xl", md: "4xl" },
              fontWeight: "bold",
              color: "fg.DEFAULT",
            })}
          >
            プロジェクト
          </h1>
          <p className={css({ color: "fg.muted", lineHeight: "relaxed", maxW: "48ch" })}>
            ido-bataで開発・運用しているツールやBotです。各ページから利用方法や公開状況を確認できます。
          </p>
        </div>
      </section>
      <section aria-label="プロジェクト一覧" className={cx(section({ variant: "tight" }))}>
        <ul
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: "4",
            listStyle: "none",
            padding: 0,
            margin: 0,
          })}
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
