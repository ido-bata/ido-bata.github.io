import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import { css } from "@/styled-system/css";

/**
 * Site-wide footer.
 *
 * Styled with Panda CSS semantic tokens (`bg.canvas`, `border`,
 * `fg.muted`) so the surface follows the active theme and matches the
 * Header. The previous CSS-module implementation used an undefined
 * `var(--background, #ffffff)` and a hardcoded mid-grey border that
 * left the footer looking like a floating white block in dark mode.
 *
 * See Issue #22.
 */
export function Footer() {
  const invite = DISCORD_INVITE;

  return (
    <footer
      className={css({
        width: "100%",
        bg: "bg.canvas",
        borderTop: "1px solid",
        borderColor: "border",
        marginTop: "auto",
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
          flexWrap: "wrap",
        })}
      >
        {invite ? (
          <a
            href={invite}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "2",
              color: "fg",
              textDecoration: "none",
              fontSize: "sm",
              transition: "colors",
              _hover: { textDecoration: "underline" },
            })}
          >
            <Image
              src="/discord.svg"
              alt=""
              width={18}
              height={18}
              className={css({ width: "4.5", height: "4.5" })}
              aria-hidden="true"
            />
            <span>Discord サーバーはこちら</span>
          </a>
        ) : (
          <span
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "2",
              color: "fg.muted",
              fontSize: "sm",
              cursor: "not-allowed",
              opacity: 0.6,
            })}
          >
            <Image
              src="/discord.svg"
              alt=""
              width={18}
              height={18}
              className={css({ width: "4.5", height: "4.5" })}
              aria-hidden="true"
            />
            <span>Discord 招待リンク未設定</span>
          </span>
        )}
        <span
          className={css({
            fontSize: "0.8125rem",
            color: "fg.muted",
            opacity: 0.7,
          })}
        >
          © ido-bata
        </span>
      </div>
    </footer>
  );
}
