import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the ido-bata portal landing with hero, about, and key links", () => {
    render(<Home />);

    // Hero h1 carries the brand tagline. "ido-bata" itself appears in
    // the eyebrow + link rail — keep the assertion on the heading.
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();

    // Section headings expose the page's information architecture.
    expect(screen.getByRole("heading", { level: 2, name: /何を大切にする場所か/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: /関連リンク/ })).toBeTruthy();

    // Related links must cover the routes owned by #14/#18/#19/#20/#21
    // (and the docs pages owned by other issues). Each label may now
    // appear more than once (footer nav + in-page card / CTA), so use
    // `getAllByRole` and assert at least one matching link exists.
    const links = ["About", "FAQ", "Rules", "Channels", "News"];
    for (const label of links) {
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
