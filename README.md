# NorthSouth — Digital Agency Platform

pnpm monorepo for the **NorthSouth** marketing site, optional API server, and shared libraries. Primary app: [`artifacts/ebiz-site`](artifacts/ebiz-site).

## Requirements

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10 (`corepack enable` recommended)

## Quick start

```bash
# From the repository root
corepack enable
pnpm install
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables (Vite apps)

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `5173` | Dev/preview server port |
| `BASE_PATH` | `/` | Vite `base` (use `/your-repo/` for GitHub Pages project sites) |

Override when needed:

```bash
# PowerShell
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm run dev

# Bash
PORT=5173 BASE_PATH=/ pnpm run dev
```

Client-side optional vars: see [`artifacts/ebiz-site/.env.example`](artifacts/ebiz-site/.env.example).

## Scripts (root)

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start `@workspace/ebiz-site` dev server |
| `pnpm run typecheck` | Typecheck libs + artifacts |
| `pnpm run build` | Typecheck and build all packages |

Filter a single package:

```bash
pnpm --filter @workspace/ebiz-site run build
pnpm --filter @workspace/api-server run build
```

## Repository layout

```
artifacts/
  ebiz-site/       # React + Vite frontend (main site)
  api-server/      # Express API (Replit OIDC / DB in production)
  mockup-sandbox/  # UI mockup preview tool
lib/               # Shared OpenAPI, DB, auth packages
scripts/           # Repo utilities
```

## CI and GitHub Pages

- **CI** (`.github/workflows/ci.yml`) runs `pnpm install` and `pnpm run build` on every push/PR to `main` or `master`.
- **GitHub Pages** (`.github/workflows/pages.yml`) builds and deploys the Vite app from `artifacts/ebiz-site/dist/public`.

**If Pages shows the README instead of the site**, GitHub is serving the repo root as a Jekyll site. Fix:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions** (not “Deploy from a branch”).
2. Re-run the **Deploy GitHub Pages** workflow (or push to `main`).
3. Open `https://<user>.github.io/<repo>/` (not the repo file browser).

| Command | Purpose |
|---------|---------|
| `pnpm run build:pages` | Production build with correct `BASE_PATH` + SPA `404.html` |
| `pnpm run deploy:pages` | Build and publish to the `gh-pages` branch (manual alternative) |

**Custom domain (NorthSouth):** copy `artifacts/ebiz-site/public/CNAME.example` to `public/CNAME`, set your domain (e.g. `northsouth.co`), and add the same hostname under **Settings → Pages → Custom domain**. Builds then use `BASE_PATH=/`. Or set repository variable `PAGES_CUSTOM_DOMAIN=1`.

**Project site URL:** `BASE_PATH=/Asset-Managerzip/` (auto in Actions). Override with repository variable `PAGES_BASE_PATH` if needed.

## Production notes

- The frontend can be deployed as static files from `artifacts/ebiz-site/dist/public`.
- The API server expects `PORT`, `REPL_ID`, and database/OIDC configuration; see `artifacts/api-server` for Replit-oriented auth.
- Do not commit `.env` files; they are git-ignored.

## License

MIT
