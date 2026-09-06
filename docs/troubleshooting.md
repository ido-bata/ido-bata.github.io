# トラブルシューティング

よくあるエラーと復旧手順。診断コマンドは実行前に必ずローカルで再現できるか確認する。

## Pages デプロイが失敗する

`Actions` タブ → 該当 run を開く。

### よくある原因

1. **`bun install` が lockfile と一致しない**
   - `bun.lock` を更新せずに `package.json` を変更していないか確認
   - `bun install` でローカル再現 → `bun.lock` を commit

2. **build がコケる**
   - `bun run build` をローカルで実行
   - Type エラー / Lint エラーは `bun run typecheck` / `bun run lint` で個別に確認

3. **Pages artifact のアップロードが空**
   - `next.config.ts` の `output: "export"` が外れていないか確認
   - `out/index.html` がローカルで生成されるか確認

4. **GitHub Pages が無効化されている**
   - Repository Settings → Pages → Source が `GitHub Actions` か確認

5. **workflow permissions 不足**
   - Settings → Actions → General → Workflow permissions: `Read and write permissions` を確認
   - もしくは `.github/workflows/deploy.yml` の `permissions:` ブロックを再確認

## <a id="pages-deploy-failed"></a>「deployment failed with status 403」

- Organization / Repository で GitHub Actions 経由 Pages deploy が許可されているか確認
- organization 設定で `Pages` の source が許可されているか

## ローカル build が成功するのに Pages でだけ失敗

- Actions runner の OS / Bun バージョン差異
- 環境変数 (`NEXT_PUBLIC_*` 等) が Actions 上でのみ未設定の可能性
- ビルドキャッシュが悪さをしている可能性 → Actions 側でキャッシュをクリア

## bun.lock が壊れた

```bash
rm bun.lock
bun install
```

lockfile の完全再生成。PR で意図を明記する。

## `next build` で「Module not found」

- import path が大文字小文字まで一致しているか確認 (Linux は case-sensitive)
- `tsconfig.json` の `paths` 設定と実ファイルが一致しているか

## `bun install` が極端に遅い / ハングする

- Bun のキャッシュをクリア: `rm -rf ~/.bun/install/cache`
- ネットワーク制限下ではリトライ / proxy 設定を見直す

## Pages URL が 404

1. `https://ido-bata.github.io/` のレスポンスコードを確認
2. 直近の deploy run を確認
3. `out/index.html` が artifact に含まれているか確認
4. organization の visibility が public か確認 (Pages は private では配信されない)

## それでも解決しないとき

1. `bun run dev` で再現するか確認
2. `Actions` ログの関連 step を抜粋
3. Issue を作成し、再現手順・期待値・実際・ログを添付
4. `docs/architecture.md` で該当層の説明を参照