# Visual Community Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Rebuild Home, About, and Footer on one 12-column system with a Discord-inspired visual, administrator information, and GitHub contribution routes.

**Architecture:** Shared content constants describe the administrator and contribution destinations. A reusable CommunityVisual renders the chat-like composition without a UI dependency. Home, About, and Footer consume both while maintaining fixed column spans.

**Tech Stack:** Next.js 16 App Router, React 19, Panda CSS recipes, Vitest, Testing Library

**Spec:** docs/superpowers/specs/2026-09-16-visual-community-layout-design.md

## Global Constraints

- Keep static export.
- Add no Discord UI or runtime dependency.
- Use the shared 12-column grid and existing layout recipes.
- Identify the administrator as samuido and X as @361do_sleep.
- Do not invent or quote Discord messages from third-party real users. The maintainer / owner (= samuido, who is also a contributor) may have their own posts quoted verbatim in the Hero visual as consented illustrative material; do not fabricate or paraphrase their words.

---

### Task 1: Shared community identity

**Files:** Create src/content/community.ts and src/content/community.test.ts.

- [ ] Test administrator labels and GitHub repository, Issues, and CONTRIBUTING URLs.
- [ ] Add typed ADMINISTRATOR and CONTRIBUTION_LINKS constants.
- [ ] Run the focused test.

### Task 2: Discord-inspired visual

**Files:** Create src/components/CommunityVisual.tsx and its test.

- [ ] Test WIP, technical-critique, and bottom-time labels.
- [ ] Build an accessible figure with channel rail, fictional activity rows, server icon, and caption.
- [ ] Keep the component responsive and token-based.

### Task 3: Home and About grid

**Files:** Modify Home and About pages and tests.

- [ ] Change Home hero to 5/7 and subsequent sections to shared 3/9 axes.
- [ ] Add administrator and GitHub contribution surfaces.
- [ ] Rebuild About as 5/7 introduction and 4/8 editorial sections.
- [ ] Test identity and contribution links.

### Task 4: Balanced Footer and verification

**Files:** Modify Footer and CHANGELOG.md.

- [ ] Rebuild Footer as fixed 4/2/3/3 columns.
- [ ] Add GitHub and administrator links.
- [ ] Run format, lint, typecheck, unit tests, static build, and E2E CI.
