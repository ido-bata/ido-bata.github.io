"use client";

/**
 * Theme toggle button.
 *
 * Cycles the persisted theme preference through light -> dark -> system
 * on each click, then writes the resolved (concrete) theme to the
 * `<html data-theme="...">` attribute that Panda CSS conditions match
 * against. The FOUC-prevention script in `layout.tsx` already set the
 * attribute before paint, so the toggle's job is just to keep state in
 * sync after hydration.
 *
 * The button itself is rendered through the project-wide `Button`
 * primitive (`src/components/ui/button.tsx`), which wraps Ark UI's
 * `ark.button` factory with the Panda `button` recipe. Going through
 * the primitive keeps a single a11y / focus / keyboard story across
 * the site and means the Panda recipe is consumed by a real component
 * so the dark-mode semantic tokens get compiled into the stylesheet —
 * without a runtime consumer Panda tree-shakes them out.
 *
 * Theme state is read with `useSyncExternalStore` against
 * `localStorage`, the OS `prefers-color-scheme` media query, and a
 * `storage` event listener. That is the canonical pattern for external
 * mutable state and avoids `setState` inside `useEffect` (which the
 * React Compiler's static analysis flags as a cascading-render risk).
 *
 * See Issue #22 (theme switching) and Issue #90 (Ark UI adoption).
 */

import { useCallback, useSyncExternalStore } from "react";
import {
  nextPreference,
  PREFERENCE_LABEL,
  readStoredPreference,
  readSystemTheme,
  resolveTheme,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  writeStoredPreference,
  applyTheme,
} from "@/lib/theme";
import type { ResolvedTheme, ThemePreference } from "@/lib/theme.types";
import { Button } from "@/components/ui/button";
import { css } from "@/styled-system/css";

interface ThemeSnapshot {
  preference: ThemePreference;
  resolved: ResolvedTheme;
}

const SERVER_SNAPSHOT: ThemeSnapshot = Object.freeze({
  preference: "system",
  resolved: "light",
}) as ThemeSnapshot;

/**
 * Cache the last client snapshot so `useSyncExternalStore` sees a stable
 * reference until the underlying preference or resolved theme actually
 * changes. Without this, `readSnapshot` would mint a new object on every
 * call and React 19 would throw "The result of getSnapshot should be
 * cached to avoid an infinite loop".
 *
 * Module-scoped state is safe here: this module is loaded once per
 * browser tab and the cache is invalidated by the value identity check
 * below, not by reference equality.
 */
let cachedSnapshot: ThemeSnapshot | null = null;

function subscribe(notify: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const mq =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  const onMqChange = () => notify();
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) notify();
  };
  mq?.addEventListener("change", onMqChange);
  window.addEventListener("storage", onStorage);
  return () => {
    mq?.removeEventListener("change", onMqChange);
    window.removeEventListener("storage", onStorage);
  };
}

function readSnapshot(): ThemeSnapshot {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  const preference = readStoredPreference(window.localStorage);
  const resolved = resolveTheme(preference, readSystemTheme());
  if (
    cachedSnapshot !== null &&
    cachedSnapshot.preference === preference &&
    cachedSnapshot.resolved === resolved
  ) {
    return cachedSnapshot;
  }
  cachedSnapshot = Object.freeze({ preference, resolved }) as ThemeSnapshot;
  return cachedSnapshot;
}

/** Inline sun/moon/glyph — no extra asset, no flash, no extra request. */
function Glyph({ theme }: { theme: ThemePreference }) {
  if (theme === "light") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (theme === "dark") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

export function ThemeToggle() {
  // useSyncExternalStore handles SSR (returns SERVER_SNAPSHOT) and
  // re-renders when the OS theme or localStorage value changes.
  const { preference, resolved } = useSyncExternalStore(
    subscribe,
    readSnapshot,
    () => SERVER_SNAPSHOT,
  );

  const onClick = useCallback(() => {
    const next = nextPreference(preference);
    writeStoredPreference(window.localStorage, next);
    applyTheme(document, resolveTheme(next, readSystemTheme()));
    // Notify same-window subscribers (storage event only fires cross-tab).
    window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY }));
  }, [preference]);

  const label = `Theme: ${PREFERENCE_LABEL[preference]} (${PREFERENCE_LABEL[resolved]})`;
  const nextLabel = PREFERENCE_LABEL[nextPreference(preference)];

  return (
    <Button
      type="button"
      variant="outline"
      size="md"
      onClick={onClick}
      aria-label={label}
      title={`Switch theme (next: ${nextLabel})`}
      data-theme-preference={preference}
      data-theme-resolved={resolved}
      data-theme-attr={THEME_ATTRIBUTE}
      // ThemeToggle's chip has a fixed square footprint for the icon;
      // override the recipe's px="4" with px="3" and the auto-width
      // with minWidth so the button stays the same shape regardless of
      // the active preference label.
      className={css({
        minWidth: "10",
        px: "3",
      })}
    >
      <Glyph theme={preference} />
      <span aria-hidden="true">{PREFERENCE_LABEL[preference]}</span>
    </Button>
  );
}
