# Bearings

Flags, maps and capitals, with the tricks to remember them.

Bearings is an offline-capable progressive web app for learning world geography. It is plain HTML, CSS and JavaScript with no framework and no build step, so any static host can serve it.

## Layout

```
index.html              page shell; loads the stylesheet and scripts in order
css/app.css             all styles (light and dark palettes via CSS variables)
js/app.js               app logic: views, sessions, spaced repetition, maps, backup
js/data/world.js        countries and territories
js/data/states.js       US states
js/data/cities.js       world cities
js/data/features.js     rivers, peaks, lakes and other physical features
js/data/landmarks.js    landmarks
js/data/maps.js         simplified SVG outlines for the world and US layers
js/data/capitals.js     capital coordinates
js/data/lib.js          starter mnemonics and facts
js/data/sets.js         collections, subjects and which map layer each uses
sw.js                   service worker: precaches the app, caches flags and fonts
manifest.webmanifest    PWA manifest
icon-*.png              app icons
.github/workflows/      GitHub Pages deployment
```

The data files are classic scripts that each define one global constant. They must load before `js/app.js`, in the order listed in `index.html`.

## Local development

```sh
npm run dev        # serves the folder at http://localhost:8000
npm run check      # syntax-checks every script
```

Any static server works; the service worker only registers over HTTP, not from a `file://` URL.

## Releasing a change

The service worker precaches every file listed in `sw.js`. When you change the app, bump the version in three places so installed copies pick it up:

1. `V` in `sw.js`
2. the `?v=` query on the stylesheet and script tags in `index.html`
3. the matching `?v=` entries in the `SHELL` list in `sw.js`

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which syntax-checks the scripts and publishes the repository root to GitHub Pages. Enable it once under Settings, Pages, by setting the source to "GitHub Actions". The site then lives at `https://<owner>.github.io/Bearings/`.

Netlify, Cloudflare Pages and Vercel can also deploy the repository as is: no build command, publish directory `.`.

## External resources

Flags come from flagcdn.com, the serif typeface from Google Fonts, map imagery from NASA GIBS and Earth Observatory, and summaries from the Wikipedia API. Everything else is bundled and cached for offline use.
