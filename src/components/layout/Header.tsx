import Link from "next/link";
import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./Header.module.css";

export function Header() {
  const invite = DISCORD_INVITE;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/ido-bata-icon.jpg"
            alt=""
            width={36}
            height={36}
            priority
            className={styles.brandIcon}
          />
          <span className={styles.brandMark}>ido-bata</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <ThemeToggle />
          {invite ? (
            <a className={styles.cta} href={invite} target="_blank" rel="noopener noreferrer">
              <Image
                src="/discord.svg"
                alt=""
                width={20}
                height={20}
                className={styles.ctaIcon}
                aria-hidden="true"
              />
              <span>ido-bata に参加</span>
            </a>
          ) : (
            // env 未設定時の placeholder — ビルドは壊さないが、デプロイ前に
            // `.env` (または CI シークレット) で NEXT_PUBLIC_DISCORD_INVITE を設定すること。
            <span className={styles.ctaPlaceholder} aria-label="Discord 招待リンク未設定">
              <Image
                src="/discord.svg"
                alt=""
                width={20}
                height={20}
                className={styles.ctaIcon}
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
