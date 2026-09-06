import Image from "next/image";
import { DISCORD_INVITE } from "@/lib/env";
import styles from "./Footer.module.css";

export function Footer() {
  const invite = DISCORD_INVITE;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {invite ? (
          <a className={styles.discordLink} href={invite} target="_blank" rel="noopener noreferrer">
            <Image
              src="/discord.svg"
              alt=""
              width={18}
              height={18}
              className={styles.discordIcon}
              aria-hidden="true"
            />
            <span>Discord サーバーはこちら</span>
          </a>
        ) : (
          <span className={styles.discordLinkPlaceholder}>
            <Image
              src="/discord.svg"
              alt=""
              width={18}
              height={18}
              className={styles.discordIcon}
              aria-hidden="true"
            />
            <span>Discord 招待リンク未設定</span>
          </span>
        )}
        <span className={styles.copy}>© ido-bata</span>
      </div>
    </footer>
  );
}
