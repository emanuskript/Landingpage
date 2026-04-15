# Kerko Integration

This project now ships with a live bibliography browser on `/bibliography` that reads from the public Zotero group library through the Zotero Web API.

It is also prepared for a full Kerko deployment.

## Current library

- Zotero library type: `group`
- Zotero library id: `5499549`
- Zotero group URL: `https://www.zotero.org/groups/5499549/medieval_latin_palaeography/library`

## Front-end switch

Set `kerkoBaseUrl` in [src/content/bibliography/bibliography.js](/Users/mobasuony/Desktop/Landing%20Website/emanuskript/src/content/bibliography/bibliography.js) when the Kerko service is deployed.

Example:

```js
kerkoBaseUrl: 'https://bibliography.example.org/bibliography',
```

Once that is set, the bibliography page will expose a direct Kerko handoff alongside the in-site Zotero browser.

## KerkoApp configuration

Kerko requires a separate Flask service. The Kerko docs state that Kerko works when incorporated into a Flask app or when deployed through KerkoApp.

Use these values in your Kerko or KerkoApp configuration:

```toml
ZOTERO_LIBRARY_ID = "5499549"
ZOTERO_LIBRARY_TYPE = "group"
```

Required secret:

```toml
ZOTERO_API_KEY = "your-zotero-api-key"
```

Recommended URL prefix:

```python
app.register_blueprint(kerko.make_blueprint(), url_prefix="/bibliography")
```

## Recommended deployment flow

1. Deploy KerkoApp or a custom Flask app using Kerko.
2. Sync the Zotero group with `flask --debug kerko sync`.
3. Host the service behind a stable public URL.
4. Set `kerkoBaseUrl` in the Vue app config.
5. Rebuild the site.

## Why the current page uses Zotero directly

Kerko is a server-side Flask application, while the current eManuskript site is a static Vue app. The direct Zotero integration keeps the bibliography functional now, and the config handoff keeps the UI compatible with a later Kerko deployment.
