/**
 * Unit tests for theme persistence helpers.
 *
 * Pure-function surface only: we do not mount React here. The DOM-side
 * behaviour (the inline FOUC script, the toggle button) is exercised by
 * the smoke test in `src/app/page.test.tsx` and by manual preview.
 *
 * See Issue #22.
 */

import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  applyTheme,
  nextPreference,
  PREFERENCE_LABEL,
  readStoredPreference,
  readSystemTheme,
  resolveTheme,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  writeStoredPreference,
} from "./theme";
import type { ThemePreference } from "./theme.types";

function makeStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map<string, string>(Object.entries(initial));
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (k) => (data.has(k) ? (data.get(k) as string) : null),
    key: (i) => Array.from(data.keys())[i] ?? null,
    removeItem: (k) => {
      data.delete(k);
    },
    setItem: (k, v) => {
      data.set(k, String(v));
    },
  };
}

describe("theme persistence", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("nextPreference", () => {
    it("cycles light -> dark -> system -> light", () => {
      expect(nextPreference("light")).toBe("dark");
      expect(nextPreference("dark")).toBe("system");
      expect(nextPreference("system")).toBe("light");
    });
  });

  describe("resolveTheme", () => {
    it("returns the concrete preference when not 'system'", () => {
      expect(resolveTheme("light", "dark")).toBe("light");
      expect(resolveTheme("dark", "light")).toBe("dark");
    });

    it("falls back to the system theme when preference is 'system'", () => {
      expect(resolveTheme("system", "light")).toBe("light");
      expect(resolveTheme("system", "dark")).toBe("dark");
    });
  });

  describe("readStoredPreference", () => {
    it("returns the stored value when valid", () => {
      const cases: ThemePreference[] = ["light", "dark", "system"];
      for (const value of cases) {
        const storage = makeStorage({ [THEME_STORAGE_KEY]: value });
        expect(readStoredPreference(storage)).toBe(value);
      }
    });

    it("defaults to 'system' when storage is missing", () => {
      expect(readStoredPreference(null)).toBe("system");
    });

    it("defaults to 'system' when the stored value is unrecognised", () => {
      const storage = makeStorage({ [THEME_STORAGE_KEY]: "fuchsia" });
      expect(readStoredPreference(storage)).toBe("system");
    });
  });

  describe("writeStoredPreference", () => {
    it("persists the value under the versioned key", () => {
      const storage = makeStorage();
      writeStoredPreference(storage, "dark");
      expect(storage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    });

    it("is a no-op when storage is unavailable", () => {
      expect(() => writeStoredPreference(null, "dark")).not.toThrow();
    });

    it("swallows quota / disabled-storage errors", () => {
      const storage: Storage = makeStorage();
      vi.spyOn(storage, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });
      expect(() => writeStoredPreference(storage, "light")).not.toThrow();
    });
  });

  describe("readSystemTheme", () => {
    it("returns 'light' when window.matchMedia is unavailable", () => {
      // happy-dom ships matchMedia, so simulate its absence by stubbing
      // the function off the global window object.
      const original = window.matchMedia;
      delete (window as { matchMedia?: unknown }).matchMedia;
      try {
        expect(readSystemTheme()).toBe("light");
      } finally {
        window.matchMedia = original;
      }
    });
  });

  describe("applyTheme", () => {
    it("writes the resolved theme to the html element", () => {
      // happy-dom exposes document.documentElement; build a tiny stub for
      // environments where it does not.
      const setAttribute = vi.fn();
      const fakeDocument = {
        documentElement: { setAttribute },
      } as unknown as Document;
      applyTheme(fakeDocument, "dark");
      expect(setAttribute).toHaveBeenCalledWith(THEME_ATTRIBUTE, "dark");
    });

    it("is a no-op when no document is provided", () => {
      expect(() => applyTheme(null, "light")).not.toThrow();
    });
  });

  describe("PREFERENCE_LABEL", () => {
    it("has a label for every preference", () => {
      const preferences: ThemePreference[] = ["light", "dark", "system"];
      for (const value of preferences) {
        expect(PREFERENCE_LABEL[value]).toBeTruthy();
      }
    });
  });
});
