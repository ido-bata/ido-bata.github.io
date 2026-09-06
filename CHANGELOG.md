# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

### Added

- GitHub Pages への自動配信 (`.github/workflows/deploy.yml`)
- CI (`.github/workflows/ci.yml`) で lint / typecheck / build を必須チェックに
- 静的書き出し設定 (`next.config.ts`: `output: "export"`)
- 日本語ドキュメント (`README.md`, `CONTRIBUTING.md`, `docs/*`)

## [0.1.0] - 2026-09-06

### Added

- `create-next-app` で生成した初期テンプレート
- ESLint (`eslint-config-next` の core-web-vitals + typescript プリセット)
- TypeScript strict 設定

[Unreleased]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ido-bata/ido-bata.github.io/releases/tag/v0.1.0