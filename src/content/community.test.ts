import { describe, expect, it } from "vitest";
import { ADMINISTRATOR, CONTRIBUTION_LINKS } from "./community";

describe("community identity", () => {
  it("identifies the server administrator", () => {
    expect(ADMINISTRATOR.name).toBe("samuido");
    expect(ADMINISTRATOR.xHandle).toBe("@361do_sleep");
    expect(ADMINISTRATOR.xUrl).toBe("https://x.com/361do_sleep");
    // プロフィール写真は Twitter (pbs.twimg.com) の profile_images 配下
    // を取りに行く。next.config.ts の remotePatterns で許可しているのは
    // このホスト配下のみなので、ホスト名が変わったら設定を併せて更新する。
    expect(ADMINISTRATOR.profileImageUrl).toMatch(/^https:\/\/pbs\.twimg\.com\/profile_images\//);
  });

  it("provides every contribution destination", () => {
    expect(CONTRIBUTION_LINKS.map(({ kind }) => kind)).toEqual(["repository", "issues", "guide"]);
  });
});
