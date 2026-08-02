// GitHub's language colors, for the tinted plate and the dot in the stats row.
// Only the languages likely to show up here — anything else falls back to zinc.
const COLORS = {
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  CSS: '#563d7c',
  Elixir: '#6e4a7e',
  Go: '#00add8',
  HTML: '#e34c26',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  Kotlin: '#a97bff',
  Lua: '#000080',
  Markdown: '#083fa1',
  Nix: '#7e7eff',
  PHP: '#4f5d95',
  Python: '#3572a5',
  Ruby: '#701516',
  Rust: '#dea584',
  Scala: '#c22d40',
  Shell: '#89e051',
  Swift: '#f05138',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Zig: '#ec915c',
};

export const FALLBACK_COLOR = '#a1a1aa'; // zinc-400

export default function languageColor(language) {
  return COLORS[language] || FALLBACK_COLOR;
}
