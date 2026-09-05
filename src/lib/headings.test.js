import extractHeadings, { slugify } from './headings';

describe('slugify', () => {
  it('lowercases, strips punctuation, and hyphenates', () => {
    expect(slugify('Should you use it?')).toBe('should-you-use-it');
    expect(slugify('API notes for the curious')).toBe('api-notes-for-the-curious');
  });

  it("drops markdown emphasis and keeps a link's text", () => {
    expect(slugify('**Pricing** and `limits`')).toBe('pricing-and-limits');
    expect(slugify('See [the docs](https://example.com)')).toBe('see-the-docs');
  });

  it('collapses runs of separators rather than leaving empty segments', () => {
    expect(slugify('Context  —  output')).toBe('context-output');
  });
});

describe('extractHeadings', () => {
  it('returns h2 and h3 headings in document order with their depth', () => {
    const headings = extractHeadings(
      ['# Title', '', '## One', '', '### One a', '', '## Two'].join('\n'),
    );
    expect(headings).toEqual([
      { depth: 2, text: 'One', id: 'one' },
      { depth: 3, text: 'One a', id: 'one-a' },
      { depth: 2, text: 'Two', id: 'two' },
    ]);
  });

  it('ignores h1 and anything deeper than h3', () => {
    const headings = extractHeadings('# One\n#### Four\n## Two');
    expect(headings.map((h) => h.text)).toEqual(['Two']);
  });

  // A `# comment` in a shell sample is a comment, not a section.
  it('skips headings inside fenced code blocks', () => {
    const markdown = ['## Real', '', '```bash', '## Not a heading', '```', '', '## Also real'].join(
      '\n',
    );
    expect(extractHeadings(markdown).map((h) => h.text)).toEqual(['Real', 'Also real']);
  });

  it('gives repeated headings distinct ids so anchors stay unique', () => {
    const headings = extractHeadings('## Notes\n## Notes\n## Notes');
    expect(headings.map((h) => h.id)).toEqual(['notes', 'notes-1', 'notes-2']);
  });

  it('falls back to a usable id when a heading has no sluggable characters', () => {
    expect(extractHeadings('## ???')[0].id).toBe('section');
  });

  it('returns an empty list for empty or missing content', () => {
    expect(extractHeadings('')).toEqual([]);
    expect(extractHeadings(undefined)).toEqual([]);
  });
});
