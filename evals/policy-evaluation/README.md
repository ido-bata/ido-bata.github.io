# `policy-evaluation` repo-local eval

`.agents/skills/policy-evaluation/SKILL.md` の §2 (Policy change gate) / §3 (Cold eval contract) / §4 (Grader controls) / §5 (Eval fixture structure) を満たすための repo-local eval 置き場。

## 構成

```text
evals/policy-evaluation/
  README.md          # 本ファイル (purpose / structure / limitation)
  scenario.md        # cold eval 用 scenario (fresh agent / cold context)
  grade.sh           # grader (artifact 採点。deterministic 中心)
  controls.sh        # positive / negative / regression control を 1 つで束ねる driver
  context-budget.sh  # policy 評価時に渡す最小 context budget の sanity check
  fixtures/
    positive.md      # current policy が意図する valid answer
    negative.md      # 典型的だが policy 上誤っている naive answer (FAIL 必須)
    regression.md    # 過去に誤って通った broken answer / behavior (FAIL 必須)
```

`grade.sh` / `controls.sh` / `context-budget.sh` は repository-controlled state として再現可能にする。model invocation はここでは行わず、deterministic な構造 / 存在 / 文面のチェックに絞る (Skill §3 cold eval contract: fresh agent を model runner 側で起動する経路は将来追加)。

## v0.4.0 時点の limitation

- 本 PR は project-init Skills (`.agents/skills/*`) を v0.4.0 scope に導入した最初の commit であり、本 eval scaffolding を **seed** として用意する。具体的 policy change scenario と grader は Skill 本体の意味を変える PR が来た時点で追加する (Skill §2: 「小さな誤字修正や意味を変えない refactor へ無意味な eval を増やさない」)。
- したがって v0.4.0 では `grade.sh` は **構造 + control file の存在 + 必須項目 coverage** のみを採点対象とし、policy 意味解釈の cold eval は次回の Skill 修正 PR で追加する。

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
