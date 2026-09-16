# Negative control (FAIL)

This fixture is a **typical but policy-wrong** naive answer. The
grader must mark it FAIL even though it sounds plausible.

## Example

> **Answer:** Just edit the "Blocked / dependency" Projects v2 field
> directly when you want to flag a blocker. It's faster than opening
> an Issue comment.

## Why this must FAIL

- Treats Projects v2 as a write path, contradicting
  `AGENTS.md` §Source of Truth (GitHub Issue dependency graph is
  canonical).
- Bypasses `github-delivery/SKILL.md` §Planning board recommendation
  that the field is a display surface.
- Creates the silent drift CodeRabbit flagged on PR #98: Project field
  value vs. Issue metadata can diverge.

## Grader check

- Detects the "edit the Projects field" recommendation as the primary
  write path.
- Marks the answer FAIL with reason: "canonical-source violation;
  Projects v2 is display, Issue metadata is canonical".
