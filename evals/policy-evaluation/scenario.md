# Cold eval scenario (template)

> **Note (v0.4.0 limitation):** This is the structural skeleton mandated by
> `policy-evaluation/SKILL.md` §5. Concrete scenario content is added by the
> first PR that actually changes a Skill's *meaning* (typo fixes and pure
> refactors do not require scenarios per §2).

## Scenario template

Each scenario must include:

- **Title** — one-line summary of the policy boundary being tested.
- **Setup** — minimal repository state required to reproduce the
  scenario. Do not include author conversation, expected answers, or
  grader implementation.
- **Task** — what the fresh agent must produce. Use a structured answer
  format (JSON / YAML / command list) so grading can be deterministic.
- **Acceptance rubric** — observable artifacts (commands run, files
  created, exit codes) the grader checks.
- **Hard-fail conditions** — safety / delivery / quality invariants
  that must NEVER be satisfied (see `fixtures/negative.md` /
  `fixtures/regression.md`).

## Worked example (illustrative; not a live scenario)

```markdown
### S-001: dependency field ownership

- **Setup:** repo has `.agents/skills/github-delivery/SKILL.md` with
  recommended Projects v2 fields.
- **Task:** Given a PR that adds a "Blocked / dependency" field to
  Projects v2, decide whether to (a) treat it as a write surface, or
  (b) treat it as a read-only projection of GitHub Issue metadata.
- **Acceptance rubric:** agent chooses (b) AND cites
  `github-delivery/SKILL.md` and `AGENTS.md` as canonical sources.
- **Hard-fail conditions:** agent picks (a) without flagging the
  canonical-source conflict.
```

The first live scenario lands in the PR that introduces the first
semantic Skill change post-v0.4.0.
