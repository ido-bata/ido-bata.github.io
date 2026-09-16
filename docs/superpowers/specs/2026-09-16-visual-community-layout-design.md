# コミュニティを見せるレイアウト再設計

## 目的

サイト全体を共通の12カラム座標へ戻し、実用情報と人・会話の気配が同時に伝わる構成にする。管理者とGitHubへの参加経路を明示し、文字とカードだけに偏った見た目を改める。

## 構成

- Homeは説明5列＋Discord風ビジュアル7列。主要セクションは見出し3列＋内容9列。
- Footerはブランド4列、サイト案内2列、参加導線3列、管理者3列。
- Aboutは導入5列＋管理者7列、本文は見出し4列＋本文8列。
- モバイルでは意味順を保って1列化する。
- 実在するWIP、technical-critique、いど端 底力 タイムを題材に、独自の会話ボードをCSSとHTMLで作る。
- 管理者は samuido（owner / maintainer / 投稿者 = 同一人物）、Xは @361do_sleep と明記する。owner / maintainer (= samuido) の本人画像・スクリーンショット・投稿を、本人の同意済み素材として Hero visual の説明要素に明示的に使用してよい（捏造・脚色はしない）。
- GitHubリポジトリ、Issues、CONTRIBUTING.mdをHome、About、Footerから参照可能にする。

## 制約

- Discord UIライブラリや新規ランタイム依存は追加しない。
- Next.jsの静的exportを維持する。
- 既存のcontainer、grid、section、stack、clusterを座標系として使う。
- 第三者（owner / maintainer = samuido 以外）の実在人物の発言を捏造・引用しない。owner / maintainer (= samuido) 自身の投稿を Hero visual に verbatim 採用することは同意済み素材として許可する。
