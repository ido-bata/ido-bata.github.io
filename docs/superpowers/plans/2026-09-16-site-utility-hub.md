# Site Utility Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Homeから、いど端で現在使える活動・プロジェクト・全種別のチャンネルへ進める実利ハブを構築する。

**Architecture:** DiscordとGitHubで確認した事実を型付きの静的データへ保存し、Homeと個別ページから参照する。Discord参加導線は専用コンポーネントへ集約し、静的エクスポートのまま外部APIへの実行時依存を増やさない。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、Panda CSS、Ark UI、Vitest、Testing Library、Playwright、Bun

**Spec:** `docs/superpowers/specs/2026-09-16-site-utility-hub-design.md`

## Global Constraints

- Next.jsの実装前に `node_modules/next/dist/docs/` の該当ガイドを参照する。
- `output: "export"` を維持し、動的なserver-only機能を追加しない。
- ソースコードとcommit messageは英語、内部ドキュメントとPR本文は日本語で書く。
- Discord APIとGitHub APIは実行時・ビルド時に呼ばない。
- Discord CTAは通常 `#5865F2`、hover `#4752C4`、文字とアイコンは `#FFFFFF` を使う。
- `agent.stash.tmp/` は変更対象に含めない。

---

### Task 1: Discord参加ボタンの共通化

**Files:**
- Create: `src/components/DiscordJoinButton.tsx`
- Create: `src/components/DiscordJoinButton.test.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/welcome/page.tsx`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `Button`, `DiscordIcon`, `DISCORD_INVITE`
- Produces: `DiscordJoinButton({ label?, size?, className? })`

- [ ] **Step 1: Write the failing component test**

```tsx
render(<DiscordJoinButton href="https://discord.gg/example" />);
const link = screen.getByRole("link", { name: "Discord サーバーに参加" });
expect(link.className).toContain("bg_#5865f2");
expect(link.className).toContain("c_#ffffff");
expect(link.className).toContain("hover:bg_#4752c4");
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `bunx vitest run src/components/DiscordJoinButton.test.tsx`

Expected: FAIL because `DiscordJoinButton` does not exist.

- [ ] **Step 3: Implement the shared component**

```tsx
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
```

- [ ] **Step 4: Replace every Discord CTA**

Render `DiscordJoinButton` only when `DISCORD_INVITE` exists. Remove the disabled header fallback and all local brand-color overrides.

- [ ] **Step 5: Run component tests**

Run: `bunx vitest run src/components/DiscordJoinButton.test.tsx src/components/ui/button.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/DiscordJoinButton.tsx src/components/DiscordJoinButton.test.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx src/app/page.tsx src/app/welcome/page.tsx src/app/faq/page.tsx src/app/not-found.tsx
git commit -m "fix(ui): unify Discord join actions"
```

### Task 2: 全種別のチャンネルディレクトリ

**Files:**
- Modify: `src/content/channels.ts`
- Modify: `src/content/channels.test.ts`
- Modify: `src/app/channels/page.tsx`

**Interfaces:**
- Produces: `ChannelType = "text" | "announcement" | "forum" | "voice" | "stage"`
- Produces: `Channel.type: ChannelType`
- Produces: `CHANNEL_TYPE_LABELS: Readonly<Record<ChannelType, string>>`

- [ ] **Step 1: Extend failing data tests**

```ts
expect(new Set(CHANNELS.map((channel) => channel.type))).toEqual(
  new Set(["text", "announcement", "forum", "voice", "stage"]),
);
expect(CHANNELS.some((channel) => channel.name === "いど底-ステージ")).toBe(true);
expect(CHANNELS.filter((channel) => channel.type === "voice")).toHaveLength(4);
```

- [ ] **Step 2: Run focused test and verify RED**

Run: `bunx vitest run src/content/channels.test.ts`

Expected: FAIL because `type` and voice/stage entries are missing.

- [ ] **Step 3: Add the channel type model and entries**

Add `type` to every existing entry and add:

```ts
{ name: "いど底-ステージ", description: "底力タイムで使うステージ。", category: "いど端 底力 タイム", type: "stage" }
{ name: "作業 (修羅場)", description: "会話しながら集中して作業する音声チャンネル。", category: "作業", type: "voice" }
{ name: "作業 (雑)", description: "雑談を交えながら作業する音声チャンネル。", category: "作業", type: "voice" }
{ name: "作業（無言）", description: "会話せず同じ場所で作業する音声チャンネル。", category: "作業", type: "voice" }
{ name: "ボイスチャンネル", description: "LT会の発表と視聴に使う音声チャンネル。", category: "いど端LT会", type: "voice" }
```

- [ ] **Step 4: Show type labels on `/channels`**

Each channel card displays `CHANNEL_TYPE_LABELS[channel.type]` next to the channel name. Replace the obsolete hero sentence saying the list is being prepared.

- [ ] **Step 5: Run channel tests**

Run: `bunx vitest run src/content/channels.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/channels.ts src/content/channels.test.ts src/app/channels/page.tsx
git commit -m "feat(channels): include voice and stage channels"
```

### Task 3: 活動・プロジェクトデータ

**Files:**
- Create: `src/content/activities.ts`
- Create: `src/content/activities.test.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/projects.test.ts`

**Interfaces:**
- Produces: `Activity`, `IDOBATA_TIME`
- Produces: `Project`, `PROJECTS`, `getProject(slug)`

- [ ] **Step 1: Write failing content tests**

```ts
expect(IDOBATA_TIME.schedule.map((phase) => phase.minutes)).toEqual([15, 5, 30, 5, 45]);
expect(PROJECTS.map((project) => project.slug)).toEqual(["layer-note", "server-bot"]);
expect(getProject("layer-note")?.links.some((link) => link.kind === "releases")).toBe(true);
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `bunx vitest run src/content/activities.test.ts src/content/projects.test.ts`

Expected: FAIL because both modules are missing.

- [ ] **Step 3: Implement activity data**

`IDOBATA_TIME` contains the daily `21:00–22:40` schedule, stage channel name, participation note, and bot relationship.

- [ ] **Step 4: Implement project data**

`PROJECTS` contains:

- LayerNote: After Effects CEP extension, notes, property/expression editing, search, formatting, validation, repository/releases/user guide links
- server bot: daily timekeeper, voice/stage connection, reaction roles, Discord event foundation, repository link

- [ ] **Step 5: Run content tests**

Run: `bunx vitest run src/content/activities.test.ts src/content/projects.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/activities.ts src/content/activities.test.ts src/content/projects.ts src/content/projects.test.ts
git commit -m "feat(content): add activities and projects"
```

### Task 4: 底力タイム・プロジェクト詳細ページ

**Files:**
- Create: `src/app/activities/idobata-time/page.tsx`
- Create: `src/app/activities/idobata-time/page.test.tsx`
- Create: `src/app/projects/layer-note/page.tsx`
- Create: `src/app/projects/server-bot/page.tsx`
- Create: `src/app/projects/projects.test.tsx`

**Interfaces:**
- Consumes: `IDOBATA_TIME`, `PROJECTS`, `DiscordJoinButton`
- Produces routes: `/activities/idobata-time`, `/projects/layer-note`, `/projects/server-bot`

- [ ] **Step 1: Write failing route tests**

```tsx
render(<IdobataTimePage />);
expect(screen.getByRole("heading", { level: 1, name: "いど端 底力 タイム" })).toBeTruthy();
expect(screen.getByText("21:00–22:40")).toBeTruthy();

render(<LayerNotePage />);
expect(screen.getByRole("heading", { level: 1, name: "LayerNote" })).toBeTruthy();
expect(screen.getByRole("link", { name: "GitHub Releases" })).toBeTruthy();
```

- [ ] **Step 2: Run route tests and verify RED**

Run: `bunx vitest run src/app/activities/idobata-time/page.test.tsx src/app/projects/projects.test.tsx`

Expected: FAIL because the routes do not exist.

- [ ] **Step 3: Build the activity page**

Render purpose, daily schedule, participation method, stage channel, and server-bot link from `IDOBATA_TIME`.

- [ ] **Step 4: Build both project pages**

Use the corresponding `Project` record for summary, features, current status, and external links. Do not claim unfinished bot features are available.

- [ ] **Step 5: Run route tests**

Run: `bunx vitest run src/app/activities/idobata-time/page.test.tsx src/app/projects/projects.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/activities src/app/projects
git commit -m "feat(site): add activity and project pages"
```

### Task 5: Homeを実利ハブへ再構成

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `IDOBATA_TIME`, `PROJECTS`, `CHANNELS`, `CHANNEL_CATEGORIES`

- [ ] **Step 1: Update Home tests first**

```tsx
expect(screen.getByRole("heading", { level: 2, name: "使えるもの" })).toBeTruthy();
expect(screen.getByRole("link", { name: /いど端 底力 タイム/ })).toBeTruthy();
expect(screen.getByRole("link", { name: /LayerNote/ })).toBeTruthy();
expect(screen.getByRole("link", { name: /ido-bata-server-bot/ })).toBeTruthy();
expect(screen.getByText(/音声/)).toBeTruthy();
```

- [ ] **Step 2: Run Home tests and verify RED**

Run: `bunx vitest run src/app/page.test.tsx`

Expected: FAIL because the functional links do not exist.

- [ ] **Step 3: Rebuild Home hierarchy**

Render in this order: short intro/actions, `使えるもの`, channel overview, updates, restrained newcomer link. Remove server count panel and duplicate empty-state cards.

- [ ] **Step 4: Run Home tests**

Run: `bunx vitest run src/app/page.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat(home): surface activities and projects"
```

### Task 6: FAQ・Rules・Newsの空内容を解消

**Files:**
- Modify: `src/content/faq.ts`
- Create: `src/content/faq.test.ts`
- Modify: `src/content/rules.ts`
- Create: `src/content/rules.test.ts`
- Modify: `src/content/news.ts`
- Create: `src/content/news.test.ts`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/community/rules/page.tsx`
- Modify: `src/app/news/page.tsx`

**Interfaces:**
- Produces populated `FAQ_ITEMS`, `rules`, and `NEWS_ITEMS`

- [ ] **Step 1: Write failing content assertions**

```ts
expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(6);
expect(JSON.stringify(rules)).not.toContain("準備中");
expect(NEWS_ITEMS.length).toBeGreaterThan(0);
```

- [ ] **Step 2: Run content tests and verify RED**

Run: `bunx vitest run src/content/faq.test.ts src/content/rules.test.ts src/content/news.test.ts`

Expected: FAIL on empty and preparation-state content.

- [ ] **Step 3: Populate FAQ from verified facts**

Add the six questions named in the spec and link readers to channels, projects, the activity page, and Discord where useful.

- [ ] **Step 4: Populate Rules from `docs/code-of-conduct.md`**

Summarize practical behavior, prohibited behavior, response, and contact without creating new policy.

- [ ] **Step 5: Add verified News items**

Add dated entries for the website utility hub, LayerNote, and daily bottom-time operation only where dates are confirmed by repository or Discord records.

- [ ] **Step 6: Remove obsolete empty-state branches and copy**

Pages render their populated content without preparation-state messages.

- [ ] **Step 7: Run content tests**

Run: `bunx vitest run src/content/faq.test.ts src/content/rules.test.ts src/content/news.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/content/faq.ts src/content/faq.test.ts src/content/rules.ts src/content/rules.test.ts src/content/news.ts src/content/news.test.ts src/app/faq/page.tsx src/app/community/rules/page.tsx src/app/news/page.tsx
git commit -m "feat(content): replace empty information pages"
```

### Task 7: ナビゲーションと変更履歴

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `CHANGELOG.md`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes the new routes from Tasks 4–6.

- [ ] **Step 1: Add E2E expectations**

```ts
await expect(page.getByRole("link", { name: /LayerNote/ })).toBeVisible();
await expect(page.getByRole("link", { name: /底力タイム/ })).toBeVisible();
await page.getByRole("link", { name: /LayerNote/ }).click();
await expect(page).toHaveURL(/projects\/layer-note/);
```

- [ ] **Step 2: Update navigation**

Footer exposes Activities and Projects without duplicating every child route. Header remains compact and keeps only theme plus Discord.

- [ ] **Step 3: Rewrite Unreleased changelog entries**

Record the final utility hub, new routes, populated information pages, all channel types, and shared Discord CTA in Japanese.

- [ ] **Step 4: Run unit tests**

Run: `bun run test:unit`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/Header.tsx CHANGELOG.md tests/e2e/home.spec.ts
git commit -m "docs: align navigation and changelog"
```

### Task 8: 完全検証とPR更新

**Files:**
- Modify only files required by discovered verification failures.

**Interfaces:**
- Validates every route and artifact created by Tasks 1–7.

- [ ] **Step 1: Scan preparation-state language**

Run: `rg -n '(準備中|オーナーの正本化後|現在、掲載中.*ありません)' src`

Expected: no matches in user-facing content.

- [ ] **Step 2: Run required checks**

```bash
bun run format:check
bun run lint
bun run typecheck
bun run test:unit
bun run build
test -f out/index.html
test -f out/404.html
```

Expected: all commands exit 0.

- [ ] **Step 3: Run Playwright**

Run: `bun run test:e2e`

Expected: PASS locally when Chromium dependencies are present; otherwise verify through GitHub Actions.

- [ ] **Step 4: Review generated routes**

Confirm static output for `/activities/idobata-time`, `/projects/layer-note`, and `/projects/server-bot`, and verify that old inaccurate copy is absent.

- [ ] **Step 5: Update and push PR**

Push branch `103`, update PR #104 in Japanese, wait for Quality gate and E2E gate, and leave integration to the `release-0-4-0` review flow.
