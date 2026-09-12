/**
 * Theme persistence helpers.
 *
 * The site supports three effective themes ("light" / "dark" / "system"),
 * but only two ever paint on screen: the user choice either resolves to
 * a concrete theme or falls back to the OS `prefers-color-scheme`. The
 * third value ("system") is what we persist when the user has not made
 * an explicit choice — that way the next page load still picks up OS
 * changes without us overwriting it on every navigation.
 *
 * See Issue #22.
 */

import type { Theme, ResolvedTheme, ThemePreference } from "./theme.types";

export type { Theme, ResolvedTheme, ThemePreference } from "./theme.types";

/** localStorage key. Bumping the version invalidates old saved values. */
export const THEME_STORAGE_KEY = "ido-bata:theme:v1";

/** HTML attribute the FOUC script and toggle both read/write. */
export const THEME_ATTRIBUTE = "data-theme";

/** Plain-language labels for the three preferences. */
export const PREFERENCE_LABEL: Readonly<Record<ThemePreference, string>> = Object.freeze({
  light: "Light",
  dark: "Dark",
  system: "System",
});

/**
 * Cycle through the three preferences. Used by the toggle button so each
 * click advances light -> dark -> system -> light ...
 */
export function nextPreference(current: ThemePreference): ThemePreference {
  switch (current) {
    case "light":
      return "dark";
    case "dark":
      return "system";
    case "system":
      return "light";
  }
}

/**
 * Resolve a user preference to a concrete theme by consulting the OS
 * `prefers-color-scheme` media query when needed.
 */
export function resolveTheme(preference: ThemePreference, systemTheme: Theme): ResolvedTheme {
  return preference === "system" ? systemTheme : preference;
}

/** Read the OS preference. Safe to call on the server (returns "light"). */
export function readSystemTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Safely access `window.localStorage`.
 *
 * In some sandboxed contexts — Safari "Block all cookies", certain
 * cross-origin iframes, hardened enterprise policies — accessing
 * `window.localStorage` itself throws `SecurityError` rather than
 * returning a `null`-ish storage. `readStoredPreference` /
 * `writeStoredPreference` only guard against a `null` storage, so the
 * throw bubbles up through the toggle and crashes the page. Wrap the
 * property access in a try/catch here so call sites can treat
 * "unavailable" as a single `null` case.
 */
export function tryGetLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Read the persisted preference. Returns "system" if nothing is saved. */
export function readStoredPreference(storage: Storage | null): ThemePreference {
  if (!storage) return "system";
  try {
    const raw = storage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") {
      return raw;
    }
  } catch {
    // Storage became unavailable between the availability probe and
    // the actual read (rare race, but treat it the same as missing).
    return "system";
  }
  return "system";
}

/** Persist a preference. No-op when storage is unavailable. */
export function writeStoredPreference(storage: Storage | null, preference: ThemePreference): void {
  if (!storage) return;
  try {
    storage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage may be disabled (private mode, quota, SecurityError on
    // setItem). Fail silently so a misconfigured browser doesn't crash
    // the page — the in-memory theme still works for the current session.
  }
}

/**
 * Apply the resolved theme to `<html>` by setting the `data-theme`
 * attribute. The Panda CSS `_darkTheme` / `_lightTheme` conditions then
 * swap every semantic token in one frame.
 */
export function applyTheme(documentRef: Document | null, theme: ResolvedTheme): void {
  if (!documentRef) return;
  documentRef.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}
