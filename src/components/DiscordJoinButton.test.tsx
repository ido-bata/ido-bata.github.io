import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DiscordJoinButton } from "./DiscordJoinButton";

describe("DiscordJoinButton", () => {
  it("uses the Discord brand colors in every theme and interaction state", () => {
    render(<DiscordJoinButton href="https://discord.gg/example" />);

    const link = screen.getByRole("link", { name: "Discord サーバーに参加" });
    expect(link.className).toContain("bg_#5865F2");
    expect(link.className).toContain("c_#FFFFFF");
    expect(link.className).toContain("hover:bg_#4752C4");
  });
});
