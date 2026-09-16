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
 * The home page (`src/app/page.tsx`) is the directory for activities,
 * projects, and server information. These assertions cover those primary
 * routes in the static export.
 */
test.describe("Home page (static export)", () => {
  test("renders the utility-first navigator landing", async ({ page }) => {
    const response = await page.goto("/");
    expect(response, "expected a navigation response").not.toBeNull();
    expect(response?.status() ?? 0).toBeLessThan(400);

    await expect(page.getByRole("heading", { level: 1, name: "いど端" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "使えるもの" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "チャネルから探す" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "FAQ", exact: true })).toBeVisible();
  });

  for (const entry of [
    { href: "/activities/idobata-time", heading: "いど端 底力 タイム" },
    { href: "/projects/layer-note", heading: "LayerNote" },
    { href: "/projects/server-bot", heading: "ido-bata-server-bot" },
  ]) {
    test(`renders ${entry.href}`, async ({ page }) => {
      const response = await page.goto(entry.href);
      expect(response?.status() ?? 0).toBeLessThan(400);
      await expect(page.getByRole("heading", { level: 1, name: entry.heading })).toBeVisible();
    });
  }
});
