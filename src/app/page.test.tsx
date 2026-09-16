import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders site navigation before newcomer guidance", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: /いど端/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "使えるもの" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /LayerNote/ }).getAttribute("href")).toBe(
      "/projects/layer-note",
    );
    expect(screen.getByRole("link", { name: /ido-bata-server-bot/ }).getAttribute("href")).toBe(
      "/projects/server-bot",
    );
    expect(screen.getAllByRole("link", { name: /いど端 底力 タイム/ }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: "すべてのプロジェクトを見る" }).getAttribute("href"),
    ).toBe("/projects");
    // CommunityVisual now also renders "samuido" as a chat author,
    // so the administrator name appears twice on the page — once in
    // the activity mockup, once in the People & source card. Check
    // presence rather than uniqueness.
    expect(screen.getAllByText("samuido").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /GitHubリポジトリ/ })).toBeTruthy();

    expect(screen.getByRole("heading", { level: 2, name: "チャネルから探す" })).toBeTruthy();

    expect(screen.getByRole("heading", { level: 2, name: /最新の動き/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: /ルール・ガイドライン/ })).toBeTruthy();

    const labels = ["初めての方へ", "すべてのチャネルを見る"];
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
