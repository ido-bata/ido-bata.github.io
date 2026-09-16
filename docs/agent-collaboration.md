# Agent collaboration / recovery

複数 AI エージェント（human / Coordinator / Supervisor / worker / subagent）が
独立 sandbox で並行作業し、weekly release sprint へ決定論的に統合するための
project-local 契約。

fresh agent / fresh contributor は chat history や native session なしで、
GitHub Issue / PR / commit graph / `docs/` / checkpoint comment から task を
再構成できることを目標とする。

## Source of Truth

| 用途                  | 場所                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| durable work items    | GitHub Issues (canonical)                                             |
| dependency / stack    | GitHub Issue dependency graph (Projects は表示 mirror)               |
| release planning UI   | GitHub Projects v2 (Kanban) — Status / Priority / Target Version     |
| released source       | `main` ブランチ                                                       |
| active sprint         | `release-x-y-z` ブランチ                                              |
| ticket branch         | `<issue-number>` (1 Issue = 1 branch)                                 |
| review / integration  | Pull Requests (Draft → Ready)                                        |
| source specification  | `docs/`, `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/adr/`             |
| recovery checkpoint   | GitHub Issue / PR / commit graph + 必要なら structured checkpoint comment |

conversation ID / agent ID / Supervisor local DB / shell history は SoT ではない。

## Branch / PR lifecycle

### Ticket branch start contract

active durable ticket branch は次の canonical start を経る:

```text
1. branch 作成 (git checkout -b <issue-number> release-x-y-z)
2. first meaningful commit
3. canonical remote へ publish (git push -u origin <issue-number>)
4. remote branch head SHA が first meaningful commit SHA と一致することを確認
   (git ls-remote origin <issue-number>)
5. Draft PR を作成 (<issue-number> -> release-x-y-z or predecessor)
6. Issue linkage / assignee / reviewer / labels / target release / stack context 設定
7. implementation 継続
```

remote publication / PR mutation 権限がない worker は 2 の直後に Coordinator / Supervisor
へ handoff し、3-6 が完了するまで追加 implementation を進めない。

### Stacked PR contract

- same repository・same target release・real linear hard dependency の場合のみ stack を許可
- base = immediate predecessor ticket branch
- predecessor review で変更が入り downstream を rebase / update した場合、downstream の
  affected required validation を新しい SHA で再実行する (stale green を流用しない)

### Done boundary

- GitHub Projects control plane 採用時: ticket changes が target release trunk へ land 済み、
  Issue を明示 close、Project の ticket status を Done へ
- intermediate predecessor branch merge だけでは Issue を close / Done にしない

## Recovery model

### Failure model

最低限次を想定する:

- model / session context loss
- agent process crash / cancellation
- IDE / terminal restart
- parent agent crash while child continues
- child / subagent crash
- sandbox / container / VM recreation
- Supervisor restart
- transient network / provider failure
- host reboot
- context-window exhaustion

project / provider 要件に応じて machine / provider loss までの RPO / RTO を別途評価する。

### Durable recovery sources (優先順)

1. GitHub Issue / dependency state (canonical SoT)
2. target release branch
3. ticket branch / remote commit graph
4. Draft / Ready PR / assignee / reviewer / labels / review / CI state
5. stack predecessor / pinned predecessor SHA
6. committed design / ADR / Skills / docs
7. immutable worker / subagent results
8. structured recovery checkpoint

### Structured recovery checkpoint (必要時のみ)

private chain-of-thought は保存しない。復旧に必要な外部化可能 state だけを保存する。

```text
schema_version
issue_id
target_release
ticket_branch
pr_number
immediate_pr_base
predecessor_issue_or_pr
predecessor_sha
base_sha
checkpoint_sha_or_snapshot
execution_generation
status
completed_steps
next_steps
pending_validation
active_children
integrated_child_results
external_side_effects
blockers
decision_refs
artifact_refs
updated_at
```

secret / machine-specific absolute path / private reasoning には依存させない。
本プロジェクトでは GitHub Issue / PR comment / commit graph が大半を賄うため、
structured checkpoint は複数 worker が並行する大規模 migration 等で限定的に使う。

### Soft / Hard checkpoint

- soft checkpoint: same host / sandbox 回復向け。local immutable ref / filesystem snapshot
- hard checkpoint: sandbox / provider 失でも復旧する境界。durable ticket では recorded commit が
  canonical remote で到達可能で、remote head identity と Draft PR が追跡できること。
  release branch は zero-diff なら Draft release PR 不要、first-difference 後は Draft release PR が存在すること

### Checkpoint trigger (検討対象)

- meaningful implementation milestone
- risky refactor / migration
- child spawn / child result integration
- long validation
- external side effect
- user / external input 待ち
- provider TTL / shutdown 接近
- graceful cancellation / shutdown signal
- context limit 接近

### Recovery algorithm (fresh agent)

1. Issue / PR / target release / dependency を GitHub から fetch
2. ticket / release branch / remote commit graph / stack relation を fetch
3. durable ticket では published remote head + Draft PR / metadata を確認・修復
4. release branch では zero-diff 例外 / first-difference 後 Draft release PR を確認
5. latest valid checkpoint を読む
6. canonical policy / design / decision refs を確認
7. active children を Supervisor から再発見
8. checkpoint から workspace を recreate
9. completed / pending validation を再評価
10. external side effect の actual remote state を確認
11. stale base / predecessor / conflicting integration を確認
12. remaining plan を再構成
13. safe な最小 verification で reconstructed state を確認
14. execution generation / lease を更新して続行

native resume に成功しても branch / PR / checkpoint との整合を確認してから続行する。

## Parent / child recovery

child lifecycle は parent model process ではなく Supervisor / control plane が所有する。
parent が死亡しても safe なら child を即 cancel しない。

recovered parent / Coordinator は:

- child 一覧を再発見
- input snapshot / predecessor snapshot / execution generation を確認
- running / completed / failed / orphaned を分類
- completed result を immutable result として回収
- durable branch child では published remote head / Draft PR identity / metadata を reconcile
- stale child result は自動統合しない
- 必要なら retry / resume / re-spawn

network partition や timeout 後に旧 agent と新 agent が同時実行される可能性を前提とする。
Supervisor は task ごとに lease または generation / fencing token を持たせる:

- recovery 時に `execution_generation` を進める
- worker result へ generation を付与
- stale generation からの branch integration / external write を拒否
- heartbeat 消失だけで即同一 side effect を再実行しない

同じ ticket branch へ複数 generation が同時 push することを通常運用にしない。

## External side effects / idempotency

Git 外の操作は中断復旧で特に危険。例:

- production / staging deploy (Pages deploy は workflow が冪等)
- DB migration (本プロジェクトは静的サイトなので該当なし)
- package publish (該当なし)
- release / tag creation (GitHub Releases)
- cloud resource mutation (該当なし)
- notification / email / comment creation (Issue / PR comment)
- billing / cost-producing operation (該当なし)

可能なら idempotency key を使う。side effect 前に intent、後に result / remote identifier を
durable journal へ記録し、recovery 時は remote actual state を確認してから retry する。
`command returned no response = operation did not happen` と推測しない。

本プロジェクトでの典型的な side effect:

- Pages deploy: GitHub Actions が再実行可能 (artifact 再生成で冪等)
- Issue / PR comment: remote actual state を確認してから追記
- branch / tag push: ref state を確認してから再 push

irreversible / destructive operation は project policy (irreversible / destructive は
user escalation) に従う。

## CI / quality gate

| level       | command                                       | CI job              |
| ----------- | --------------------------------------------- | ------------------- |
| format      | `bun run format:check`                        | `ci / quality`      |
| lint        | `bun run lint`                                | `ci / quality`      |
| type        | `bun run typecheck`                           | `ci / quality`      |
| unit        | `bun run test:unit`                           | `ci / quality`      |
| build/smoke | `bun run build` → `out/index.html` 存在      | `ci / quality`      |
| E2E         | `bun run test:e2e`                            | `ci / e2e`          |
| release-source | head_ref matches `release-*` when base==main | `release-source-check` |

CI と local gate は同じ deterministic entry point を使う。stacked PR で rebase / update が
入った場合、affected required validation を新 SHA で再実行する。

## Verification taxonomy

| 種別       | 役割                                                                 |
| ---------- | -------------------------------------------------------------------- |
| unit       | 局所 logic / component behavior                                     |
| smoke      | startup / wiring / build artifact 存在                              |
| integration| 複数 component 間の data flow                                       |
| contract   | API / schema / generated interface の compatibility                  |
| E2E        | user / system critical flow を release-like boundary で確認         |
| manual     | automation が不足する UI / native / hardware 領域                    |

変更 surface / risk から required verification level を project-specific に決める。
unit test だけで smoke / integration correctness を証明した扱いにしない。

## Security / privacy

- 機密情報を commit / log / artifact / checkpoint / agent result に含めない
- `.env*` は commit しない。`.env*.example` 形式のみ共有
- `NEXT_PUBLIC_*` のような build-time 公開値に機密を入れない
- secret_scanning / secret_scanning_push_protection / dependabot_security_updates を
  repository で有効化する
- 脆弱性は GitHub Security Advisories 経由で報告 (公開 Issue に書かない)
