import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("About page", () => {
  it("identifies the administrator and contribution paths", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 2, name: "samuido" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /@361do_sleep/ }).getAttribute("href")).toBe(
      "https://x.com/361do_sleep",
    );
    expect(screen.getByRole("link", { name: /GitHubリポジトリ/ }).getAttribute("href")).toContain(
      "ido-bata.github.io",
    );
    expect(screen.getByRole("link", { name: /コントリビューションガイド/ })).toBeTruthy();
  });
});
