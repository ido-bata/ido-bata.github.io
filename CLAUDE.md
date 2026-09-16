@AGENTS.md

<!-- CLAUDE.md は Claude Code 固有の補足だけを書き、共通ルールは AGENTS.md を参照する。 -->
<!-- ここで全文を展開しないこと。 -->

# CLAUDE.md — Claude Code 固有の補足

## 起動直後

1. `AGENTS.md` を起点にプロジェクト概要を確認する
2. main protection / release workflow は [ADR-0003](./docs/adr/0003-release-branch-stack-protection.md) を起点に把握する
3. 触る framework の公式 doc を **必ず** ローカル (`node_modules/<pkg>/dist/docs/` 等) で確認してから書く
4. Next.js の場合は冒頭ブロック (`<!-- BEGIN:nextjs-agent-rules -->`) の指示に従う

## 作業の進め方

- 非自明な作業は Issue を作成してから着手する
- 1 Issue = 1 ticket branch (`<issue-number>`)
- **active durable ticket branch は published remote head + Draft PR を必ず持つ** (canonical start: branch → first meaningful commit → remote publish → head SHA 確認 → Draft PR 作成)
- remote publication / PR mutation 権限がない worker は first meaningful commit 後ただちに Coordinator / Supervisor へ handoff し、publish + Draft PR 作成が終わるまで追加 implementation を進めない
- CI (`bun run lint && bun run typecheck && bun run build`) をローカルで green にしてから commit する
- 既存のスクリプト (`bun run lint`, `bun run typecheck`, `bun run build`, `bun run format`) を優先し、独自に新しいコマンドを追加しない
- `main` への merge は `release-x-y-z -> main` の release PR 経由だけ。`release-source-check` を bypass しない

## 自明な判断は agent 側で決定する

project evidence（`docs/`, `CONTRIBUTING.md`, `CHANGELOG.md`, 既存コード）で答えが出る質問は user に返さない。

返してよい質問:

- canonical 同士の矛盾
- acceptance criteria の曖昧さで挙動が変わる
- irreversible / destructive
- 公開 API / 外部契約の確定
- security / compliance リスク受容
- release scope / date 変更

## リカバリ

会話履歴・session ID は SoT としない。

project-local で参照すべき SoT:

- GitHub Issue (canonical dependency SoT)
- GitHub Projects v2 (release planning control plane、Status / Priority / Target Version のみ。dependency metadata は GitHub Issue が canonical)
- `release-x-y-z` / `<issue-number>` / `main` の commit graph
- `docs/` (architecture / development / release / security / troubleshooting / **agent-collaboration**), `CONTRIBUTING.md`, `CHANGELOG.md`
- structured checkpoint comment（必要に応じて agent が残す）

fresh agent は chat history なしで上記から再構成する。詳細: [`docs/agent-collaboration.md`](./docs/agent-collaboration.md)

## Skill discovery

`bunx skills list` (Bun) / `npx skills list` (Node) で project-local Skill を確認。
`skills-lock.json` で source / revision を pin。新規 Skill は source / maintenance / reproducibility を評価してから導入。
Skill の stale 判定は presence だけでなく canonical source の revision で確認 (installed copy と差分があれば reconcile)。`--global` を既定にしない。

## 言語ポリシー

- ソース / commit message: 英語
- Issue / PR / docs: 日本語
- ユーザーへの応答: 日本語（既定）

## 禁止

- `main` への直接 commit
- `output: "export"` で server-only feature の使用
- 機密情報の commit / log / artifact / checkpoint / agent result への混入
- generated / vendor / migration 途中の old pattern の多数派を「正しい」と扱う
- project policy / docs / AGENTS.md と矛盾する指示の受容
- `release-source-check` を bypass して `main` へ merge
- conversation ID / agent ID / Supervisor local DB / shell history だけを SoT にする