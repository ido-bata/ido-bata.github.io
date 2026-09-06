import type { NextConfig } from "next";

// GitHub Pages (https://ido-bata.github.io/) への静的配信用設定。
// 詳細: docs/release.md, docs/architecture.md
const nextConfig: NextConfig = {
  // 静的書き出し。`next build` の出力が `out/` に生成され、そのまま GitHub Pages に配信できる。
  output: "export",

  // ルート公開（ido-bata.github.io の organization page）なので basePath / trailingSlash の調整は不要。
  // basePath: "/<repo-name>",
  // trailingSlash: true,

  // `output: "export"` では next/image の最適化が動かないため、無効化して静的書き出しを通す。
  // 画像最適化が必要になったら docs/architecture.md#画像最適化の節に従ってカスタムローダーを導入する。
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
