# ido-bata / Website

`ido-bata` 組織の公式ウェブサイト。Next.js (App Router) で構築し、`output: "export"` で生成した静的ファイルを GitHub Pages (https://ido-bata.github.io/) に配信している。

## 概要

- フレームワーク: Next.js 16.x (App Router, Turbopack)
- パッケージマネージャ: Bun
- レンダリング: 完全静的書き出し (`next build` → `out/`)
- 配信: GitHub Pages (organization page)
- CI/CD: GitHub Actions (`lint` / `typecheck` / `build` / Pages deploy)

## クイックスタート

```bash
bun install
bun run dev      # http://localhost:3000 でローカル開発
bun run build    # ./out に静的書き出し
bun run start    # ※ output: "export" では next start は使えない（pages 配信は Actions 経由）
```

## ドキュメント

詳細は `docs/` 配下を参照。

- [`docs/architecture.md`](./docs/architecture.md) — ディレクトリ構成 / 依存方向 / ビルドパイプライン
- [`docs/development.md`](./docs/development.md) — 開発フロー / テスト方針 / デバッグ Tips
- [`docs/release.md`](./docs/release.md) — リリース sprint / ブランチモデル / 配信フロー
- [`docs/security.md`](./docs/security.md) — セキュリティアドバイザリ対応 / Dependabot
- [`docs/troubleshooting.md`](./docs/troubleshooting.md) — よくあるエラーと復旧手順
- [`docs/adr/`](./docs/adr/) — 設計の決定は ADR を参照

## コントリビューション

Issue 駆動で進める。フローの詳細は [`CONTRIBUTING.md`](./CONTRIBUTING.md) を参照。

## ライセンス

Private リポジトリ。組織内での利用に限る。