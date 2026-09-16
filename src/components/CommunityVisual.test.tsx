import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommunityVisual } from "./CommunityVisual";

describe("CommunityVisual", () => {
  it("shows a real post from the server's #ひとりごと channel", () => {
    render(<CommunityVisual />);

    // The Discord-window surface itself, labelled for assistive tech.
    expect(screen.getByLabelText(/いど端の活動イメージ/)).toBeTruthy();

    // Channel context: ひとりごと belongs to the `雑` category in
    // channels.ts. The sidebar should show the surrounding channels
    // (wip / ひとりごと / 世迷言) so the channel doesn't read as a
    // single-channel island.
    expect(screen.getByText("雑")).toBeTruthy();
    expect(screen.getByText("ひとりごと")).toBeTruthy();
    expect(screen.getByText("世迷言")).toBeTruthy();

    // Channel header description (mirrors channels.ts).
    expect(screen.getByText("作業中に考えたことを気軽に書く。")).toBeTruthy();

    // Samuido's actual 2026/03/21 post in #ひとりごと — preserved
    // verbatim, including the "(唐突)" aside. Two separate `<p>`
    // paragraphs (the original had one blank line in the middle),
    // so each half is checked independently.
    expect(screen.getByText("samuido")).toBeTruthy();
    expect(screen.getByText("2026/03/21 17:58")).toBeTruthy();
    expect(screen.getByText(/VSCodeのUXデザインが一番のお手本/)).toBeTruthy();
    expect(screen.getByText(/目指すべき高みである/)).toBeTruthy();
  });
});
