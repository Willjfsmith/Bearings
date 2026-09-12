# Bearings

Flags, maps and capitals, with the tricks to remember them.

Bearings is a small offline-capable progressive web app for learning world geography. It is a single static page with no build step and no server-side code.

## Files

- `index.html` – the whole app: styles, data, and logic in one file
- `sw.js` – service worker that caches the app shell and flag images for offline use
- `manifest.webmanifest` – PWA manifest so the app can be installed to a home screen
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` – app icons

## Running locally

Serve the folder over HTTP so the service worker can register:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying

Any static host works. For GitHub Pages, publish the repository root; the manifest and service worker use relative paths so the site runs from a subpath.

## External resources

The app fetches flag images from flagcdn.com, map imagery from NASA GIBS and Earth Observatory, and summaries from the Wikipedia API. Everything else is bundled.
