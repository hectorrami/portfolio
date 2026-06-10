import parseFrontmatter from './frontmatter';

describe('parseFrontmatter', () => {
  it('parses key-value pairs from frontmatter', () => {
    const raw = '---\ntitle: My Post\ndate: 2026-06-09\n---\nBody text';
    const { data, content } = parseFrontmatter(raw);
    expect(data).toEqual({ title: 'My Post', date: '2026-06-09' });
    expect(content).toBe('Body text');
  });

  it('strips surrounding quotes from values', () => {
    const raw = "---\ntitle: 'Quoted: with colon'\n---\nBody";
    const { data } = parseFrontmatter(raw);
    expect(data.title).toBe('Quoted: with colon');
  });

  it('returns the whole input as content when there is no frontmatter', () => {
    const { data, content } = parseFrontmatter('Just some markdown');
    expect(data).toEqual({});
    expect(content).toBe('Just some markdown');
  });
});
