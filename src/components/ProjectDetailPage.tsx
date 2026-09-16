import type { ReactNode } from "react";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import type { Project } from "@/content/projects";

export function ProjectDetailPage({
  project,
  children,
}: {
  project: Project;
  children?: ReactNode;
}) {
  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: project.name }]} />
      <section aria-labelledby="project-heading" className={cx(section({ variant: "flow" }))}>
        <div className={cx(grid({ cols: 12, gap: 6 }))}>
          <div className={cx(stack({ gap: 4 }), css({ gridColumn: { base: "1", md: "span 7" } }))}>
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.muted",
              })}
            >
              {project.eyebrow}
            </p>
            <h1
              id="project-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                color: "fg.DEFAULT",
              })}
            >
              {project.name}
            </h1>
            <p
              className={css({
                fontSize: { base: "md", md: "lg" },
                lineHeight: "relaxed",
                color: "fg.muted",
                maxW: "46ch",
              })}
            >
              {project.summary}
            </p>
            <div className={css({ display: "flex", flexWrap: "wrap", gap: "3" })}>
              {project.links.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant={link.kind === "repository" ? "solid" : "outline"}
                  size="lg"
                >
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
            {children}
          </div>
          <aside
            aria-label="利用状況"
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 5" },
                bg: "bg.subtle",
                border: "1px solid",
                borderColor: "border.subtle",
                borderRadius: "lg",
                padding: { base: "5", md: "6" },
              }),
            )}
          >
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                color: "fg.muted",
              })}
            >
              STATUS
            </p>
            <p className={css({ fontSize: "sm", lineHeight: "relaxed", color: "fg.DEFAULT" })}>
              {project.status}
            </p>
          </aside>
        </div>
      </section>
      <section
        aria-labelledby="features-heading"
        className={cx(section({ variant: "flow" }), stack({ gap: 5 }))}
      >
        <h2
          id="features-heading"
          className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
        >
          できること
        </h2>
        <ul
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
            gap: "4",
            listStyle: "none",
            padding: 0,
            margin: 0,
          })}
        >
          {project.features.map((feature) => (
            <li
              key={feature}
              className={css({
                padding: "5",
                border: "1px solid",
                borderColor: "border.subtle",
                borderRadius: "lg",
                color: "fg.DEFAULT",
                lineHeight: "relaxed",
              })}
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
