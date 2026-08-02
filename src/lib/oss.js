import parseFrontmatter from './frontmatter';
import repos from '../data/repos.json';

const modules = import.meta.glob('../oss/*.md', {
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
    repo: data.repo || '',
    added: data.added || '',
    blurb: content.trim(),
  };
});

// Mirrors src/lib/posts.js: Spanish files (slug.es.md) attach to their English
// base entry rather than appearing on their own, and the English file is the
// source of truth for `repo` and `added`. GitHub data is joined in by repo
// slug; entries with no data yet render without their stats row.
export const projects = parsed
  .filter((entry) => !entry.spanish)
  .map(({ spanish, ...project }) => {
    const translation = parsed.find((entry) => entry.spanish && entry.slug === project.slug);
    return {
      ...project,
      github: repos[project.repo] || null,
      es: translation ? { blurb: translation.blurb } : null,
    };
  })
  .sort((a, b) => b.added.localeCompare(a.added));

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) || null;
}

// Returns the project's blurb in the requested language, falling back to
// English when no translation exists.
export function localizedBlurb(project, lang) {
  if (lang === 'es' && project.es) return project.es.blurb;
  return project.blurb;
}
