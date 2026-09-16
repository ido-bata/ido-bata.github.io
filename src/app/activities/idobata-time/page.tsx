import type { Metadata } from "next";
import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { container, grid, section, stack } from "@/styles/recipes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { IDOBATA_TIME } from "@/content/activities";

export const metadata: Metadata = {
  title: "いど端 底力 タイム | ido-bata",
  description: "毎日21時から開いている、いど端の作業時間。",
};

export default function IdobataTimePage() {
  return (
    <main className={cx(container({ size: "content" }))}>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: IDOBATA_TIME.name }]} />
      <section aria-labelledby="activity-heading" className={cx(section({ variant: "flow" }))}>
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
              Daily work session
            </p>
            <h1
              id="activity-heading"
              className={css({
                fontSize: { base: "3xl", md: "4xl" },
                fontWeight: "bold",
                lineHeight: "tight",
                color: "fg.DEFAULT",
              })}
            >
              {IDOBATA_TIME.name}
            </h1>
            <p
              className={css({
                fontSize: { base: "md", md: "lg" },
                lineHeight: "relaxed",
                color: "fg.muted",
                maxW: "44ch",
              })}
            >
              {IDOBATA_TIME.summary}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href={IDOBATA_TIME.botPath}>Botの仕組みを見る</Link>
            </Button>
          </div>
          <aside
            aria-label="参加情報"
            className={cx(
              stack({ gap: 4 }),
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
            <p className={css({ fontWeight: "semibold", color: "fg.DEFAULT" })}>
              毎日 {IDOBATA_TIME.time}
            </p>
            <div>
              <p className={css({ fontSize: "xs", color: "fg.muted", marginBottom: "1" })}>会場</p>
              <p className={css({ color: "fg.DEFAULT", fontFamily: "mono" })}>
                {IDOBATA_TIME.channel}
              </p>
            </div>
            <p className={css({ fontSize: "sm", lineHeight: "relaxed", color: "fg.muted" })}>
              {IDOBATA_TIME.participation}
            </p>
          </aside>
        </div>
      </section>
      <section
        aria-labelledby="schedule-heading"
        className={cx(section({ variant: "flow" }), stack({ gap: 5 }))}
      >
        <h2
          id="schedule-heading"
          className={css({ fontSize: "2xl", fontWeight: "bold", color: "fg.DEFAULT" })}
        >
          進行
        </h2>
        <ol
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(5, 1fr)" },
            gap: "3",
            listStyle: "none",
            padding: 0,
            margin: 0,
          })}
        >
          {IDOBATA_TIME.schedule.map((phase) => (
            <li
              key={`${phase.label}-${phase.time}`}
              className={cx(
                stack({ gap: 2 }),
                css({
                  padding: "4",
                  borderRadius: "md",
                  border: "1px solid",
                  borderColor: "border.subtle",
                  bg: phase.kind === "work" ? "bg.surface" : "bg.subtle",
                }),
              )}
            >
              <span className={css({ fontWeight: "semibold", color: "fg.DEFAULT" })}>
                {phase.label}
              </span>
              <span className={css({ fontSize: "sm", color: "fg.muted", fontFamily: "mono" })}>
                {phase.time}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
