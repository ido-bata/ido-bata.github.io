/**
 * FAQ content (single source of truth).
 *
 * The `/faq` page only imports from this file. Adding / editing / reordering
 * questions happens entirely here (no JSX changes needed in the page).
 *
 * - `question`: heading text. Short, in question form.
 * - `answer`: array of paragraphs. Each element renders as one paragraph.
 * - `id`: anchor (e.g. `/faq#some-id`). Do not change once published.
 *
 * NOTE: Entries are intentionally empty for the v0.3.0 release. Concrete
 * questions and answers are authored after the community owner confirms
 * facts (moderation policy, joining rules, etc.). See follow-up issue.
 */

export type FaqItem = {
  /** Stable id used as URL anchor. Do not change once published. */
  readonly id: string;
  /** Question text (Japanese). */
  readonly question: string;
  /** Answer paragraphs. */
  readonly answer: readonly string[];
};

export const FAQ_ITEMS: readonly FaqItem[] = [];
