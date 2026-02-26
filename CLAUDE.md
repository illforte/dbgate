# dbgate-fork — Claude Code Instructions

Fork of [dbgate/dbgate](https://github.com/dbgate/dbgate) (MIT License) with premium features unlocked for self-hosted use.

- **Branch:** `premium-clean`
- **Image:** `ghcr.io/illforte/dbgate-premium:latest`
- **Deployed at:** https://dbquery.lair404.xyz (CF Access AUD: `67a9d75466678072df7beab8ced0292f8c6189d0b9a99a0e04bbb5b12c2db664`)
- **Deploy path:** `/opt/weretrade/dbgate/` on lair404, via `tools/dbgate/docker-compose.oidc.yml` (monorepo)

> See `.claude/rules/` for detailed conventions: upstream protection, Docker build, patch inventory.

---

## Custom Patches (4 files — NEVER revert)

| File | Change |
|------|--------|
| `app/src/proTools.js` | `isProApp() { return true }` (premium unlock) |
| `packages/web/src/utility/proTools.ts` | `isProApp() { return true }` (premium unlock) |
| `packages/api/src/utility/checkLicense.js` | `type: 'premium'` (bypass license check) |
| `docker/Dockerfile.unbundled` | Runs API from source (no webpack bundling) |

Webpack bundling breaks dynamic plugin `require()` at runtime (`webpackEmptyContext`). The unbundled Dockerfile solves this by running the API from `packages/api/src/index.js` directly.

---

## Docker Build (CRITICAL)

```bash
docker buildx build --platform linux/amd64 --no-cache \
  -f docker/Dockerfile.unbundled --push \
  -t ghcr.io/illforte/dbgate-premium:latest .
```

- ALWAYS `--platform linux/amd64` (lair404 is AMD64, Mac is ARM)
- ALWAYS `Dockerfile.unbundled` — standard Dockerfile breaks plugin loading
- GHCR auth: `gh auth refresh -h github.com -s write:packages` then `gh auth token | docker login ghcr.io -u illforte --password-stdin`

---

## Volume & Environment

- Volume mount: `/root/.dbgate` — **NOT** `/home/dbgate-docker` (shadows image files and breaks plugins)
- **Do NOT set** `CONNECTIONS` env var — parsed as a connection definition string, not a directory path

---

## Syncing with Upstream

```bash
git fetch upstream
git merge upstream/master
# Verify patches still apply:
grep "return true" app/src/proTools.js
grep "return true" packages/web/src/utility/proTools.ts
git push origin premium-clean
```

Cherry-pick strategy (not rebase — too many structural changes upstream). Test plugin loading after any merge — it is the most fragile part.

---

## Git

- Remote: `illforte/dbgate-fork`
- Branch: `premium-clean`
- NEVER `git push --force` to main
- ALWAYS stage specific files, NEVER `git add .`
- Commit messages: HEREDOC format

---

**Version:** 1.0.0
**Updated:** 2026-02-26
