import React from 'react';
import { useNavigate } from 'react-router-dom';
import { posts, localized } from '../lib/posts';
import { useLanguage } from '../i18n/LanguageContext';

const WIDTH = 640;
const HEIGHT = 190;

// Seeded PRNG so the constellation is identical on every render/visit.
/* eslint-disable no-bitwise, operator-assignment -- mulberry32 is bitwise by design */
function mulberry32(seed) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* eslint-enable no-bitwise, operator-assignment */

function buildGraph(postCount) {
  const rand = mulberry32(2026);

  const postNodes = Array.from({ length: postCount }, (_, i) => ({
    x: ((i + 1) / (postCount + 1)) * WIDTH + (rand() - 0.5) * 70,
    y: 60 + rand() * 80,
  }));

  const ambientNodes = Array.from({ length: 10 }, () => ({
    x: 24 + rand() * (WIDTH - 48),
    y: 18 + rand() * (HEIGHT - 40),
    r: 2 + rand() * 1.6,
  }));

  // Connect each ambient node to its nearest post node, and chain post nodes.
  const edges = ambientNodes.map((node) => {
    const nearest = postNodes.reduce((best, candidate) =>
      (candidate.x - node.x) ** 2 + (candidate.y - node.y) ** 2 <
      (best.x - node.x) ** 2 + (best.y - node.y) ** 2
        ? candidate
        : best,
    );
    return { from: node, to: nearest };
  });
  for (let i = 0; i < postNodes.length - 1; i += 1) {
    edges.push({ from: postNodes[i], to: postNodes[i + 1] });
  }

  return { postNodes, ambientNodes, edges };
}

const GRAPH = buildGraph(posts.length);

// Decorative duplicate of the post list below, so it's hidden from assistive
// tech and skipped in tab order — the list remains the accessible navigation.
function PostGraph() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-auto mb-10 select-none"
      aria-hidden="true"
    >
      {GRAPH.edges.map((edge, i) => (
        <line
          key={i}
          x1={edge.from.x}
          y1={edge.from.y}
          x2={edge.to.x}
          y2={edge.to.y}
          className="stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth="1"
        />
      ))}
      {GRAPH.ambientNodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.r}
          className="fill-zinc-300 dark:fill-zinc-600 motion-safe:animate-pulse"
          style={{ animationDelay: `${(i % 5) * 0.6}s`, animationDuration: '4s' }}
        />
      ))}
      {posts.map((post, i) => {
        const node = GRAPH.postNodes[i];
        const { title } = localized(post, lang);
        const href = `/posts/${post.slug}`;
        return (
          <a
            key={post.slug}
            href={href}
            tabIndex={-1}
            onClick={(event) => {
              event.preventDefault();
              navigate(href);
            }}
            className="cursor-pointer group"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="14"
              className="fill-blue-500/10 group-hover:fill-blue-500/25 transition-[fill]"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="5"
              className="fill-blue-600 dark:fill-blue-500 group-hover:fill-blue-400 transition-[fill]"
            />
            <text
              x={Math.min(Math.max(node.x, 70), WIDTH - 70)}
              y={node.y + 30}
              textAnchor="middle"
              fontSize="11"
              className="fill-zinc-500 dark:fill-zinc-400 group-hover:fill-zinc-900 dark:group-hover:fill-zinc-100 transition-[fill]"
            >
              {title.length > 28 ? `${title.slice(0, 27)}…` : title}
            </text>
          </a>
        );
      })}
    </svg>
  );
}

export default PostGraph;
