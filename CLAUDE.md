# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Vite dev server
npx vitest run         # run the suite once (`npm test` starts watch mode)
npx vitest run src/lib/posts.test.js          # single file
npx vitest run -t "renders the hero title"    # single test by name
npm run build          # full production pipeline (see below)
npm run preview        # serve dist/ locally
npm run format         # Prettier --write across the repo
npm run format:check   # what the pre-commit hook judges you on
```

`npm run lint` lints `.js`/`.jsx` and exits 0 on a clean tree. `.eslintignore` excludes
`dist/`, mirroring `.prettierignore` — without it `eslint .` walks the built bundles and
reports ~11,900 problems in generated code.

`scripts/*.mjs` are **not** linted: `.mjs` is absent from the `--ext` list.

Formatting and linting are enforced on commit by husky + lint-staged (Prettier
`--check`, not `--write` — fix formatting yourself, the hook only rejects).

## Build pipeline

`npm run build` is an ordered chain, and the order is load-bearing:

1. `scripts/fetch-repos.mjs` — produces an **input**: GitHub metadata for `src/oss/`
   entries, written to `src/data/repos.json`.
2. `vite build`
3. `scripts/generate-rss.mjs`, `generate-sitemap.mjs`, `prerender.mjs` — consume the
   build's **output** in `dist/`.
4. `cp dist/index.html dist/404.html`

## Content architecture

Posts and open-source entries are markdown files, not data structures. `src/lib/posts.js`
and `src/lib/oss.js` are near-mirrors of each other: each `import.meta.glob`s its
directory eagerly as raw text, parses frontmatter, and exports a sorted array.

`src/lib/frontmatter.js` is a deliberately minimal, dependency-free `key: value` parser
because it is imported by **both** the browser bundle and the Node build scripts. Keep it
dependency-free.

**Translations use a `.es.md` sibling** (`hello-world.md` → `hello-world.es.md`). The
Spanish file never becomes an entry of its own; it attaches to the English base as an `es`
property. The English file is the source of truth for existence, `date`, and `repo` —
Spanish frontmatter only supplies translated text. Node scripts filter with
`.endsWith('.md') && !.endsWith('.es.md')` for the same reason.

`src/data/repos.json` is **committed on purpose**. When the GitHub fetch fails (offline,
rate limited, repo deleted or made private) the previous values are reused, so a
third-party API outage can never fail the build — `fetch-repos.mjs` logs a `!` line and
exits 0. A _renamed_ repo is not a failure: the API follows the redirect and the fetch
succeeds against the new location.

## Feature flags and i18n

Spanish is switched off site-wide via `FEATURES.spanish` in `src/lib/site.js`. When off,
the app stays in English regardless of a stored preference or a Spanish browser locale —
otherwise visitors land in half-translated content with no toggle to escape it.

`LanguageProvider` takes an `enabled` prop defaulting to that flag. Tests pass
`enabled` explicitly to exercise the bilingual paths while the flag is off in production —
follow that pattern rather than mutating the flag.

## Styling and theming

Tailwind v4, configured CSS-first in `src/index.css` (no `tailwind.config.js`). Dark mode
is a `.dark` class via `@custom-variant`, not the `media` strategy.

Colours are **semantic roles, not shades**. `src/index.css` declares `--c-*` on `:root`
and overrides them under `html.dark`; the `@theme` block maps each to a Tailwind utility
(`--color-ink: var(--c-ink)`). So `text-ink` and `bg-paper` are already correct in both
themes and **markup carries no `dark:` pairs** — the old `text-zinc-500 dark:text-ink-muted`
pattern is gone. Add a role to both blocks rather than reaching for a stock zinc value.

The roles: `paper` / `paper-2` (canvas, one raised plate), `rule` / `rule-strong`
(hairlines), `ink` / `ink-body` / `ink-muted` / `ink-faint` (four text levels), and a
single `accent` used only for links and active states — never as a fill.

Light mode is the designed default: pure white `#fff`. The greys around it keep only a
trace of warmth — against a white ground, beige-leaning hairlines read as dinginess
rather than as warmth. Dark mode is
**true black** `#000` for OLED. That is why the dark hairlines are lifted (`#262622`, not
a value tuned against a lighter ground) and why `ink` stays a warm off-white instead of
`#fff` — maximum contrast on an unlit ground smears on OLED.

Three typefaces, loaded from Google Fonts in `index.html`: **Archivo** for display and UI
(the `.display` class sets it slightly narrow via `font-stretch`), **Newsreader** for
anything read at length, **IBM Plex Mono** for dates, counts, and labels via `.meta`.
Metadata is sentence case — tracked-out capitals are the look this design avoids.

**Layout is one rail grid.** `.shell` centres the page and `.rail-grid` splits it into a
metadata rail and a reading column, collapsing to stacked below `62rem`. The rail carries
section labels on the home page, the date on each post row, the language on each repo row,
and the table of contents in an article. New surfaces should hang their metadata there
rather than inventing a second layout.

The theme class is applied by an inline script in `index.html` before paint to avoid a
flash of the wrong theme; `src/hooks/useDarkMode.js` owns it afterwards. Both read
`localStorage.theme`. The toggle routes through `document.startViewTransition` when it
exists so the flip crossfades; the `theme-flip` class swaps the route transition for a
plain fade for the duration.

## The table of contents

`src/components/TableOfContents.jsx` is the one bespoke element on the site. Each entry's
slot on the spine grows with the **real pixel height** of the section it points at, so the
marker moves at the speed the reader is actually moving. Evenly divided slots are visibly
wrong — the marker races through long sections and stalls on short ones.

Headings come from `src/lib/headings.js`, which parses the markdown source (skipping fenced
blocks) rather than the DOM. `Post.jsx` then stamps those ids onto the rendered headings
**by document order**, so the parser and the renderer never have to agree on a slug
algorithm.

## SPA on GitHub Pages

Client-side routing with no server. Two mechanisms cover it:

- `dist/404.html` is a copy of `index.html`, so deep links to `/posts/...` boot the app.
- `scripts/prerender.mjs` writes a static shell per route with real `<title>` and Open
  Graph tags, so crawlers and social previews see metadata. The shell still loads the
  bundle and react-router takes over.

Any new route needs a prerender entry to get correct metadata.

`SITE_URL` and `SITE_TITLE` are re-declared per file, in overlapping but different sets:

- `SITE_URL` — `generate-rss.mjs`, `generate-sitemap.mjs`, `prerender.mjs`
- `SITE_TITLE` — `generate-rss.mjs`, `prerender.mjs`, `src/hooks/useDocumentTitle.js`

Change every copy of whichever one you touch.

Deploys run on push to `main` via `.github/workflows/deploy.yml`: Node 24, `npx vitest run`
gating the build, and `force_orphan: true` so the `gh-pages` branch never accumulates old
bundles.

## Test environment

`src/test/setup.js` copies jsdom's `localStorage`/`sessionStorage` onto `globalThis`.
Node 26 defines both as own accessors on `globalThis` that return `undefined` without
`--localstorage-file`, and vitest's `populateGlobal` skips any key already present on
`globalThis` unless it is in vitest's own KEYS list — neither storage key is. Without
the shim, 37 of 72 tests fail on Node 26. The shim is guarded on
`globalThis.localStorage === undefined`, so it activates only on Node versions that
shadow the global and is a no-op everywhere else — it does not assume a version.

Tests that exercise Spanish must render `<LanguageProvider enabled>`; the flag is off
in production, so a bare provider stays in English no matter what is in `localStorage`.

Assert open-source entries by `href`, not by repo name — `react/react` renders "react"
as both owner and name, so a text match finds two elements.

Rail metadata (a post's date, a repo's language) sits **outside** the row's link, because
marginalia annotates an entry rather than being part of its target. Tests assert that
explicitly, so moving it back inside the anchor will fail.
