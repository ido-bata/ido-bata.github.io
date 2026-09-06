import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for the ido-bata website.
 *
 * The site is exported as a static bundle via `next build` (output: "export")
 * into ./out. E2E specs in `tests/e2e/` are responsible for serving the
 * static export themselves (e.g. via `bun run preview`) or pointing at a
 * deployed preview environment. We intentionally do NOT spin up a webServer
 * here because:
 *
 *   1. CI on a free GitHub Actions runner is bandwidth-bound; downloading the
 *      Playwright browser bundle plus starting a second Node process costs
 *      more than it saves at the current test surface area.
 *   2. Static export means any HTTP server (or file:// plus a tiny static
 *      server) works; we want specs to be explicit about where they point.
 *
 * Run locally:
 *   bun run build
 *   npx http-server out -p 4173 &
 *   bun run test:e2e
 */
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 4173);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  outputDir: "test-results",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});