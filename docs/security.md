# セキュリティ

脆弱性対応・報告窓口・優先度の決定方針。

## 脆弱性の報告窓口

**公開 Issue には書かない**。以下のいずれかで報告する:

1. GitHub Security Advisories (推奨): https://github.com/ido-bata/ido-bata.github.io/security/advisories/new
2. 組織内セキュリティ窓口への direct contact

報告時に含める情報:

- 影響範囲と再現手順
- 想定される影響 (confidentiality / integrity / availability)
- 該当 version / commit SHA
- 修正案（任意）

## Advisory の優先度

CVSS / severity だけでなく、以下の観点で優先度を判断する:

| 観点               | 説明                                                        |
| ------------------ | ----------------------------------------------------------- |
| exploitability     | 攻撃の実現容易性                                            |
| reachability       | 本プロジェクトへの影響有無                                  |
| external exposure  | インターネット到達性 (本プロジェクトは静的サイトなので低い) |
| required privilege | 攻撃に必要な権限                                            |
| impact             | データ漏えい / 改ざん / DoS 等の影響度                      |
| fix availability   | upstream 修正の有無                                         |
| workaround         | 一時回避策の品質                                            |
| regression risk    | アップグレード時のリスク                                    |
| release timing     | 公開タイミング (本プロジェクトは静的書き出しのため影響限定) |

## Dependabot

`.github/dependabot.yml` で npm と GitHub Actions を週次監視する:

- PR 単位で更新
- Critical / High は 24 時間以内に triage
- Medium は sprint planning で優先度決定
- Low は Backlog へ

## Critical exposed vulnerability の対応

1. 即座に Issue を作成（タイトルに `[SECURITY]` を含める）
2. 現在の sprint を停止
3. patch release を最優先で main に反映
4. 適用後に postmortem を Issue コメントへ記載

## シークレット管理

- 実値を `.env` などに書く場合は **絶対にコミットしない**
- `.env.example` 等でプレースホルダを共有
- GitHub Actions の secret は repository settings で管理
- ローカル開発者は各自 `.env` を `bun run dev` 用に用意

## 静的書き出し特有のセキュリティ考慮

- すべてのページが事前レンダリングされ、実行時の機密データ混入は不可能
- ただし `NEXT_PUBLIC_*` のようなクライアント公開値は build 時に焼き込まれるため、機密を入れてはいけない
- フォームや API は GitHub Pages では動かないため、外部サービス / Functions 側のセキュリティ責任
