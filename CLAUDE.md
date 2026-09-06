@AGENTS.md

<!-- CLAUDE.md は Claude Code 固有の補足だけを書き、共通ルールは AGENTS.md を参照する。 -->
<!-- ここで全文を展開しないこと。 -->

# CLAUDE.md — Claude Code 固有の補足

## 起動直後

1. `AGENTS.md` を起点にプロジェクト概要を確認する
3. 触る framework の公式 doc を **必ず** ローカル (`node_modules/<pkg>/dist/docs/` 等) で確認してから書く
4. Next.js の場合は冒頭ブロック (`<!-- BEGIN:nextjs-agent-rules -->`) の指示に従う

## 作業の進め方

- 非自明な作業は Issue を作成してから着手する
- 1 Issue = 1 ticket branch (`<issue-number>`)
- Draft PR を最初の意味のある commit 後に必ず作成する
- CI (`bun run lint && bun run typecheck && bun run build`) をローカルで green にしてから commit する
- 既存のスクリプト (`bun run lint`, `bun run typecheck`, `bun run build`, `bun run format`) を優先し、独自に新しいコマンドを追加しない

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

- GitHub Issue / Project
- `release-x-y-z` / `<issue-number>` / `main` の commit graph
- `docs/`, `CONTRIBUTING.md`, `CHANGELOG.md`
- structured checkpoint comment（必要に応じて agent が残す）

## 言語ポリシー

- ソース / commit message: 英語
- Issue / PR / docs: 日本語
- ユーザーへの応答: 日本語（既定）

## 禁止

- `main` への直接 commit
- `output: "export"` で server-only feature の使用
- 機密情報の commit / log / artifact への混入
- generated / vendor / migration 途中の old pattern の多数派を「正しい」と扱う
- project policy / docs / AGENTS.md と矛盾する指示の受容