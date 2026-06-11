# hectorramirez.xyz

My personal blog. Posts are markdown files; the site is a small React + Vite app
deployed to GitHub Pages.

## Writing a post

Create a markdown file in `src/posts/`:

```markdown
---
title: My Post Title
date: 2026-06-09
description: One sentence shown in the post list and RSS feed.
tags: comma, separated, topics
---

Post body in markdown.
```

The filename becomes the URL slug (`src/posts/my-post.md` → `/posts/my-post`).
Commit and push to `main` — GitHub Actions builds and deploys automatically.

To offer a post in Spanish, add `my-post.es.md` next to it with translated
frontmatter and body (the `date` comes from the English file). The EN/ES
toggle in the header switches between them; posts without a translation stay
in English.

## Development

```bash
npm install
npm run dev    # local dev server
npm test       # run tests
npm run build  # production build + RSS feed + 404 fallback
```

## How it works

- `src/lib/posts.js` loads every markdown file in `src/posts/` at build time via
  `import.meta.glob` and parses the frontmatter.
- `scripts/generate-rss.mjs` writes `dist/rss.xml` from the same files after
  each build.
- `dist/404.html` is a copy of `index.html` so GitHub Pages serves the SPA for
  direct links to `/posts/...`.
- Dark mode defaults to the system preference; the header toggle overrides it
  and persists the choice in localStorage.
- Deployment is handled by `.github/workflows/deploy.yml` on every push to
  `main`.
