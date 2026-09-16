import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectPage, { generateStaticParams } from "./page";
import { PROJECTS } from "@/content/projects";

describe("Project page", () => {
  it("generates one static route for every registered project", () => {
    expect(generateStaticParams()).toEqual(PROJECTS.map(({ slug }) => ({ slug })));
  });

  it.each(PROJECTS)("renders $name from the registry", async (project) => {
    render(await ProjectPage({ params: Promise.resolve({ slug: project.slug }) }));
    expect(screen.getByRole("heading", { level: 1, name: project.name })).toBeTruthy();
  });
});
