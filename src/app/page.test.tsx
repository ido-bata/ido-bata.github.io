import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the utility-first navigator: functional hero, channels index, secondary surfaces", () => {
    render(<Home />);

    // Page-opening hero carries the functional headline.
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();

    // Primary utility surface: the channels index on home.
    expect(screen.getByRole("heading", { level: 2, name: /チャネル/ })).toBeTruthy();

    // Secondary utility surfaces: News + Rules empty-state cards.
    expect(screen.getByRole("heading", { level: 2, name: /最新の動き/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: /ルール・ガイドライン/ })).toBeTruthy();

    // Primary actions / navigations exposed by the utility-first hero.
    // Each label may now appear more than once (footer nav + in-page
    // button / CTA), so use `getAllByRole` and assert at least one
    // matching link exists. "Discord に参加" is intentionally omitted
    // here because its presence depends on `NEXT_PUBLIC_DISCORD_INVITE`
    // — see the env-conditional test below.
    const labels = ["チャネルを見る", "初めての方へ", "チャネル一覧ページへ"];
    for (const label of labels) {
      const matches = screen.getAllByRole("link", { name: new RegExp(label) });
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("hides the Discord CTA when NEXT_PUBLIC_DISCORD_INVITE is unset", () => {
    render(<Home />);
    // env is not set in the unit-test environment, so no Discord CTA
    // pointing at an external invite URL should appear inside <main>.
    const ctaButtons = screen.queryAllByRole("link", {
      name: /Discord サーバに参加/,
    });
    expect(ctaButtons).toHaveLength(0);
  });
});
