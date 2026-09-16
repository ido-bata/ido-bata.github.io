# Contradictory control (FAIL)

This fixture exercises the **latent contradiction** that PR #98 review
thread #4026270165 called out: an answer that *affirms* the
canonical-surface marker ("Projects v2 is display") yet *recommends*
writing to the Projects field as the primary path. The grader must
reject this even though both halves of the sentence read as
policy-aligned individually.

## Example

> **Answer:** The "Blocked / dependency" Projects v2 field is a
> **read-only projection** of the GitHub Issue dependency graph, so
> Projects v2 is display-only at first glance. In practice, however,
> operators should **update the Projects field to create** the
> dependency record, and the Issue graph will reconcile from that
> later. The field acts as a staging surface for write paths.

## Why this must FAIL

- Affirms `canonical_surface_marker` ("read-only projection" /
  "Projects v2 is display") — the grader sees the policy-aligned
  half first.
- Also contains a `projects_first_paraphrase` ("update the Projects
  field to create") that pulls the write path back to Projects v2.
- Net effect: canonical-source ordering is reversed even though the
  surface shape cites `AGENTS.md` correctly. The reader cannot tell
  which side is canonical.
- This is the regression-class defect that motivates separating
  `projects_first_paraphrase` from `projects_first_marker` in the
  grader — pure `projects_first` detection would miss this because
  the literal phrase "edit the Projects field" is absent.

## Grader check

- Detects `canonical_surface_marker` AND `projects_first_paraphrase`
  co-occurring.
- Classifies as `contradictory` (FAIL) — canonical-source violation
  via paraphrase, not via direct edit recommendation.
- Marks the answer FAIL with reason: "canonical-surface affirmed yet
  Projects-first write path recommended — latent canonical-source
  violation".
