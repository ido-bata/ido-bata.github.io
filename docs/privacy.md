# プライバシーポリシー (Privacy Policy)

本ポリシーでは、`ido-bata` 組織の Web サイト (https://ido-bata.github.io/) および関連リポジトリにおける、利用者の個人情報の取り扱いを定める。

最終更新日: 2026-09-06

## 1. 適用範囲

- `ido-bata` 組織が運営する公開 Web サイト
- 同 Web サイトを構成する Next.js ソースコードおよびビルド成果物 (`out/`)
- 上記をホストする GitHub Pages
- 併設の GitHub リポジトリ (Issue / PR / Discussions 等)

本ポリシーは **ido-bata 公式 Discord サーバ自体には適用されない**。Discord サーバ内のやり取りは Discord Inc. のプライバシーポリシーに従う。

## 2. 現状の収集データ (2026-09-06 時点)

本 Web サイトは **GitHub Pages による静的配信のみ**を行っている。以下の事項を確認済み:

- アクセス解析ツール (Google Analytics / Plausible / Umami 等) は **未導入**
- 広告ネットワーク・第三者トラッキングピクセルは **未導入**
- セッション / 永続 Cookie は **未使用** (技術的にも設定上も発生しない)
- Web Storage (localStorage / sessionStorage / IndexedDB) は **未使用**
- フォーム送信・コメント機能・OAuth ログインは **未実装**
- Discord 連携は **招待リンク (CTA) のみ**で、本サイト側で OAuth scope を要求することはない

したがって、現時点では本 Web サイト側で**利用者を識別する情報を能動的に収集することはない**。

## 3. 受動的に取得され得る情報

GitHub Pages および GitHub の提供機能は、利用者のブラウザ・IP・User-Agent・Referer 等のリクエスト情報を、サービス提供のために自動的に処理する。当組織はこれらの情報を直接制御せず、GitHub, Inc. のサービス利用規約およびプライバシーポリシーが適用される。

- GitHub Privacy Statement: https://docs.github.com/ja/site-policy/privacy-policies/github-privacy-statement
- GitHub Pages の挙動: https://docs.github.com/ja/pages

## 4. 第三者提供

- 当組織から利用者データを第三者へ **能動的に販売・提供することはない**
- 法令に基づく開示請求を受けた場合、必要最小限の範囲で応じることがある。その場合は本ページで事後に告知する

## 5. Cookie および Analytics を将来追加する場合の方針

将来的に以下のいずれかが必要になった場合は、本ポリシーを **追加より前に** 更新する。

- セッション維持 / 設定保存のための Cookie または Web Storage
- アクセス解析 (Google Analytics, Plausible, Umami 等)
- Discord / GitHub OAuth によるログイン連携
- 問い合わせフォーム / ニュースレター / コメント機能

追加時は、本ページにて以下を **事前に** 明示する:

1. 取得するデータの項目
2. 利用目的
3. 第三者提供の有無・範囲 (sub-processor を含む)
4. Cookie の種別 (必須 / 任意) と、任意 Cookie のオプトアウト手段
5. OAuth を入れる場合は要求する **scope をすべて列挙** (例: `identify`, `email`, `guilds`)
6. データの保管期間と、削除リクエストの連絡先
7. 改定の発効日

事前告知なく Cookie / Analytics / OAuth を **後付けで有効化することはしない**。

## 6. お問い合わせ

本ポリシーに関する質問・開示・訂正・削除の請求は、以下の窓口まで。

- **GitHub Issue**: https://github.com/ido-bata/ido-bata.github.io/issues
  (機微情報は本文に書かず、公開質問 + DM での補足提供を推奨)
- **GitHub Security Advisories** (機微情報を含む場合): https://github.com/ido-bata/ido-bata.github.io/security/advisories/new
- **運営者 (さむいど)**: https://github.com/samuido

回答までに数営業日いただく場合がある。法令上の請求には、適用される法令 (個人情報保護法 / GDPR 等) に基づき誠実に回答する。

## 7. 改定

- 本ポリシーは、サービス変更・法令改正等に応じて不定期に見直す
- 改定は本リポジトリの `docs/privacy.md` を更新する Pull Request で行う
- 重要な変更は、本ページ上部に告知し、可能であれば Discord サーバ内でも告知する
- 過去の版は Git 履歴 (https://github.com/ido-bata/ido-bata.github.io/commits/main/docs/privacy.md) に残る

## 8. 関連ドキュメント

- [`docs/security.md`](./security.md) — 脆弱性報告窓口
- [`docs/code-of-conduct.md`](./code-of-conduct.md) — 行動規範
- [`CONTRIBUTING.md`](./../CONTRIBUTING.md) — コントリビューションガイド
