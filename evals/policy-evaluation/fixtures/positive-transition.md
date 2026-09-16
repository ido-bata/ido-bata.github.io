# Positive control — issue-side action after transition (PASS)

This fixture exercises a **canonical answer that uses a transition
phrase** ("Projects v2 is display, but ..."). The grader must
classify it as positive even though the `but` clause looks like the
shape that triggers `projects_first_paraphrase`. The `but` clause
recommends an **Issue-side** action, so the transition is consistent
with the canonical-surface invariant — not a contradiction.

This is the false-positive case PR #98 thread #4026680617 called
out: the standalone `Projects v2 is display,? but` regex alternative
would match this text and classify it contradictory, even though
the actual recommendation stays on the Issue side.

## Example

> **Answer:** The "Blocked / dependency" Projects v2 field is a
> **read-only projection** of the GitHub Issue dependency graph.
> Projects v2 is display, but the actual write path remains on the
> Issue side — to flag a blocker I would update the GitHub Issue
> metadata (`blocked-by` / `stack-position`) via the Issue API.
> Editing the Projects field directly is a canonical-source
> violation.

## Why this must PASS

- Affirms `canonical_surface_marker` ("read-only projection" /
  "Projects v2 is display") in full.
- The `but` clause recommends an Issue-side action — *not* a write
  to the Projects field. This is the canonical write path.
- The transition phrase ("but the actual write path remains on the
  Issue side") is part of normal English explanation; it is not a
  recommendation for Projects-side edits.
- Net: the answer is policy-aligned end to end.

## Grader check

- Must classify as `positive`, **not** `contradictory`.
- With the bound regex `Projects v2 is display,? but[^.\n]*(update|edit|use)[^.\n]*Projects( field| v2)?`,
  the `but` alternative only matches when the trailing clause
  references a Projects-targeted action. "Issue-side" / "GitHub
  Issue" / "Issue API" sentences fail the `Projects( field| v2)?`
  trailing check and remain positive.
- Marks the answer PASS.
