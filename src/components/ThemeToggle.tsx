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
import { MaterialIcon } from "@/components/ui/MaterialIcon";
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
  // OS 連動テーマ選択中 (`preference === "system"`) に OS の light / dark を
  // 切り替えると、保存された preference は変わらないが解決される `resolved`
  // theme が変わる。`notify()` だけだとラベルは更新されるが `<html data-theme>`
  // 属性は前の値のままなので、Panda の `_darkTheme` / `_lightTheme` 条件が
  // 新しい配色に切り替わらない。`applyTheme()` を先に走らせてから `notify()`
  // することで DOM 状態と React state を整合させる。
  const reapplyAndNotify = () => {
    const preference = readStoredPreference(window.localStorage);
    applyTheme(document, resolveTheme(preference, readSystemTheme()));
    notify();
  };
  const onMqChange = () => reapplyAndNotify();
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) reapplyAndNotify();
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

/**
 * Theme preference glyph.
 *
 * Renders through the Material Icons font so the toggle matches the
 * site's icon system and doesn't ship extra SVGs. The ligature name
 * (`light_mode`, `dark_mode`, `settings_brightness`) is what
 * Material Icons substitutes into the glyph — no `<svg>` required.
 */
function Glyph({ theme }: { theme: ThemePreference }) {
  if (theme === "light") return <MaterialIcon name="light_mode" size={18} />;
  if (theme === "dark") return <MaterialIcon name="dark_mode" size={18} />;
  return <MaterialIcon name="settings_brightness" size={18} />;
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
