import { posts, getPost, localized, formatDate } from './posts';

describe('posts', () => {
  it('loads at least one post from src/posts', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('gives every post a slug, title, date, and content', () => {
    posts.forEach((post) => {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.content).toBeTruthy();
    });
  });

  it('sorts posts newest first', () => {
    const dates = posts.map((post) => post.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });
});

describe('translations', () => {
  it('does not list Spanish variant files as their own posts', () => {
    posts.forEach((post) => {
      expect(post.slug).not.toMatch(/\.es$/);
    });
  });

  it('attaches the Spanish translation to its base post', () => {
    const post = getPost('hello-world');
    expect(post.es).toBeTruthy();
    expect(post.es.title).toBe('Hola, mundo');
  });

  it('localizes to Spanish when a translation exists', () => {
    const post = getPost('hello-world');
    const { title, content } = localized(post, 'es');
    expect(title).toBe('Hola, mundo');
    expect(content).toContain('Durante años');
  });

  it('falls back to English when no translation exists', () => {
    const post = { title: 'T', description: 'D', content: 'C', es: null };
    expect(localized(post, 'es')).toEqual({ title: 'T', description: 'D', content: 'C' });
  });
});

describe('getPost', () => {
  it('returns the post matching a slug', () => {
    const first = posts[0];
    expect(getPost(first.slug)).toBe(first);
  });

  it('returns null for an unknown slug', () => {
    expect(getPost('does-not-exist')).toBeNull();
  });
});

describe('formatDate', () => {
  it('formats an ISO date for display', () => {
    expect(formatDate('2026-06-09')).toBe('June 9, 2026');
  });

  it('formats dates in Spanish when given a Spanish locale', () => {
    expect(formatDate('2026-06-09', 'es-ES')).toBe('9 de junio de 2026');
  });

  it('returns an empty string for a missing date', () => {
    expect(formatDate('')).toBe('');
  });
});
