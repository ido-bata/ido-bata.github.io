# リリースガイド

スプリント・ブランチモデル・公開フローの定義。

## リリースモデル概要

```text
main                  released source
└─ release-x-y-z      active sprint integration
   ├─ 123             Issue = ticket branch (independent)
   └─ 124 -> 123      stacked PR (linear hard dependency)
       └─ 125 -> 124
```

| ref              | 役割                                                  |
| ---------------- | ----------------------------------------------------- |
| `main`           | released / integrated source state (public, protected) |
| `release-x-y-z`  | アクティブ sprint の統合先                            |
| `<issue-number>` | 1 Issue に対応する ticket branch (1 Issue = 1 branch) |

- `x.y.z` は sprint が目指す target version (Semantic Versioning)
- `release-x-y-z` は `main` から派生する
- `<issue-number>` は `release-x-y-z` から派生する（緊急時のみ `main` 直でも可）
- `main` 直接 commit は禁止
- `main` への正規 delivery path は `release-x-y-z -> main` の release PR のみ
- `release-source-check` required status check が `base==main` の PR head が `release-*` pattern に一致することを enforce する
- 詳細は [ADR-0003](./adr/0003-release-branch-stack-protection.md)

## リリース計画 (planned release)

リリースは **ad-hoc merge せず、計画的に行う**。

- 各 sprint に「**予定リリース日**」を決める（例: `2026-09-20`）
- 予定リリース日の **N 日前（既定: 3 営業日）** から **freeze 期間** に入り、新規 ticket branch / scope 追加を受け付けない
- freeze 期間中は既存 ticket の bug fix のみ可
- 予定リリース日に `release-x-y-z` → `main` を一括 merge し、CHANGELOG 確定・タグ付け・Pages デプロイを行う
- merge の瞬間が release event。予定日が前後する場合は Issue / Project / CHANGELOG を更新する
- release planning の Status / Priority / Target Version / Area は GitHub Projects v2 (Kanban) を control plane として一元管理する
- dependency metadata (blocked / blocks) は GitHub Issue dependency graph が canonical で、Projects は表示用の mirror に留めない

### Cadence

| 種別            | 周期                  | 補足                                     |
| --------------- | --------------------- | ---------------------------------------- |
| minor (`x.y`)   | **1 週間** を基準    | planning cadence。新機能・破壊的変更を含む |
| patch (`x.y.z`) | 随時                  | バグ修正のみ。`release-x-y-z` から派生   |
| hotfix          | 即時                  | `release-x-y-z-patch` を `main` から派生 |

sprint = 1 週間は planning cadence であり、選択した scope が 1 週間で完了するという工数保証ではない。
release date / roadmap / capacity の見積もりは throughput / dependency / human/CI/external wait
を evidence-based で評価し、主観的な日数に依存しない。

実際の sprint 計画は GitHub Project の **Target Version** で管理する。Project の Milestone view / Roadmap view で全 sprint の予定日を一覧化する。

### Freeze 期間の運用

| 状態            | branch 派生 | merge | commit       |
| --------------- | ----------- | ----- | ------------ |
| 通常期間        | 可          | 可    | 可           |
| **freeze 期間** | **禁止**    | 可    | bug fix のみ |
| release 実行中  | 禁止        | 禁止  | 禁止         |

freeze は `release-x-y-z` にラベル `release-freeze` を貼って可視化する。GitHub Projects の Status `Freeze` カラムで board 上も識別可能にする。

### Sprint planning checklist

- [ ] 予定リリース日を決める（1 週間後を既定）
- [ ] 含める Issue を確定（acceptance criteria 込み）
- [ ] owner を issue 単位にアサイン
- [ ] freeze 開始日を逆算して Project に登録
- [ ] CHANGELOG の `[Unreleased]` を該当 version セクションに下書き移動
- [ ] `release-x-y-z` を `main` から派生
- [ ] first meaningful integrated difference が入った時点で release PR を Draft 作成（zero-diff の間は作成不要）

## スプリントの開始

1. 直近の `main` から `release-x-y-z` を作成: `git checkout -b release-x-y-z main`
2. 該当スプリントで扱う Issue を Project (Kanban) の Ready カラムへ移動
3. **予定リリース日** と **freeze 開始日** を Issue / PR / CHANGELOG に明記
4. 関係者間で目標・Done 条件を共有

## スプリント中の作業

### Independent ticket

- 各 Issue に対応する ticket branch (`<issue-number>`) を `release-x-y-z` から派生
- 最初の意味のある commit 後に Draft PR を `<issue-number>` → `release-x-y-z` で作成
- canonical start: branch 作成 → first meaningful commit → remote publish → remote branch head SHA 確認 → Draft PR 作成 → Issue linkage / assignee / reviewer / labels / target release 設定 → implementation 継続
- Draft PR を「実装完了時に作る」運用や first commit を local だけに残す運用は禁止 (human / Coordinator / worker / subagent すべて)
- remote publication / PR mutation 権限がない worker は first meaningful commit 後ただちに Coordinator / Supervisor へ handoff し、publish + Draft PR 作成が終わるまで追加 implementation を進めない

### Stacked PR (same-release linear hard dependency)

same repository・same target release 内に real linear hard dependency がある場合のみ、
dependent ticket PR を immediate predecessor ticket branch へ stack してよい。

```text
123 -> release-x-y-z       # independent ticket
124 -> 123                 # 124 hard-blocks-by 123
125 -> 124                 # 125 hard-blocks-by 124
```

stack を使う条件:

- same repository
- same target release
- real hard dependency (UI contract / generated artifact / data migration など)
- predecessor に reviewable immutable commit / snapshot が存在する

dependency DAG を無理に 1 本の stack に変換しない。1 Issue を複数 durable PR へ細切れにする目的だけで stack を使わない。

### Stack-ready execution

- predecessor が release へ未 merge でも、reviewable immutable predecessor snapshot があれば dependent worker を開始できる
- 開始時に predecessor Issue / PR identity、exact predecessor SHA / snapshot、common target release、immediate PR base を記録する
- predecessor review で変更が入り downstream branch を rebase / update した場合、変更後 SHA に対して affected required validation を再実行する (stale green を流用しない)
- native stacked PR では contiguous stack landing で target release trunk に到達した ticket だけを Done にする。`124 -> 123` のような intermediate predecessor branch merge だけでは Issue #124 を close / Done にしない
- non-default branch への merge では closing keyword だけに依存しない

### Draft → Ready / Done

- Draft → Ready: acceptance criteria 実装 / CI green (current SHA) / blocker 解消 / PR description / assignee / labels / reviewer metadata が現状と一致 / required reviewer request 済み / target release branch or immediate predecessor との staleness / conflict 処理済み / predecessor 変更に伴う downstream reconciliation 済み / latest durable checkpoint と branch state が矛盾しない
- Done (GitHub Projects control plane 採用時): required CI green / blocking review resolved / **ticket changes が target release trunk へ land 済み** / Issue を明示 close / Project の ticket status を Done へ

## リリースゲート (`release-x-y-z` → `main`)

### Draft release PR の invariant

`release-x-y-z` は `main` と zero-diff の間は Draft release PR を **作成不要**。
最初の meaningful integrated difference が入ったら Draft release PR を **必須** とする。
Draft release PR には assignee / reviewer / labels / release goal / included Issues を設定し、
sprint 中の durable release surface として維持する。

### release gate checklist

`release-x-y-z` から `main` への PR を作成する前に:

- [ ] release-wide verification (CI / smoke / critical E2E)
- [ ] 破壊的変更が CHANGELOG に明記されている
- [ ] migration notes が必要な変更は本文に記載
- [ ] すべての Issue が closed 済み、または scope 外として明記
- [ ] PR description が現状と一致
- [ ] `release-source-check` が green

PR を merge した瞬間に `main` が該当 version の released state になる。
merge そのものは explicit user authorization 境界に従う (reviewer / CODEOWNERS approval は前提条件、
merge 実行権限は user が保持。Agent は ready-to-merge 状態で停止し、現状を report する)。

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

## 関連ドキュメント

- [`docs/architecture.md`](./architecture.md) — 配信パイプライン / ビルド成果物
- [`docs/development.md`](./development.md) — ローカル開発・テスト
- [`docs/security.md`](./security.md) — advisory 対応
- [`docs/agent-collaboration.md`](./agent-collaboration.md) — fresh agent / recovery / parent-child / side-effect
- [`docs/adr/0003-release-branch-stack-protection.md`](./adr/0003-release-branch-stack-protection.md) — release branching / stack / main protection 契約
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — 開発フロー / PR ルール
