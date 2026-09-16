#!/usr/bin/env bash
# `policy-evaluation` Skill §4 (Grader controls) 用の **semantic** grader。
#
# Skill §4 は "graderがanswer keyの表面形だけを数える状態を許容しない" と
# 明示禁止する。最初の structural seed (heading label 依存) は §4 に違反
# するため、本 grader は fixture **本文** から policy invariant の signature
# を抽出し、positive / negative / regression を判別する。
#
# v0.4.0 で運用する policy invariant: GitHub Issue dependency graph は
# canonical source of truth であり、Projects v2 の `Blocked / dependency`
# field は read-only display surface である (write path は Issue 側)。
#
# 本 grader は fixture 内の **`> **Answer:**` ブロック (採点対象の回答本体)
# のみ** を signature 抽出の対象とする。"Why this must FAIL" / "Grader
# check" 等の説明メタデータは採点に含めない (meta-explanation が canonical
# phrase を含むため、採点対象に混ぜると positive と negative の分離が壊れる)。
#
# 3 つの signature:
#   canonical_surface_marker : "read-only projection" / "Issue metadata is
#                              canonical" / "Projects v2 is display" など、
#                              canonical 関係を肯定する phrase。
#   projects_first_marker    : "edit the Projects field" を主たる write
#                              path として推奨する phrase。
#   projects_first_paraphrase: "update the Projects field to create" /
#                              "add a Project entry to record" /
#                              "Projects v2 is display, but ..." など、
#                              canonical_surface を肯定しつつ Projects へ
#                              write を戻す phrase。canonical_surface marker
#                              と共存する latent contradiction を分離する
#                              ための補助 signature。
#   regression_marker        : "synced from Projects" / "Issue comment is
#                              downstream" など、表面 shape は正しくても
#                              canonical 順序が逆転している phrase。
#
# Classification:
#   - regression       : regression_marker present
#   - negative         : projects_first_marker present AND
#                        canonical_surface absent
#   - contradictory    : canonical_surface present AND
#                        projects_first_paraphrase present — Projects v2
#                        を display と肯定しつつ Projects field への
#                        write を主 write path として推奨する latent
#                        canonical-source violation (regression の
#                        前駆)。Skill §4 hard-fail 分離要件を満たしつつ
#                        canonical-surface を肯定した contradiction を
#                        reject する。
#   - positive         : canonical_surface present AND projects_first
#                        absent AND projects_first_paraphrase absent
#   - unknown          : どれも成立しない (grader が invariant を判別
#                        できない)
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

# `> **Answer:**` ブロック (`**Answer:**` 自体を含む) 以降、blockquote
# (`> ...`) が連続する範囲だけを採点対象 answer body として抽出する。
# 空行 / 非 `>` 行でブロック終了。
answer_body=$(awk '
  /^\s*>\s*\*\*Answer:\*\*/ {
    sub(/^\s*>\s*\*\*Answer:\*\*\s*/, "")
    print
    in_block = 1
    next
  }
  in_block && /^\s*>/ {
    sub(/^\s*>\s?/, "")
    print
    next
  }
  in_block && /^\s*$/ { next }
  in_block { in_block = 0 }
' "$fixture")

if [[ -z "$answer_body" ]]; then
  echo "FAIL: could not extract **Answer:** block from $fixture" >&2
  exit 1
fi

# Skill §4 hard-fail 分離を支える 3 signature を grep で抽出する。
canonical_surface=0
if grep -qiE \
  "read-only projection|write path lives in the Issue|Projects v2 is display|Issue metadata is canonical|derived .*read-only" \
  <<<"$answer_body"; then
  canonical_surface=1
fi

projects_first=0
if grep -qiE \
  "edit the .Blocked / dependency. Projects v2 field|edit the Projects v2 field directly|edit the Projects field directly|Projects field as primary write path|Projects v2 field as the write path" \
  <<<"$answer_body"; then
  projects_first=1
fi

# canonical-surface を肯定しつつ Projects へ write を戻す latent
# contradiction 検出。canonical_surface marker と共存できるため独立 signature
# として扱う。PR #98 review thread #4026270165 follow-up で要求された
# "Projects v2 is display, but update the Projects field to create..."
# 系の paraphrase を捕捉する。
projects_first_paraphrase=0
if grep -qiE \
  "update the Projects( field)? to create|update the Projects( field)? to record|add a Project entry to record|Projects v2 is display,? but[^.\n]*(update|edit|use)[^.\n]*Projects( field| v2)?|though Projects v2 is display,? (still )?(update|edit|use)[^.\n]*Projects( field| v2)?" \
  <<<"$answer_body"; then
  projects_first_paraphrase=1
fi

regression_marker=0
if grep -qiE \
  "synced from Projects|Issue comment is downstream|Projects-first" \
  <<<"$answer_body"; then
  regression_marker=1
fi

# 分類
classified="unknown"
if [[ $regression_marker -eq 1 ]]; then
  classified="regression"
elif [[ $projects_first -eq 1 && $canonical_surface -eq 0 ]]; then
  classified="negative"
elif [[ $canonical_surface -eq 1 && $projects_first_paraphrase -eq 1 ]]; then
  classified="contradictory"
elif [[ $canonical_surface -eq 1 && $projects_first -eq 0 ]]; then
  classified="positive"
fi

case "$classified" in
  positive)
    echo "PASS: positive (canonical-surface marker present, Projects-first absent)"
    exit 0
    ;;
  negative)
    echo "FAIL: negative (Projects-first recommendation present, no canonical-surface marker)"
    exit 1
    ;;
  contradictory)
    echo "FAIL: contradictory (canonical-surface affirmed yet Projects-first write path recommended — latent canonical-source violation)"
    exit 1
    ;;
  regression)
    echo "FAIL: regression (latent-defect marker present)"
    exit 1
    ;;
  *)
    echo "FAIL: cannot classify answer by policy-invariant signatures" >&2
    echo "  canonical_surface=$canonical_surface  projects_first=$projects_first  projects_first_paraphrase=$projects_first_paraphrase  regression=$regression_marker" >&2
    exit 1
    ;;
esac
