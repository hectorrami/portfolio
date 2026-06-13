// Writes a static HTML shell per route (dist/posts/<slug>/index.html, about)
// with per-page <title> and Open Graph tags, so social previews and search
// engines see real metadata even though the app is an SPA. The shell still
// loads the bundle and react-router takes over. Runs after `vite build`.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parseFrontmatter from '../src/lib/frontmatter.js';

const SITE_URL = 'https://hectorramirez.xyz';
const SITE_TITLE = 'Hector Ramirez';

const root = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(root, '../src/posts');
const distDir = path.join(root, '../dist');

const escapeHtml = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

function shellFor({ title, description, url, type }) {
  const fullTitle = title === SITE_TITLE ? SITE_TITLE : `${title} — ${SITE_TITLE}`;
  const meta = [
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_TITLE)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<link rel="canonical" href="${url}" />`,
  ].join('\n    ');

  return baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace('</head>', `    ${meta}\n  </head>`);
}

async function writeShell(routePath, page) {
  const dir = path.join(distDir, routePath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), shellFor(page));
}

const files = (await readdir(postsDir)).filter(
  (file) => file.endsWith('.md') && !file.endsWith('.es.md'),
);

await Promise.all(
  files.map(async (file) => {
    const raw = await readFile(path.join(postsDir, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, '');
    await writeShell(`posts/${slug}`, {
      title: data.title || slug,
      description: data.description || '',
      url: `${SITE_URL}/posts/${slug}`,
      type: 'article',
    });
  }),
);

await writeShell('about', {
  title: 'About',
  description: 'About Hector Ramirez — software engineer in Houston, TX.',
  url: `${SITE_URL}/about`,
  type: 'website',
});

console.log(`prerendered ${files.length + 1} route shell(s)`);
