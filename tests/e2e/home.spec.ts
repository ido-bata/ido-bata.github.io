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
 * The home page (`src/app/page.tsx`) was replaced as part of Issue #8;
 * these assertions reflect the ido-bata portal content (Issue #8 / Issue #15).
 */
test.describe("Home page (static export)", () => {
  test("renders the ido-bata portal landing page", async ({ page }) => {
    const response = await page.goto("/");
    expect(response, "expected a navigation response").not.toBeNull();
    expect(response?.status() ?? 0).toBeLessThan(400);

    await expect(
      page.getByRole("heading", { level: 1, name: /井戸端会議のための、居場所。/ }),
    ).toBeVisible();
    // ページ内の "About" リンクは複数ある (Hero CTA `ido-bata について` /
    // About セクション内 `About ページを読む →` / 関連リンクカード
    // `About コミュニティ紹介` / Footer site nav `About`) ため、
    // `exact: true` で Footer の `About` / `FAQ` リンクのみに絞り込む。
    // Footer nav は全ページで常に render されるため、smoke test として
    // navigation surface が存在することを確認するのに十分な target。
    await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "FAQ", exact: true })).toBeVisible();
  });
});
