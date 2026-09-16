import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ServerBotPage from "./page";

describe("Server bot page", () => {
  it("explains the bot's current job", () => {
    render(<ServerBotPage />);
    expect(screen.getByRole("heading", { level: 1, name: "ido-bata-server-bot" })).toBeTruthy();
    expect(screen.getByText(/タイムキーパーを毎日運用/)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /底力タイムの時間割を見る/ }).getAttribute("href"),
    ).toBe("/activities/idobata-time");
  });
});
