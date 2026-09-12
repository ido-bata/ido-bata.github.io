import Link from "next/link";
import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { css, cx } from "@/styled-system/css";
import { cluster, container } from "@/styles/recipes";

/**
 * Site-wide header.
 *
 * Layout follows Linear's chrome pattern: a hairline separator on the
 * bottom and an end-justified action row. The rail uses
 * `container({ size: "content" })` so the header's inner edge aligns
 * with the page content below — using a wider container here made the
 * chrome read as a separate band instead of being part of the page.
 *
 * The separator uses the `border.hairline` semantic token (low-alpha
 * neutral) instead of `border.subtle` so the chrome recedes into the
 * canvas even when the sticky header applies backdrop-blur. Previously
 * the dark-mode hairline (neutral.900) was bright enough to read as a
 * contrast line against the canvas.
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
 * See Issue #22 (theme), Issue #90 (Ark UI / Discord icon).
 */
export function Header() {
  const invite = DISCORD_INVITE;

  return (
    <header
      className={css({
        width: "100%",
        bg: "bg.canvas",
        borderBottom: "1px solid",
        borderColor: "border.hairline",
        position: "sticky",
        top: "0",
        zIndex: "10",
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

        <div className={cx(cluster({ justify: "end" }))}>
          <ThemeToggle />
          {invite ? (
            <Button
              asChild
              variant="solid"
              size="sm"
              className={css({
                // Brand colour override — Discord Blurple is not part
                // of the theme palette, so we layer the brand colour
                // on top of the recipe output instead of growing the
                // Button API. The hover state uses the documented
                // Blurple-darken so the interaction language stays
                // recognisable.
                background: "#5865f2",
                _hover: { background: "#4752c4" },
              })}
            >
              <a href={invite} target="_blank" rel="noopener noreferrer">
                <DiscordIcon size={16} />
                <span>Discord に参加</span>
              </a>
            </Button>
          ) : (
            // env 未設定時の placeholder — ビルドは壊さないが、デプロイ前に
            // `.env` (または CI シークレット) で NEXT_PUBLIC_DISCORD_INVITE を設定すること。
            <span
              aria-label="Discord 招待リンク未設定"
              className={css({
                display: "inline-flex",
                alignItems: "center",
                gap: "2",
                height: "8",
                px: "3",
                borderRadius: "full",
                fontSize: "xs",
                fontWeight: "medium",
                color: "fg.onAccent",
                background: "rgba(88, 101, 242, 0.4)",
                cursor: "not-allowed",
                opacity: 0.6,
              })}
            >
              <DiscordIcon size={14} />
              <span>Discord に参加</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
