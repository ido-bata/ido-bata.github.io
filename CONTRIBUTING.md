# コントリビューションガイド

`ido-bata` organization 配下のプロジェクトに参加・貢献する開発者向けの取り決め。

## 行動規範

- 敬意を持ったコミュニケーション
- 意思決定は Issue / PR で文脈化する（口頭だけで済ませない）
- 機密情報・PII をリポジトリ・Issue・PR・成果物に含めない

## 開発フロー

すべての非自明な作業は **GitHub Issue として起票**してから着手する。

```text
Issue 作成
   ↓ target version / priority を Assignee と確認
ticket branch: <issue-number>
   ↓ Draft PR を早期作成
PR ready for review
   ↓ CI green / レビュー承認
merge into release-x-y-z
   ↓ release gate
merge into main
```

### ブランチ規約

| 用途              | 名称                 | 派生元             |
| ----------------- | -------------------- | ------------------ |
| released source   | `main`               | —                  |
| active sprint     | `release-x-y-z`      | `main`             |
| 1 Issue = 1 ticket branch | `<issue-number>` | `release-x-y-z` (推奨) または `main` |

- `<issue-number>` 以外の prefix / slug / work-type は使わない
- branch に説明責務を持たせない。説明は Issue / PR に書く

### Commit 規約

```text
<work-prefix>: <concise english summary>

<optional body in english>

Refs #<issue-number>
```

`work-prefix` は:

- `feat` — 新機能
- `fix` — バグ修正
- `chore` — 依存更新 / ビルド / CI / ドキュメント
- `refactor` — 振る舞いを変えない内部改善
- `test` — テスト追加・修正
- `docs` — ドキュメントのみ

### Pull Request ルール

- Draft PR を最初の意味のある commit 後にすぐ作る
- Draft → Ready にする前に acceptance criteria が満たされているか自己確認する
- PR description は日本語
- CI (`.github/workflows/ci.yml`) が green になるまで Ready にしない

## リリース

詳細は [`docs/release.md`](./docs/release.md)。

## セキュリティ

脆弱性報告は Issue ではなく [`docs/security.md`](./docs/security.md) に従う。

## 言語ポリシー

- ソースコード / commit message: **英語**
- Issue / PR / 内部ドキュメント: **日本語**

## AI エージェント

`AGENTS.md` を起点にプロジェクト固有の指示を発見できる。新しいエージェント / 開発者はここから読み始めること。