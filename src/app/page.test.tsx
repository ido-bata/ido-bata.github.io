import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders site navigation before newcomer guidance", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: "いど端" })).toBeTruthy();

    expect(screen.getByRole("heading", { level: 2, name: "チャネルから探す" })).toBeTruthy();

    // Secondary utility surfaces: News + Rules empty-state cards.
    expect(screen.getByRole("heading", { level: 2, name: /最新の動き/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: /ルール・ガイドライン/ })).toBeTruthy();

    const labels = ["チャネル一覧", "初めての方へ", "すべてのチャネルを見る"];
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
