import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the ido-bata portal landing with org name, intro, and key links", () => {
    render(<Home />);

    // Org name + value proposition appear in the hero.
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /ido-bata（いど端）/,
    });
    expect(heading).toBeTruthy();

    // Section anchors are exposed as headings for assistive tech.
    expect(screen.getByRole("heading", { level: 2, name: /ido-bata について/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: /関連リンク/ })).toBeTruthy();

    // Highlight cards cover the four key points (titles reflect the
    // samuido 2025-03-24 community description).
    expect(screen.getByRole("heading", { name: /実利重視/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /ご自由にどうぞ/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /オープンな運営/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /いど端底力タイム/ })).toBeTruthy();

    // Related links must cover the routes owned by #14/#18/#19/#20/#21
    // (and the docs pages owned by other issues).
    const links = ["About", "FAQ", "Rules", "Channels", "News", "Code of Conduct", "Privacy"];
    for (const label of links) {
      expect(screen.getByRole("link", { name: new RegExp(label) })).toBeTruthy();
    }
  });

  it("hides the Discord CTA when NEXT_PUBLIC_DISCORD_INVITE is unset", () => {
    render(<Home />);
    // env is not set in the unit-test environment, so no Discord CTA button
    // pointing at an external invite URL should appear.
    const ctaButtons = screen.queryAllByRole("link", {
      name: /ido-bata Discord に参加する/,
    });
    expect(ctaButtons).toHaveLength(0);
  });
});
