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

| ref              | 役割                                                  |
| ---------------- | ----------------------------------------------------- |
| `main`           | released / integrated source state                    |
| `release-x-y-z`  | アクティブ sprint の統合先                            |
| `<issue-number>` | 1 Issue に対応する ticket branch (1 Issue = 1 branch) |

- `x.y.z` は sprint が目指す target version (Semantic Versioning)
- `release-x-y-z` は `main` から派生する
- `<issue-number>` は `release-x-y-z` から派生する（緊急時のみ `main` 直でも可）
- `main` 直接 commit は禁止

## リリース計画 (planned release)

リリースは **ad-hoc merge せず、計画的に行う**。

- 各 sprint に「**予定リリース日**」を決める（例: `2026-09-20`）
- 予定リリース日の **N 日前（既定: 3 営業日）** から **freeze 期間** に入り、新規 ticket branch / scope 追加を受け付けない
- freeze 期間中は既存 ticket の bug fix のみ可
- 予定リリース日に `release-x-y-z` → `main` を一括 merge し、CHANGELOG 確定・タグ付け・Pages デプロイを行う
- merge の瞬間が release event。予定日が前後する場合は Issue / Project / CHANGELOG を更新する

### Cadence

| 種別            | 周期                | 補足                                     |
| --------------- | ------------------- | ---------------------------------------- |
| minor (`x.y`)   | 2 週間に 1 回を目安 | 新機能・破壊的変更を含む                 |
| patch (`x.y.z`) | 随時                | バグ修正のみ。`release-x-y-z` から派生   |
| hotfix          | 即時                | `release-x-y-z-patch` を `main` から派生 |

実際の sprint 計画は GitHub Project の **Target Version** で管理する。Project の Milestone view / Roadmap view で全 sprint の予定日を一覧化する。

### Freeze 期間の運用

| 状態            | branch 派生 | merge | commit       |
| --------------- | ----------- | ----- | ------------ |
| 通常期間        | 可          | 可    | 可           |
| **freeze 期間** | **禁止**    | 可    | bug fix のみ |
| release 実行中  | 禁止        | 禁止  | 禁止         |

freeze は `release-x-y-z` にラベル `release-freeze` を貼って可視化する。GitHub Projects の Status `Freeze` カラムで board 上も識別可能にする。

### Sprint planning checklist

- [ ] 予定リリース日を決める
- [ ] 含める Issue を確定（acceptance criteria 込み）
- [ ] owner を issue 単位にアサイン
- [ ] freeze 開始日を逆算して Project に登録
- [ ] CHANGELOG の `[Unreleased]` を該当 version セクションに下書き移動
- [ ] release PR を Draft で作成（merge しない）

## スプリントの開始

1. 直近の `main` から `release-x-y-z` を作成: `git checkout -b release-x-y-z main`
2. 該当スプリントで扱う Issue を Project (Kanban) の Ready カラムへ移動
3. **予定リリース日** と **freeze 開始日** を Issue / PR / CHANGELOG に明記
4. 関係者間で目標・Done 条件を共有

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
