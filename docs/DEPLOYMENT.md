# Landing-site deployment

This repository is the public eManuSkript portal. It is a client-side Vue 3 application built with Vite and produces static files in `dist/`. It does not require a database, application server, secrets, or runtime environment variables.

## Supported runtime and build inputs

- Node.js 22 LTS (minimum supported version: 22.12.0)
- npm with the committed `package-lock.json`
- Outbound network access during installation for the npm registry
- Enough build and deployment storage for the tutorial media copied from `public/`

The site currently contains hundreds of megabytes of teaching media. Use the Git-connected Vercel deployment for normal releases. A Vercel CLI upload may exceed the source-upload allowance of some account plans; do not remove scholarly source media merely to make a CLI upload fit.

## Validate a release

```bash
npm ci
npm audit --omit=dev --audit-level=high
npm run verify
```

`npm run verify` checks that all four application destinations are configured, rejects placeholder links, protects the unchanged Proteus v2.0.0 destination, and creates the production build.

## Vercel (current production target)

Import `emanuskript/Landingpage` into Vercel or connect the existing `emanuskript` project, then use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Vite |
| Node.js | 22.x |
| Install command | `npm ci` |
| Build command | `npm run verify` |
| Output directory | `dist` |
| Environment variables | None required |

The committed `vercel.json` records those settings, preserves Vue Router deep links by rewriting unknown paths to `index.html`, adds baseline browser-security headers, and caches Vite's content-hashed `/assets/` files.

Deploy through the Git integration by merging or pushing a verified commit to `main`. Preview deployments should be built from pull requests or non-production branches. Do not commit `.vercel/`; it contains local project linkage and environment files and is intentionally ignored.

## Generic static server

Build once and serve the resulting `dist/` directory. Every route that does not match a real file must fall back to `dist/index.html` because Vue Router uses history mode.

Example Nginx server block:

```nginx
server {
    listen 80;
    server_name emanuskript.example.org;
    root /srv/emanuskript/dist;
    index index.html;

    location /assets/ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), geolocation=(), microphone=(), payment=(), usb=()" always;
}
```

Terminate TLS at Nginx or a reverse proxy and redirect public HTTP traffic to HTTPS. The example leaves certificate provisioning to the server operator.

## Application destinations

All destinations are centralized in `src/config/externalLinks.js`. The site first presents an internal information page for each application; its launch button opens the configured external application or download page.

| Application | Destination | Deployment note |
| --- | --- | --- |
| Fenius | `https://fenius-ten.vercel.app/` | HTTPS web application |
| Mergen | `http://134.76.19.184/analyze` | Live, but the target server currently offers HTTP only |
| Seshat | `http://v021067.vm.gwdguser.de/` | Live, but the target server currently offers HTTP only |
| Proteus | `https://github.com/emanuskript/Proteus/releases/tag/v2.0.0` | Existing versioned download destination; intentionally unchanged |

Before changing a destination, verify it independently, update `src/config/externalLinks.js`, and run `npm run verify`. The Mergen and Seshat hosts should gain valid HTTPS certificates and HTTPS endpoints; once they do, replace the two HTTP URLs and verify redirects before release.

## Rollback

Use Vercel's deployment history to promote the last known-good deployment, or revert the faulty Git commit and let the `main` deployment rebuild. Because the site is static and has no database migrations, rollback does not require data restoration.
