# Weretrade Custom Patches — DbGate Premium Fork

Fork of dbgate/dbgate (MIT License). Branch: `premium-clean`

## Custom Patches (DO NOT revert during upstream merges)

### 1. Premium unlock (`packages/web/src/utility/proTools.ts`, `app/src/proTools.js`)
- All premium features unlocked for self-hosted use
- `checkLicense.js` patched to bypass license validation

### 2. Unbundled Dockerfile (`docker/Dockerfile.unbundled`)
- Webpack bundled API breaks dynamic plugin loading (`webpackEmptyContext`)
- Unbundled build preserves plugin system
- Must copy all web public files including index.html

### 3. CI/CD (`/.github/workflows/build-and-deploy.yml`)
- Builds and pushes to GHCR on push to premium-clean

### 4. Documentation (`WERETRADE-FORK.md`)
- Fork changelog and setup docs

## Upstream Merge Strategy
- Cherry-pick upstream fixes, don't rebase (too many structural changes)
- Test plugin loading after any merge — it's the most fragile part
