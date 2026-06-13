// Generates dist/rss.xml from the markdown posts. Runs after `vite build`.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parseFrontmatter from '../src/lib/frontmatter.js';

const SITE_URL = 'https://hectorramirez.xyz';
const SITE_TITLE = 'Hector Ramirez';
const SITE_DESCRIPTION = "Hector Ramirez's blog — writing about software.";

const root = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(root, '../src/posts');
const distDir = path.join(root, '../dist');

const escapeXml = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

// Spanish variants (slug.es.md) share their base post's URL, so only the
// English files become feed items.
const files = (await readdir(postsDir)).filter(
  (file) => file.endsWith('.md') && !file.endsWith('.es.md'),
);

const posts = await Promise.all(
  files.map(async (file) => {
    const raw = await readFile(path.join(postsDir, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title || file,
      date: data.date || '',
      description: data.description || '',
      tags: data.tags
        ? data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };
  }),
);

posts.sort((a, b) => b.date.localeCompare(a.date));

const items = posts
  .map((post) => {
    const url = `${SITE_URL}/posts/${post.slug}`;
    const categories = post.tags
      .map((tag) => `\n      <category>${escapeXml(tag)}</category>`)
      .join('');
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>${categories}
    </item>`;
  })
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

await writeFile(path.join(distDir, 'rss.xml'), rss);
console.log(`rss.xml written with ${posts.length} post(s)`);
