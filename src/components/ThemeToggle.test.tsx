/**
 * Regression tests for ThemeToggle.
 *
 * See Issue #22. The previous `readSnapshot()` minted a fresh object on
 * every call, which made `useSyncExternalStore` think the external store
 * had changed every render and triggered:
 *
 *   "The result of getSnapshot should be cached to avoid an infinite loop"
 *
 * These tests pin the fix in place: rendering must not throw, repeated
 * reads must return the same reference, and stored preferences must
 * surface in the rendered attributes.
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";
import { THEME_STORAGE_KEY } from "@/lib/theme";

describe("ThemeToggle", () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("renders without throwing when localStorage is empty", () => {
    // Without the snapshot cache the React 19 useSyncExternalStore guard
    // fires here. If this test ever starts failing with "The result of
    // getSnapshot should be cached", the cache in ThemeToggle.tsx has
    // regressed.
    expect(() => render(<ThemeToggle />)).not.toThrow();
  });

  it("reflects the stored preference on the rendered button", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const { container } = render(<ThemeToggle />);
    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.getAttribute("data-theme-preference")).toBe("dark");
    expect(button?.getAttribute("data-theme-resolved")).toBe("dark");
  });

  it("renders again on the same module without throwing", () => {
    // useSyncExternalStore calls getSnapshot on every render. The cached
    // snapshot must stay referentially stable across mounts so React
    // does not detect a phantom store change.
    expect(() => {
      render(<ThemeToggle />);
      render(<ThemeToggle />);
    }).not.toThrow();
  });
});
