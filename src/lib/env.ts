/**
 * Typed access to public (browser-exposed) environment variables.
 *
 * NOTE: This project uses `output: "export"` (see `next.config.ts`),
 * so `NEXT_PUBLIC_*` values are **inlined at build time** into the JS bundle
 * and the deployed HTML. Changing them after `next build` has no effect
 * on already-built artifacts — redeploy after editing `.env*`.
 */

/**
 * Discord server invite URL surfaced in the Header / Footer CTA.
 *
 * Empty string / undefined => components render a placeholder or hide the
 * CTA entirely so the build never breaks when the env var is missing.
 */
export const DISCORD_INVITE: string | undefined = (() => {
  const raw = process.env.NEXT_PUBLIC_DISCORD_INVITE;
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
})();
