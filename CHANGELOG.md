# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

### Added

- Issue #103: 新規 `/welcome` ページを追加。Discord への参加導線と、参加後に使えるチャンネル群を簡潔に案内する。
- Issue #103: 「いど端 底力 タイム」、LayerNote、ido-bata-server-bot の説明ページを追加。
- Issue #103: FAQ、サーバールール、サイト更新のお知らせを実際の内容で掲載。

### Changed

- Issue #101: Discord サーバの実情報（ido-bata-server-bot で 2026-09-16 取得）に基づき、 以下の placeholder を正規化:
  - `src/content/channels.ts` を 12 カテゴリ構成に拡張（`ご案内` カテゴリ追加 / `#moderator-only` 除外 / `Legacy` カテゴリで archived channel を保持）。 各チャネル description は Discord `topic` を一次情報とし、 未設定のものは空のまま据え置いた（推測で purpose を捏造しない）。
  - `/channels` ページの lede に snapshot である旨を明示。 右側の metadata も「カテゴリ (snapshot)」「チャネル (snapshot)」「取得日時」と再ラベル。
  - About ページの lede を「準備中」から、 Discord サーバ観測に基づく質的な特徴（ひとりごと channel の存在 / 公式 welcome メッセージなし / PDCA・いど端底力タイム の実験感 / 自分の関心領域で自分の言葉で参加する文化）に更新。 メンバー数・カテゴリ数・チャネル数などの snapshot 値は変動するため記述しない方針。
  - Footer の "Creator / Engineer community" サブタイトルを「Discord community · 井戸端色の実験場」という質的サブタイトルに置換（開始年月を断定する表記を廃止）。
  - FAQ ページの lede を「準備中」「オーナー正本化後に掲載」placeholder 表現を除去し、 Discord 観測に基づく具体的な案内に更新。
- Issue #101: About ページの lede を Discord 観測の質的特徴からオーナー提供の経緯説明を取り込んだ形に再構成。 反映した一次情報:
  - 「いど端」は交流のコミュニティではなく情報共有の Discord サーバー（実利サーバーとしての性格）
  - 名前は井戸端会議の響きだけ借りたもので、 場としては交流の場ではない
  - welcome メッセージ・入退会儀式は設けず、 入退会の自由・投稿の匿名性を基本とする
  - ひとりごと・wip は反応より書くことを優先するチャネル
  - 想定読者は新規参加者ではなくサーバーメンバー中心のため、 説明口調を operator の内輪向けポジション表明に絞る
- Issue #101: Tooling — `bunx skills add rebuildup/project-init` で 14 件の project-local Skills を導入し `skills-lock.json` を更新。 `interaction-discipline` は upstream SKILL.md frontmatter の YAML parse error により skip（次回復旧時に再評価）。
- Issue #103: Home をチャネル一覧を中心とするサイト内索引へ変更。Discord、チャネル、告知、ルールへの導線をまとめた。
- Issue #103: Discord の公開チャンネル構成を `/channels` と Home に反映。
- Issue #103: `/about` に、制作や開発を前に進めるための実利を重視する方針を掲載。
- Issue #103: Footer のサイト案内と開設年を実態に合わせて修正。
- Issue #103: Home を活動・ツール・チャネルへ直接移動できる実用的な索引に再構成。
- Issue #103: チャネル一覧に音声・ステージチャネルと種別表示を追加。
- Issue #103: Discord 参加ボタンのライトモード表示とブランドカラーのホバー表示を統一。
- Issue #103: プロジェクト一覧とデータ駆動の詳細ルートを追加。プロジェクト追加時の変更箇所をコンテンツ定義へ集約。
- Issue #103: Home・About・Footerを共通の12カラムへ再構成し、Discord風の活動ビジュアル、管理者紹介、GitHubコントリビューション導線を追加。
- Issue #103: `grid` recipe に `width: 100%` を追加し、section 内の grid が必ず親幅まで stretch するよう修正。People / Reference セクションで発生していた右側余白を整列軸のズレから解消。
- Issue #103: Hero の Discord 風チャット mockup を強化。samuido には実写真アバター、相手には Discord 風 gradient default avatar、attachment 部は GitHub 風 link embed card に置換。
- Issue #103: Footer の Administrator セクションが samuido の実プロフィール写真を表示するよう修正（以前はプロジェクトロゴが表示されていた）。
- Issue #103: Breadcrumb の背景 `bg.muted` を撤廃し、hairline border のみで区切るよう変更。ページ内で "箱" として浮いていた帯を消し、セクション間の区切り線と同じ視覚言語に揃えた。
- Issue #103: Breadcrumb の hairline も目立ちすぎるため撤廃し、Header 同じ `bg.canvas` + `backdrop-filter: blur(8px)` のフロストガラス chrome に統一。スクロール時の背景可読性を確保しつつ視覚的重量を最小化。
- Issue #103: グローバル heading に `margin-block-end` を追加。h1 → lede (32-36px), h2 → body (20-24px) など、Panda preflight で 0 にリセットされていた余白を適切なサイズに復元。`margin-block-start` は意図的に 0 のまま（stack の eyebrow + h2 グルーピングを壊さないため）。
- Issue #103: 非ホームページ（`/projects`, `/projects/[slug]`, `/news`, `/activities/idobata-time`）を 12-col grid system に統合。header を 7+5 split（左 rail: eyebrow+h1+lede、右 rail: メタ情報 surface）、カード一覧を `grid({ cols: 2 })` または `grid({ cols: 3 })` recipe 経由へ置換。`grid` recipe に `cols: 5` variant を追加し、いど端タイムのスケジュール `repeat(5, 1fr)` も同じ座標系へ。inline `display: grid` を撤去し、カード幅が container を越えて伸びる問題を解消。
- Issue #103: `/channels` のカテゴリ別リストが `section({ variant: "flow" })` の flex `align-items: flex-start` でカテゴリ wrap div と cluster heading が縮んでいた問題を修正（カードが 706px に縮んでいた → 1088px の全幅へ）。grid recipe の `width: 100%` では flex 子である非 grid ラッパーに届かないため、wrap と cluster heading に明示的な `width: 100%` を付与してページ右軸を揃えた。
- Issue #103: `section` recipe の縦 padding を底上げしページ全体のセクション間余白を広げた。flow は `py { base: 10, md: 16 }` → `{ base: 14, md: 24 }`（隣接セクション間の合計余白を 80/128px → 112/192px へ）、prose は `{ base: 10, md: 12 }` → `{ base: 12, md: 16 }`。`/channels` と `/community/rules` が窮屈に見えていたのを解消する目的だが、site-wide に適用される設計 recipe なので home / news / projects / about 等すべての flow セクション間で同じ rhythm が取れる。
- Issue #103: `/community/rules` の本文領域を `grid({ cols: 12, gap: 8 })` で wrap してコンテンツ本体を `gridColumn: "3 / span 10"`（cols 3–12）に。左 2 cols（=1/6 ≈17%）分の余白で reading rail を ~83% 幅に絞り、長文の line length を整え「間延び」を解消。最初は `4 / span 9`（=1/4 margin）で出したが user feedback で over-anchored に感じたため 1/6 に調整。同ページネ内のチャネル別運用ルール cards を 1-col stack から `grid({ cols: 2, gap: 4 })` の 2-up に置換し、他のカード一覧と同じ座標系へ。
- Issue #103: Home Hero の Discord chat mockup (`CommunityVisual.tsx`) を "褒めない wip" 方針に整合させた。外側の `<figure>` + figcaption (`実際のチャネル構成をもとにしたイメージ`) の disclaimer wrapper を撤廃 — 囲みの存在意義が注意書きの文脈にあったためで、チャット本体を `<aside>` 単体（border 2xl + hairline + shadow）の Discord window として standalone 化。チャット本文も "これでいいかな?" / "余白もう少し広げてもいいかも 👀" の反応・承認要求を `WIP上げました — section grid の stretch 修正` / `AE スクリプト試作中 — レイヤーリネーム補助` の独白的アクション文に書き換え。wip を持ち寄り、wip を評価しないコミュニティ方針を Hero visual 自体が体言する状態にした。
- Issue #103: `CommunityVisual` の chrome を軽くした。外枠 aside の `border.hairline` → `border.subtle`、sidebar の `borderRight` と main header の `borderBottom` を撤廃。内部境界は `bg.muted` vs `bg.canvas` の差だけで分離する方針に切り替え、hairline が「二重三重」になって Discord window が box-in-box で窮屈に見えていた状態を解消。channel 名 span には `whiteSpace: "nowrap"` + `textOverflow: "ellipsis"` を付与し、narrow sidebar で `# technical-critique` / `作業（無言）` が 2 行に折り返していた問題を修正。
- Issue #103: `CommunityVisual` の sidebar / main split を inline `gridTemplateColumns` から shared `grid({ cols: 12, gap: 3 })` recipe へ移行。sidebar = cols 1–3 (`gridColumn: "1 / span 3"`)、main = cols 4–12 (`gridColumn: "4 / span 9"`) を site-wide な 12-col 座標系に揃えた。Discord window の左レールの太さがページの 12-col grid と同じ primitive で決まるため、Hero 全体の alignment axis と一貫性が出る。
- Issue #103: `CommunityVisual` の sidebar channel 行を `grid-template-columns: 1rem minmax(0, 1fr)` の 2-col に切替。icon 列 (`#` / `◉`) を固定 1rem にすることで `# technical-critique` と `◉ 作業（無言）` の channel 名左端が glyph 幅に依存せず揃うように。`#` (narrow) と `◉` (wide) の差でチャンネル名 x がズレて sidebar が視覚的に noisy になっていた状態を解消。
- Issue #103: `CommunityVisual` の header から `LIVE` pill を撤去。本 Hero は静的 mockup で実際にはリアルタイム同期していないため、`LIVE` を残すと鮮度を偽ることになる。視覚的にも `# WIP` ヘッダーが「正直な representative snapshot」として成立する状態に揃えた。
- Issue #103: `CommunityVisual` の予定イベント card を GitHub link embed と同じ `4px coloured bar + content` の embed form に統一。旧 `auto 1fr auto` の horizontal layout は description が 2 行目に折れる一方で time だけが右に浮いて整合せず、`SCHEDULED` eyebrow + title + `毎日 21:00–22:40` (mono) + description の縦積みに置換。Discord scheduled event embed として読める構造になり、Message 1 の GitHub link embed と visual family が揃った。
- Issue #103: Home Hero のキャッチコピー `CREATOR / ENGINEER COMMUNITY` + `つくる途中を、持ち寄る。` + 説明的 lede を撤廃し、`samuido の実利サーバー` (eyebrow) + `いど端` (h1) + `Discord 上で、制作と開発を前に進めるための小さなコミュニティ。` (短文 lede) に置換。Hero は decorative な slogan で開かず identity を直接提示する形になり、コミュニティの "褒めない wip / 実利" 方針と整合。右の Discord window visual が「どんな場所か」の情報を担い、左 text rail は場所を特定する identity のみという役割分担を明確化。page test と e2e の h1 expectation も `いど端` に追従して更新。
- Issue #103: Home Hero の Discord window mockup (`CommunityVisual`) を `#ひとりごと` channel の実投稿ベースに置換。channel を `WORK > # WIP` から `雑 > # ひとりごと` へ移設（channels.ts の category 構造に準拠）、sidebar も `雑` の `wip / ひとりごと / 世迷言` に更新し ひとりごと を active 強調。header の `# WIP / 制作途中のものを持ち寄る` も `# ひとりごと / 作業中に考えたことを気軽に書く。` に差し替え。message body は samuido が 2026/03/21 に `#ひとりごと` に投稿した実 content (VSCode UX / 認知負荷 / 高み / この世のUIすべてがVSCodeになってほしい) を verbatim 採用し、`(唐突)` や段落間の空行もそのまま保持。空行は `<p>` boundary + `margin-block-start` で paragraph spacing として表現し、同一段落内の改行は `<br />`。wip / GitHub link embed / wai 二番目 message / scheduled event card は `#ひとりごと` の low-noise 文脈から外れるため撤廃し、`defaultAvatar` 定義も同時に除去。`CommunityVisual.test.tsx` も新 content に合わせて更新。

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
