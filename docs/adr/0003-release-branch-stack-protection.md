---
title: "release branching / stacked PR / main protection 契約"
adr_id: "0003"
status: "Accepted"
date: "2026-09-16"
deciders: ["samuido"]
---

# Context

`ido-bata/ido-bata.github.io` は public organization website。`main` ブランチが
released source state であり、GitHub Pages の配信元になる。

これまで release 系の branch model / stacked PR / main protection 契約は
`AGENTS.md` / `CLAUDE.md` / `docs/release.md` / `CONTRIBUTING.md` に分散して記述
されており、policy 全体の source of truth と ADR としての canonical 記録を持っていなかった。

複数 AI エージェントが独立 sandbox で並行作業し、weekly release sprint へ
決定論的に統合する project-local 開発環境では、次の契約を明示する必要がある:

1. `main` を released source として保護し、direct push / direct web edit / force / deletion を禁止する
2. `main` への正規 delivery path を `release-x-y-z -> main` の release PR に限定する
3. branch protection だけでは PR head の `release-*` 制約が表現できないため、
   required status check で enforce する
4. active durable ticket branch は published remote head + Draft PR を必ず持つ
5. same-release linear hard dependency は stacked PR を許可する
6. release PR merge は explicit user authorization 境界に従う (Agent は ready-to-merge で停止)

# Decision

`ido-bata/ido-bata.github.io` の release branching / stacked PR / main protection
契約は次を満たす。

## 1. Branch topology

```text
main                 released source (protected)
└─ release-x-y-z     active sprint integration
   ├─ <issue-number>              # independent ticket
   └─ <issue-number-A>            # stacked PR (base = predecessor)
      └─ <issue-number-B>         # stacked PR (base = predecessor)
```

- `main` への commit は release PR merge 経由のみ
- `release-x-y-z` は `main` から派生
- `<issue-number>` は `release-x-y-z` (or stacked predecessor) から派生
- branch 名は Issue 番号のみ。prefix / slug / work-type は禁止
- 説明責務は Issue / PR に書き、branch 名には持たせない

## 2. Main branch protection (public repo)

| 設定                       | 値                                                                |
| -------------------------- | ----------------------------------------------------------------- |
| `required_linear_history`  | true                                                              |
| `allow_force_pushes`       | false                                                             |
| `allow_deletions`          | false                                                             |
| `required_conversation_resolution` | true                                                      |
| `enforce_admins`           | true                                                              |
| `required_pull_request_reviews` | `required_approving_review_count: 1`, `dismiss_stale_reviews: true` |
| `required_status_checks`   | `ci / quality`, `ci / e2e`, `release-source-check` (strict)        |

`release-source-check` は `.github/workflows/release-source-check.yml` で実装し、
`base == main` かつ `head_ref` が `release-*` pattern に一致する場合のみ success を返す。
これにより branch protection だけでは表現できない "PR head は release-* のみ" を
required status check として enforce する。

## 3. Active durable ticket branch の contract

active durable ticket branch は次の invariant を満たす:

- branch 作成直後に first meaningful commit を作る
- その commit を canonical remote へ publish する
- remote branch head SHA が first meaningful commit SHA と一致することを確認する
- 直後に Draft PR を作る (Issue linkage / assignee / reviewer / labels / target release / stack context を設定)
- 以降 implementation を継続する

Draft PR を「実装完了時に作る」運用、first commit を local だけに残す運用、
remote publication / PR mutation 権限がない worker が publish + Draft PR 完了を
待たずに追加 implementation を進める運用は、すべて禁止。

## 4. Stacked PR

same repository・same target release 内に real linear hard dependency がある場合のみ、
dependent ticket PR を immediate predecessor ticket branch へ stack することを許可する。

- branch topology: `123 -> release-x-y-z` / `124 -> 123` / `125 -> 124`
- stack members は共通の target release branch を stack trunk として持つ
- 1 Issue を複数 durable PR へ細切れにする目的だけで stack を使わない
- dependency DAG を 1 本の chain へ無理に変換しない

### Stack-ready execution

- predecessor が release へ未 merge でも、reviewable immutable predecessor snapshot が
  あれば dependent worker を開始できる
- 開始時に predecessor Issue / PR identity、exact predecessor SHA、common target release、
  immediate PR base を記録する
- predecessor review で変更が入り downstream branch を rebase / update した場合、
  変更後 SHA に対して affected required validation を再実行する (stale green を流用しない)

### Done boundary

native stacked PR では contiguous stack landing で target release trunk に到達した
ticket だけを Done にする。`124 -> 123` のような intermediate predecessor branch merge
だけでは Issue #124 を close / Done にしない。

## 5. Release PR contract

`release-x-y-z` は `main` と zero-diff の間は Draft release PR を **作成不要**。
最初の meaningful integrated difference が入ったら Draft release PR を **必須** とする。

Draft release PR には assignee / reviewer / labels / release goal / included Issues を
設定し、sprint 中の durable release surface として維持する。

native CI checks (GitHub Actions / workflow run) が available な repository では、
native checks を canonical evidence とし、ready-to-merge semantic は GitHub UI 上の
required check status で判定する。validated SHA pinned reference と workflow run status の
PR 本文への pin / 転写は、reader が evidence を再 fetch する必要が生じた場合に限り
行い、Draft → Ready / merge candidate の必須 rule として固定化しない。

## 6. Merge authorization

`release-x-y-z -> main` を含む PR merge は explicit user authorization 境界に従う。
reviewer / CODEOWNERS approval は merge の前提条件だが、merge を実行する権限そのものは
user が保持する。Agent は release-wide verification 完了 + release gate green +
ready-to-merge 状態まで進めた時点で ready-to-merge で停止し、現在状態 (head SHA /
required checks / outstanding review conversations) を report する。

authorization 取得のためだけに追加の質問は行わない。merge は user が明示的に
authorization した時にのみ実行する。

# Alternatives Considered

## GitHub Rulesets (新 UI)

- 利点: branch pattern の restrict が protection より柔軟
- 欠点: 2026-09 時点で GitHub Pages deploy ワークフローと ruleset bypass actor の
  設定が environment と組み合わせると複雑なため、protection + required check の組合せで
  同一効果が得られるなら追加 surface を増やさない方が運用負荷が低い
- 不採用理由 (暫定): protection + required status check の組合せで head pattern を
  enforce できる。Ruleset は将来 ruleset-only repository policy へ移行する段階で再評価

## Linear profile を併用する control plane

- 利点: release planning UI がリッチ
- 欠点: GitHub Projects と二重 canonical になりやすい
- 不採用理由: dependency metadata を GitHub Issue dependency graph に集約し、Projects を
  Status / Priority / Target Version 表示に限定する運用が現時点では最小 surface

## native stacked PR を使わず sequential merge のみ

- 利点: simple
- 欠点: hard dependency を持つ ticket の先行 merge を待たないと後続の CI を走らせられず、
  weekly sprint cadence と独立並列化が崩れる
- 不採用理由: same-release linear hard dependency に対して stack-ready execution を許可する
  ことで weekly sprint の throughput を維持できる

# Consequences

Positive:

- public repository の main protection が release policy と整合
- "release-* のみ main へ merge" が branch protection + required check で機械的に enforce
- weekly sprint cadence と stacked PR の組合せで hard dependency を保ちつつ並列化可能
- fresh agent が contract だけで workflow を再開できる

Negative:

- `release-source-check` workflow を bypass しない運用が必要 (admin token を濫用しない)
- stacked PR の rebase / update 時に downstream の revalidation コストが増える
- GitHub Projects を control plane に固定するため、将来 Linear 等へ移す場合は
  Projects Status と二重管理にならないよう明示的に移行する必要がある

Neutral:

- ticket branch 名は Issue 番号のみなので、外部 reviewer / contributor には ticket
  branch 単体での文脈が見えない。Issue / PR description で文脈を提供する運用は不変

# Follow-ups

- GitHub Projects v2 (Kanban) の Status / Priority / Target Version field 設定を再評価し、
  freeze 期間中の `Status: Freeze` カラムが board で識別できることを確認する
- `release-source-check` を ruleset へ移行するかは 2026-Q4 の GitHub 機能成熟度を再評価する
- native stacked PR のみで対応できない multi-base dependency が現れた場合、stack を
  fan-out する extension (例: Graphite) を再評価する
