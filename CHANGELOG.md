# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

## [0.2.0] - 2026-09-06 (sprint in progress)

foundational sprint。Discord コミュニティ「ido-bata（いど端）」の公式 portal としての基盤を整備する。

### Added

- Panda CSS をデザインシステムとして全面採用 (#40)
- Discord 招待 CTA と Header / Footer コンポーネント (#15)
- Vitest + Playwright の足場とサンプルテスト (#7)
- ADR-0001: GitHub Pages + `output: "export"` を採用した理由の記録 (#9)
- Code of Conduct とプライバシーポリシー (#16, #17)

### Follow-up (v0.3.0 以降に送る候補)

- デフォルトページを ido-bata 用に置き換え (#8)
- About ページ / FAQ / サーバルール (#14, #18, #19)
- i18n / RSS / sitemap / OG 画像 / favicon set (#23, #25, #26, #24, #28)

[Unreleased]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.1.0...v0.2.0

## [0.1.0] - 2026-09-06

### Added

- `create-next-app` で生成した初期テンプレート
- ESLint (`eslint-config-next` の core-web-vitals + typescript プリセット)
- TypeScript strict 設定

[0.1.0]: https://github.com/ido-bata/ido-bata.github.io/releases/tag/v0.1.0