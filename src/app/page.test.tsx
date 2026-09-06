import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the landing page with the starter H1 and CTAs", () => {
    render(<Home />);

    // Smoke test: the landing page renders without throwing and exposes the
    // starter template's heading + CTA links. Once Issue #8 swaps the
    // placeholder copy for the real ido-bata landing, update the selectors
    // here in the same PR.
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /to get started, edit the/i,
    });
    expect(heading).toBeTruthy();

    expect(screen.getByRole("link", { name: /deploy now/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /documentation/i })).toBeTruthy();
  });
});