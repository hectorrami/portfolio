# "Open source I like" section — design

**Date:** 2026-08-01
**Status:** Approved, ready for implementation planning

## Summary

Add a single new section to the homepage listing open source projects Hector
likes, rendered as cards with an image, a one-sentence take, and live GitHub
metadata (stars, language, license). The rest of the site is unchanged.

## Background

The site today is a single-column blog: an intro line, tag pills, and a post
list inside a `max-w-2xl` container, with a zinc palette and dark mode. Design
inspiration was drawn from [opensource.fb.com](https://opensource.fb.com) and
[samuelkraft.com](https://samuelkraft.com). A full redesign was explored and
rejected — the existing layout stays as-is. Only the new section is in scope.

Card treatment was chosen from three mocked-up alternatives:

- **Rejected — GitHub social preview images** (`opengraph.githubassets.com`).
  Free and automatic, but each preview is itself a card containing the repo
  name, description, and star count, duplicating the text rendered beneath it
  and importing a different visual style per repo.
- **Chosen — owner avatar on a tinted plate.** One consistent shape across every
  card, so the grid reads as a single system.
- **Rejected — full-width horizontal cards.** Room for more metadata, but scales
  badly past ~6 entries and out-lengths the post list.

## Scope

**In scope:** authoring format, GitHub data fetch at build time, one card
component, one homepage section, i18n strings, tests.

**Explicitly out of scope:**

- Any redesign of the header, footer, post list, tag pills, or type scale.
- A dedicated `/open-source` page and a "See all →" link. With a handful of
  entries such a page would duplicate the homepage section verbatim. Add it
  later if the list outgrows the homepage.
- Including OSS entries in the RSS feed. The feed is for blog posts.
- Extending the tag pills to filter OSS entries. They are post tags; having them
  silently hide the section would be confusing.

## Content model

One markdown file per project in `src/oss/`, mirroring how `src/posts/` works.

```markdown
---
repo: BurntSushi/ripgrep
added: 2026-08-01
---

Search that respects .gitignore by default. Ruined plain grep for me.
```

- `repo` — `owner/name`, the join key to GitHub data. Required.
- `added` — ISO date, used for sort order. Required.
- Body — the one-sentence take. Everything else (display name, owner, avatar,
  language, stars, license) comes from GitHub.

Filenames follow the post convention: `ripgrep.md`, with an optional
`ripgrep.es.md` beside it for a Spanish translation of the body. The English
file is the source of truth for `repo` and `added`, exactly as `posts.js`
treats the English post as the source of truth for `date`.

## Data flow

### `scripts/fetch-repos.mjs` (new)

Runs **before** `vite build`. The existing scripts (`generate-rss`,
`generate-sitemap`, `prerender`) all run after the build because they consume
its output; this one produces an input, so it must run first.

1. Read `src/oss/*.md`, parse frontmatter with the existing
   `src/lib/frontmatter.js` (already dependency-free and documented as safe to
   import from node scripts).
2. For each unique `repo`, `GET https://api.github.com/repos/{owner}/{name}`.
3. Download `owner.avatar_url` to `public/images/oss/{owner}.png`, skipping any
   file already present.
4. Write `src/data/repos.json`, keyed by `owner/name`, with: `html_url`,
   `owner.login`, `name`, `stargazers_count`, `language`,
   `license.spdx_id`, and the local avatar path.

**Failure handling.** `src/data/repos.json` is committed to git. On any fetch
failure — network down, rate limited, repo renamed — the script logs a warning,
leaves the existing entry untouched, and exits 0. Numbers go stale; the build
never fails and CI never goes red because of a third-party API. A repo with no
entry at all renders its card without the stats row.

**Rate limits.** Unauthenticated requests are capped at 60/hour, which is ample
for a handful of repos locally. In `.github/workflows/deploy.yml` the script
reads the `GITHUB_TOKEN` that Actions already provides, raising the cap to
5,000/hour.

**Avatars are downloaded, not hotlinked.** Hotlinking is marginally less code,
but it leaks visitor requests to GitHub on every page load and breaks the cards
if the URL shape changes. Avatars are ~10–30KB each, consistent with the
asset-weight discipline already applied in commit `a2b68b3`.

### `src/lib/oss.js` (new)

Mirrors `src/lib/posts.js`. Uses `import.meta.glob('../oss/*.md')` to load the
markdown eagerly at build time, parses frontmatter, joins each entry to
`src/data/repos.json` by `repo`, attaches any `.es` translation, and sorts by
`added` descending. Exports the joined list and a `localized()` equivalent for
the body text.

## UI

### `src/components/RepoCard.jsx` (new)

Renders one joined entry. The entire card is a single `<a>` to `html_url`
(`target="_blank"`, `rel="noopener noreferrer"`), so the click target is the
whole card rather than the title alone.

Structure, top to bottom:

- **Plate** — `aspect-[2/1]`, centered owner avatar at 52px with rounded
  corners, on a tinted ground.
- **Body** — repo name (semibold, `zinc-900`/`zinc-100`), owner login (small,
  `zinc-400`), the blurb (`zinc-600`/`zinc-300`).
- **Stats row** — language dot + name, star count, license SPDX id, in
  `zinc-500`/`zinc-400`.

Border `zinc-200`/`zinc-800`, darkening on hover to match the existing link
hover treatment.

**Plate tint.** `src/lib/languageColors.js` (new) maps language name to hex —
Rust, Go, TypeScript, JavaScript, Python, C, C++, Ruby, Shell, Zig, Swift,
Kotlin, Java, Elixir, Lua — falling back to `zinc-400` for anything unlisted or
missing. The colour feeds a CSS custom property, and the plate mixes it against
the page background: `color-mix(in srgb, var(--lang) 8%, white)` in light mode,
`color-mix(in srgb, var(--lang) 14%, #18181b)` in dark. Mixing against the
current background is what keeps the pale tints from becoming muddy grey
rectangles in dark mode.

**Accessibility.** The avatar is decorative (`alt=""`) — the owner login is
already present as text. The star count renders via `Intl.NumberFormat` compact
notation (`52.1k`) with an `aria-label` carrying the full number, so screen
readers announce "52,100 stars" rather than "star five two point one k".

### Homepage section

Added to `src/pages/Home.jsx` between the intro line and the post list, so the
higher-cadence content leads. The tag pills stay attached to the post list and
pick up the separating top border:

- Heading ("Software I'm glad exists") with a top border
  (`border-zinc-200`/`zinc-800`) separating it from the posts. The heading
  carries the framing on its own; no note beneath it.
- Grid of `RepoCard`s: one column on mobile, two from `sm:` up.
- The entire section — heading, note, and grid — is omitted when `src/oss/` is
  empty, matching how the tag pills already hide themselves when there are no
  tags (`Home.jsx:27`).
- Heading and note added to `src/i18n/strings.js` alongside `intro` and
  `allPosts`, with Spanish translations.

## Testing

Following the patterns already in the repo:

- `src/lib/oss.test.js` — mirrors `posts.test.js`: joining markdown to JSON,
  fallback when a repo has no JSON entry, `.es` translation resolution, sort by
  `added` descending.
- `src/components/RepoCard.test.jsx` — renders name, owner, blurb, stats; omits
  the stats row when GitHub data is absent; links to `html_url`; applies the
  language colour; exposes the full star count to assistive tech.
- `src/pages/Home.test.jsx` — extended to assert the section renders and that
  the tag pills do not filter it.

## Files touched

**New:** `scripts/fetch-repos.mjs`, `src/lib/oss.js`, `src/lib/oss.test.js`,
`src/lib/languageColors.js`, `src/components/RepoCard.jsx`,
`src/components/RepoCard.test.jsx`, `src/data/repos.json`, `src/oss/*.md`,
`public/images/oss/`.

**Modified:** `package.json` (build script order), `src/pages/Home.jsx`,
`src/pages/Home.test.jsx`, `src/i18n/strings.js`,
`.github/workflows/deploy.yml` (pass `GITHUB_TOKEN`), `README.md` (document the
`src/oss/` authoring flow).
