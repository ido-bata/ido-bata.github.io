import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS, PROJECTS, getProject, getProjectPath } from "./projects";

describe("projects", () => {
  it("lists the active organization projects", () => {
    expect(PROJECTS.map((project) => project.slug)).toEqual(["layer-note", "server-bot"]);
  });

  it("provides actionable links for LayerNote", () => {
    expect(getProject("layer-note")?.links.some((link) => link.kind === "releases")).toBe(true);
    expect(getProject("missing")).toBeUndefined();
  });

  it("derives routes and caps the home-page selection", () => {
    expect(new Set(PROJECTS.map(({ slug }) => slug)).size).toBe(PROJECTS.length);
    expect(PROJECTS.map(getProjectPath)).toEqual(["/projects/layer-note", "/projects/server-bot"]);
    expect(FEATURED_PROJECTS.length).toBeLessThanOrEqual(2);
  });
});
