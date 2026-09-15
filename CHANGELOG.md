# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

### Changed

- Issue #101: Discord サーバの実情報（ido-bata-server-bot で 2026-09-16 取得）に基づき、 以下の placeholder を正規化:
  - `src/content/channels.ts` を 12 カテゴリ・52 チャネル構成で実装（`#moderator-only` は非公開のため除外）。 各チャネル description は Discord `topic` を一次情報とし、 未設定のものは空のまま据え置いた（推測で purpose を捏造しない）。
  - `/channels` ページの lede に snapshot である旨を明示。 右側の metadata も「カテゴリ (snapshot)」「チャネル (snapshot)」「取得日時」と再ラベル。
  - About ページの lede を「準備中」から、 Discord サーバ観測に基づく質的な特徴（ひとりこと channel の存在 / 公式 welcome メッセージなし / PDCA・いど端底力タイム の実験感 / 自分の関心領域で自分の言葉で参加する文化）に更新。 メンバー数・カテゴリ数・チャネル数などの snapshot 値は変動するため記述しない方針。
  - ホームの Status 表面から「メンバー 80 名」を削除し、 「サーバ: いど端 (Discord)」に置換。
  - Footer の "since 2026" / "since 2025-03" のように開始年月を断定する表記を削除し、 "Discord community · 井戸端色の実験場" という質的サブタイトルに置換。
  - Home の About セクション / FAQ ページの lede から「準備中」「オーナー正本化後に掲載」placeholder 表現を除去し、 現状を正確に言い表す文に更新。
- Issue #101: About ページの lede を Discord 観測の質的特徴からオーナー提供の経緯説明を取り込んだ形に再構成。 反映した一次情報:
  - 「いど端」は samuido のハンドルネームに由来し井戸端会議の語感を持つ名前
  - 交流より関心領域での情報共有が主目的
  - welcome メッセージ・入退会儀式は設けず、 入退会の自由・投稿の匿名性を基本とする（参加にあたっての余計な小さなハードを意図的に削る方針）
  - ひとりごと・wip は反応を求めないチャネルとして用意
  - チャネルは PDCA のように試行と撤廃で育て、 「褒めない wip」のように役目を終えたものは Legacy へ移す運用
- Issue #101: Home の About セクション lede と右側 Memo aside を「順次紹介していきます」placeholder 表現から、 About ページが実体を持つことに合わせて整理。
- Issue #101: Tooling — `bunx skills add rebuildup/project-init` で 14 件の project-local Skills を導入し `skills-lock.json` を更新。 `interaction-discipline` は upstream SKILL.md frontmatter の YAML parse error により skip（次回復旧時に再評価）。

### Note

- Discord 招待の fetch / API 統合は build-time / runtime には持ち込まない。 `.tmp/fetch-discord-snapshot.ts` / `.tmp/discord-snapshot.json` / `.tmp/discord-atmosphere.json` / `.tmp/fetch-discord-messages.ts` は git 管理外。
- メンバー数・カテゴリ数・チャネル数・活動時期のような数値・日付は変動するため、 サイトの事実記述には使わない方針（snapshot が必要な場合は channels.ts 経由かつ `取得日時` ラベル付きで提示）。
- `src/content/rules.ts` の philosophy / recommended / prohibited / channels.items / enforcement セクションは Discord サーバ上で公開されている実ルールのみを採用する方針のため、 本 Issue では更新していない（オーナーの Discord サーバ上の正本化待ち）。
- `src/content/news.ts` / `src/content/faq.ts` の具体エントリ（告知・Q&A）もオーナーの確定待ち。 該当ページは空状態（"現在、掲載中の X はありません" 系）を維持。

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
