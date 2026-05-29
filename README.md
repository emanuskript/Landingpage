# eManuskript Website

Vue 3 + Vue Router front-end for the eManuskript portal.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Detailed tutorial-source inventory and file-by-file audit:

- [`docs/tutorial-source-audit.md`](/Users/mobasuony/Desktop/Landing Website/emanuskript/docs/tutorial-source-audit.md)

## Sitemap

- `/`
- `/apps`
- `/apps/mergen`
- `/apps/seshat`
- `/apps/proteus`
- `/apps/fenius`
- `/tutorials`
- `/tutorials/palaeography`
- `/tutorials/digital-palaeography`
- `/tutorials/msi`
- `/tutorials/msi/introduction`
- `/tutorials/msi/equipment-and-capture`
- `/tutorials/msi/hoku-beginner`
- `/tutorials/msi/hoku-intermediate`
- `/tutorials/msi/proteus`
- `/tutorials/msi/challenges-and-future`
- `/tutorials/scripts`
- `/tutorials/scripts/origins-square-capitals`
- `/tutorials/scripts/rustic-book-capitals`
- `/tutorials/scripts/roman-cursive`
- `/tutorials/scripts/uncial-half-uncial`
- `/tutorials/scripts/insular`
- `/tutorials/scripts/merovingian-precaroline`
- `/tutorials/scripts/visigothic`
- `/tutorials/scripts/beneventan`
- `/tutorials/scripts/caroline-pregothic`
- `/tutorials/scripts/gothic-textualis`
- `/tutorials/scripts/gothic-cursive`
- `/tutorials/scripts/humanist-scripts`
- `/tutorials/scripts/ductus`
- `/tutorials/bookbinding`
- `/tutorials/bookbinding/[chapter-slug]`
- `/tutorials/timeline`
- `/tutorials/timeline/[entry-slug]`
- `/tutorials/glossary`
- `/tutorials/glossary/[term-slug]`
- `/bibliography`
- `/about`
- `/team`

## Source Mapping

Landing:

- `landing_tree_full.webp` drives the homepage composition.
- Hotspot metadata lives in [`src/content/landing.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/landing.js).

Apps:

- App page content and placeholder launch/download config live in [`src/content/apps/apps.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/apps/apps.js).
- Proteus is intentionally modeled as a download page, not a live-app page.

Tutorials overview:

- `Tutorials/1. Overview of All Tutorials/Tutorial Units.xlsx` informs the portal index at [`src/content/tutorials/index.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/index.js).
- No finished standalone overview prose exists, so the page is explicitly source-audited rather than treated as authored tutorial copy.

Palaeography:

- No finished Palaeography tutorial source was found.
- [`src/content/tutorials/palaeography.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/palaeography.js) now exposes the verified outline from `Tutorials/4. Scripts/Unit 1 - Palaeography (Jeremy).docx` and marks the missing final source explicitly.

Digital Palaeography:

- `Tutorials/2. Digital Palaeography/Finish and Feedback` is the only public-facing source layer used.
- `Old/` was intentionally excluded.
- Mind-map image copied to `public/images/digipal/mindmap.webp`.
- Normalized content/config lives in [`src/content/tutorials/digitalPalaeography.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/digitalPalaeography.js).

MSI:

- The lesson docx files in `Tutorials/3. MSI` were normalized into [`src/content/tutorials/msi/msi.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/msi/msi.js).
- Lesson II is backed by a finished source document; the remaining lesson routes are explicitly marked as draft-backed because no later public versions were found.
- `365_baader.tif` and `TX_735.tif` were converted for web use and stored in `public/images/msi/`.
- The Proteus lesson bridges into `/apps/proteus`.

Scripts:

- The finished HTML package in `Tutorials/4. Scripts/html` is reused as the content source, not as a separate micro-site.
- The HTML files were copied into `public/source/scripts/`.
- Route metadata, chronology, ductus links, and timeline bridges live in [`src/content/tutorials/scripts/scripts.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/scripts/scripts.js).
- Rendering/parsing is handled by [`src/components/tutorials/HtmlArticle.vue`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/components/tutorials/HtmlArticle.vue).

Ductus:

- `Tutorials/4.1 Ductus Tutorials` was normalized into the gallery metadata in [`src/content/tutorials/scripts/scripts.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/scripts/scripts.js).
- Converted ductus images live in `public/images/ductus/`.

Bookbinding:

- The immersive entry page uses the cover/workshop imagery already stored in `public/images/bookbinding/`.
- The finished HTML tutorial `medieval_bookbinding_revised2.html` was copied to `public/source/bookbinding/tutorial.html`.
- No finished standalone workshop-introduction prose exists, so the overview page is an audited entry layer into the HTML reader rather than an invented tutorial introduction.
- Chapter metadata and workshop hotspot coordinates live in [`src/content/tutorials/bookbinding/bookbinding.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/bookbinding/bookbinding.js).
- The reader extracts chapter sections from the source HTML and preserves practical quiz behavior through [`src/components/tutorials/HtmlArticle.vue`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/components/tutorials/HtmlArticle.vue).

Timeline:

- `Tutorials/6. Historical Timeline` sample docs were normalized into seed entries in [`src/content/tutorials/timeline/timeline.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/timeline/timeline.js).
- `Timeline Concept and Design.pdf/pptx` are treated as interface guidance only.
- No finished standalone timeline landing prose exists, so the module uses explicit source notes plus seed articles.
- The design is a split-screen viewer implemented in [`src/components/tutorials/TimelineViewer.vue`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/components/tutorials/TimelineViewer.vue).

Glossary:

- `Tutorials/7. Glossary/Glossary.xlsx` provided the base term set.
- `Tutorials/2. Digital Palaeography/2. Glossary.xlsx` informed the digital-method additions.
- Embedded glossary definitions inside the finished Scripts and Bookbinding HTML files supplement the spreadsheets only where the spreadsheets are incomplete.
- Final normalized glossary data lives in [`src/content/glossary/glossary.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/glossary/glossary.js).

About / Team / Bibliography:

- These pages use normalized config/content files:
  - [`src/content/about/about.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/about/about.js)
  - [`src/content/team/team.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/team/team.js)
  - [`src/content/bibliography/bibliography.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/bibliography/bibliography.js)

## Architecture

Key directories:

- `src/components/layout` for the shared page shell and hero
- `src/components/navigation` for rootling nav, breadcrumbs, sidebars, previous/next controls
- `src/components/tutorials` for tutorial-specific rendering, figures, source-HTML embedding, ductus, timeline, and workshop UI
- `src/components/glossary` for glossary cards and inline popovers
- `src/components/apps` for app cards
- `src/content` for route-level content manifests and placeholder config
- `src/views` for route components
- `public/source` for normalized HTML source packages consumed at runtime

## Placeholders And Replacement Points

Use these files when final public content becomes available:

- App launch/download URLs: [`src/content/apps/apps.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/apps/apps.js)
- Landing hotspot coordinates: [`src/content/landing.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/landing.js)
- Digital Palaeography full-screen OrgPad URL: [`src/content/tutorials/digitalPalaeography.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/tutorials/digitalPalaeography.js)
- Bibliography Kerko endpoint: [`src/content/bibliography/bibliography.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/bibliography/bibliography.js)
- About links / acknowledgements / partner logos: [`src/content/about/about.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/about/about.js)
- Team leaders, biographies, photos: [`src/content/team/team.js`](/Users/mobasuony/Desktop/Landing Website/emanuskript/src/content/team/team.js)

## Replacing Missing Content Later

1. Replace config placeholders in the `src/content/**` files rather than editing templates first.
2. If a tutorial source HTML package is updated, overwrite the corresponding file in `public/source/` and keep the route metadata in sync.
3. If better optimized images become available, replace the files in `public/images/**` without changing route code unless filenames change.
4. If more glossary, timeline, or bibliography data becomes available, extend the relevant content manifest first; the existing views are already data-driven.
