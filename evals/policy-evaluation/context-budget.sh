#!/usr/bin/env bash
# `policy-evaluation` Skill §3 (Cold eval contract) / §5 (Eval fixture
# structure) の context budget sanity check.
#
# v0.4.0 では structural seed しか入っていないため、本 script は
# 「必須 file が全て存在し、grader が deterministic 採点できる最低限の
# 構造を持つ」ことを assert する。policy 意味評価 (cold eval scenario
# の中身) は Skill 本体の意味が変わる PR が来た時点で追加する。
#
# 使い方:
#   bash evals/policy-evaluation/context-budget.sh
#
# 終了コード:
#   0 — structural context budget OK
#   1 — required file missing or size anomaly
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

required=(
  "README.md"
  "scenario.md"
  "controls.sh"
  "grade.sh"
  "fixtures/positive.md"
  "fixtures/negative.md"
  "fixtures/regression.md"
)

missing=()
for f in "${required[@]}"; do
  if [[ ! -f "$DIR/$f" ]]; then
    missing+=("$f")
  fi
done

if (( ${#missing[@]} > 0 )); then
  echo "FAIL: missing required files:" >&2
  for f in "${missing[@]}"; do
    echo "  - $f" >&2
  done
  exit 1
fi

# Minimal size sanity: README + scenario + 3 fixtures 合わせて
# ある程度の context を渡す前提。各 file が 100 bytes 以上あれば
# placeholder header ではなく実体があるとみなす。
total_bytes=0
for f in "${required[@]}"; do
  size=$(wc -c < "$DIR/$f")
  if (( size < 100 )); then
    echo "FAIL: $f is suspiciously small ($size bytes)" >&2
    exit 1
  fi
  total_bytes=$(( total_bytes + size ))
done

# 1 cold eval scenario あたりの context budget 上限 (bytes):
# policy-evaluation Skill §3 "fresh agent / fresh context を使用" を
# 満たすための sanity 上限。structural seed 段階では超過しない。
CONTEXT_BUDGET_BYTES=65536

if (( total_bytes > CONTEXT_BUDGET_BYTES )); then
  echo "FAIL: total context ${total_bytes}B exceeds budget ${CONTEXT_BUDGET_BYTES}B" >&2
  exit 1
fi

echo "OK: policy-evaluation context budget sanity passed"
echo "  files:      ${#required[@]}"
echo "  total:      ${total_bytes}B"
echo "  budget:     ${CONTEXT_BUDGET_BYTES}B"
