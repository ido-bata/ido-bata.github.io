import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import IdobataTimePage from "./page";

describe("Idobata time page", () => {
  it("shows the participation details and full schedule", () => {
    render(<IdobataTimePage />);

    expect(screen.getByRole("heading", { level: 1, name: "いど端 底力 タイム" })).toBeTruthy();
    expect(screen.getByText("毎日 21:00–22:40")).toBeTruthy();
    expect(screen.getByText("いど底-ステージ")).toBeTruthy();
    expect(screen.getAllByText("休憩")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Botの仕組みを見る/ }).getAttribute("href")).toBe(
      "/projects/server-bot",
    );
  });
});
