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
 * The single source of truth is `public/ido-bata-icon.jpg` — a 640x640
 * JPEG provided by the project owner. We resize it to each target edge
 * length with `sharp` (libvips-backed), preferring JPEG-source fidelity
 * over the previous SVG-wordmark pipeline (`@resvg/resvg-js`) so the
 * brand mark stays consistent across web tab favicon, app shortcut,
 * and apple-touch-icon slots.
 *
 * Re-run with `bun scripts/gen-icons.ts` whenever the brand mark changes.
 *
 * Why sharp (vs. the previous SVG pipeline):
 *   - The provided brand mark is a raster (JPEG), so resvg can no longer
 *     be the source of truth. Resvg is for SVG → PNG/ICO.
 *   - Sharp is already a transitive dependency of `next` (used for the
 *     image optimization runtime), and it is the canonical Node.js
 *     image processing library. Declaring it explicitly in
 *     `devDependencies` keeps the script reproducible on fresh installs
 *     and decouples it from Next's internal version bumps.
 *   - ICO frames are embedded as PNG (modern browsers accept PNG-encoded
 *     ICO since Chrome 80 / Firefox 55 / Safari 14). See `encodeIco`.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const HERE = dirname(fileURLToPath(import.meta.url));
// scripts/ lives at <repo>/scripts, source asset at <repo>/public, output at <repo>/src/app.
const REPO_ROOT = resolve(HERE, "..");
const SOURCE = resolve(REPO_ROOT, "public/ido-bata-icon.jpg");
const APP_DIR = resolve(REPO_ROOT, "src/app");

/**
 * Output sizes (square edge in pixels).
 *
 *  - 16/32/48 → bundled into multi-size favicon.ico for legacy browsers.
 *  - 32      → Next.js `src/app/icon.png` (auto <link rel="icon">).
 *  - 180     → Next.js `src/app/apple-icon.png` (apple-touch-icon).
 */
const ICON_SIZES = [16, 32, 48] as const;
const ICON_PNG_SIZE = 32;
const APPLE_TOUCH_SIZE = 180;

// ---------------------------------------------------------------------------
// Source validation
// ---------------------------------------------------------------------------

function assertSource(): void {
  if (!existsSync(SOURCE)) {
    throw new Error(
      `Source icon not found: ${SOURCE}\n` +
        `Drop the brand JPEG at public/ido-bata-icon.jpg (square, ≥ 512px).`,
    );
  }
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/**
 * Resize the JPEG source to `size x size` PNG. `fit: "cover"` keeps the
 * square aspect without distortion; the source is already square so the
 * cover strategy is purely defensive.
 *
 * `ensureAlpha()` forces a full alpha channel into the output even when
 * the source is opaque RGB. PNG-encoded ICO frames require RGBA — the
 * browser-side ICO decoder rejects RGB-only frames with "The PNG is not
 * in RGBA format!" (caught once during v0.3.0 build verification).
 */
async function renderPng(size: number): Promise<Buffer> {
  return sharp(SOURCE).resize(size, size, { fit: "cover" }).ensureAlpha().png().toBuffer();
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

async function main(): Promise<void> {
  assertSource();

  console.log("Generating ido-bata icon set from public/ido-bata-icon.jpg…");

  // --- favicon.ico: 16 + 32 + 48 frames ----------------------------------
  const icoFrames: IcoFrame[] = await Promise.all(
    ICON_SIZES.map(async (size) => ({
      width: size,
      height: size,
      data: await renderPng(size),
    })),
  );
  writeAsset("favicon.ico", encodeIco(icoFrames));

  // --- src/app/icon.png: 32x32 primary icon ------------------------------
  writeAsset("icon.png", await renderPng(ICON_PNG_SIZE));

  // --- src/app/apple-icon.png: 180x180 -----------------------------------
  writeAsset("apple-icon.png", await renderPng(APPLE_TOUCH_SIZE));

  console.log("Done.");
}

await main();
