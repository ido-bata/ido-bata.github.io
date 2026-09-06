import { test, expect } from "@playwright/test";

/**
 * Smoke test for the static export of the landing page.
 *
 * Before running this locally:
 *   bun run build
 *   npx http-server out -p 4173 &
 *   bun run test:e2e
 *
 * Or, if you have a deployed preview URL:
 *   PLAYWRIGHT_BASE_URL=https://ido-bata.github.io bun run test:e2e
 *
 * The current landing copy is still the create-next-app starter (Issue #8
 * will replace it with the real ido-bata copy). Update the assertions below
 * alongside that change.
 */
test.describe("Home page (static export)", () => {
  test("renders the starter landing page", async ({ page }) => {
    const response = await page.goto("/");
    expect(response, "expected a navigation response").not.toBeNull();
    expect(response?.status() ?? 0).toBeLessThan(400);

    await expect(
      page.getByRole("heading", { level: 1, name: /to get started, edit the/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /deploy now/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /documentation/i })).toBeVisible();
  });
});