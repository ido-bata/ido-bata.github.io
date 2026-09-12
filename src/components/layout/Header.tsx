import Link from "next/link";
import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import { ThemeToggle } from "@/components/ThemeToggle";
import { css } from "@/styled-system/css";

/**
 * Site-wide header.
 *
 * Styled with Panda CSS semantic tokens so the surface picks up the
 * active theme automatically (light / dark). The header background
 * matches `body` (`bg.canvas`) so it does not float as a contrasting
 * stripe in dark mode — the previous CSS-module implementation used
 * `var(--background, #ffffff)` and fell back to white in dark mode,
 * which produced the visual mismatch reported on v0.3.0.
 *
 * The Discord CTA keeps the brand Blurple (`#5865f2`) because it is a
 * brand colour, not a theme token; the white text uses the
 * `fg.onAccent` semantic token so it stays white in both themes.
 *
 * See Issue #22.
 */
export function Header() {
  const invite = DISCORD_INVITE;

  return (
    <header
      className={css({
        width: "100%",
        bg: "bg.canvas",
        borderBottom: "1px solid",
        borderColor: "border",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "16px 24px",
          gap: "16px",
        })}
      >
        <Link
          href="/"
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "2",
            color: "fg",
            textDecoration: "none",
            fontWeight: "semibold",
          })}
        >
          <span
            className={css({
              fontSize: "lg",
              letterSpacing: "-0.01em",
            })}
          >
            ido-bata
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "3",
          })}
        >
          <ThemeToggle />
          {invite ? (
            <a
              href={invite}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2",
                height: "10",
                padding: "0 16px",
                borderRadius: "full",
                fontSize: "sm",
                fontWeight: "medium",
                color: "fg.onAccent",
                background: "#5865f2", // Discord Blurple (brand colour)
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "colors",
                cursor: "pointer",
                _hover: { background: "#4752c4" },
              })}
            >
              <Image
                src="/discord.svg"
                alt=""
                width={20}
                height={20}
                className={css({ width: "5", height: "5" })}
                aria-hidden="true"
              />
              <span>ido-bata に参加</span>
            </a>
          ) : (
            // env 未設定時の placeholder — ビルドは壊さないが、デプロイ前に
            // `.env` (または CI シークレット) で NEXT_PUBLIC_DISCORD_INVITE を設定すること。
            <span
              aria-label="Discord 招待リンク未設定"
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2",
                height: "10",
                padding: "0 16px",
                borderRadius: "full",
                fontSize: "sm",
                fontWeight: "medium",
                color: "fg.onAccent",
                background: "rgba(88, 101, 242, 0.4)", // Discord Blurple @ 40% (brand)
                whiteSpace: "nowrap",
                cursor: "not-allowed",
                opacity: 0.6,
              })}
            >
              <Image
                src="/discord.svg"
                alt=""
                width={20}
                height={20}
                className={css({ width: "5", height: "5" })}
                aria-hidden="true"
              />
              <span>ido-bata に参加</span>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
