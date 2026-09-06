---
title: "GitHub Pages (organization page) + Next.js output: \"export\" で配信する"
adr_id: "0001"
status: "Accepted"
date: "2026-09-06"
deciders: ["samuido"]
---

# Context

ido-bata（いど端）は Discord サーバコミュニティの公式サイト。
現状は以下の制約がある:

- 静的アセットのみで成立するコンテンツ
- 運営コストをできるだけ抑えたい
- カスタムドメインは当面不要
- コミュニティ規模は中小

# Decision

GitHub Pages の organization page (`https://ido-bata.github.io/`) に
Next.js の `output: "export"` で生成した静的ファイルを配信する。

# Alternatives Considered

- Vercel / Cloudflare Pages: 外部サービス + 認証情報が必要。組織の規模に対し過剰。
- Cloudflare Workers + Workers KV: SSR したいなら候補だが、現状要件は SSG で充足。
- 自前 VPS: コスト・運用負荷が見合わない。

# Consequences

Positive:
- GitHub Organization の認証で完結
- Actions 経由で main push → 自動デプロイ
- `bun install` だけで build 環境を再現できる

Negative:
- Server-only 機能（cookies / ISR / API Route / Image Optimization）が使えない
- 1 リポジトリあたりの公開ファイルサイズに注意（1 GB 上限）
- 商用 SLA は無い

# Follow-ups

- 後日カスタムドメインを切替える可能性あり（Issue #51）
- Discord OAuth 等で server-only が必要になったら Cloudflare Workers / Hono 等を別途採用（Issue #33）