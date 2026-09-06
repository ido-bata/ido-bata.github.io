# リリースガイド

スプリント・ブランチモデル・公開フローの定義。

## リリースモデル概要

```text
main                  released source
└─ release-x-y-z      active sprint integration
   ├─ 123             Issue = ticket branch
   ├─ 124
   └─ 125
```

| ref                    | 役割                                              |
| ---------------------- | ------------------------------------------------- |
| `main`                 | released / integrated source state                |
| `release-x-y-z`        | アクティブ sprint の統合先                        |
| `<issue-number>`       | 1 Issue に対応する ticket branch (1 Issue = 1 branch) |

- `x.y.z` は sprint が目指す target version (Semantic Versioning)
- `release-x-y-z` は `main` から派生する
- `<issue-number>` は `release-x-y-z` から派生する（緊急時のみ `main` 直でも可）
- `main` 直接 commit は禁止

## スプリントの開始

1. 直近の `main` から `release-x-y-z` を作成: `git checkout -b release-x-y-z main`
2. 該当スプリントで扱う Issue を Project (Kanban) の Ready カラムへ移動
3. 関係者間で目標・Done 条件を共有

## スプリント中の作業

- 各 Issue に対応する ticket branch (`<issue-number>`) を作成
- 最初の意味のある commit 後に Draft PR を `<issue-number>` → `release-x-y-z` で作成
- Draft → Ready: acceptance criteria 実装 / CI green / blocker 解消
- merge 後: Project の Status を Done へ、Issue を close

## リリースゲート (`release-x-y-z` → `main`)

`release-x-y-z` から `main` への PR を作成する前に:

- [ ] release-wide verification (CI / smoke / critical E2E)
- [ ] 破壊的変更が CHANGELOG に明記されている
- [ ] migration notes が必要な変更は本文に記載
- [ ] すべての Issue が closed 済み、または scope 外として明記
- [ ] PR description が現状と一致

PR を merge した瞬間に `main` が該当 version の released state になる。

## GitHub Pages への配信

- **trigger**: `main` への push と手動実行 (`workflow_dispatch`)
- **workflow**: `.github/workflows/deploy.yml`
- **ジョブ**:
  - `build` — Bun install → lint → typecheck → build → artifact upload
  - `deploy` — `actions/deploy-pages` で GitHub Pages に公開
- **concurrency**: 同一 ref での重複デプロイを抑止 (`cancel-in-progress: false`)
- **URL**: https://ido-bata.github.io/

### Pages が壊れたとき

1. `Actions` タブから該当 run を確認
2. 失敗原因が build ならローカルで再現
3. 修正 PR を作り、`main` へ merge すれば自動再 deploy
4. ロールバックが必要なら `Actions` → 直近の green deploy を `Re-run`（artifact は保持されないため、再 build）

## バージョニング

- `package.json` の `version` をリリース時に更新
- タグ (`v0.1.0` 等) は GitHub Releases で作成
- `CHANGELOG.md` の `[Unreleased]` セクションを該当バージョンへ移動

## 緊急修正 (hotfix)

- `main` 直 hotfix は避ける。やむを得ない場合は `release-x-y-z-patch` を `main` から派生させ、修正後 release PR を `main` へ
- critical security fix で sprint を中断する場合は `docs/security.md` を参照