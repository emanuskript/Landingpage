# Kerko Service Notes

This directory holds the environment template for connecting a dedicated Kerko service to the same Zotero group used by the Vue bibliography page.

Use the official Kerko documentation:

- https://whiskyechobravo.github.io/kerko/latest/

Use these library values:

- `ZOTERO_LIBRARY_ID=6352684`
- `ZOTERO_LIBRARY_TYPE=group`

After your Kerko or KerkoApp service is running, copy its public bibliography URL into:

- [src/content/bibliography/bibliography.js](/Users/mobasuony/Desktop/Landing%20Website/emanuskript/src/content/bibliography/bibliography.js)

Set:

```js
kerkoBaseUrl: 'https://your-kerko-host.example/bibliography',
```
