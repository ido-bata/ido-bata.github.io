# `policy-evaluation` repo-local eval

`.agents/skills/policy-evaluation/SKILL.md` の §2 (Policy change gate) / §3 (Cold eval contract) / §4 (Grader controls) / §5 (Eval fixture structure) を満たすための repo-local eval 置き場。

## 構成

```text
evals/policy-evaluation/
  README.md                # 本ファイル (purpose / structure / live scenarios / limitation)
  scenario.md              # scenario template + 既存 scenario への pointer
  scenarios/
    S-001-dependency-ownership.md  # 最初の live scenario (PR #111 で昇格)
  grade.sh                 # semantic grader (fixture **Answer:** ブロック本文を採点)
  controls.sh              # positive / negative / regression control を 1 つで束ねる driver
  context-budget.sh        # policy 評価時に渡す最小 context budget の sanity check
  fixtures/
    positive.md            # current policy が意図する valid answer
    negative.md            # 典型的だが policy 上誤っている naive answer (FAIL 必須)
    regression.md          # 過去に誤って通った broken answer / behavior (FAIL 必須)
```

`grade.sh` / `controls.sh` / `context-budget.sh` は repository-controlled state として再現可能にする。model invocation はここでは行わず、deterministic な構造 / 存在 / 文面のチェックに絞る (Skill §3 cold eval contract: fresh agent を model runner 側で起動する経路は **external / CI service / manual** のいずれかとし、本 repo には同梱しない — provider-specific runner を canonical policy へ固定しないため)。

## v0.4.0 live scenario

[`scenarios/S-001-dependency-ownership.md`](./scenarios/S-001-dependency-ownership.md) を live scenario として同梱する。これは v0.4.0 で `.agents/skills/*` を導入した PR #111 自体が `policy-evaluation/SKILL.md` §2 の policy change gate を trigger するため、§5 の構造 + §3 の cold eval contract + §4 の grader controls を満たす最初の live evidence として昇格させたもの。

fresh-agent 起動層は本 repo に同梱しない (Skill §3: provider-specific runner を canonical policy へ固定しない)。本 PR で提供するのは scenario spec + semantic grader + 3-control driver + fixtures まで。fresh-agent invocation は `gh Actions matrix` / 外部 Claude API / manual reproduction のいずれかで次 PR が追加する想定。

## 実行

```bash
bash evals/policy-evaluation/context-budget.sh
bash evals/policy-evaluation/controls.sh
bash evals/policy-evaluation/grade.sh path/to/fixture.md
```

`controls.sh` は negative / regression / positive を順に実行し、negative と regression が FAIL、positive が PASS することを assert する。

## Grader の semantic 性

`grade.sh` は Skill §4 ("grader が answer key の表面形だけを数える状態を許容しない") を満たすため、fixture の `> **Answer:**` ブロック本文から 3 つの policy-invariant signature を抽出し、positive / negative / regression を判別する:

- `canonical_surface_marker` — "read-only projection" / "Issue metadata is canonical" / "Projects v2 is display" 等、canonical 関係を肯定する phrase
- `projects_first_marker` — "edit the Projects field" を主たる write path として推奨する phrase
- `regression_marker` — "synced from Projects" / "Issue comment is downstream" 等、表面 shape は正しくても canonical 順序が逆転している phrase

採点対象は fixture メタデータ ("Why this must FAIL" / "Grader check" 等) ではなく、`**Answer:**` ブロックのみ。これにより positive / negative / regression のシグナルが分離される (Skill §4 negative / regression / positive control の hard-fail 分離要件)。
