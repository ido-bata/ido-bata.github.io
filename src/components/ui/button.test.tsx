/**
 * Regression tests for the `Button` primitive.
 *
 * Pins down three contracts:
 *
 *   1. Default render emits a real `<button>` element with the Panda
 *      recipe's className applied (the recipe tokens must reach the
 *      DOM, otherwise Panda tree-shakes them out of the stylesheet).
 *   2. `variant` / `size` props change the rendered className — without
 *      this we lose the ability to style buttons site-wide from a single
 *      recipe.
 *   3. `asChild` cloning wraps the single child element instead of
 *      rendering a `<button>`, and merges our `className` / `onClick`
 *      onto the child rather than dropping them.
 *
 * See Issue #90 / ADR-0002.
 */

import { describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a real <button> by default with the recipe className", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.textContent).toBe("Click me");
    // The recipe className must contain at least one of the tokens
    // we expect on every variant (display: inline-flex, etc.). We
    // assert presence rather than exact match because Panda's hashed
    // class names change between versions.
    expect(button?.className).toBeTruthy();
  });

  it("produces different classNames for different variants", () => {
    const solid = render(<Button variant="solid">solid</Button>).container.querySelector("button");
    const outline = render(<Button variant="outline">outline</Button>).container.querySelector(
      "button",
    );
    const ghost = render(<Button variant="ghost">ghost</Button>).container.querySelector("button");

    expect(solid?.className).not.toEqual(outline?.className);
    expect(outline?.className).not.toEqual(ghost?.className);
    expect(solid?.className).not.toEqual(ghost?.className);
  });

  it("produces different classNames for different sizes", () => {
    const sm = render(<Button size="sm">sm</Button>).container.querySelector("button");
    const lg = render(<Button size="lg">lg</Button>).container.querySelector("button");

    expect(sm?.className).not.toEqual(lg?.className);
  });

  it("forwards onClick handlers to the underlying button", () => {
    const onClick = vi.fn();
    const { container } = render(<Button onClick={onClick}>Click me</Button>);
    const button = container.querySelector("button");
    button?.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("asChild", () => {
    it("renders the child element instead of a <button>", () => {
      const { container } = render(
        <Button asChild variant="solid">
          <a href="https://example.com">External link</a>
        </Button>,
      );
      // asChild should yield an <a>, not a <button>.
      expect(container.querySelector("button")).toBeNull();
      const anchor = container.querySelector("a");
      expect(anchor).not.toBeNull();
      expect(anchor?.getAttribute("href")).toBe("https://example.com");
      expect(anchor?.textContent).toBe("External link");
    });

    it("merges our className onto the child", () => {
      const { container } = render(
        <Button asChild variant="outline" className="custom-class">
          <a href="/foo">foo</a>
        </Button>,
      );
      const anchor = container.querySelector("a");
      expect(anchor).not.toBeNull();
      // The recipe's className must still be present (so styling
      // survives the clone), and our consumer-supplied className must
      // also be merged on.
      expect(anchor?.className).toContain("custom-class");
      expect(anchor?.className.split(/\s+/).length).toBeGreaterThan(1);
    });

    it("forwards onClick onto the wrapped child", () => {
      const onClick = vi.fn();
      const { container } = render(
        <Button asChild onClick={onClick}>
          <a href="/foo">foo</a>
        </Button>,
      );
      const anchor = container.querySelector("a");
      anchor?.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
