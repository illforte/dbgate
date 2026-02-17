---
globs: docker/**,Dockerfile*
---
# Docker Build for lair404

- ALWAYS build with `--platform linux/amd64` (lair404 is AMD64, Mac is ARM)
- MUST use `Dockerfile.unbundled` — bundled Dockerfile breaks plugin loading
- Image: `ghcr.io/illforte/dbgate-premium:latest`
- GHCR push: `gh auth refresh -h github.com -s write:packages` first

```bash
docker buildx build --platform linux/amd64 --no-cache -f docker/Dockerfile.unbundled --push -t ghcr.io/illforte/dbgate-premium:latest .
```

## Volume Mount
- Mount at `/root/.dbgate` (NOT `/home/dbgate-docker` which shadows image files)
- `CONNECTIONS` env var is parsed as connection definition, not directory path — don't set it
