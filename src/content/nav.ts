/**
 * Site navigation data (single source of truth).
 *
 * The Header uses `PRIMARY_NAV_LINKS` (the three main routes above the
 * fold). The Footer uses `SITE_LINKS` (a superset that includes the
 * utility routes that don't fit in the header chrome). Sharing both
 * via this module means a route rename only has to land in one place
 * — Header and Footer can't drift apart.
 *
 * On mobile (below `md`) the Header hides its primary nav and the
 * Footer serves as the route map instead, so `SITE_LINKS` is the
 * authoritative list of "where you can get to from anywhere."
 */

export type NavLink = {
  href: string;
  label: string;
};

export const PRIMARY_NAV_LINKS: readonly NavLink[] = [
  { href: "/activities/idobata-time", label: "底力タイム" },
  { href: "/projects", label: "プロジェクト" },
  { href: "/channels", label: "チャネル" },
];

export const SITE_LINKS: readonly NavLink[] = [
  { href: "/welcome", label: "初めての方へ" },
  ...PRIMARY_NAV_LINKS,
  { href: "/about", label: "About" },
];
