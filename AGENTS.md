<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# AGENTS.md — AI / Human Contributor Dispatcher

> **Dispatcher**: ここから下のリンクを辿れば、プロジェクト固有のすべての情報へ到達できる。
> フルプロンプトを毎回読む必要はない。

## Project identity

- Organization: `ido-bata`
- Repository: `ido-bata/ido-bata.github.io`
- Purpose: `ido-bata` organization の公式ウェブサイト
- Stack: Next.js 16.x (App Router, Turbopack) + Bun + GitHub Pages (static export)
- Visibility: public

## Source of Truth (canonical state)

| 用途                       | 場所                                                       |
| -------------------------- | ---------------------------------------------------------- |
| released source            | `main` ブランチ                                            |
| active sprint integration  | `release-x-y-z` ブランチ                                   |
| ticket work                | ブランチ `<issue-number>`                                  |
| durable work items         | GitHub Issues (canonical)                                  |
| dependency / stack SoT     | GitHub Issue dependency graph (Projects は control plane)  |
| release planning control plane | **GitHub Projects v2 (Kanban)** — Linear profile は採用しない |
| review / integration       | Pull Requests                                              |
| source/work specification  | このリポジトリの `docs/`, `CONTRIBUTING.md`, `CHANGELOG.md` |
| recovery checkpoint        | GitHub Issue / PR / commit graph（構造化が必要な巨大 work は agent が checkpoint comment を残す） |

エージェント会話履歴・native session ID は SoT としない。
release planning の Status / Priority / Target Version / Area は Projects のみで管理し、
GitHub Issues と二重 canonical にしない (dependency metadata は GitHub Issue dependency graph が canonical)。

## Decision precedence

1. project-wide policy / canonical architecture / invariant（`docs/`, `AGENTS.md`, `CLAUDE.md`, ADR）
2. design / specification / explicit task instruction
3. coherent existing implementation majority
4. current official framework/runtime/SDK guidance（**Next.js の場合 `node_modules/next/dist/docs/` を必ず確認**）
5. established ecosystem convention
6. local best judgment

project evidence で答えが出る自明な判断を user に返さない。
user escalation が必要なのは: canonical 同士の矛盾、acceptance criteria の曖昧さ、irreversible / destructive、外部契約確定、security/compliance リスク、release scope 変更。

## Public repository main protection

`main` は branch protection + required checks で保護する（[ADR-0003](./docs/adr/0003-release-branch-stack-protection.md)）。

- direct push / direct web edit / force push / deletion を通常運用で禁止
- `main` への正規 delivery path は **`release-x-y-z -> main` の release PR だけ**
- `release-source-check` required status check が `base==main` の PR で head が `release-*` pattern に一致することを enforce する
- required reviews (≥1) と required status checks (lint / typecheck / unit / build / e2e / release-source-check) を main merge 前に要求
- `enforce_admins = true`（admin も保護に従う）

ticket branch / stack PR は保護対象外。`main` を直接触る操作はすべて release PR 経由。

## Sprint / weekly cadence

- **sprint = 1 週間** を planning cadence とする（実装工数保証ではない）
- `release-x-y-z` を `main` から派生し、その sprint で扱う Issue を GitHub Projects の Ready カラムへ
- target version = 1 sprint の Semantic Version
- 1 sprint = 1 release integration branch
- 緊急 patch は `release-x-y-z-patch` を `main` から派生し release PR 経由で main へ
- cadence と freeze の詳細は [`docs/release.md`](./docs/release.md)

## Ticket branch / mandatory Draft PR / stacked PR

- 1 top-level Issue = 1 durable ticket branch (branch 名は Issue 番号のみ。prefix / slug 禁止)
- independent ticket: base = `release-x-y-z`
- same-release linear hard dependency がある場合のみ stacked PR を許可 (base = immediate predecessor ticket branch)
- **active durable ticket branch は published remote head + Draft PR を必ず持つ**
  - canonical start: branch 作成 → first meaningful commit → remote publish → remote head SHA 確認 → Draft PR 作成 → Issue linkage / assignee / reviewer / labels / target release / stack context 設定 → implementation 継続
- Draft PR を「実装完了時に作る」運用や first commit を local だけに残す運用は禁止 (human / Coordinator / worker / subagent すべて)
- 詳細は [`CONTRIBUTING.md`](./CONTRIBUTING.md), [`docs/release.md`](./docs/release.md)

## Environment bootstrap

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # ./out に静的書き出し
bun run lint && bun run typecheck
```

## Development entry points

- **Issue 駆動**: 非自明な作業は Issue を作り、`#<issue-number>` ブランチで作業する
- **Draft PR を早期作成**: first meaningful commit 直後に `<issue-number>` → `release-x-y-z` (or immediate predecessor) の Draft PR
- **Release PR**: `release-x-y-z` → `main`。zero-diff の間は Draft release PR 不要、first meaningful difference 後は必須

## Validation entry points

| level       | command                                       | when                              |
| ----------- | --------------------------------------------- | --------------------------------- |
| format      | `bun run format:check`                        | commit 前 / CI                    |
| lint        | `bun run lint`                                | commit 前 / CI                    |
| type        | `bun run typecheck`                           | commit 前 / CI                    |
| build/smoke | `bun run build` → `out/index.html` 存在      | CI / release gate 前              |
| E2E         | `bun run test:e2e`                            | CI `e2e` job / release gate 前    |

CI / local gate は同じ deterministic entry point を使う。
stacked PR は predecessor の rebase / update で downstream head SHA が変わるため、
affected validation を新しい SHA で再実行する (stale green を流用しない)。

## Agent Skills discovery

project-local Skill は `bunx skills list` (Bun) / `npx skills list` (Node) で確認できる。
`skills-lock.json` で source / revision を pin する。新規 Skill を導入する前に
source / maintenance / reproducibility を評価する。`--global` を既定にしない。
Skill の stale 判定は presence だけでなく canonical source の revision で確認する
(installed copy と差分があれば reconcile する)。

## Fresh agent / recovery

fresh agent は chat history / native session なしで GitHub Issue / PR / commit graph /
`docs/agent-collaboration.md` / checkpoint comment から task を再構成する。

- recovery / parent-child / side-effect idempotency: [`docs/agent-collaboration.md`](./docs/agent-collaboration.md)
- ADR 一覧: [`docs/adr/`](./docs/adr/)

## Documentation language policy

- ソースコード / commit message: **英語**
- Issue / PR / 内部ドキュメント (`docs/`, `README.md`, `CONTRIBUTING.md`): **日本語**

## Hard rules

- `main` への直接 commit 禁止（release branch 経由）
- `output: "export"` 環境では server-only feature (cookies, ISR, dynamic route handler without `force-static`, etc.) を使わない
- 機密情報を commit / log / artifact / checkpoint / agent result に含めない
- `.env*` をコミットしない（`.env*.example` 形式のみ）
- Generated / vendor code / migration 途中の old pattern を「多数派だから正しい」と扱わない
- `release-source-check` を bypass して `main` へ merge しない
- conversation ID / agent ID / Supervisor local DB / shell history だけを SoT にしない

## 関連ドキュメント

- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/development.md`](./docs/development.md)
- [`docs/release.md`](./docs/release.md)
- [`docs/security.md`](./docs/security.md)
- [`docs/troubleshooting.md`](./docs/troubleshooting.md)
- [`docs/agent-collaboration.md`](./docs/agent-collaboration.md)
- [`docs/adr/`](./docs/adr/)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`README.md`](./README.md)

## Constitution / operating profile

- 最上位 contract: [`constitution/CONSTITUTION.md`](constitution/CONSTITUTION.md)
- current Operating Model: [`organization/profiles/release-driven-solo.md`](organization/profiles/release-driven-solo.md)
- repository-specific architecture / runtime / release docs は、Constitution を満たす限り generic upstream Practice より具体的な authority として維持する。
