import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Brand fonts.
 *
 * Each font is registered as a CSS variable on `<html>` and consumed
 * by Panda's `fonts.sans` / `fonts.display` tokens (see
 * `panda.config.mjs`). Keeping the loader here and the consumer in
 * Panda means every component can pick the right face via a token
 * without re-importing next/font.
 *
 *  - Noto Sans JP — body copy (high legibility for mixed JP / Latin)
 *  - Zen Kaku Gothic New — headings (geometric, heavier display voice)
 *
 * `display: "swap"` keeps text visible during font load so the FCP
 * is not blocked by the network round-trip.
 *
 * Material Icons (the icon font) is not in `next/font/google`'s
 * bundled font catalogue, so it is loaded via a CDN `<link>` in
 * `<head>` below. The `.material-icons` class is registered in
 * `panda.config.mjs#globalCss`; ligatures in span text drive the
 * glyph.
 */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ido-bata",
  description: "ido-bata コミュニティの公式ポータル。",
};

/**
 * Inline FOUC-prevention script for theme switching.
 *
 * Runs synchronously in `<head>` before any paint so the page never
 * flashes the wrong colour scheme. Reads the saved preference from
 * `localStorage`, falls back to `prefers-color-scheme`, and writes the
 * resolved theme onto `<html data-theme="...">`. The Panda semantic
 * tokens with the `_darkTheme` / `_lightTheme` conditions then match
 * instantly when CSS is parsed.
 *
 * Kept as a plain string literal (no JSX, no closures) so the bundler
 * ships it verbatim and the browser can execute it without parsing a
 * module graph. `suppressHydrationWarning` on `<html>` silences React's
 * expected mismatch warning when this script mutates the attribute the
 * server originally rendered.
 *
 * The logic mirrors `src/lib/theme.ts` — keep them in sync.
 *
 * See Issue #22.
 */
const themeBootstrapScript = `
(function () {
  try {
    var KEY = 'ido-bata:theme:v1';
    var ATTR = 'data-theme';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { stored = null; }
    var pref = (stored === 'light' || stored === 'dark' || stored === 'system')
      ? stored
      : 'system';
    var systemTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';
    var resolved = pref === 'system' ? systemTheme : pref;
    document.documentElement.setAttribute(ATTR, resolved);
  } catch (e) {
    /* localStorage / matchMedia unavailable — leave the SSR attribute as-is */
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      data-theme="light"
      suppressHydrationWarning
      className={`${notoSansJP.variable} ${zenKakuGothicNew.variable}`}
    >
      <head>
        {/* Material Icons is not in next/font/google's bundled font
            catalogue, so we load it from the Google Fonts CDN here.
            This is the standard pattern for icon fonts and stays in
            the document head so the icon system is ready before the
            first paint. */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
