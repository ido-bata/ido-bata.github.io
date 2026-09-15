# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

### Changed

- Issue #101: Discord サーバの実情報（ido-bata-server-bot で 2026-09-16 取得）に基づき、 以下の placeholder を正規化:
  - `src/content/channels.ts` を 12 カテゴリ・52 チャネル構成で実装（`#moderator-only` は非公開のため除外）
  - ホームの Status 表面にサーバ実情報（メンバー数 80 名）を反映
  - Footer の "since 2026" を 実在招待の最古 `created_at` (`2025-03-24`) に基づく "since 2025-03" に修正
  - About ページの lede を「準備中」から、 行動規範に整合する方針（実利重視・情報共有主体・自由参加脱退）と実メンバー数に更新
  - `/channels` ページの metadata を実在チャネル数 (52) ・実在カテゴリ数 (12) に更新

### Note

- Discord 招待の fetch / API 統合は build-time / runtime には持ち込まない。 `.tmp/fetch-discord-snapshot.ts` と `.tmp/discord-snapshot.json` は git 管理外。
- 理念文 / 推奨行為 / 禁止行為 / チャネル別運用ルールなどオーナー正本化が必要な項目は引き続き placeholder のまま。

## [0.3.0] - 2026-09-13

見た目 + 配信基盤 sprint。Discord コミュニティの公式 portal として、ページ骨格・テーマ・配信パイプライン・デザインシステムを整備する。ページ文言・告知・FAQ などの具体コンテンツは次 sprint 以降でオーナー正本化後に投入する。

### Added

- Issue #8: デフォルトの create-next-app ホームを portal 骨格（hero / about / Discord CTA / 関連リンク）に置き換え。文言は minimal placeholder。
- Issue #14: About ページ（コミュニティ紹介の minimal placeholder）
- Issue #18: FAQ ページ（質問項目なしの minimal placeholder）
- Issue #19: サーバルール / ガイドライン（理念 / 推奨 / 禁止 / チャネル別 / 違反時対応の minimal placeholder）
- Issue #20: チャネル一覧ページ（カテゴリ・チャネルなしの minimal placeholder）
- Issue #21: News / 告知セクション（告知なしの minimal placeholder）
- Issue #22: ダークモード対応（OS 連動 + 手動切替）。ThemeToggle の useSyncExternalStore 無限ループ対策を含む
- Issue #28: favicon / apple-touch-icon / manifest 整備
- Issue #38: 404 ページに Discord 招待への導線
- Issue #89: layout-system スキル（`rebuildup/design-skills`）を project-local に導入
- Issue #90: Ark UI (`@ark-ui/react`) をヘッドレス UI プリミティブ層として導入。`src/components/ui/button.tsx`（`ark.button` + Panda `button` recipe、`variant` / `size` / `asChild` 対応）を追加。
- ADR-0002: Ark UI 採用と Panda CSS との手動統合パターン（slot recipe による multi-part primitive 連携）を記録

### Changed

- Header / Footer を CSS Modules から Panda CSS の semantic tokens に移行（dark mode で背景が白いままになる問題を解消）
- `ThemeToggle` / Header の Discord CTA / Footer の Discord 招待リンクを Button primitive 経由の render に移行 (Issue #90)
- `docs/architecture.md` に Ark UI 統合パターンとディレクトリ構成を反映
- リポジトリ全体の Prettier 自動整形（PR #81）

### Fixed

- ThemeToggle.getSnapshot が毎レンダー新しい object を返し "The result of getSnapshot should be cached" 警告が出ていた問題を修正
- E2E smoke test が create-next-app starter 前提で portal 差し替え後に失敗していたのを修正

### Note

- v0.3.0 のページ文言・告知・FAQ・チャネル一覧・サーバルールはオーナーの事実確認後に別途投入する。`src/content/*` は空配列 / minimal placeholder で merge した。

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

[Unreleased]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.3.0...HEAD
[0.2.0]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.1.0...v0.2.0

## [0.1.0] - 2026-09-06

### Added

- `create-next-app` で生成した初期テンプレート
- ESLint (`eslint-config-next` の core-web-vitals + typescript プリセット)
- TypeScript strict 設定

[0.1.0]: https://github.com/ido-bata/ido-bata.github.io/releases/tag/v0.1.0
