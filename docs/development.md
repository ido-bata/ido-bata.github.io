# 開発ガイド

ローカルでのセットアップ・開発・デバッグ・テスト方針。

## 必要なもの

- Bun (>= 1.2): `curl -fsSL https://bun.sh/install | bash`
- Git
- （推奨）`bunx skills` で Agent Skills を更新可能

`rg` (ripgrep) があれば検索が高速。なくてもよい。

## 初回セットアップ

```bash
git clone git@github.com:ido-bata/ido-bata.github.io.git
cd ido-bata.github.io
bun install
```

## よく使うコマンド

| コマンド                   | 用途                                         |
| -------------------------- | -------------------------------------------- |
| `bun run dev`              | ローカル開発 (http://localhost:3000)         |
| `bun run build`            | 本番ビルド (`./out` に静的書き出し)          |
| `bun run lint`             | ESLint                                       |
| `bun run typecheck`        | TypeScript 型チェック                        |
| `bun run format`           | Prettier で一括整形                          |
| `bun run format:check`     | CI 用: 整形済みかを検査                      |
| `bun run test`             | テスト実行（`test:unit` + `test:e2e`）       |
| `bun run test:unit`        | Vitest（happy-dom, React Testing Library）   |
| `bun run test:e2e`         | Playwright（Chromium, `tests/e2e/**`）       |
| `bun run test:e2e:install` | Playwright ブラウザ初期化（Chromium + 依存） |

## 開発フロー

1. Issue を確認 / 作成する
2. `release-x-y-z` から branch を切る: `git checkout -b <issue-number> release-x-y-z`
3. 実装し、`bun run lint && bun run typecheck && bun run build` がローカルで green になることを確認
4. 最初の意味のある commit 後に Draft PR を作る
5. レビュー後に Ready 化し、`release-x-y-z` へマージ
6. sprint の最後に `release-x-y-z` → `main` の release PR で統合

## テスト方針

`bun run test` は `test:unit` と `test:e2e` を順に実行する。

### Unit / Component（Vitest）

- 環境: `happy-dom`（`vitest.config.ts`）
- 配置: `src/**/*.{test,spec}.{ts,tsx}`（実装と隣接）
- React コンポーネントは `@testing-library/react` を使用
- 1 つの Example: `src/app/page.test.tsx`
- ウォッチモード: `bun run test:unit:watch`

### E2E（Playwright）

- ブラウザ: Chromium のみ（依存・実行時間のバランスを優先）
- 配置: `tests/e2e/**/*.spec.ts`
- 設定: `playwright.config.ts`
- 静的書き出し（`./out`）が成果物。`webServer` は設定せず、spec 側で配信を前提にする。
  - ローカル例: `bun run build && (npx http-server out -p 4173 &) && bun run test:e2e`
  - デプロイ済 preview を指す場合: `PLAYWRIGHT_BASE_URL=https://ido-bata.github.io bun run test:e2e`
- 初回のみブラウザを取得: `bun run test:e2e:install`（CI でも実行する想定）

### CI 連携

- `.github/workflows/ci.yml` の `quality` ジョブに `bun run test:unit` を追加する
- Playwright の CI 実行はバンドルサイズ・実行時間の都合で optional。別 Issue で判断する

### テストを追加するときの注意

1. 対象領域を明確にし、過剰なテストを追加しない
2. CI (`ci.yml`) の `quality` ジョブへ組み込み
3. `docs/development.md` を同じ PR で更新

## デバッグ Tips

### `next build` がキャッシュを疑わしい動作をする

```bash
rm -rf .next out node_modules/.cache
bun install
bun run build
```

### Type エラーが Next.js の自動生成型由来

`next-env.d.ts` を再生成:

```bash
rm next-env.d.ts
bun run dev   # 数秒起動して停止
```

### Pages デプロイが失敗する

`docs/troubleshooting.md#pages-deploy-failed` を参照。

## コードスタイル

- Prettier が整形の single source of truth
- ESLint は静的解析と import 規則
- `bun run format` を commit 前に一度通す

## 新規依存の追加

1. 必要性・最終更新・メンテナ・ライセンス・脆弱性を確認
2. `bun add <pkg>` (dev に限る) または `bun add <pkg>` (runtime)
3. `bun.lock` をコミット
4. `package.json` の変更と理由を PR description に書く
