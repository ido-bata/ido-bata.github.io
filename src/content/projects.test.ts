import { describe, expect, it } from "vitest";
import { PROJECTS, getProject } from "./projects";

describe("projects", () => {
  it("lists the active organization projects", () => {
    expect(PROJECTS.map((project) => project.slug)).toEqual(["layer-note", "server-bot"]);
  });

  it("provides actionable links for LayerNote", () => {
    expect(getProject("layer-note")?.links.some((link) => link.kind === "releases")).toBe(true);
    expect(getProject("missing")).toBeUndefined();
  });
});
