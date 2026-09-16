import { css, cx } from "@/styled-system/css";
import { Button, type ButtonSize } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/DiscordIcon";

export type DiscordJoinButtonProps = {
  href: string;
  label?: string;
  size?: ButtonSize;
  className?: string;
};

export function DiscordJoinButton({
  href,
  label = "Discord サーバーに参加",
  size = "md",
  className,
}: DiscordJoinButtonProps) {
  return (
    <Button
      asChild
      variant="solid"
      size={size}
      className={cx(
        css({
          bg: "#5865F2",
          color: "#FFFFFF",
          _hover: { bg: "#4752C4", color: "#FFFFFF" },
          _focusVisible: { color: "#FFFFFF" },
        }),
        className,
      )}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <DiscordIcon size={size === "sm" ? 16 : 18} />
        <span>{label}</span>
      </a>
    </Button>
  );
}
