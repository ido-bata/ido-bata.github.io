import Link from "next/link";
import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DiscordJoinButton } from "@/components/DiscordJoinButton";
import { PRIMARY_NAV_LINKS } from "@/content/nav";
import { css, cx } from "@/styled-system/css";
import { cluster, container } from "@/styles/recipes";

/**
 * Site-wide header.
 *
 * Layout follows Linear's chrome pattern: an end-justified action row
 * and the rail uses `container({ size: "content" })` so the header's
 * inner edge aligns with the page content below — using a wider
 * container here made the chrome read as a separate band instead of
 * being part of the page.
 *
 * No bottom border — the chrome separates itself from the page via
 * the sticky `backdropFilter: blur` + opaque `bg.canvas` background,
 * not a hairline rule. At scroll position 0 there's nothing behind
 * the header for the blur to grab onto, so on landing pages the
 * header reads as a flat band until the user scrolls. The trade-off
 * is intentional — the prior `border.hairline` separator read as a
 * heavy contrast line, especially in dark mode.
 *
 * Mobile nav: the primary nav (`PRIMARY_NAV_LINKS`) is visible from
 * `md` up; on phones the Footer carries the same routes, so nothing
 * is unreachable from a small viewport. If we later add a hamburger
 * menu / drawer, drop the breakpoint back to `lg` and route the
 * trigger through the cluster.
 *
 * The home-link mark is the actual server icon (`/ido-bata-icon.jpg`)
 * rendered as a 32px circular avatar with a hairline border — the
 * same asset and shape treatment the footer brand block uses, so the
 * chrome at the top of the page and the brand stamp at the bottom
 * read as the same mark. The icon is decorative here (the link's
 * accessible name is "ido-bata トップへ戻る" so screen readers don't
 * announce the empty alt).
 *
 * The Discord CTA keeps Discord Blurple as a brand override because
 * the brand colour is not part of the theme palette; the white text
 * and white icon come from `currentColor` flowing through the
 * inline `DiscordIcon` SVG (so it actually picks up the button's
 * `accent.fg` token — `<Image src="*.svg">` does not honour
 * `currentColor`).
 *
 * The CTA label is "Discord に参加" rather than "ido-bata に参加":
 * "ido-bata" is the organisation, not a Discord handle, so framing
 * it as a joinable user reads wrong. The CTA points at Discord; the
 * label describes that target.
 *
 * When `DISCORD_INVITE` is unset (local dev, missing CI secret,
 * freshly-cloned repo) the CTA is replaced by a non-interactive
 * labelled placeholder so the missing env var is visible rather
 * than silently disappearing from the DOM. Set
 * `NEXT_PUBLIC_DISCORD_INVITE` in `.env.local`.
 *
 * See Issue #22 (theme), Issue #90 (Ark UI / Discord icon).
 */
export function Header() {
  return (
    <header
      className={css({
        width: "100%",
        bg: "bg.canvas",
        position: "sticky",
        top: "0",
        zIndex: "100",
        backdropFilter: "saturate(180%) blur(8px)",
      })}
    >
      <div
        className={cx(
          container({ size: "content" }),
          css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4",
            py: "3",
          }),
        )}
      >
        <Link
          href="/"
          aria-label="ido-bata トップへ戻る"
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "2",
            color: "fg.DEFAULT",
            textDecoration: "none",
            fontWeight: "semibold",
            letterSpacing: "-0.01em",
          })}
        >
          <Image
            src="/ido-bata-icon.jpg"
            alt=""
            width={32}
            height={32}
            className={css({
              width: "8",
              height: "8",
              borderRadius: "full",
              border: "1px solid",
              borderColor: "border.subtle",
              flexShrink: 0,
            })}
          />
          <span className={css({ fontSize: "md" })}>ido-bata</span>
        </Link>

        <nav
          aria-label="主なページ"
          className={css({
            display: { base: "none", md: "flex" },
            alignItems: "center",
            gap: "4",
            marginLeft: "auto",
          })}
        >
          {PRIMARY_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={css({
                color: "fg.muted",
                fontSize: "sm",
                textDecoration: "none",
                borderRadius: "sm",
                _hover: { color: "fg.DEFAULT" },
                _focusVisible: {
                  outline: "2px solid",
                  outlineColor: "accent.DEFAULT",
                  outlineOffset: "2px",
                },
              })}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={cx(cluster({ justify: "end" }))}>
          <ThemeToggle />
          {DISCORD_INVITE ? (
            <DiscordJoinButton href={DISCORD_INVITE} label="Discord に参加" size="sm" />
          ) : (
            <span
              aria-label="Discord 招待リンク未設定"
              className={css({
                fontSize: "xs",
                color: "fg.subtle",
                paddingX: "3",
                paddingY: "2",
                border: "1px dashed",
                borderColor: "border.subtle",
                borderRadius: "full",
              })}
            >
              Discord 招待リンク未設定
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
