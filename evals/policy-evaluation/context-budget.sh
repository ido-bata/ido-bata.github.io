#!/usr/bin/env bash
# `policy-evaluation` Skill §3 (Cold eval contract) / §5 (Eval fixture
# structure) の context budget sanity check。
#
# Skill §5 の構造 (README + scenario + scenarios/<live> + grade / controls
# + fixtures/{positive,negative,regression}) と各 file の最小サイズを
# assert する。v0.4.0 では最初の live scenario S-001 を同梱しているため、
# 本 script は "structural seed のみ" の sanity から live scenario 込みの
# sanity へ役割が変わっている。
#
# 使い方:
#   bash evals/policy-evaluation/context-budget.sh
#
# 終了コード:
#   0 — context budget OK (live scenario + grader 構造が健全)
#   1 — required file missing or size anomaly
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

required=(
  "README.md"
  "scenario.md"
  "scenarios/S-001-dependency-ownership.md"
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

# Minimal size sanity: README + scenario + live scenario + 3 fixtures
# 合わせてある程度の context を渡す前提。各 file が 100 bytes 以上
# あれば placeholder header ではなく実体があるとみなす。
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
# 満たすための sanity 上限。v0.4.0 の live scenario 込みでも超過しない。
CONTEXT_BUDGET_BYTES=65536

if (( total_bytes > CONTEXT_BUDGET_BYTES )); then
  echo "FAIL: total context ${total_bytes}B exceeds budget ${CONTEXT_BUDGET_BYTES}B" >&2
  exit 1
fi

echo "OK: policy-evaluation context budget sanity passed"
echo "  files:      ${#required[@]}"
echo "  total:      ${total_bytes}B"
echo "  budget:     ${CONTEXT_BUDGET_BYTES}B"
