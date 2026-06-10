import { posts, getPost, formatDate } from './posts';

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

  it('returns an empty string for a missing date', () => {
    expect(formatDate('')).toBe('');
  });
});
