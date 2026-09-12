import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DISCORD_INVITE } from "@/lib/env";
import { css } from "@/styled-system/css";

export const metadata: Metadata = {
  title: "404 — ページが見つかりません",
  description:
    "お探しのページは見つかりませんでした。いど端（実利サーバー）の他のページへのリンクをご利用ください。",
  robots: { index: false, follow: false },
};

const NAV_LINKS = [
  { href: "/", label: "トップへ戻る" },
  { href: "/about", label: "About を見る" },
  { href: "/faq", label: "FAQ を見る" },
  { href: "/rules", label: "サーバルールを見る" },
  { href: "/channels", label: "チャネル一覧を見る" },
  { href: "/news", label: "News を見る" },
] as const;

export default function NotFound() {
  const invite = DISCORD_INVITE;

  return (
    <main
      className={css({
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { base: "6", md: "8" },
        py: { base: "16", md: "20" },
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "8",
          width: "100%",
          maxWidth: "640px",
        })}
      >
        <p
          aria-hidden="true"
          className={css({
            fontSize: "5xl",
            fontWeight: "bold",
            lineHeight: "tight",
            letterSpacing: "-0.04em",
            color: "fg.muted",
            fontFamily: "mono",
          })}
        >
          404
        </p>

        <h1
          className={css({
            fontSize: { base: "2xl", md: "3xl" },
            fontWeight: "semibold",
            lineHeight: "tight",
            color: "fg.DEFAULT",
          })}
        >
          ページが見つかりません
        </h1>

        <p
          className={css({
            fontSize: "md",
            lineHeight: "relaxed",
            color: "fg.muted",
            maxWidth: "480px",
          })}
        >
          お探しのページは移動・削除されたか、URL が正しくない可能性があります。
          下のリンクから他のページへお進みください。
        </p>

        {invite ? (
          <a
            href={invite}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3",
              height: "12",
              px: "6",
              fontSize: "md",
              fontWeight: "medium",
              color: "fg.onAccent",
              bg: "accent.DEFAULT",
              borderRadius: "full",
              textDecoration: "none",
              transition: "colors",
              _hover: { bg: "bg.muted" },
            })}
          >
            <Image
              src="/discord.svg"
              alt=""
              width={22}
              height={22}
              className={css({ width: "5", height: "5" })}
              aria-hidden="true"
            />
            <span>ido-bata Discord サーバに参加する</span>
          </a>
        ) : null}

        <nav
          aria-label="サイト内ナビゲーション"
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "2",
            width: "100%",
            maxWidth: "360px",
            mt: "2",
          })}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "10",
                px: "4",
                fontSize: "sm",
                fontWeight: "medium",
                color: "fg.DEFAULT",
                bg: "bg.canvas",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "border.DEFAULT",
                borderRadius: "md",
                textDecoration: "none",
                transition: "colors",
                _hover: { bg: "bg.subtle", borderColor: "border.strong" },
              })}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
