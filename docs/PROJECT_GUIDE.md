# ninacarducci — project guide

Nina Carducci photography website with a gallery, responsive image variants, Bootstrap assets and SEO-related metadata.

## Scope and source

This guide describes the default branch `main` reviewed on 3 October 2026. Commands were checked against committed manifests and configuration; applications and external integrations were not executed as part of this documentation update.

## Repository map

- `index.html`
- `assets/style.css`
- `assets/scripts.js`
- `assets/maugallery.js`
- `.htaccess`

## Prerequisites and local use

Clone the repository and enter its root directory:

```sh
git clone https://github.com/sarabranco92/ninacarducci.git
cd ninacarducci
```

Use a modern browser. No npm install is required for the static frontend. With Python installed, serve the site locally:

```sh
python -m http.server 8000
```

On Windows, use `py -m http.server 8000` if `python` is unavailable. Open http://localhost:8000/. This is a local preview server, not production hosting.

## Configuration and implementation notes

Both original and minified scripts/styles are committed. Check which files `index.html` actually loads before editing. Responsive images have several sizes under `assets/images/slider/`. No package.json or automated build/test workflow is present; the package lock by itself is not a runnable npm project. `.htaccess` applies to compatible Apache hosts only. No current performance or accessibility score has been verified.

## Verification checklist

Check the carousel, gallery filters and image modal, keyboard navigation and image descriptions. Run Lighthouse or an accessibility audit against the served page and record the date and results.

No dedicated automated test/spec files were found in the reviewed application tree. Where a test script exists, its presence alone does not establish test coverage.

## Maintenance

Keep this guide in sync when routes, commands, environment variables or hosting paths change. Use development databases/accounts for integration checks. Keep private credentials in server-side environment configuration and out of documentation. No new license or ownership terms are introduced by this guide; retain existing repository notices.
