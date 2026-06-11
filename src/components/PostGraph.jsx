import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { posts, localized } from '../lib/posts';
import { useLanguage } from '../i18n/LanguageContext';

const WIDTH = 640;
const HEIGHT = 190;
const MOUSE_RADIUS = 110;
const MOUSE_PUSH = 16;

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

// Nodes 0..postCount-1 are posts; the rest are ambient dots.
function buildGraph(postCount) {
  const rand = mulberry32(2026);

  // Post nodes stay anchored so they're easy to click; only ambient dots drift.
  const postNodes = Array.from({ length: postCount }, (_, i) => ({
    type: 'post',
    x: ((i + 1) / (postCount + 1)) * WIDTH + (rand() - 0.5) * 70,
    y: 60 + rand() * 80,
    phase: 0,
    speed: 0,
    amp: 0,
  }));

  const ambientNodes = Array.from({ length: 10 }, () => ({
    type: 'ambient',
    x: 24 + rand() * (WIDTH - 48),
    y: 18 + rand() * (HEIGHT - 40),
    r: 2 + rand() * 1.6,
    phase: rand() * Math.PI * 2,
    speed: 0.5 + rand() * 0.5,
    amp: 4 + rand() * 3,
  }));

  const nodes = [...postNodes, ...ambientNodes];

  // Connect each ambient node to its nearest post node, and chain post nodes.
  const edges = ambientNodes.map((node, i) => {
    let nearest = 0;
    let best = Infinity;
    postNodes.forEach((candidate, j) => {
      const d = (candidate.x - node.x) ** 2 + (candidate.y - node.y) ** 2;
      if (d < best) {
        best = d;
        nearest = j;
      }
    });
    return [postCount + i, nearest];
  });
  for (let i = 0; i < postCount - 1; i += 1) {
    edges.push([i, i + 1]);
  }

  return { nodes, edges };
}

const GRAPH = buildGraph(posts.length);

// Decorative duplicate of the post list below, so it's hidden from assistive
// tech and skipped in tab order — the list remains the accessible navigation.
function PostGraph() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const svgRef = useRef(null);
  const mouseRef = useRef(null);
  const currentRef = useRef(GRAPH.nodes.map((node) => ({ x: node.x, y: node.y })));
  const [positions, setPositions] = useState(() =>
    GRAPH.nodes.map((node) => ({ x: node.x, y: node.y })),
  );

  useEffect(() => {
    if (import.meta.env.MODE === 'test') return undefined;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    let raf;
    let t = 0;
    const step = () => {
      t += 1 / 60;
      const mouse = mouseRef.current;
      const next = GRAPH.nodes.map((node, i) => {
        // Post nodes are fixed click targets; ambient dots get gentle idle
        // drift plus repulsion from the cursor with easing back.
        if (node.type === 'post') return { x: node.x, y: node.y };
        let targetX = node.x + Math.sin(t * node.speed + node.phase) * node.amp;
        let targetY = node.y + Math.cos(t * node.speed * 0.9 + node.phase * 1.3) * node.amp;
        if (mouse) {
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.001 && dist < MOUSE_RADIUS) {
            const push = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_PUSH;
            targetX += (dx / dist) * push;
            targetY += (dy / dist) * push;
          }
        }
        const current = currentRef.current[i];
        current.x += (targetX - current.x) * 0.08;
        current.y += (targetY - current.y) * 0.08;
        return { x: current.x, y: current.y };
      });
      setPositions(next);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toViewBox = (event) => {
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * HEIGHT,
    };
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-auto mb-10 select-none"
      aria-hidden="true"
      onPointerMove={(event) => {
        mouseRef.current = toViewBox(event);
      }}
      onPointerLeave={() => {
        mouseRef.current = null;
      }}
    >
      {GRAPH.edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={positions[a].x}
          y1={positions[a].y}
          x2={positions[b].x}
          y2={positions[b].y}
          className="stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth="1"
        />
      ))}
      {GRAPH.nodes.map((node, i) =>
        node.type === 'ambient' ? (
          <circle
            key={i}
            cx={positions[i].x}
            cy={positions[i].y}
            r={node.r}
            className="fill-zinc-300 dark:fill-zinc-600"
          />
        ) : null,
      )}
      {posts.map((post, i) => {
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
              cx={positions[i].x}
              cy={positions[i].y}
              r="14"
              className="fill-violet-500/10 group-hover:fill-violet-500/25 transition-[fill]"
            />
            <circle
              cx={positions[i].x}
              cy={positions[i].y}
              r="5"
              className="fill-violet-600 dark:fill-violet-500 group-hover:fill-violet-400 transition-[fill]"
            />
            <text
              x={Math.min(Math.max(positions[i].x, 70), WIDTH - 70)}
              y={positions[i].y + 30}
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
