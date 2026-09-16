#!/usr/bin/env bash
# Canonical quality-gate driver for the ido-bata-website project.
#
# This script is the single entry point that agent, CI, and release
# MUST call. It is registered in `package.json` `scripts` and exposed
# as `gate:worker` / `gate:integration` / `gate:release` / `gate:e2e`.
# The same script drives all four profiles; the level is selected by
# the first argument.
#
# Usage:
#   bun run gate:worker         # fast worker feedback (lint + typecheck + focused unit)
#   bun run gate:integration    # ticket-level integration (worker + build)
#   bun run gate:e2e            # e2e (build + playwright)
#   bun run gate:release        # release gate (integration + e2e)
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
    bash "$0" worker
    bun run build
    ;;
  e2e)
    echo "[gate:e2e] build + playwright"
    bun run build
    bun run test:e2e
    ;;
  release)
    echo "[gate:release] integration + e2e"
    bash "$0" integration
    bash "$0" e2e
    ;;
  *)
    echo "usage: $0 {worker|integration|e2e|release}" >&2
    exit 2
    ;;
esac
