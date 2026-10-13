# eManuSkript website

The public Vue 3 portal for **eManuSkript: A Digital Toolkit for Teaching and Learning Medieval Manuscripts**. It introduces the project, connects visitors to Mergen, Seshat, Fenius, and Proteus, and hosts the project's manuscript-study tutorials.

## Local development

Use Node.js 22 LTS:

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. No environment variables or backend services are required for the portal itself.

## Production verification

```bash
npm audit --omit=dev --audit-level=high
npm run verify
```

The static production output is written to `dist/`. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the exact Vercel and generic static-server configuration, application destinations, limitations, and rollback procedure.

## Important configuration

- Application launch and repository URLs: `src/config/externalLinks.js`
- Landing-page hotspot geometry: `src/config/landingHotspots.js`
- Routes and navigation: `src/config/siteLinks.js` and `src/router/index.js`
- Tutorial content manifests: `src/content/tutorials/`
- Source HTML consumed at runtime: `public/source/`
- Vercel build, SPA fallback, caching, and browser headers: `vercel.json`

The application links are deliberately validated during every production build. Proteus remains pinned to its existing v2.0.0 download page. Mergen and Seshat currently use HTTP-only deployment endpoints; this is documented in the deployment runbook and should be upgraded at the application hosts.

## Main routes

- `/` — illustrated landing page
- `/apps` and `/apps/{mergen,seshat,fenius,proteus}` — application information and launch links
- `/tutorials` — tutorial index
- `/tutorials/scripts` — history of medieval scripts
- `/tutorials/codicology` — codicology and bookbinding
- `/tutorials/digital-palaeography` — digital palaeography
- `/tutorials/msi` — multispectral imaging
- `/bibliography`, `/about-project`, `/team`, and `/site-map` — project information

## Content maintenance

Keep authored tutorial sources and media in `public/` so Vite copies them without transforming scholarly content. Do not commit generated `dist/`, dependency directories, local virtual environments, `.DS_Store`, test output, or `.vercel/` project state.

The detailed inventory of tutorial sources and known content gaps is in [docs/tutorial-source-audit.md](docs/tutorial-source-audit.md). Kerko integration notes are in [docs/kerko-integration.md](docs/kerko-integration.md).
