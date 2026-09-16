import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsPage from "./page";
import { PROJECTS, getProjectPath } from "@/content/projects";

describe("Projects page", () => {
  it("renders every project from the content registry", () => {
    render(<ProjectsPage />);

    for (const project of PROJECTS) {
      expect(
        screen.getByRole("link", { name: new RegExp(project.name) }).getAttribute("href"),
      ).toBe(getProjectPath(project));
    }
  });
});
