#!/usr/bin/env bash
# `policy-evaluation` Skill §4 (Grader controls) の negative /
# regression / contradictory / positive-transition / positive
# control を順に走らせる driver。
#
# v0.4.0 では structural seed のため、各 fixture が「control として
# 期待通りに分離できる」こと (negative / regression / contradictory は
# FAIL シグナルを持ち、positive / positive-transition は PASS シグナル
# を持つ) を assert する。contradictory control は PR #98 review thread
# #4026270165 follow-up で追加: canonical-surface marker を肯定しつつ
# Projects-first write を戻す latent contradiction を独立に reject する。
# positive-transition control は PR #98 thread #4026680617 follow-up で
# 追加: `Projects v2 is display, but ...` transition 句を使いながら実際は
# Issue-side action を推奨する canonical 答えを過剰に contradictory に
# 分類しない (false-positive 抑止) ことを assert する。
#
# 使い方:
#   bash evals/policy-evaluation/controls.sh
#
# 終了コード:
#   0 — 5 control が期待通りに分離
#         (negative=FAIL, regression=FAIL, contradictory=FAIL,
#          positive=PASS, positive-transition=PASS)
#   1 — control 分離失敗
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

# 3. contradictory は FAIL しなければならない
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

# 5. positive-transition は PASS しなければならない
#    transition 句 ("Projects v2 is display, but ...") を使いながら
#    実際は Issue-side action を推奨する canonical 答えを、
#    contradictory に false-positive 分類していないか確認。
if ! "$GRADER" "$DIR/fixtures/positive-transition.md" >/dev/null; then
  echo "FAIL: positive-transition control unexpectedly rejected" >&2
  echo "  transition 句を持つ canonical 答えを contradictory に false-positive 分類している" >&2
  exit 1
fi
echo "OK: positive-transition control correctly accepted"

echo "PASS: 5-control separation holds"
