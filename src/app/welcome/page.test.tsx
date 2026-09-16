import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import WelcomePage from "./page";

describe("Welcome page", () => {
  it("explains how to start without inventing participation rules", () => {
    render(<WelcomePage />);

    expect(screen.getByRole("heading", { level: 1, name: "いど端に参加する" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "参加したら" })).toBeTruthy();
    expect(screen.getByText("話題", { selector: "span" })).toBeTruthy();
    expect(screen.getByText("共有", { selector: "span" })).toBeTruthy();
    expect(screen.getByText("雑", { selector: "span" })).toBeTruthy();
    expect(screen.getByText("PDCA", { selector: "span" })).toBeTruthy();

    expect(screen.queryByText(/匿名/)).toBeNull();
    expect(screen.queryByText(/交流じゃなくて/)).toBeNull();
    expect(screen.queryByText(/反応より書くことが優先/)).toBeNull();
  });
});
