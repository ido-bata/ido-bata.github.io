import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("About page", () => {
  it("identifies the administrator and contribution paths", () => {
    render(<AboutPage />);

    // The administrator card in the page-opening band renders the
    // name as an h2 — the section headings further down are also
    // h2, so check the first one (the admin aside comes first).
    expect(screen.getAllByRole("heading", { level: 2, name: "samuido" })[0]).toBeTruthy();

    // X profile link from the administrator card.
    expect(screen.getAllByRole("link", { name: /@361do_sleep/ })[0].getAttribute("href")).toBe(
      "https://x.com/361do_sleep",
    );

    // Contribution section surfaces the repository entry points.
    expect(
      screen.getByRole("link", { name: /コントリビューションガイド/ }).getAttribute("href"),
    ).toContain("ido-bata.github.io");
    expect(screen.getByRole("link", { name: /^Issues$/ }).getAttribute("href")).toContain(
      "/issues",
    );
  });
});
