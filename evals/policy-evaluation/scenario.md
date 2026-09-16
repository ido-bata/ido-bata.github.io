# Cold eval scenario (template)

`policy-evaluation/SKILL.md` §5 mandates the following structure:

```text
evals/<policy-area>/
  scenario.md                  # this template
  scenarios/
    S-NNN-<name>.md            # one or more live scenarios
  grade.sh                     # semantic grader
  controls.sh                  # 4-control driver (positive / negative / regression / contradictory)
  fixtures/
    positive.md
    negative.md
    regression.md
    contradictory.md           # optional: latent canonical-surface-vs-projects-first contradiction
```

## Live scenarios

Live scenarios live under `scenarios/`. Each is a self-contained
spec with:

- **Scope** — which policy invariant is exercised.
- **Setup** — what context the fresh agent receives.
- **Task** — what the fresh agent must produce (structured answer).
- **Acceptance rubric** — the signatures the grader checks.
- **Hard-fail conditions** — Skill §4 invariants.
- **Controls** — which fixtures exercise the scenario.
- **Fresh-agent runner** — how the scenario is invoked (external
  runner by design, per Skill §3).
- **Completion evidence** — how to verify the scenario locally.

The first live scenario in this repo is
[`scenarios/S-001-dependency-ownership.md`](./scenarios/S-001-dependency-ownership.md).

## Adding a new scenario

1. Create `scenarios/S-NNN-<name>.md` with the structure above.
2. Add fresh fixtures under `fixtures/` if the scenario introduces
   new signature phrases (the existing positive / negative /
   regression fixtures can be reused when the signature set matches).
3. Update `controls.sh` if the new scenario needs an additional
   control driver (e.g., a 4th fixture).
4. Document the fresh-agent runner in the scenario file. The runner
   is **not** in this repo by design.
5. Run all controls and paste completion evidence into the PR
   description.
