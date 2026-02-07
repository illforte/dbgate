# DbGate Premium Fork - weretrade

**Fork of:** https://github.com/dbgate/dbgate
**License:** MIT (self-hosted use)
**Branch:** `premium-clean`
**Image:** `ghcr.io/illforte/dbgate-premium:latest`
**Deployed at:** https://dbquery.lair404.xyz

---

## Changes from Upstream

### Premium Patches (3 files)

| File | Original | Patched |
|------|----------|---------|
| `app/src/proTools.js` | `isProApp() { return false }` | `isProApp() { return true }` |
| `packages/web/src/utility/proTools.ts` | `isProApp() { return false }` | `isProApp() { return true }` |
| `packages/api/src/utility/checkLicense.js` | `type: 'community'` | `type: 'premium'` |

### Unbundled Dockerfile

`docker/Dockerfile.unbundled` - Runs API from source (no webpack bundling).

**Why:** Standard DbGate Docker images use webpack to bundle the API, which creates `webpackEmptyContext` for dynamic `require()` calls. This breaks plugin loading at runtime (`Cannot find module .../plugins/...`).

**How:** The unbundled Dockerfile:
1. Installs all dependencies
2. Builds library packages (sqltree, tools, filterparser, datalib)
3. Builds plugins (backend + frontend webpack)
4. Builds web frontend (Rollup)
5. Runs API from `packages/api/src/index.js` directly (no webpack)

### CI/CD

`.github/workflows/build-and-deploy.yml` - Optional GitHub Actions pipeline.
Currently unused - we build locally with `docker buildx` for faster iteration.

---

## Changelog

### 2026-02-07

**v1.0.0 - Initial Production Release**

- `713ef9d` feat: Unlock all premium features for MIT fork
- `a1ada62` feat: Add CI/CD pipeline for premium fork
- `2d578ca` feat: Enable workflow dispatch and premium-clean branch trigger
- `a0e89df` feat: Add unbundled Dockerfile for working plugins
- `bb94da8` fix: Dockerfile heredoc syntax error
- `08f00c3` fix: Add plugin build steps to unbundled Dockerfile
- `6cce6a6` fix: Use echo commands instead of heredoc for entrypoint script
- `ae1f1e0` fix: Copy all web public files including index.html

**Highlights:**
- All premium features unlocked (no upgrade prompts, no trial countdown)
- Unbundled API build solves plugin loading for all database drivers
- PostgreSQL, MySQL, Redis, ClickHouse, MongoDB, SQLite plugins all work
- Built and deployed as `ghcr.io/illforte/dbgate-premium:latest` (linux/amd64)

---

## Build

```bash
# Build for linux/amd64 and push to GHCR
docker buildx build --platform linux/amd64 --no-cache \
  -t ghcr.io/illforte/dbgate-premium:latest \
  -f docker/Dockerfile.unbundled --push .
```

## Sync with Upstream

```bash
git fetch upstream
git merge upstream/master
# Verify patches: grep "return true" app/src/proTools.js
git push origin premium-clean
```

---

**Base version:** 7.0.0-alpha.1
**Fork date:** 2026-02-06
**Last build:** 2026-02-07
