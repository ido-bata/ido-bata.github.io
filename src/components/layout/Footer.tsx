import Link from "next/link";
import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { css, cx } from "@/styled-system/css";
import { cluster, container, grid, stack } from "@/styles/recipes";

/**
 * Site-wide footer.
 *
 * Wider / taller than a typical site footer to match a modern LP —
 * the band has a 3-column grid (brand block / site nav / community
 * nav) plus a bottom legal row. The site icon (`ido-bata-icon.jpg`,
 * the actual server icon) is rendered as a circular avatar at the
 * top-left so the footer reads as the brand's stamp on the page
 * rather than a thin utility strip.
 *
 * Material Icons render the nav glyphs via the ligature font loaded
 * from the Google Fonts CDN in `src/app/layout.tsx`, keeping the
 * icon system consistent with the in-page accent pieces (theme
 * toggle, etc.).
 *
 * Refs:
 *   - Issue #22 (theme), Issue #90 (Discord / Material icons).
 */
type FooterLink = { href: string; label: string; icon: string };
type FooterText = { label: string; icon: string };
type FooterEntry = FooterLink | FooterText;

const isLink = (entry: FooterEntry): entry is FooterLink => "href" in entry;

export function Footer() {
  const invite = DISCORD_INVITE;

  return (
    <footer
      className={css({
        width: "100%",
        bg: "bg.canvas",
        borderTop: "1px solid",
        borderColor: "border.hairline",
        marginTop: "auto",
      })}
    >
      <div
        className={cx(
          container({ size: "content" }),
          css({
            display: "flex",
            flexDirection: "column",
            gap: { base: "8", md: "10" },
            py: { base: "10", md: "14" },
          }),
        )}
      >
        <div className={cx(grid({ cols: 12, gap: 6 }), css({ alignItems: "flex-start" }))}>
          {/* ───── Brand block ───── */}
          <div
            className={cx(
              stack({ gap: 3 }),
              css({
                gridColumn: { base: "1", md: "span 5" },
              }),
            )}
          >
            <div className={cx(cluster({ gap: 3 }))}>
              <Image
                src="/ido-bata-icon.jpg"
                alt="ido-bata サーバアイコン"
                width={56}
                height={56}
                className={css({
                  width: "14",
                  height: "14",
                  borderRadius: "full",
                  border: "1px solid",
                  borderColor: "border.subtle",
                  flexShrink: 0,
                })}
              />
              <div className={cx(stack({ gap: 1 }))}>
                <span
                  className={css({
                    fontSize: "md",
                    fontWeight: "semibold",
                    color: "fg.DEFAULT",
                    letterSpacing: "-0.01em",
                  })}
                >
                  ido-bata
                </span>
                <span
                  className={css({
                    fontSize: "xs",
                    color: "fg.muted",
                    fontFamily: "mono",
                  })}
                >
                  Discord community · since 2026
                </span>
              </div>
            </div>
            <p
              className={css({
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "fg.muted",
                maxW: "44ch",
              })}
            >
              井戸端会議のように気軽に話せる Discord
              コミュニティ。本サイトは、その活動内容・ルール・最新情報をひとつの場所にまとめるためのポータルです。
            </p>
            {invite ? (
              <div className={cx(cluster({ gap: 2 }))}>
                <Button asChild variant="solid" size="md">
                  <a href={invite} target="_blank" rel="noopener noreferrer">
                    <DiscordIcon size={16} />
                    <span>Discord サーバに参加</span>
                  </a>
                </Button>
              </div>
            ) : null}
          </div>

          {/* ───── Site nav ───── */}
          <nav
            aria-label="サイトマップ"
            className={cx(stack({ gap: 4 }), css({ gridColumn: { base: "1", md: "span 3" } }))}
          >
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.subtle",
              })}
            >
              Site
            </p>
            <ul
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "3",
                listStyle: "none",
                margin: 0,
                padding: 0,
              })}
            >
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cx(
                      cluster({ gap: 2 }),
                      css({
                        fontSize: "sm",
                        color: "fg.muted",
                        textDecoration: "none",
                        _hover: { color: "fg.DEFAULT" },
                      }),
                    )}
                  >
                    <MaterialIcon name={link.icon} size={16} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ───── Community nav ───── */}
          <nav
            aria-label="コミュニティ"
            className={cx(stack({ gap: 4 }), css({ gridColumn: { base: "1", md: "span 4" } }))}
          >
            <p
              className={css({
                fontSize: "xs",
                fontWeight: "medium",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "fg.subtle",
              })}
            >
              Community
            </p>
            <ul
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "3",
                listStyle: "none",
                margin: 0,
                padding: 0,
              })}
            >
              {COMMUNITY_ENTRIES.map((entry) => (
                <li key={isLink(entry) ? entry.href : entry.label}>
                  <FooterNavEntry entry={entry} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ───── Legal row ───── */}
        <div
          className={cx(
            cluster({ justify: "between" }),
            css({
              width: "100%",
              paddingTop: { base: "6", md: "8" },
              borderTop: "1px solid",
              borderColor: "border.hairline",
              color: "fg.subtle",
              fontSize: "xs",
            }),
          )}
        >
          <span>© {new Date().getFullYear()} ido-bata. All rights reserved.</span>
          <span className={css({ fontFamily: "mono" })}>v0.3.0</span>
        </div>
      </div>
    </footer>
  );
}

function FooterNavEntry({ entry }: { entry: FooterEntry }) {
  const className = cx(
    cluster({ gap: 2 }),
    css({
      fontSize: "sm",
      color: "fg.muted",
      textDecoration: "none",
      _hover: { color: "fg.DEFAULT" },
    }),
  );
  const content = (
    <>
      <MaterialIcon name={entry.icon} size={16} />
      <span>{entry.label}</span>
    </>
  );
  if (isLink(entry)) {
    return (
      <Link href={entry.href} className={className}>
        {content}
      </Link>
    );
  }
  return <span className={className}>{content}</span>;
}

const SITE_LINKS: ReadonlyArray<FooterLink> = [
  { href: "/about", label: "About", icon: "info" },
  { href: "/news", label: "News", icon: "campaign" },
  { href: "/channels", label: "Channels", icon: "tag" },
  { href: "/faq", label: "FAQ", icon: "help" },
];

const COMMUNITY_ENTRIES: ReadonlyArray<FooterEntry> = [
  { href: "/community/rules", label: "サーバルール", icon: "gavel" },
  { label: "Discord サーバ", icon: "forum" },
];
