#!/usr/bin/env bash
# Canonical quality-gate driver for the ido-bata-website project.
#
# This script is the single entry point that agent, CI, and release
# MUST call. It is registered in `package.json` `scripts` and exposed
# as `gate:worker` / `gate:integration` / `gate:release`. The same
# script drives all three profiles; the level is selected by the first
# argument.
#
# Usage:
#   bun run gate:worker         # fast worker feedback (lint + typecheck + focused unit)
#   bun run gate:integration    # ticket-level integration (unit + build)
#   bun run gate:release        # release gate (unit + build + e2e)
#
# The canonical profile lives at `quality/profile.yaml` per
# `.agents/skills/quality-gate/SKILL.md` §4.
set -euo pipefail

LEVEL="${1:-worker}"

case "$LEVEL" in
  worker)
    echo "[gate:worker] lint + typecheck + focused unit"
    bun run lint
    bun run typecheck
    bun run test:unit
    ;;
  integration)
    echo "[gate:integration] worker + build"
    bun run lint
    bun run typecheck
    bun run test:unit
    bun run build
    ;;
  release)
    echo "[gate:release] integration + e2e"
    bun run lint
    bun run typecheck
    bun run test:unit
    bun run build
    bun run test:e2e
    ;;
  *)
    echo "usage: $0 {worker|integration|release}" >&2
    exit 2
    ;;
esac
