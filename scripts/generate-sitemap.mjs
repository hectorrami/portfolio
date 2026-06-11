// Writes dist/sitemap.xml covering the home page, about, and every post.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parseFrontmatter from '../src/lib/frontmatter.js';

const SITE_URL = 'https://hectorramirez.xyz';

const root = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(root, '../src/posts');
const distDir = path.join(root, '../dist');

const files = (await readdir(postsDir)).filter(
  (file) => file.endsWith('.md') && !file.endsWith('.es.md'),
);

const postEntries = await Promise.all(
  files.map(async (file) => {
    const raw = await readFile(path.join(postsDir, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    return {
      loc: `${SITE_URL}/posts/${file.replace(/\.md$/, '')}`,
      lastmod: data.date || null,
    };
  }),
);

const entries = [
  { loc: `${SITE_URL}/`, lastmod: null },
  { loc: `${SITE_URL}/about`, lastmod: null },
  ...postEntries,
];

const urls = entries
  .map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml written with ${entries.length} URL(s)`);
