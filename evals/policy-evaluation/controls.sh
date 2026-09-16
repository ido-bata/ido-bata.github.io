#!/usr/bin/env bash
# `policy-evaluation` Skill §4 (Grader controls) の negative /
# regression / contradictory / positive control を順に走らせる driver。
#
# v0.4.0 では structural seed のため、各 fixture が「control として
# 期待通りに分離できる」こと (negative / regression / contradictory は
# FAIL シグナルを持ち、positive は PASS シグナルを持つ) を assert する。
# contradictory control は PR #98 review thread #4026270165 follow-up で
# 追加: canonical-surface marker を肯定しつつ Projects-first write を
# 戻す latent contradiction を独立に reject する。
#
# 使い方:
#   bash evals/policy-evaluation/controls.sh
#
# 終了コード:
#   0 — 4 control が期待通りに分離
#         (negative=FAIL, regression=FAIL, contradictory=FAIL, positive=PASS)
#   1 — control 分離失敗 (grader が surface shape だけで PASS させた等)
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRADER="$DIR/grade.sh"

if [[ ! -x "$GRADER" && ! -f "$GRADER" ]]; then
  echo "FAIL: grader not found: $GRADER" >&2
  exit 1
fi

# 1. negative は FAIL しなければならない
if "$GRADER" "$DIR/fixtures/negative.md" >/dev/null; then
  echo "FAIL: negative control unexpectedly PASSed" >&2
  echo "  grader is not detecting the policy violation" >&2
  exit 1
fi
echo "OK: negative control correctly rejected"

# 2. regression は FAIL しなければならない (表面 shape が正しくても FAIL)
if "$GRADER" "$DIR/fixtures/regression.md" >/dev/null; then
  echo "FAIL: regression control unexpectedly PASSed" >&2
  echo "  grader is fooled by surface shape (latent-defect detection broken)" >&2
  exit 1
fi
echo "OK: regression control correctly rejected"

# 3. contradictory は FAIL しなければならない (canonical-surface 肯定 +
#    projects-first paraphrase を併存する latent violation も単独で reject)
if "$GRADER" "$DIR/fixtures/contradictory.md" >/dev/null; then
  echo "FAIL: contradictory control unexpectedly PASSed" >&2
  echo "  grader is not separating canonical-surface affirmation from projects-first paraphrase" >&2
  exit 1
fi
echo "OK: contradictory control correctly rejected"

# 4. positive は PASS しなければならない
if ! "$GRADER" "$DIR/fixtures/positive.md" >/dev/null; then
  echo "FAIL: positive control unexpectedly rejected" >&2
  echo "  grader is too strict or policy intent is misread" >&2
  exit 1
fi
echo "OK: positive control correctly accepted"

echo "PASS: 4-control separation holds"
