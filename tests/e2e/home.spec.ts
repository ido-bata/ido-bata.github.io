import { test, expect } from "@playwright/test";

/**
 * Smoke test for the static export of the landing page.
 *
 * Locally, just run:
 *   bun run build
 *   bun run test:e2e
 *
 * Playwright's `webServer` config (see playwright.config.ts) serves
 * `./out` on `PLAYWRIGHT_PORT` via `python3 -m http.server` for us,
 * so no manual static-server step is needed.
 *
 * To point at an already-running preview / deployed build instead:
 *   PLAYWRIGHT_BASE_URL=https://ido-bata.github.io bun run test:e2e
 *
 * The home page (`src/app/page.tsx`) was rewritten as a utility-first
 * navigator in Issue #103 — these assertions target the surfaces that
 * are stable across the IA (functional hero h1, channels index h2,
 * footer site nav with About / FAQ).
 */
test.describe("Home page (static export)", () => {
  test("renders the utility-first navigator landing", async ({ page }) => {
    const response = await page.goto("/");
    expect(response, "expected a navigation response").not.toBeNull();
    expect(response?.status() ?? 0).toBeLessThan(400);

    // Functional hero headline (Issue #103: utility-first reorientation).
    await expect(
      page.getByRole("heading", { level: 1, name: /関心領域を各自で調べて書く/ }),
    ).toBeVisible();
    // Channels index — primary utility surface on home.
    await expect(page.getByRole("heading", { level: 2, name: /チャネル/ })).toBeVisible();
    // Footer nav is rendered on every page, so its About / FAQ links
    // are stable smoke-test targets for the navigation surface.
    await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "FAQ", exact: true })).toBeVisible();
  });
});
