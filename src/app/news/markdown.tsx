import type { ReactNode } from "react";
import { css } from "@/styled-system/css";

/**
 * Minimal Markdown-subset renderer for news bodies (Issue #21).
 *
 * Announcements should be cheap to write, so `NewsItem.body` is authored as
 * plain text with a deliberately tiny Markdown subset:
 *   - blocks are separated by a blank line
 *   - a block whose every line starts with `- ` becomes an unordered list
 *   - every other block becomes a paragraph; single newlines are kept as
 *     line breaks (friendly for Japanese text, which has no word spaces)
 *   - `[ラベル](https://example.com)` becomes an external link
 *
 * The output is assembled from React elements only — no
 * `dangerouslySetInnerHTML` — so authored text can never inject markup.
 * Anything richer than the list above should become a real MDX pipeline
 * rather than growing this parser.
 */

/** `[label](url)` with an http(s) target. */
const INLINE_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

const LIST_MARKER = "- ";

const bodyStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
  color: "fg.muted",
  fontSize: "md",
  lineHeight: "relaxed",
});

const paragraphStyle = css({
  margin: "0",
  whiteSpace: "pre-line",
});

const listStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  margin: "0",
  paddingLeft: "5",
  listStyleType: "disc",
});

const linkStyle = css({
  color: "accent",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  _hover: { textDecoration: "none" },
});

/** Split a body into blank-line separated blocks, dropping empty ones. */
function toBlocks(source: string): string[] {
  return source
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}

/** Replace `[label](url)` occurrences with anchor elements. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const [raw, label, href] = match;
    const start = match.index ?? cursor;

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }
    nodes.push(
      <a
        key={`link-${start}`}
        className={linkStyle}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>,
    );
    cursor = start + raw.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }
  return nodes;
}

export function MarkdownBody({ source }: { source: string }) {
  return (
    <div className={bodyStyle}>
      {toBlocks(source).map((block, blockIndex) => {
        const lines = block.split("\n").map((line) => line.trim());

        if (lines.every((line) => line.startsWith(LIST_MARKER))) {
          return (
            <ul key={`block-${blockIndex}`} className={listStyle}>
              {lines.map((line, lineIndex) => (
                <li key={`item-${blockIndex}-${lineIndex}`}>
                  {renderInline(line.slice(LIST_MARKER.length).trim())}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`block-${blockIndex}`} className={paragraphStyle}>
            {renderInline(lines.join("\n"))}
          </p>
        );
      })}
    </div>
  );
}
