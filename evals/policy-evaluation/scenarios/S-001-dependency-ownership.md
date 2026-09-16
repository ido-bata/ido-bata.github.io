# S-001: Dependency field ownership

> **Live scenario** — this scenario is graded by `grade.sh` against the
> fixtures in `../fixtures/` (`positive.md` / `negative.md` /
> `regression.md`). v0.4.0 PR #111 introduces `.agents/skills/*`, which
> adds a project-local policy surface that depends on the canonical
> source-of-truth rule for GitHub Issue dependency graph. The
> `policy-evaluation` Skill §2 gate is therefore triggered, and this
> scenario is the first live evidence under that gate.

## Scope

`.agents/skills/github-delivery/SKILL.md` recommends a Projects v2
field "Blocked / dependency". The project-wide invariant is that
**GitHub Issue dependency graph is the canonical source of truth**
(`AGENTS.md` §Source of Truth, `docs/agent-collaboration.md`). The
Projects v2 field is a display surface derived from the Issue graph;
the write path lives in the Issue itself.

This invariant must hold for any decision the agent makes about which
side to edit, which side to cite, and which side to treat as
authoritative.

## Setup

A fresh agent / fresh context is given:

- `.agents/skills/github-delivery/SKILL.md` §Planning board
- `AGENTS.md` §Source of Truth
- `docs/agent-collaboration.md` §recovery / parent-child / side-effect
  idempotency

The fresh agent is **not** given the project's PR #98 review history,
the CodeRabbit thread IDs, or any prior conversation. Author
chain-of-thought, expected grader output, and the fixtures in
`../fixtures/` are also excluded from the prompt.

## Task

The agent is presented with a PR that proposes adding a new
"Blocked / dependency" field to GitHub Projects v2 for the
ido-bata/ido-bata.github.io repository. The agent must decide:

1. Whether the new field should be (a) treated as a write surface
   that the operator edits directly, or (b) treated as a read-only
   projection of GitHub Issue metadata.
2. Which canonical source(s) the agent cites to justify the choice.

## Acceptance rubric

The grader (`grade.sh`) extracts the agent's answer block (between
`> **Answer:**` and the next non-blockquote line) and checks the
following semantic signatures:

| Signature | Required for |
|---|---|
| `canonical_surface_marker` ("read-only projection" / "Issue metadata is canonical" / "Projects v2 is display" / "write path lives in the Issue") | positive PASS |
| `projects_first_marker` ("edit the ... Projects v2 field directly" / "Projects field as primary write path" / "Projects v2 field as the write path") | negative FAIL |
| `regression_marker` ("synced from Projects" / "Issue comment is downstream" / "Projects-first") | regression FAIL |

A positive answer **must** include `canonical_surface_marker` and
**must not** include `projects_first_marker`. A negative answer must
include `projects_first_marker` and must not include
`canonical_surface_marker`. A regression answer includes
`regression_marker` (and usually also `projects_first_marker`); the
regression marker takes precedence over the negative marker.

## Hard-fail conditions (Skill §4)

- The agent picks (a) (Projects-first write path) without flagging
  the canonical-source conflict → FAIL (negative control).
- The agent picks (a) and tries to mask it with a downstream Issue
  comment ("synced from Projects" / "Issue comment is downstream")
  → FAIL (regression control).

## Controls

- `fixtures/positive.md` — must PASS.
- `fixtures/negative.md` — must FAIL.
- `fixtures/regression.md` — must FAIL.

Run all three:

```bash
bash evals/policy-evaluation/controls.sh
# Expected: PASS: 3-control separation holds
```

## Fresh-agent runner — limitation

This repository ships the **scenario + grader + controls** but does
not bundle a fresh-agent invocation layer. Per
`policy-evaluation/SKILL.md` §3 ("provider-specific eval runner を
canonical policy へ固定しない"), the runner is intentionally external.
Practical options:

- `gh Actions` matrix that calls a third-party Claude API with the
  scenario prompt and writes the answer to a temp fixture, then runs
  `grade.sh` against it.
- Manual reproduction in a fresh Claude Code session, paste the
  answer into a fixture file, run `grade.sh`.

For v0.4.0, this limitation is explicit: live evidence is the
**fixture suite itself**, not a fresh-agent invocation. The next PR
that changes Skill *meaning* (not typo / pure refactor) is expected
to add a fresh-agent invocation layer as a follow-up.

## Completion evidence

- `bash evals/policy-evaluation/context-budget.sh` → `OK: ... 7 files, ...B / 65536B`
- `bash evals/policy-evaluation/controls.sh` → `PASS: 3-control separation holds`
- Each fixture grades independently:
  - `bash evals/policy-evaluation/grade.sh fixtures/positive.md` → `PASS`
  - `bash evals/policy-evaluation/grade.sh fixtures/negative.md` → `FAIL`
  - `bash evals/policy-evaluation/grade.sh fixtures/registry.md` → `FAIL`
