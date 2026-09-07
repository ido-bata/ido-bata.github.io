/**
 * PostCSS configuration.
 *
 * Panda CSS is a PostCSS-based engine: it scans source files at build time
 * and emits a static CSS layer alongside the generated `styled-system/`
 * runtime helpers. No runtime CSS-in-JS overhead.
 *
 * Refs:
 *   - panda.config.ts
 *   - docs/architecture.md#デザインシステム
 */
module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {},
  },
};
