import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LayerNotePage from "./page";

describe("LayerNote page", () => {
  it("describes the tool and links to its maintained sources", () => {
    render(<LayerNotePage />);
    expect(screen.getByRole("heading", { level: 1, name: "LayerNote" })).toBeTruthy();
    expect(screen.getByText(/After Effectsのレイヤーにメモ/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "使い方を読む" }).getAttribute("href")).toContain(
      "docs/users.md",
    );
  });
});
