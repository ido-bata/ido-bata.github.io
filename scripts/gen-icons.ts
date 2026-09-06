/**
 * ido-bata icon generator.
 *
 * Produces the favicon / icon / apple-icon assets consumed by Next.js App
 * Router metadata file conventions:
 *
 *   src/app/favicon.ico   multi-size (16 / 32 / 48) legacy ICO
 *   src/app/icon.png      32x32 primary <link rel="icon">
 *   src/app/apple-icon.png 180x180 apple-touch-icon
 *
 * The SVG design is a single source of truth — pure SVG, no raster assets
 * checked in. Re-run with `bun scripts/gen-icons.ts` whenever the brand mark
 * or palette changes.
 *
 * Design notes:
 *   - Background: Discord blurple (#5865F2) rounded square.
 *   - Foreground: "ido" wordmark in DejaVu Sans Bold, white.
 *   - 16x16 is rendered from a simplified "i"-only SVG so the glyph
 *     stays legible at favicon-tab dimensions; 32x32 and above use the
 *     full "ido" wordmark; 180x180 adds a Discord-style accent dot.
 *
 * Requires the `@resvg/resvg-js` devDependency (pure-JS SVG → PNG via a
 * bundled Rust/napi binary; no system libraries).
 */
import { Resvg } from "@resvg/resvg-js";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const HERE = dirname(fileURLToPath(import.meta.url));
// scripts/ lives at <repo>/scripts, output assets at <repo>/src/app.
const REPO_ROOT = resolve(HERE, "..");
const APP_DIR = resolve(REPO_ROOT, "src/app");

// Brand colors (Discord blurple).
const BRAND_BG = "#5865F2";
const BRAND_FG = "#FFFFFF";

/**
 * Output sizes (square edge in pixels).
 *
 *  - 16/32/48 → bundled into multi-size favicon.ico for legacy browsers.
 *  - 32      → Next.js `src/app/icon.png` (auto <link rel="icon">).
 *  - 180     → Next.js `src/app/apple-icon.png` (apple-touch-icon).
 */
const ICON_SIZES = [16, 32, 48] as const;
const APPLE_TOUCH_SIZE = 180;

// SVG master canvas. Rendered at every output size via resvg's fitTo.
// Using a high viewBox gives the rasterizer more precision when downscaling
// to small favicon dimensions.
const MASTER = 256;

// ---------------------------------------------------------------------------
// SVG sources
// ---------------------------------------------------------------------------

/**
 * Compact master for favicon sizes ≥ 32px.
 * "ido" wordmark, centered horizontally, baseline tuned to optical center.
 */
function masterSvg(): string {
  const textY = Math.round(MASTER * 0.72);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MASTER} ${MASTER}">`,
    `  <rect width="${MASTER}" height="${MASTER}" rx="${Math.round(
      MASTER * 0.22,
    )}" fill="${BRAND_BG}"/>`,
    `  <text x="${MASTER / 2}" y="${textY}" font-family="DejaVu Sans" `,
    `        font-size="160" font-weight="bold" text-anchor="middle" `,
    `        fill="${BRAND_FG}">ido</text>`,
    `</svg>`,
  ].join("\n");
}

/**
 * Simplified master for 16x16 favicon. The full "ido" wordmark becomes
 * illegible at this size; drop to a single bold "i" so the dot + stem
 * remain readable when the browser shrinks the tab favicon.
 */
function smallFaviconSvg(): string {
  const textY = Math.round(MASTER / 2 + MASTER * 0.18);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MASTER} ${MASTER}">`,
    `  <rect width="${MASTER}" height="${MASTER}" rx="${Math.round(
      MASTER * 0.22,
    )}" fill="${BRAND_BG}"/>`,
    `  <text x="${MASTER / 2}" y="${textY}" font-family="DejaVu Sans" `,
    `        font-size="220" font-weight="bold" text-anchor="middle" `,
    `        fill="${BRAND_FG}">i</text>`,
    `</svg>`,
  ].join("\n");
}

/**
 * Apple-touch-icon master (180x180). Adds a small Discord-style accent dot
 * in the top-right corner — a subtle nod to the community/chat nature of
 * the project without competing with the wordmark.
 */
function appleTouchSvg(): string {
  const textY = Math.round(MASTER * 0.72);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MASTER} ${MASTER}">`,
    `  <rect width="${MASTER}" height="${MASTER}" rx="${Math.round(
      MASTER * 0.22,
    )}" fill="${BRAND_BG}"/>`,
    `  <text x="${MASTER / 2}" y="${textY}" font-family="DejaVu Sans" `,
    `        font-size="160" font-weight="bold" text-anchor="middle" `,
    `        fill="${BRAND_FG}">ido</text>`,
    `  <circle cx="200" cy="56" r="20" fill="${BRAND_FG}" opacity="0.95"/>`,
    `</svg>`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

interface RasterOptions {
  fontDirs: string[];
  defaultFontFamily: string;
}

/**
 * Resolve font directories, preferring known DejaVu locations that exist on
 * Linux CI runners (GitHub Actions `ubuntu-latest` ships fonts-dejavu).
 * If neither directory exists we fall back to resvg's default font loading,
 * which still produces a usable (serif fallback) raster — slightly less
 * brand-consistent but never blocks the build.
 */
function rasterOptions(): RasterOptions {
  const candidates = [
    "/usr/share/fonts/truetype/dejavu",
    "/usr/share/fonts/truetype/ubuntu",
    "/usr/share/fonts/truetype/liberation",
    "/usr/share/fonts/TTF",
  ];
  const fontDirs = candidates.filter((dir) => existsSync(dir));
  return { fontDirs, defaultFontFamily: "DejaVu Sans" };
}

function renderPng(svg: string, size: number, opts: RasterOptions): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    font: {
      loadSystemFonts: true,
      fontDirs: opts.fontDirs,
      defaultFontFamily: opts.defaultFontFamily,
      sansSerifFamily: opts.defaultFontFamily,
    },
  });
  return Buffer.from(resvg.render().asPng());
}

// ---------------------------------------------------------------------------
// ICO encoder (multi-size, PNG-embedded).
// Modern browsers (Chrome 80+, Firefox 55+, Safari 14+) accept PNG-encoded
// frames inside an ICO container. This keeps the encoder trivial: PNG bytes
// are dropped in verbatim after a small directory.
// ---------------------------------------------------------------------------

interface IcoFrame {
  width: number;
  height: number;
  data: Buffer;
}

function encodeIco(frames: IcoFrame[]): Buffer {
  const HEADER = 6;
  const DIR_ENTRY = 16;
  const dirSize = frames.length * DIR_ENTRY;
  let cursor = HEADER + dirSize;

  const offsets: number[] = [];
  for (const frame of frames) {
    offsets.push(cursor);
    cursor += frame.data.length;
  }

  const buf = Buffer.alloc(cursor);

  // ICONDIR
  buf.writeUInt16LE(0, 0); // reserved
  buf.writeUInt16LE(1, 2); // type: 1 = icon
  buf.writeUInt16LE(frames.length, 4); // image count

  // ICONDIRENTRY (one per image)
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const off = HEADER + i * DIR_ENTRY;
    // 0 means "256" in ICO width/height fields.
    buf.writeUInt8(frame.width >= 256 ? 0 : frame.width, off + 0);
    buf.writeUInt8(frame.height >= 256 ? 0 : frame.height, off + 1);
    buf.writeUInt8(0, off + 2); // palette count (0 = no palette)
    buf.writeUInt8(0, off + 3); // reserved
    buf.writeUInt16LE(1, off + 4); // color planes
    buf.writeUInt16LE(32, off + 6); // bits per pixel
    buf.writeUInt32LE(frame.data.length, off + 8); // image data size
    buf.writeUInt32LE(offsets[i], off + 12); // offset from start of file
  }

  // Image data (PNG bytes verbatim).
  for (let i = 0; i < frames.length; i++) {
    frames[i].data.copy(buf, offsets[i]);
  }

  return buf;
}

// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------

function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

function writeAsset(relativePath: string, data: Buffer): void {
  const target = resolve(APP_DIR, relativePath);
  ensureDir(dirname(target));
  writeFileSync(target, data);
  console.log(`  wrote ${relativePath}  (${data.length} bytes)`);
}

function main(): void {
  const opts = rasterOptions();

  console.log("Generating ido-bata icon set…");

  // --- favicon.ico: 16 (simplified "i") + 32 + 48 (full "ido") -----------
  const icoFrames: IcoFrame[] = ICON_SIZES.map((size) => {
    const source = size <= 16 ? smallFaviconSvg() : masterSvg();
    return {
      width: size,
      height: size,
      data: renderPng(source, size, opts),
    };
  });
  writeAsset("favicon.ico", encodeIco(icoFrames));

  // --- src/app/icon.png: 32x32 primary icon ------------------------------
  writeAsset("icon.png", renderPng(masterSvg(), 32, opts));

  // --- src/app/apple-icon.png: 180x180 -----------------------------------
  writeAsset("apple-icon.png", renderPng(appleTouchSvg(), APPLE_TOUCH_SIZE, opts));

  console.log("Done.");
}

main();
