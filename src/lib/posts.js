import parseFrontmatter from './frontmatter';

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
      content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function formatDate(isoDate) {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
