import type { NextConfig } from "next";

// GitHub Pages (https://ido-bata.github.io/) への静的配信用設定。
// 詳細: docs/release.md, docs/architecture.md
const nextConfig: NextConfig = {
  // 静的書き出し。`next build` の出力が `out/` に生成され、そのまま GitHub Pages に配信できる。
  output: "export",

  // GitHub Pages は URL rewrite を持たないので、`/about` のような
  // 直アクセスは静的書き出しの `/about.html` を見つけられず 404 になる。
  // `trailingSlash: true` を指定すると Next.js が `/about/index.html`
  // を出力し、Pages が `/about/` に直接配信してくれる形になる。
  // 公式 doc: node_modules/next/dist/docs/01-app/03-api-reference/
  //          05-config/01-next-config-js/trailingSlash.md
  // 公式 doc (static-exports 連携):
  //          node_modules/next/dist/docs/01-app/02-guides/static-exports.md
  trailingSlash: true,

  // ルート公開（ido-bata.github.io の organization page）なので basePath は不要。
  // basePath: "/<repo-name>",

  // `output: "export"` では next/image の最適化が動かないため、無効化して静的書き出しを通す。
  // 画像最適化が必要になったら docs/architecture.md#画像最適化の節に従ってカスタムローダーを導入する。
  //
  // `unoptimized: true` でも外部 URL の src は remotePatterns 検証の対象になる
  // (next/image は src 解決時にパターン照合を行うため)。運営者のプロフィール
  // 写真を Twitter から直接貼るために pbs.twimg.com のみ許可する。
  // 公式 doc: node_modules/next/dist/docs/02-pages/04-api-reference/
  //          01-components/image-legacy.md#remote-patterns
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/profile_images/**",
      },
    ],
  },
};

export default nextConfig;
