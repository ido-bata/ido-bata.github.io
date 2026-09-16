import { describe, expect, it } from "vitest";
import { IDOBATA_TIME } from "./activities";

describe("activities", () => {
  it("keeps the published bottom-time schedule exact", () => {
    expect(IDOBATA_TIME.schedule.map((phase) => phase.minutes)).toEqual([15, 5, 30, 5, 45]);
    expect(IDOBATA_TIME.time).toBe("21:00–22:40");
    expect(IDOBATA_TIME.channel).toBe("いど底-ステージ");
  });
});
