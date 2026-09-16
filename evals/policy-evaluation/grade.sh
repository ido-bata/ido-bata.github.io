#!/usr/bin/env bash
# `policy-evaluation` Skill §4 (Grader controls) 用の structural grader。
#
# v0.4.0 structural seed: 第一引数で渡された fixture file を読み、
# 「positive / negative / regression のどれとして識別されるか」を
# 判定する。positive fixture なら exit 0、negative / regression
# fixture なら exit 1。
#
# 識別はファイル冒頭の markdown heading に明示されたラベルに従う:
#   "# Positive control (PASS)"
#   "# Negative control (FAIL)"
#   "# Regression control (FAIL)"
#
# 実際の policy 意味採点 (cold eval scenario の中身) は Skill 本体の
# 意味が変わる PR が来た時点で grader を拡張する。
#
# 使い方:
#   bash evals/policy-evaluation/grade.sh path/to/fixture.md
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <fixture.md>" >&2
  exit 2
fi

fixture="$1"

if [[ ! -f "$fixture" ]]; then
  echo "FAIL: fixture not found: $fixture" >&2
  exit 1
fi

# 先頭 5 行を読んで control label を抽出
label=$(head -n 5 "$fixture" | grep -E "^# (Positive|Negative|Regression) control")

if [[ -z "$label" ]]; then
  echo "FAIL: cannot determine control label from $fixture" >&2
  exit 1
fi

case "$label" in
  *"Positive control"*)
    echo "PASS: positive fixture"
    exit 0
    ;;
  *"Negative control"*)
    echo "FAIL: negative fixture"
    exit 1
    ;;
  *"Regression control"*)
    echo "FAIL: regression fixture"
    exit 1
    ;;
  *)
    echo "FAIL: unknown control label: $label" >&2
    exit 1
    ;;
esac
