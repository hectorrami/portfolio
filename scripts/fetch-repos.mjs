// Fills in the GitHub metadata for every entry in src/oss/ and writes it to
// src/data/repos.json, which the browser bundle imports. Runs BEFORE the vite
// build: the other scripts in this directory consume the build's output, this
// one produces an input.
//
// src/data/repos.json is committed. When a fetch fails — offline, rate limited,
// repo renamed — the previous entry is kept and the build continues, so a
// third-party API can never turn CI red.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parseFrontmatter from '../src/lib/frontmatter.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ossDir = path.join(root, 'src/oss');
const dataFile = path.join(root, 'src/data/repos.json');
const avatarDir = path.join(root, 'public/images/oss');

const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'hectorramirez-xyz-build',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function readExisting() {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'));
  } catch {
    return {};
  }
}

async function collectRepos() {
  if (!existsSync(ossDir)) return [];
  const files = (await readdir(ossDir)).filter(
    (file) => file.endsWith('.md') && !file.endsWith('.es.md'),
  );
  const slugs = await Promise.all(
    files.map(async (file) => {
      const { data } = parseFrontmatter(await readFile(path.join(ossDir, file), 'utf8'));
      if (!data.repo) console.warn(`  ! ${file} has no "repo" in its frontmatter, skipping`);
      return data.repo || null;
    }),
  );
  return [...new Set(slugs.filter(Boolean))];
}

async function downloadAvatar(owner, url) {
  const file = path.join(avatarDir, `${owner}.png`);
  const publicPath = `/images/oss/${owner}.png`;
  if (existsSync(file)) return publicPath;
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`avatar HTTP ${response.status}`);
  await mkdir(avatarDir, { recursive: true });
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
  return publicPath;
}

async function fetchRepo(slug) {
  const response = await fetch(`https://api.github.com/repos/${slug}`, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  const repo = await response.json();
  return {
    name: repo.name,
    owner: repo.owner.login,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    license: repo.license?.spdx_id === 'NOASSERTION' ? null : (repo.license?.spdx_id ?? null),
    avatar: await downloadAvatar(repo.owner.login, repo.owner.avatar_url),
  };
}

const existing = await readExisting();
const slugs = await collectRepos();
const next = {};
let failures = 0;

for (const slug of slugs) {
  try {
    next[slug] = await fetchRepo(slug);
    console.log(`  ✓ ${slug} — ★ ${next[slug].stars}`);
  } catch (error) {
    failures += 1;
    if (existing[slug]) {
      next[slug] = existing[slug];
      console.warn(`  ! ${slug} — ${error.message}, keeping cached data`);
    } else {
      console.warn(`  ! ${slug} — ${error.message}, no cached data (card renders without stats)`);
    }
  }
}

await mkdir(path.dirname(dataFile), { recursive: true });
const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(dataFile, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(
  `Wrote ${Object.keys(sorted).length} repo(s) to src/data/repos.json` +
    (failures ? ` (${failures} fetch failure(s))` : ''),
);
