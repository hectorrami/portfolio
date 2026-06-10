import parseFrontmatter from './frontmatter';

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const parsed = Object.entries(modules).map(([path, raw]) => {
  const filename = path.split('/').pop().replace(/\.md$/, '');
  const spanish = filename.endsWith('.es');
  const slug = spanish ? filename.replace(/\.es$/, '') : filename;
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    spanish,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    content,
  };
});

// Spanish files (slug.es.md) attach to their English base post rather than
// appearing as posts of their own. The English file is the source of truth
// for the date and for whether the post exists.
export const posts = parsed
  .filter((entry) => !entry.spanish)
  .map(({ spanish, ...post }) => {
    const translation = parsed.find((entry) => entry.spanish && entry.slug === post.slug);
    return {
      ...post,
      es: translation
        ? {
            title: translation.title,
            description: translation.description,
            content: translation.content,
          }
        : null,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

// Returns the post's title/description/content in the requested language,
// falling back to English when no translation exists.
export function localized(post, lang) {
  if (lang === 'es' && post.es) {
    return { title: post.es.title, description: post.es.description, content: post.es.content };
  }
  return { title: post.title, description: post.description, content: post.content };
}

export function formatDate(isoDate, locale = 'en-US') {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
