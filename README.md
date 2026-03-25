# Financial Insights Daily Brief

A public, static site hosting daily US stock market morning briefs.

- Frontend: React (via CDN, no build step)
- Data: JSON files in `public/data/`
- Deployment: GitHub Pages (automatic via Actions)
- Repo: `financial-insights`

## Local development

Simply open `index.html` in a browser, or serve the `public/` directory:

```bash
cd brief-site/public
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Data format

Each daily file: `public/data/brief-YYYY-MM-DD.json`

Example structure:

```json
{
  "date": "2026-03-24",
  "overview": "short summary",
  "headlines": [
    { "title": "...", "why": "...", "bullish": "...", "bearish": "..." }
  ],
  "sectors": { "AI / Semiconductor": "...", "Big Tech": "...", ... },
  "preMarket": "...",
  "verdict": "..."
}
```

The site reads `public/data/briefs.json`, which is an ordered (newest first) array of all daily briefs. GitHub Actions merges `brief-*.json` into this file on every push to `main`.

## Production

- GitHub Pages enabled for the `gh-pages` environment (via Actions).
- Push to `main` triggers deployment automatically.
