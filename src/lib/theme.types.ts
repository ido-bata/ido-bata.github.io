/**
 * Theme types shared between the FOUC script, the toggle component, and
 * the persistence helper module. Kept in its own file so the inline
 * `<script>` shipped from `layout.tsx` does not need to bundle the
 * implementation — it only consumes these strings via a serialised JSON
 * blob.
 *
 * See Issue #22.
 */

/** Concrete paint-time theme. */
export type Theme = "light" | "dark";

/** Same union, re-exported under the resolved name for clarity at call sites. */
export type ResolvedTheme = Theme;

/** What the user can pick. `"system"` means "follow the OS". */
export type ThemePreference = Theme | "system";
