# Positive control (PASS)

This fixture represents a valid answer that the current policy
*intends* to allow. The grader must mark it PASS.

## Example

> **Answer:** The "Blocked / dependency" Projects v2 field is a
> **read-only projection** of the GitHub Issue dependency graph. The
> write path lives in the Issue itself (`blocked-by` /
> `stack-position` etc.). Editing the Projects field directly is a
> canonical-source violation.

## Why this is the positive case

- Aligns with `github-delivery/SKILL.md` §Planning board (Blocked /
  dependency is display).
- Aligns with `AGENTS.md` §Source of Truth (GitHub Issue dependency
  graph is canonical).
- Cites both the Skill and the dispatcher.

## Grader check

- Contains the phrase `read-only projection` (or equivalent: "derived
  field", "GitHub Issue 側が canonical").
- Cites at least one of: `github-delivery/SKILL.md`, `AGENTS.md`,
  `docs/agent-collaboration.md`.
- Does not advocate direct edit of the Projects v2 field as the
  write path.
