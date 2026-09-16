import Image from "next/image";
import Link from "next/link";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, stack } from "@/styles/recipes";
import { DiscordJoinButton } from "@/components/DiscordJoinButton";
import { ADMINISTRATOR, CONTRIBUTION_LINKS } from "@/content/community";
import { DISCORD_INVITE } from "@/lib/env";

const headingStyle = css({
  fontSize: "xs",
  fontWeight: "medium",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "fg.subtle",
});

const linkStyle = css({
  color: "fg.muted",
  fontSize: "sm",
  textDecoration: "none",
  lineHeight: "relaxed",
  _hover: { color: "fg.DEFAULT", textDecoration: "underline" },
});

const SITE_LINKS = [
  { href: "/welcome", label: "初めての方へ" },
  { href: "/projects", label: "プロジェクト" },
  { href: "/channels", label: "チャネル" },
  { href: "/about", label: "About" },
] as const;

export function Footer() {
  return (
    <footer
      className={css({
        width: "100%",
        marginTop: "auto",
        borderTop: "1px solid",
        borderColor: "border.hairline",
        bg: "bg.canvas",
      })}
    >
      <div
        className={cx(
          container({ size: "content" }),
          css({ paddingTop: { base: "10", md: "14" }, paddingBottom: "6" }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }), css({ alignItems: "start" }))}>
          {/* Brand — pinned to span 4 (left rail) so it reads as the
              primary identity column. The three navigation columns
              share span 8 via an internal 3-col grid (each ~equal),
              so the four columns actually feel like a grid rather
              than four arbitrary widths. */}
          <div
            className={cx(
              stack({ gap: 4 }),
              css({ gridColumn: { base: "1", sm: "span 6", md: "span 4" } }),
            )}
          >
            <div className={cx(cluster({ gap: 3 }))}>
              <Image
                src="/ido-bata-icon.jpg"
                alt=""
                width={48}
                height={48}
                className={css({ width: "12", height: "12", borderRadius: "full" })}
              />
              <div>
                <p className={css({ fontSize: "lg", fontWeight: "bold", color: "fg.DEFAULT" })}>
                  ido-bata
                </p>
                <span
                  className={css({
                    fontSize: "xs",
                    color: "fg.muted",
                    fontFamily: "mono",
                  })}
                >
                  Discord community · 井戸端色の実験場
                </span>
              </div>
            </div>
            <p
              className={css({
                maxW: "30ch",
                color: "fg.muted",
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              つくる途中を持ち寄り、制作や開発を前へ進めるDiscordサーバー。
            </p>
            {DISCORD_INVITE ? (
              <DiscordJoinButton href={DISCORD_INVITE} label="Discordに参加" size="sm" />
            ) : null}
          </div>

          {/* Navigation — three equal sub-columns inside span 8 */}
          <div
            className={css({
              gridColumn: { base: "1", sm: "span 6", md: "span 8" },
              display: "grid",
              gridTemplateColumns: {
                base: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: "6",
            })}
          >
            <nav aria-label="サイト案内" className={cx(stack({ gap: 4 }))}>
              <p className={headingStyle}>Explore</p>
              <ul
                className={cx(stack({ gap: 3 }), css({ listStyle: "none", margin: 0, padding: 0 }))}
              >
                {SITE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkStyle}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="サイトへの参加" className={cx(stack({ gap: 4 }))}>
              <p className={headingStyle}>Contribute</p>
              <ul
                className={cx(stack({ gap: 3 }), css({ listStyle: "none", margin: 0, padding: 0 }))}
              >
                {CONTRIBUTION_LINKS.map((link) => (
                  <li key={link.kind}>
                    <a href={link.href} target="_blank" rel="noreferrer" className={linkStyle}>
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={cx(stack({ gap: 4 }))}>
              <p className={headingStyle}>Administrator</p>
              <div className={cx(cluster({ gap: 3 }))}>
                <Image
                  src={ADMINISTRATOR.profileImageUrl}
                  alt={`${ADMINISTRATOR.name}のプロフィール写真`}
                  width={40}
                  height={40}
                  className={css({ width: "10", height: "10", borderRadius: "full" })}
                />
                <div>
                  <p className={css({ fontWeight: "semibold", color: "fg.DEFAULT" })}>
                    {ADMINISTRATOR.name}
                  </p>
                  <a
                    href={ADMINISTRATOR.xUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={linkStyle}
                  >
                    X {ADMINISTRATOR.xHandle} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cx(
            cluster({ justify: "between" }),
            css({
              marginTop: { base: "10", md: "14" },
              paddingTop: "5",
              borderTop: "1px solid",
              borderColor: "border.hairline",
              color: "fg.subtle",
              fontSize: "xs",
            }),
          )}
        >
          <span>© {new Date().getFullYear()} ido-bata</span>
          <div className={cx(cluster({ gap: 4 }))}>
            <Link href="/community/rules" className={linkStyle}>
              Rules
            </Link>
            <Link href="/faq" className={linkStyle}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
