import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ido-bata（いど端）",
  description:
    "ido-bata（いど端）は、クリエイターとエンジニアのための実利 Discord コミュニティの公式ポータルです。",
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
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
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
