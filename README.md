# ido-bata / Website

`ido-bata` 組織の公式ウェブサイト。Next.js (App Router) で構築し、`output: "export"` で生成した静的ファイルを GitHub Pages (https://ido-bata.github.io/) に配信している。

## 概要

- フレームワーク: Next.js 16.x (App Router, Turbopack)
- パッケージマネージャ: Bun
- デザインシステム: Panda CSS (PostCSS ベース / build-time 生成)
- レンダリング: 完全静的書き出し (`next build` → `out/`)
- 配信: GitHub Pages (organization page)
- CI/CD: GitHub Actions (`lint` / `typecheck` / `build` / Pages deploy)

## クイックスタート

```bash
bun install
bun run prepare  # Panda CSS の codegen (styled-system 生成)
bun run dev      # http://localhost:3000 でローカル開発
bun run build    # ./out に静的書き出し
bun run start    # ※ output: "export" では next start は使えない（pages 配信は Actions 経由）
```

## デザインシステム

Panda CSS ([panda-css.com](https://panda-css.com/)) を `src/styles/` 配下に集約している。

- `panda.config.ts` — tokens / semanticTokens / recipes / globalCss を定義
- `postcss.config.cjs` — `@pandacss/dev/postcss` を有効化
- `src/styles/recipes.ts` — `cva()` で定義したレシピ
- `src/styled-system/` — `bun run prepare` (panda codegen) で生成 (**コミットしない**)

`src/**/*.ts(x)` 内の `css()` / `cva()` / `styled.*` が Panda にスキャンされ、ビルド時に
静的 CSS が PostCSS 経由で出力される。ランタイム CSS-in-JS オーバーヘッドなし。

## ドキュメント

詳細は `docs/` 配下を参照。

- [`docs/architecture.md`](./docs/architecture.md) — ディレクトリ構成 / 依存方向 / ビルドパイプライン
- [`docs/development.md`](./docs/development.md) — 開発フロー / テスト方針 / デバッグ Tips
- [`docs/release.md`](./docs/release.md) — リリース sprint / ブランチモデル / 配信フロー
- [`docs/security.md`](./docs/security.md) — セキュリティアドバイザリ対応 / Dependabot
- [`docs/troubleshooting.md`](./docs/troubleshooting.md) — よくあるエラーと復旧手順

## コントリビューション

Issue 駆動で進める。フローの詳細は [`CONTRIBUTING.md`](./CONTRIBUTING.md) を参照。

## ライセンス

Private リポジトリ。組織内での利用に限る。