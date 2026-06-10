// Minimal frontmatter parser for simple `key: value` pairs. Kept dependency-free
// so it can be imported by both the browser bundle and node build scripts.
export default function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) {
    return { data: {}, content: raw };
  }

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2');
    if (key) data[key] = value;
  });

  return { data, content: raw.slice(match[0].length) };
}
