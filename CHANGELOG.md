# Changelog

このプロジェクトのすべての重要な変更はここに記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準拠し、バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従う。

## [Unreleased]

### Added

### Fixed

### Changed

## [0.4.0] - 2026-09-16

### Added

- Issue #103: 新規 `/welcome` ページを追加。Discord への参加導線と、参加後に使えるチャンネル群を簡潔に案内する。
- Issue #106: v0.3.0 公開後の review follow-up (1 HIGH + 39 MEDIUM) を統合。Panda `fontSize` に `2xs` token を追加し、eyebrow / metadata 表記を 12px へ揃え; カテゴリ別チャネル preview を `getChannelPreviewByCategory()` で `channels.ts` から派生させ Home と `/channels` の二重 hand-curated list を解消; `FEATURED_POST` / `ABOUT_SECTIONS` を `community.ts` に切り出し Hero の Discord window mockup と `/about` の contribution 導線を data-driven 化; `PRIMARY_NAV_LINKS` / `SITE_LINKS` を `src/content/nav.ts` に集約し Header / Footer の hand-rolled nav 配列を単一 source of truth へ; `START_GUIDE` / `RELATED_LINKS` を `src/content/welcome.ts` に集約し `/welcome` の lede + リンク重複を解消; `HOMEPAGE_FEATURED_PROJECTS_LIMIT` で `/` の featured 件数 (2) を content module から参照可能に; RuleSection に `links?: RuleLink[]` を追加し `docs/code-of-conduct.md` への参照を plain text から actual `<a>` へ。
- Issue #106: chrome と layout の a11y / focus 可視性を底上げ。Header / Footer の nav link と `viewAllLink` / `contributionLink` / not-found の nav card に `_focusVisible` で 2px accent outline を付与; Header の primary nav を `display: { base: "none", md: "flex" }` で md 以上のみ表示 (mobile では CTA ボタンへ集約); breadcrumb を `position: sticky; top: var(--chrome-height)` + zIndex 90 で Header 直下に固定し、`:root` に `--chrome-height: 3.5rem` を定義; Footer の nav ラベルを `<p>` から `<h3>` へ格上げし見出し階層を整備; すべての外部 anchor (`target="_blank"`) に `rel="noopener noreferrer"` を付与 (Footer の X / Discord / Issues / Guide / repo の 5 link と `/about` の X / contribution link)。

### Fixed

- Issue #106: `src/content/channels.ts` のカテゴリ名から Latin Extended-D の `Ä` / `Ç` を撤去し ASCII 互換の `Web開発・UI` / `音楽・DTM` / `AI` / `Plan-計画` / `Do-実行` / `Check-評価` / `Action-改善` / `参考-Web` に統一 (Home / `/channels` の両方で同じ name を参照していた不整合を解消); `作業（修羅場）` → `作業（雑）` typo 修正; `channels.ts` の circular type dependency (`CHANNEL_CATEGORIES: readonly ChannelCategory[]` が type を forward reference していた) を `const ... as const` → `type = (typeof ...)[number]` の順序へ解消; `/welcome` の start-guide card を `grid({ cols: 2 })` から壊れた `cols: 3` recipe 呼び出し (実体は 1-col 化していた) を recipe 経由へ戻し layout を復旧; `CommunityVisual` の sidebar が `雑` category の channel 0 件しか出さなくなっていた不具合 (channel `name === "雑"` で `find` を取ろうとしていた誤った guard) を category filter に置換して `wip / ひとりごと / 世迷言` を正しく表示; `/projects` の一覧 link に `_hover` と `_focusVisible` の affordance を追加 (他の一覧と挙動が揃っていなかった); `panda.config.mjs` の preflight で 0 にされていた heading margin を `margin-block-end` で h1–h6 すべてに復元、h2 直下の `& :last-child` は 0 へ reset (stack recipe の eyebrow + h2 グルーピングを壊さない)。
- Issue #106: `ChannelCategory` を `readonly ChannelCategory[]` 経由ではなく `(typeof CHANNEL_CATEGORIES)[number]` で派生させ channels.ts の add 時に array ↔ type が必ず同期するように; Reference section の card heading を h2 → h3 に下げ Home の見出し階層を `page h1 → section h2 → reference card h3` の三段へ整理; not-found の未使用 `Button` import を撤去 (lint warning を解消)。

### Changed

- Issue #106: Home の People & source section の左右比を `5fr 4fr` に調整、avatar (96px) と X CTA を 1 つの stack にまとめて profile block の視線誘導を整理; Home の Discord セクションを右 rail の 3-col grid へ揃え、`bg.subtle` + `borderRadius: "lg"` の soft surface で区切り hairline を減らして rhythm を軽く; Home の Reference section を右 rail を `grid({ cols: 3 })` の 3-up にして News / Welcome / Guide を同列に; Home のチャネルプレビューを `grid({ cols: 3 })` の 3 カテゴリカードに揃え、サイドバーと同形の `1rem minmax(0, 1fr)` 行で `# / ◉` glyph + name + description を縦積み表示; `/community/rules` の `<Section>` を `body` 省略 / `links` のみ / `body + links` の各パターンで表示できるよう data-driven に再構築; `/news` の article を `surface({ elevation: "flat" })` + `padding { base: 5, md: 6 }` で他のカード一覧と同じ visual family へ; `ProjectDetailPage` の tag list を inline `<div style={{display:flex}}>` から shared `cluster` recipe へ置換; `CommunityVisual` を全面書き直し — `#ひとりごと` channel + 雑 category の sidebar + `<time dateTime>` + `<ul><li>` で Discord window として standalone に; `/about` を全面書き直し — 12-col grid の page-opening band (5+7 split) + Administrator aside + `01 / 02 / 03` 番号付きの section 列; `FAQ_ITEMS` のボイス channel 必須 / `IDOBATA_TIME` 説明を `IDOBATA_TIME.name` / `.time` 経由の template literal にして activity 名・時刻が 1 箇所で管理されるように; `channels.ts` に `CHANNEL_SNAPSHOT_DATE = "2026-09-13"` を追加し `/channels` の最終更新日を hardcode から module import へ; `/channels` の channel 行 key を `${channel.category}::${channel.name}` の composite key に変更し同名の別カテゴリ channel が将来追加されても衝突しないように; `Footer` の brand subtitle を `<div>` から `stack({ gap: 1 })` 経由へ、brand name を `<p>` から `<span>` へ、subtitle を "Discord community · 井戸端色の実験場" に更新; Header の `DISCORD_INVITE` 未設定時に aria-label "Discord 招待リンク未設定" 付きの placeholder span を表示し、未設定状態でも layout が崩れないように。
- Issue #106: Home の `viewAllLink` に `transition: "color 150ms ease"` + `_focusVisible` を、contribution link にも `_focusVisible` を追加して hover / focus の affordance を全 section で統一; `CHANNEL_SNAPSHOT_DATE` を 1 箇所で管理; ProjectDetailPage の関連リンクを `cluster` で wrap して rule / `<br />` 直書きを recipe へ。

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
- Issue #101: Tooling — `bunx skills add rebuildup/project-init` で 15 件の project-local Skills を導入し `skills-lock.json` を更新。 `interaction-discipline` は upstream SKILL.md frontmatter の YAML parse error により skip（次回復旧時に再評価）。
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

### Security

- Issue #109: `.github/workflows/release-source-check.yml` に head repository と base repository の `full_name` 一致チェックを追加。`head.ref` 名の文字列だけを見ていた従来実装では fork 側で `release-*` branch を名乗れば同一 repository からの release PR と区別できなかったため、ADR-0003 の「同一 repository の release branch → main」契約を required status check で enforce できるよう修正。`docs/adr/0003-release-branch-stack-protection.md` Section 2 に新しい 3 条件 (同一 repo / head ref 存在 / `release-*` pattern) を明文化。

### Fixed

- Issue #109: `package.json` の `"version": "0.3.0"` を `"0.4.0"` に更新。CHANGELOG の version/date 確定と `[0.4.0]` compare link 追加は release PR merge 後の post-release metadata step に分離し、merge 前に未来の release date / tag を確定しない運用へ整理。
- Issue #109: `src/content/rules.ts` の `meta` section を「行動規範に記載しています。」の anchor なし body から `links: [{ label: "行動規範", href: "..."code-of-conduct.md" }]` を含む形へ書き換え、body を「次の行動規範を参照してください。」に統一。`enforcement.body` も同 pattern に統一し、ページ末尾から code-of-conduct.md へ actual な導線が確保される状態へ。

### Changed

- Issue #109: `src/content/channels.ts` の `Channel` interface に `featured?: boolean` を追加し、Home Hero の Discord preview で露出する 9 channel (PDCA: `Plan-計画` / `Do-実行` / `転送-補足`、共有: `素材・配布` / `チートシート` / `宣伝・拡散希望`、作業: `作業（無言）` / `作業（雑）` / `聞き専`) に `featured: true` を付与。`getChannelPreviewByCategory()` は hand-curated な `category -> channel name` map を持つ二重管理 implementation から、`CHANNELS.filter(channel => channel.featured)` ベースの data-driven 実装に書き換え、各 category 3 件 (`PREVIEW_PER_CATEGORY_LIMIT`) を上限に固定。preview policy (どの category を代表表示するか) と channel selection (どの channel が代表か) を分離し、次回 Discord snapshot 更新時に Home と `/channels` が静かに乖離する経路を断った。

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

[Unreleased]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.3.0...v0.4.0
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

[0.2.0]: https://github.com/ido-bata/ido-bata.github.io/compare/v0.1.0...v0.2.0

## [0.1.0] - 2026-09-06

### Added

- `create-next-app` で生成した初期テンプレート
- ESLint (`eslint-config-next` の core-web-vitals + typescript プリセット)
- TypeScript strict 設定

[0.1.0]: https://github.com/ido-bata/ido-bata.github.io/releases/tag/v0.1.0
