# アーキテクチャ

このドキュメントは `ido-bata/ido-bata.github.io` のシステム構成を、fresh contributor / fresh agent がソースを読まずに把握できる粒度で記述する。

## 全体像

```text
┌────────────────────────────────────────────────────────────────────┐
│  GitHub: ido-bata/ido-bata.github.io                                │
│                                                                    │
│  main  ─────────────► GitHub Pages ─────────► https://ido-bata.github.io/
│   ▲                       ▲                                          │
│   │ PR                    │ deploy                                   │
│   │                       │                                          │
│  release-x-y-z            │                                          │
│   ▲                       │                                          │
│   │ PR                    │                                          │
│   │                       │                                          │
│  <issue-number>           │                                          │
│   ▲                       │                                          │
│   │ issue                 │                                          │
│   │                       │                                          │
│  GitHub Issues ───────────┴── CI (lint / typecheck / build)         │
└────────────────────────────────────────────────────────────────────┘
```

## ディレクトリ構成

```text
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # PR / push 時の lint / typecheck / build
│   │   └── deploy.yml      # main push 時の GitHub Pages デプロイ
│   └── ISSUE_TEMPLATE/     # Issue テンプレート
├── docs/                   # 内部ドキュメント (日本語)
│   ├── architecture.md
│   ├── development.md
│   ├── release.md
│   ├── security.md
│   └── troubleshooting.md
├── src/
│   └── app/                # Next.js App Router
├── public/                 # 静的アセット
├── next.config.ts          # output: "export" 静的書き出し設定
├── package.json            # 依存・スクリプト
├── tsconfig.json
├── eslint.config.mjs
├── .prettierrc.json
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── AGENTS.md               # AI エージェント向け dispatcher
└── CLAUDE.md               # Claude Code 向け dispatcher
```

## レンダリング方式: 静的書き出し (`output: "export"`)

- `next build` が `out/` 配下に HTML / CSS / JS を生成する
- すべて GitHub Pages から静的配信される
- Node.js サーバ・Server Functions・ISR 等の動的機能は **使えない**
- `next/image` の最適化は `images.unoptimized: true` で無効化済み
- Route Handler は `export const dynamic = "force-static"` を明示すれば利用可能

## 配信パイプライン

1. `main` ブランチへ push
2. `.github/workflows/deploy.yml` の `build` ジョブ
   - Bun で依存解決 (`bun install --frozen-lockfile`)
   - `bun run lint` / `bun run typecheck` 実行
   - `bun run build` → `out/` 生成
   - `out/` を Pages artifact としてアップロード
3. `deploy` ジョブ (`needs: build`)
   - `actions/deploy-pages` で GitHub Pages に公開
   - 公開 URL は `https://ido-bata.github.io/`

## 依存方向

```text
src/app/**
   ↓ import のみ許可
public/**
   ↓ 参照
外部 CDN
```

- `src/` から `node_modules` を直接 import する実装は禁止
- `src/` 内の循環 import は禁止
- ランタイム dynamic import は慎重に（静的書き出しでは対応できない場合あり）

## ビルド成果物とキャッシュ

- `out/` — `next build` の出力（GitHub Pages にアップロードされる）
- `.next/` — Next.js の中間キャッシュ（`.gitignore` 済み）
- `node_modules/` — 依存（`.gitignore` 済み）
- `bun.lock` — Bun の lockfile（**コミットする**）
- `.tmp/` — 一時領域（`.gitignore` 済み）

## デザインシステム

[Panda CSS](https://panda-css.com/) を採用する。PostCSS ベース / build-time 生成の
ゼロランタイム CSS-in-JS で、`output: "export"` 環境でも問題なく動作する。

### 構成

| 役割                        | 場所                                                           |
| --------------------------- | -------------------------------------------------------------- |
| 設定エントリポイント        | `panda.config.ts`                                              |
| PostCSS プラグイン設定      | `postcss.config.cjs`                                           |
| トークン / recipes 一覧     | `src/styles/`（`recipes.ts` ほか）                             |
| 生成された runtime ヘルパー | `src/styled-system/`（**`.gitignore` 済み / コミットしない**） |

### ライフサイクル

```bash
bun install        # @pandacss/dev を導入
bun run prepare    # panda codegen → src/styled-system/ を生成
bun run dev        # next dev が PostCSS 経由で Panda を取り込む
bun run build      # next build が静的書き出し時に Panda CSS もバンドル
```

`bun run prepare` は `package.json` の `scripts.prepare` に紐付いており、
`bun install` 初回時にも自動実行される（CI でも再現性確保）。

### トークン設計

- `colors.neutral` / `colors.accent` を生トークンとして定義
- `colors.bg.*` / `colors.fg.*` / `colors.border.*` / `colors.accent.*` を
  semantic token として定義し、`{base, _dark}` でダークモード対応
- spacing / radii / fonts / fontSizes / fontWeights / lineHeights / shadows を
  用途別のキーで揃える

### 利用方法

- コンポーネント内で `import { css } from "@/styled-system/css"` を使い、
  `css({ ... })` でユーティリティクラスを生成する
- 共通スタイルは `src/styles/recipes.ts` の `cva()` に切り出す
- 命名衝突を避けるため、CSS Modules（`page.module.css` 等）と併用しない

### 注意点

- `panda.config.ts` の `exclude` には glob pattern（`"**/styled-system/**"` 等）を
  使う。RegExp（`/styled-system/` 等）は Node 24 + Panda 1.12.1 で
  `Expected a string` エラーを誘発する（設定の JSON 化時に `{}` になるため）。
- `globals.css` にはリセットを書かない。リセットは Panda の `preflight: true` が
  PostCSS 経由で出力する。

## 画像最適化

現状は `images.unoptimized: true` で完全無効化。  
将来的に最適化が必要になった場合はカスタムローダーを導入する（Next.js 公式 `static-exports` ガイド参照）。

## アーキテクチャ決定記録（ADR）

設計上の重要な決定は `docs/adr/` 配下の ADR として記録する。

- [ADR-0001: GitHub Pages (organization page) + Next.js output: "export" で配信する](./adr/0001-static-export-github-pages.md)

## アーキテクチャ変更時の手順

1. Issue を起票し、影響範囲と ADR 候補かを明示する
2. 大きな決定は `docs/architecture.md` か `docs/adr/` 配下に ADR を残す
3. 関連ドキュメント（`README.md`, `docs/development.md` 等）を同じ PR で更新する
