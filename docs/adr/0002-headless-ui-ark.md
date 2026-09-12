---
title: "Ark UI をヘッドレス UI プリミティブ層として採用する"
adr_id: "0002"
status: "Accepted"
date: "2026-09-13"
deciders: ["samuido"]
---

# Context

ido-bata サイトは Panda CSS をデザインシステムとして全面採用しているが、**アクセシブルなインタラクティブウィジェット**
(Menu / Dialog / Popover / Tabs / Accordion / Tooltip 等) に対する canonical な実装パターンがまだない。現状のインタラクティブ要素は:

- `src/components/ThemeToggle.tsx` — 単純な cycle ボタン
- `src/components/layout/Header.tsx` — `<a>` を button 風に styling + Discord CTA
- `src/components/layout/Footer.tsx` — `<a>` + Discord link

これらは単純な primitive なので手書きで十分だが、今後 Menu や Dialog 等が必要になったとき、毎回 a11y /
focus 管理 / keyboard 操作 / ARIA 属性を一から組み立てる必要があり、brittle になる。

加えて、現状の Panda 実装は Ark UI のような標準化された component anatomy を前提としていないため、
将来「Panda の slot recipe に合う part 名」を自前で決めるか、外部ライブラリの命名規則に従うかの判断が必要。

# Decision

**Ark UI** (`@ark-ui/react`) を v0.3.0 で導入し、ヘッドレス UI プリミティブ層として位置付ける。

- `Button` のような単一要素 primitive は `ark.button` ファクトリ + Panda `cva()` recipe で wrap する
- `Dialog` / `Menu` のような multi-part primitive は Ark UI の `<Dialog.Root>` `.Trigger` `.Content` 等の
  compound component を使い、Panda CSS の `sva()` slot recipe で Ark UI の `data-scope` /
  `data-part` 属性 anatomy にマッチさせる
- 既存の `src/styles/recipes.ts` に `button` recipe を拡張し、Ark UI ベースの
  `src/components/ui/button.tsx` から利用する
- 既存コンポーネント (`ThemeToggle` / `Header` Discord CTA / `Footer` Discord link) を新 primitive に migrate する

## 理由

1. **Zag.js ベースの state machine**: 挙動が予測可能で、各 primitive の state / transition がドキュメント化されている
2. **Panda CSS と同じベンダー** (Chakra UI チーム) が開発しているため、API 親和性が高い
3. **primitive のカバレッジが広い** (45+): Tailwind Labs Headless UI にない Tabs / Accordion / Combobox / DatePicker / Editable 等が揃っている
4. **`ark` factory + `asChild`**: 単一要素 primitive も `<a>` や `<Link>` を wrapping できる
5. **React 19 / Next.js 16 対応**: 公式に React 19 / Next.js 16 をサポート
6. **`output: "export"` 互換**: すべての primitive が client component として動作

## Panda CSS との統合

Ark UI 公式の Panda preset (`@pandacss/preset-ark`) は **存在しない** (npm にも publish されていない)。
このため Ark UI + Panda CSS の統合は **手動** で行う:

- **単一要素 primitive (Button 等)**: `ark.button` ファクトリを使い、Panda の `cva()` で
  styling する。recipe の `className` を `ark.button` の `className` プロパティに渡す
- **multi-part primitive (Dialog 等)**: Panda の `sva()` (slot variant) で `slots: ["root", "trigger", ...]`
  を定義し、各 slot を `&[data-scope="dialog"][data-part="root"]` 等の Ark UI anatomy selector で
  ターゲットする。生成された className を `<Dialog.Root className={buttonSlots.root()}>` 等に渡す

```ts
// 例: src/styles/recipes.ts に Dialog slot recipe を追加する場合
import { sva } from "@/styled-system/css";

export const dialog = sva({
  slots: ["root", "trigger", "content", "title", "description"],
  base: {
    root: {/* ... */},
    trigger: {/* ... */},
    content: {/* ... */},
    title: {/* ... */},
    description: {/* ... */},
  },
  variants: {
    size: {
      md: {
        content: { maxWidth: "32rem" },
        /* ... */
      },
    },
  },
});
```

Ark UI の `data-scope` は primitive 名 (kebab-case) を、`data-part` は anatomy で定義された part 名
(kebab-case) を使う (zag-js の `createAnatomy` が kebab-case 化)。Panda の slot recipe も
デフォルトでは kebab-case の className を生成するため、anatomy selector と 1:1 で対応する。

# Alternatives Considered

## Radix UI Primitives (`@radix-ui/react-*`)

- 利点: エコシステムが大きい、ドキュメント・サンプルが豊富
- 欠点:
  - **per-component パッケージ**: 1 primitive = 1 npm package。35+ primitive を入れると `node_modules`
    が肥大化し、`bun install` のオーバーヘッドも増える
  - Panda CSS 統合は手動 (Ark UI と同じ状況)
  - Zag.js state machine ベースではなく、Radix 独自実装
- 不採用理由: per-component package 分割が ide-bata のサイズ制約 (GitHub Pages 1 GB 上限だが、
  少数 primitive のため今は問題ではない) と運用負荷 (依存更新) の両面で不利

## React Aria (`react-aria-components`)

- 利点: Adobe 製で品質が高い、国際化対応が手厚い
- 欠点:
  - React Aria の anatomy (`<Dialog>` `.Heading` 等) は Ark UI と命名互換だが、Panda CSS との
    統合情報は Ark UI より少ない
  - React 19 公式対応が Ark UI より遅い
  - 単一要素 primitive (Button) にも compound pattern を強制するため、`asChild` が無い
- 不採用理由: `asChild` がないのは大きい (Header / Footer の Discord CTA で `<a>` を wrap したい)

## Headless UI (`@headlessui/react`)

- 利点: Tailwind Labs 製で Tailwind ユーザーには馴染み深い
- 欠点:
  - primitive 数が Ark UI に比べて少ない (Tabs / Accordion / Combobox / DatePicker 等が無い)
  - Panda CSS 統合は手動 (Ark UI と同じ)
  - React 19 対応は進んでいるが、SSR 環境での hydration warning が出ることがある
- 不採用理由: primitive 不足 (Tabs / Accordion / Combobox は ide-bata で必要になる可能性が高い)

# Consequences

Positive:

- a11y / focus / keyboard / ARIA 属性を Ark UI に任せられ、コンポーネント実装が薄くなる
- 将来 Menu / Dialog / Tabs / Accordion 等が必要になっても、primitive を `<X.Root>` で wrap するだけ
- Panda CSS の token 体系と組み合わせて、theme 一貫性を保ったままアクセシブルな widget を提供できる
- 単一要素 primitive (`ark.button`) は `asChild` 経由で `<a>` / `<Link>` を wrap でき、`<button>` 固定に
  ならない (SEO / right-click menu / middle-click open の観点で重要)

Negative:

- `output: "export"` + React 19 + Ark UI の client component 境界を毎回意識する必要がある
  (Ark UI primitive を import する component は `"use client"` 必須)
- Ark UI の anatomy は内部で `@zag-js/*` を transitive 依存として抱えるため、`node_modules`
  サイズが増える (現時点で 40+ `@zag-js/*` package)。これは Radix Primitives の per-component
  package とは逆の trade-off
- Panda preset が存在しないため、新 primitive を追加するたびに slot recipe を手書きする必要がある
- Ark UI の API は破壊的変更を含む v0 → v5 の進化を遂げており、upgrade 時に breaking change が
  発生する可能性がある

Neutral:

- 既存の `src/styles/recipes.ts` の `button` recipe は Ark UI 化するが、API 互換を保つため
  `variant` (`solid | outline | ghost`) と `size` (`sm | md | lg`) は据え置き
- `ThemeToggle` の `useSyncExternalStore` ベースのテーマ state は Ark UI とは独立 (Ark UI の
  state は Zag.js が管理し、theme とは独立)

# Follow-ups

- v0.3.0 以降で Menu / Dialog / Tabs / Accordion を追加する際、ADR-0002 の slot recipe pattern に
  従って `src/styles/recipes.ts` に slot recipe を追加する
- `aria-*` 属性が現状不足していないか Ark UI migrate 後に axe-core / Lighthouse で再監査する
- Ark UI 公式の Panda preset が publish された場合は採用を再検討する (現状は存在しない)
- 将来 `react-aria-components` 同等の国際化対応が必要になった場合、ADR-0002 を supersede する
  ADR を起こす (Issue を切る)
