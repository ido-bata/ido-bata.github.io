import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("keeps site, contribution, and administrator routes together", () => {
    render(<Footer />);

    expect(screen.getByRole("navigation", { name: "サイト案内" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "サイトへの参加" })).toBeTruthy();
    expect(screen.getByText("samuido")).toBeTruthy();
    expect(screen.getByRole("link", { name: /GitHubリポジトリ/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /@361do_sleep/ })).toBeTruthy();
  });
});
