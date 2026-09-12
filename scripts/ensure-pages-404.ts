/**
 * Post-build safety net for the GitHub Pages 404 page.
 *
 * `next build` with `output: "export"` and `trailingSlash: true` writes the
 * App Router `not-found.tsx` to `out/404/index.html`. As of this writing
 * Next.js also emits a top-level `out/404.html` for backward compat, but
 * GitHub Pages only honours a custom 404 page when it lives at the root of
 * the publishing source (see
 * https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
 * — "GitHub Pages will use the file to render a custom 404 page when a
 * user attempts to visit a page that does not exist on your site.").
 *
 * If a future Next.js release stops emitting the root copy, a deployed
 * release would silently fall back to GitHub's default 404 template
 * without a build-time signal. This script closes that gap: it runs as
 * `package.json#postbuild` (Bun auto-runs after `next build`), guarantees
 * `out/404.html` exists by copying from `out/404/index.html` when needed,
 * and exits non-zero if neither file is present so CI surfaces the issue
 * immediately.
 *
 * Idempotent — safe to re-run, no-ops when `out/404.html` is already in
 * place.
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..");
const OUT_DIR = resolve(REPO_ROOT, "out");
const TARGET = resolve(OUT_DIR, "404.html");
const SOURCE = resolve(OUT_DIR, "404", "index.html");

function ensure(): void {
  if (!existsSync(OUT_DIR)) {
    throw new Error(
      `[ensure-pages-404] ${OUT_DIR} が見つかりません。先に 'bun run build' を実行してください。`,
    );
  }

  if (existsSync(TARGET)) {
    console.log(`[ensure-pages-404] ${TARGET} は既に存在します (Pages custom-404 OK)`);
    return;
  }

  if (!existsSync(SOURCE)) {
    throw new Error(
      `[ensure-pages-404] ${SOURCE} が見つかりません。` +
        `trailingSlash + not-found.tsx の組合せで期待されるパスなので、` +
        `Next.js の出力形式が変わった可能性があります。`,
    );
  }

  copyFileSync(SOURCE, TARGET);
  console.log(`[ensure-pages-404] ${SOURCE} -> ${TARGET} をコピー (Pages custom-404 root)`);
}

ensure();
