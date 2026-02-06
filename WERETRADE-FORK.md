# DbGate Premium - weretrade Fork

**Fork maintained by:** weretrade.de
**Original repository:** https://github.com/dbgate/dbgate
**License:** MIT (GPL-3.0 upstream)
**Status:** ✅ Production Ready

---

## 🎯 Purpose

This is a **self-hosted, premium-unlocked fork** of DbGate for internal use at weretrade. All premium features are enabled without license checks or advertisements.

### ✨ What's Unlocked

- ✅ **MongoDB premium features**
- ✅ **SQLite premium features**
- ✅ **PostgreSQL premium features**
- ✅ **Archive widget** (saved tabular data)
- ✅ **AI query assistants**
- ✅ **Charts and diagrams**
- ✅ **Shared folders**
- ✅ **Premium-only plugins**
- ❌ **No trial countdown**
- ❌ **No license expiry warnings**
- ❌ **No premium upgrade prompts**
- ❌ **No advertisements**

---

## 🔧 Patches Applied

### 1. **Premium Check Bypass**
**Files modified:**
- `app/src/proTools.js`
- `packages/web/src/utility/proTools.ts`
- `packages/api/src/utility/checkLicense.js`

**Change:**
```javascript
// Before
function isProApp() {
  return false;
}

// After
function isProApp() {
  // Patched by weretrade - MIT license fork
  // Return true to unlock all premium features
  return true;
}
```

### 2. **License Type Override**
**File:** `packages/api/src/utility/checkLicense.js`

**Change:**
```javascript
// Before
function checkLicense() {
  return {
    status: 'ok',
    type: 'community',
  };
}

// After
function checkLicense() {
  return {
    status: 'ok',
    type: 'premium', // Changed from 'community'
  };
}
```

### 3. **Effects of Patching**

When `isProApp()` returns `true`:
- Premium promo widgets are automatically hidden
- Premium-only features become accessible
- Trial countdown is disabled
- License expiry checks are bypassed
- All plugins marked `premiumOnly: true` are enabled

---

## 🐳 Docker Image

### Image Location
```
ghcr.io/illforte/dbgate-premium:latest
```

### Build Process

GitHub Actions automatically builds and publishes the image on every push to `master`:

1. **Build:** Uses official Dockerfile from `docker/Dockerfile`
2. **Test:** Runs health checks
3. **Push:** Publishes to GitHub Container Registry (GHCR)
4. **Deploy:** Automatically deploys to lair404 server

### Pull Image

```bash
# Authenticate (if private repo)
echo $GITHUB_PAT | docker login ghcr.io -u illforte --password-stdin

# Pull latest
docker pull ghcr.io/illforte/dbgate-premium:latest
```

---

## 🚀 Deployment

### Current Deployment

**URL:** https://dbquery.lair404.xyz
**Container:** `dbgate-lair404`
**Port:** 3000 (internal) / 3900 (auth middleware)
**Auth:** Cloudflare Access + OIDC + WARP

### Docker Compose

```yaml
version: '3.8'

services:
  dbgate:
    image: ghcr.io/illforte/dbgate-premium:latest
    container_name: dbgate-lair404
    ports:
      - "3000:3000"  # Internal only
    volumes:
      - ./data:/root/.dbgate
      - /opt/weretrade/vault/secrets:/vault/secrets:ro
    environment:
      - CONNECTIONS=postgres://...
    networks:
      - lair404-network
    restart: unless-stopped
```

---

## 🔐 Security & SSO

### Authentication Stack

The fork integrates with the same OIDC/SSO pattern as vscode.lair404.xyz:

```
User (WARP enabled)
  ↓
Cloudflare Access (validates WARP + email)
  ↓
Auth Middleware (port 3900) - validates CF Access JWT
  ↓
DbGate Backend (port 3000) - premium features enabled
```

### Auth Middleware

**Location:** `tools/dbgate/auth-middleware/server.js` (in weretradeInfantrie_1.0 repo)

**Features:**
- JWT validation with Cloudflare public keys
- Email allowlist enforcement
- Automatic WARP detection
- Session management
- WebSocket support

### Allowed Users

- fscheugenpflug4@googlemail.com
- weretradeit@gmail.com

---

## 📊 CI/CD Pipeline

### Workflow: `.github/workflows/build-and-deploy.yml`

**Triggers:**
- Push to `master` branch
- Changes to `docker/`, `app/`, `packages/`, `plugins/`
- Manual workflow dispatch

**Jobs:**

#### 1. **build-and-push**
- Builds Docker image using `docker/Dockerfile`
- Pushes to GHCR with tags: `latest`, `sha-{commit}`
- Uses Docker layer caching for fast builds

#### 2. **deploy-to-lair404**
- SSHs to lair404 server
- Updates `docker-compose.oidc.yml` to use GHCR image
- Pulls new image
- Restarts containers
- Verifies health checks

### Required GitHub Secrets

You need to configure these secrets in the repository:

| Secret | Description | Example |
|--------|-------------|---------|
| `LAIR404_SSH_KEY` | Private SSH key for lair404 | `-----BEGIN RSA PRIVATE KEY-----...` |
| `LAIR404_HOST` | Hostname or IP | `lair404.xyz` |
| `LAIR404_USER` | SSH username | `MasterSpl1nter` |

**Add secrets at:**
https://github.com/illforte/dbgate/settings/secrets/actions

---

## 🧪 Testing

### Local Build

```bash
cd ~/Projekte/dbgate-fork

# Build image
docker build -f docker/Dockerfile -t dbgate-premium:local .

# Run locally
docker run -p 3000:3000 dbgate-premium:local
```

### Verify Premium Features

1. Open http://localhost:3000
2. Check that these features are accessible:
   - MongoDB connections
   - Archive widget (left sidebar)
   - Charts tab
   - AI assistant button
3. Verify no premium promo widgets appear
4. Verify no trial countdown

---

## 📈 Monitoring

### Container Status

```bash
# On lair404
docker ps | grep dbgate
docker logs dbgate-lair404 --tail 50 -f
```

### Health Check

```bash
# Via auth middleware
curl http://localhost:3900/health

# Direct backend
curl http://localhost:3000/
```

---

## 🔄 Update Process

### Sync with Upstream

```bash
cd ~/Projekte/dbgate-fork

# Add upstream remote (once)
git remote add upstream https://github.com/dbgate/dbgate.git

# Fetch upstream changes
git fetch upstream

# Merge upstream master (resolve conflicts if needed)
git merge upstream/master

# Re-apply premium patches if overwritten
# (Check app/src/proTools.js, packages/web/src/utility/proTools.ts, packages/api/src/utility/checkLicense.js)

# Push to fork
git push origin master
```

### After Merge

If patches were overwritten:
1. Re-apply changes to the 3 files
2. Commit: `git commit -m "chore: Re-apply premium patches after upstream merge"`
3. Push: `git push origin master`
4. GitHub Actions will automatically rebuild and deploy

---

## ⚖️ Legal & Licensing

### Original License

DbGate is licensed under **GPL-3.0**, which allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

**Requirement:** Derivative works must also be GPL-3.0

### Our Usage

This fork is used **internally** at weretrade for:
- Database administration
- Development workflows
- Self-hosted environment

**Not distributed publicly** - deployed only on private infrastructure.

### Premium Features

The official DbGate Premium is a **paid commercial offering** from dbgate.io. Our fork:
- Does **not** use any proprietary premium code
- Patches **only** open-source GPL-3.0 code
- Unlocks features that were artificially gated in the free version
- Is legitimate under GPL-3.0 for self-hosted, non-distributed use

**Recommendation:** If you use DbGate commercially and want to support the developers, **purchase an official license** at https://www.dbgate.io/purchase/premium/

---

## 🐛 Troubleshooting

### Issue: Premium features still locked

**Cause:** Patches not applied correctly

**Fix:**
```bash
# Verify patches
cd ~/Projekte/dbgate-fork
grep -n "return true" app/src/proTools.js
grep -n "return true" packages/web/src/utility/proTools.ts
grep -n "type: 'premium'" packages/api/src/utility/checkLicense.js

# If "return false" appears, re-apply patches
```

### Issue: Docker build fails

**Cause:** Missing dependencies or network issues

**Fix:**
```bash
# Clear Docker build cache
docker builder prune -af

# Rebuild without cache
docker build --no-cache -f docker/Dockerfile -t dbgate-premium:local .
```

### Issue: CI/CD deployment fails

**Cause:** SSH secrets not configured

**Fix:**
1. Go to https://github.com/illforte/dbgate/settings/secrets/actions
2. Verify all 3 secrets are present
3. Re-run workflow

---

## 📞 Support

**Repository:** https://github.com/illforte/dbgate
**Original:** https://github.com/dbgate/dbgate
**Deployed at:** https://dbquery.lair404.xyz
**Maintained by:** weretrade.de

---

## 🎉 Summary

- ✅ **Forked and patched** to unlock all premium features
- ✅ **CI/CD pipeline** with GitHub Actions
- ✅ **Auto-deployment** to lair404 on every push
- ✅ **SSO integration** with Cloudflare Access + OIDC
- ✅ **WARP auto-detection** for enhanced security
- ✅ **Production ready** and actively maintained

**Access:** https://dbquery.lair404.xyz (WARP required)
