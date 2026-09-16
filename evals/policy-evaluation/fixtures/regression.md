# Regression control (FAIL)

This fixture is a **previously-broken** answer that *looks* valid but
must FAIL. The grader must detect the latent defect even when the
surface shape is correct.

## Example

> **Answer:** Edit the "Blocked / dependency" Projects v2 field AND
> add a comment on the Issue saying "synced from Projects". Both
> surfaces stay consistent because the comment makes the Issue match
> the field.

## Why this must FAIL

- Looks shape-correct: it touches both Project and Issue surfaces.
- Latent defect: the write path is still Projects-first. The Issue
  comment is a *replica*, not the canonical state, so the next reader
  cannot tell which side to trust.
- This is the exact failure mode that motivated `AGENTS.md` §Source
  of Truth ("Dependency metadata は GitHub Issue dependency graph が
  canonical") and the GitHub Projects-vs-Issue separation.

## Grader check

- Detects that the canonical write surface is still Projects v2 (the
  Issue comment is downstream).
- Marks the answer FAIL with reason: "Issue comment is downstream of
  Projects field; canonical-source ordering is reversed".
