<!-- Pull Request template for ido-bata/ido-bata.github.io -->

## 概要

この PR が実現したいことを 1〜3 文で。

## Linked Issue

- fixes / refs / closes #<issue-number>

## Target release

- [ ] `release-x-y-z` (予定 sprint target version)
- stack context: independent ticket / stacked on top of #<predecessor-issue-number>

## Acceptance criteria

<!-- 完了条件を checklist 形式で。1 項目 = 1 commit / 1 検証 -->

- [ ]
- [ ]
- [ ]

## 変更内容

<!-- 主要な変更点と設計上の選択。breaking change があれば明記 -->

## Validation (current SHA)

<!-- CI / local gate の結果。stacked PR の場合は affected validation を新 SHA で再実行 -->

- [ ] `bun run format:check`
- [ ] `bun run lint`
- [ ] `bun run typecheck`
- [ ] `bun run test:unit`
- [ ] `bun run build` → `out/index.html` 存在
- [ ] `bun run test:e2e` (必要な場合)

## 影響範囲 / 互換性

<!-- 影響 component / breaking change / migration notes -->

## Known issues / blockers

<!-- reviewer が見る前に知っておくべき制限や未解決事項 -->

## Reviewer

<!-- CODEOWNERS / requested reviewer / 省略理由 (意味のある reviewer が存在しない場合のみ) -->

@

## Checklist

- [ ] branch 名は Issue 番号のみ (prefix / slug なし)
- [ ] first meaningful commit 直後に Draft PR を作成
- [ ] remote branch head SHA が first meaningful commit SHA と一致
- [ ] Issue linkage / assignee / labels / target release / stack context 設定済み
- [ ] stacked PR の場合、predecessor 変更に伴う downstream reconciliation 済み
- [ ] 言語ポリシー遵守 (commit / source = 英語、description = 日本語)
