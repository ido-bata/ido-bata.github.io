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
| durable work items         | GitHub Issues + GitHub Projects v2 (Kanban)                |
| review / integration       | Pull Requests                                              |
| source/work specification  | このリポジトリの `docs/`, `CONTRIBUTING.md`, `CHANGELOG.md` |
| recovery checkpoint        | GitHub Issue / PR / commit graph（構造化が必要な巨大 work は agent が checkpoint comment を残す） |

エージェント会話履歴・native session ID は SoT としない。

## Decision precedence

1. project-wide policy / canonical architecture / invariant（`docs/`, `AGENTS.md`, `CLAUDE.md`, ADR）
2. design / specification / explicit task instruction
3. coherent existing implementation majority
4. current official framework/runtime/SDK guidance（**Next.js の場合 `node_modules/next/dist/docs/` を必ず確認**）
5. established ecosystem convention
6. local best judgment

project evidence で答えが出る自明な判断を user に返さない。  
user escalation が必要なのは: canonical 同士の矛盾、acceptance criteria の曖昧さ、irreversible / destructive、外部契約確定、security/compliance リスク、release scope 変更。

## Environment bootstrap

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # ./out に静的書き出し
bun run lint && bun run typecheck
```

## Development entry points

- **Issue 駆動**: 非自明な作業は Issue を作り、`#<issue-number>` ブランチで作業する
- **Draft PR を早期作成**: 最初の意味のある commit で `<issue-number>` → `release-x-y-z` の Draft PR
- **Release PR**: `release-x-y-z` → `main`

## Validation entry points

| level       | command                                 | when                              |
| ----------- | --------------------------------------- | --------------------------------- |
| format      | `bun run format:check`                  | commit 前 / CI                    |
| lint        | `bun run lint`                          | commit 前 / CI                    |
| type        | `bun run typecheck`                     | commit 前 / CI                    |
| build/smoke | `bun run build` → `out/index.html` 存在 | CI / release gate 前              |
| E2E         | （未導入。必要時に docs/development.md に従って追加） | critical path release 前 |

## Skill discovery

project-local の Skill は `bunx skills list` (Bun) / `npx skills list` (Node) で確認できる。
新規 Skill を導入する前に source / maintenance / reproducibility を評価する。`--global` を既定にしない。

## Documentation language policy

- ソースコード / commit message: **英語**
- Issue / PR / 内部ドキュメント (`docs/`, `README.md`, `CONTRIBUTING.md`): **日本語**

## Hard rules

- `main` への直接 commit 禁止（release branch 経由）
- `output: "export"` 環境では server-only feature (cookies, ISR, dynamic route handler without `force-static`, etc.) を使わない
- 機密情報を commit / log / artifact に含めない
- `.env*` をコミットしない（`.env*.example` 形式のみ）
- Generated / vendor code / migration 途中の old pattern を「多数派だから正しい」と扱わない

## 関連ドキュメント

- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/development.md`](./docs/development.md)
- [`docs/release.md`](./docs/release.md)
- [`docs/security.md`](./docs/security.md)
- [`docs/troubleshooting.md`](./docs/troubleshooting.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`README.md`](./README.md)