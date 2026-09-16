import { describe, expect, it } from "vitest";
import { CHANNELS, CHANNEL_CATEGORIES } from "./channels";

describe("Discord channel directory", () => {
  it("lists the current public channel categories", () => {
    expect(CHANNEL_CATEGORIES).toEqual([
      "話題",
      "PDCA",
      "共有",
      "参考",
      "雑",
      "いど端 底力 タイム",
      "作業",
      "いど端LT会",
      "LayerNote",
      "要望",
    ]);
  });

  it("keeps every channel addressable and described", () => {
    expect(CHANNELS.length).toBeGreaterThan(0);

    for (const channel of CHANNELS) {
      expect(CHANNEL_CATEGORIES).toContain(channel.category);
      expect(channel.name.trim()).not.toBe("");
      expect(channel.description.trim()).not.toBe("");
    }

    const paths = CHANNELS.map((channel) => `${channel.category}/${channel.name}`);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
