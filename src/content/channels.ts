/**
 * Discord server channel definitions.
 *
 * The `/channels` page imports from this file so visitors can see what
 * topics exist before joining. Ordering is the array declaration order;
 * categories preserve their array order.
 *
 * NOTE: Entries are intentionally empty for the v0.3.0 release. Channel
 * names and descriptions are populated after the community owner confirms
 * the actual Discord server layout. See follow-up issue.
 */

export type ChannelCategory = string;

export interface Channel {
  /** Discord display name (without the leading `#`). */
  name: string;
  /** Channel purpose / topic. */
  description: string;
  /** Category the channel belongs to. */
  category: ChannelCategory;
}

/**
 * Display order is controlled by declaration order. Categories appear in the
 * order they are listed here.
 */
export const CHANNEL_CATEGORIES: readonly ChannelCategory[] = [];

export const CHANNELS: readonly Channel[] = [];
