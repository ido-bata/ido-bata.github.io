import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for the ido-bata website.
 *
 * The site is exported as a static bundle via `next build` (output: "export")
 * into ./out. CI runs the build first, then Playwright serves `./out` itself
 * via `python3 -m http.server` — Python is preinstalled on the
 * `ubuntu-latest` GitHub Actions runner so we don't need to vendor an extra
 * static-server package just for E2E.
 *
 * Locally you can either let Playwright boot the server (just run
 * `bun run test:e2e` after `bun run build`) or override the base URL via
 * `PLAYWRIGHT_BASE_URL` to point at an already-running server / preview
 * deployment.
 *
 * Run locally:
 *   bun run build
 *   bun run test:e2e    # Playwright spins up the static server itself
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
  // Serve the static export for E2E. CI sets PLAYWRIGHT_BASE_URL="" to opt
  // into the webServer, but locally you can also point at an existing
  // server (e.g. `bun run start -- -p 3000`) via PLAYWRIGHT_BASE_URL — in
  // which case Playwright will reuse it instead of booting a duplicate.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `python3 -m http.server ${PORT} --directory out`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
        stdout: "ignore",
        stderr: "pipe",
      },
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
