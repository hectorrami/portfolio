// Section headings, pulled from the markdown source rather than from the
// rendered DOM, so the table of contents can be built during render instead of
// after it. Ids are applied to the rendered headings by document order, so
// this parser and the renderer never have to agree on a slug algorithm.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // keep a link's text, drop its url
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

// Returns h2 and h3 headings in document order. Fenced blocks are skipped so a
// `# comment` inside a shell sample never becomes a section.
export default function extractHeadings(markdown) {
  const used = new Map();
  const headings = [];
  let inFence = false;

  String(markdown || '')
    .split('\n')
    .forEach((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return;
      }
      if (inFence) return;

      const match = /^(#{2,3})\s+(.*\S)\s*$/.exec(line);
      if (!match) return;

      const text = match[2].replace(/[`*_]/g, '').trim();
      const base = slugify(text) || 'section';
      const seen = used.get(base) || 0;
      used.set(base, seen + 1);

      headings.push({
        depth: match[1].length,
        text,
        id: seen === 0 ? base : `${base}-${seen}`,
      });
    });

  return headings;
}
