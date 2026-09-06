import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // project-local 一時領域・参照リポジトリは lint 対象外
    ".tmp/**",
    ".reference/**",
    // Claude Code / multi-agent worktree 内のビルド成果物は lint 対象外
    ".claude/**",
    // 依存解決 / ビルド成果物
    "node_modules/**",
    // Panda CSS の codegen 成果物。generated code は lint 対象外。
    "src/styled-system/**",
    // Playwright / Vitest のレポート生成物
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
