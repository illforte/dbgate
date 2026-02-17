# Upstream Protection

Lightweight fork — minimize divergence from upstream dbgate.

## Rules
- NEVER modify upstream files beyond the 4 customized areas without explicit user request
- Customized: `proTools.ts`, `proTools.js`, `checkLicense.js`, `Dockerfile.unbundled`
- For new features: prefer plugins or configuration over code patches

## Deployment
- Deployed to: `/opt/weretrade/dbgate/` on lair404 via `tools/dbgate/docker-compose.oidc.yml`
- URL: https://dbquery.lair404.xyz
- CF Access AUD: `67a9d75466678072df7beab8ced0292f8c6189d0b9a99a0e04bbb5b12c2db664`
