# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

## [0.3.0] - 2026-09-13

content + 見た目 sprint。Discord コミュニティ「ido-bata（いど端）」の公式 portal として、公開ページ一式とダークモード対応、デザイントークン統一を整備する。

### Added

- Issue #8: デフォルトの create-next-app ホームを ido-bata 用コンテンツ（hero / about / Discord CTA / 関連リンク）に置き換え
- Issue #14: About ページ（コミュニティ紹介・理念）
- Issue #18: FAQ ページ
- Issue #19: サーバルール / ガイドライン
- Issue #20: チャネル一覧ページ
- Issue #21: News / 告知セクション
- Issue #22: ダークモード対応（OS 連動 + 手動切替）。ThemeToggle の useSyncExternalStore 無限ループ対策を含む
- Issue #28: favicon / apple-touch-icon / manifest 整備
- Issue #38: 404 ページに Discord 招待への導線
- Issue #89: layout-system スキル（`rebuildup/design-skills`）を project-local に導入

### Changed

- Header / Footer を CSS Modules から Panda CSS の semantic tokens に移行（dark mode で背景が白いままになる問題を解消）
- リポジトリ全体の Prettier 自動整形（PR #81）

### Fixed

- ThemeToggle.getSnapshot が毎レンダー新しい object を返し "The result of getSnapshot should be cached" 警告が出ていた問題を修正
- E2E smoke test が create-next-app starter 前提で ido-bata ポータル差し替え後に失敗していたのを修正

[Unreleased]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.2.0...v0.3.0

## [0.2.0] - 2026-09-06

foundational sprint。Discord コミュニティ「ido-bata（いど端）」の公式 portal としての基盤を整備する。

### Added

- Panda CSS をデザインシステムとして全面採用 (#40)
- Discord 招待 CTA と Header / Footer コンポーネント (#15)
- Vitest + Playwright の足場とサンプルテスト (#7)
- ADR-0001: GitHub Pages + `output: "export"` を採用した理由の記録 (#9)
- Code of Conduct とプライバシーポリシー (#16, #17)
- リリース計画フレーム（planned release / freeze 期間）(#15 を拡張)

### Follow-up (v0.3.0 以降に送る候補)

- デフォルトページを ido-bata 用に置き換え (#8)
- About ページ / FAQ / サーバルール (#14, #18, #19)
- i18n / RSS / sitemap / OG 画像 / favicon set (#23, #25, #26, #24, #28)

## [0.1.0] - 2026-09-06

### Added

- `create-next-app` で生成した初期テンプレート
- ESLint (`eslint-config-next` の core-web-vitals + typescript プリセット)
- TypeScript strict 設定

[0.1.0]: https://github.com/ido-bata/ido-bata.github.io/releases/tag/v0.1.0
