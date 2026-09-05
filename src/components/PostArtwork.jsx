import React from 'react';

// Abstract artwork for a post, generated rather than uploaded. Every piece is
// derived from the post's slug, so a post keeps the same image for life, a new
// post gets its own without anyone opening a design tool, and nothing binary
// enters the repo.
//
// These render at about 136px, and that size decides the whole approach.
// Bristle detail and gestural strokes are invisible this small — what still
// reads as paint is a soft-edged field of colour meeting another one, and a
// surface with a tooth. So each piece is built like a small colour-field
// study: broad washes whose horizons are pushed through a turbulence
// displacement so they wander the way a loaded brush does, laid down
// semi-transparent so pigment deepens where they overlap, the whole thing
// tilted a few degrees off square, and a fractal-noise weave multiplied over
// the top. Remove the weave or the displacement and it snaps back to looking
// like a CSS gradient.

// Pigment names, not UI colours. A cadmium orange beside a burnt sienna reads
// as two paints; a #F97316 beside a #EA580C reads as a gradient stop no matter
// what shape you cut it into.
const PALETTES = [
  { name: 'sienna', wash: '#D9772F', field: '#A33C13', light: '#F3C795', dark: '#6E2A0D' },
  { name: 'viridian', wash: '#3F9A80', field: '#125E66', light: '#A9D3C0', dark: '#0A4248' },
  { name: 'ultramarine', wash: '#8E7FC4', field: '#3D3F8E', light: '#DCC5E2', dark: '#26235C' },
  { name: 'cerulean', wash: '#6C9FCC', field: '#255A8C', light: '#C3D9E9', dark: '#173A5E' },
  { name: 'madder', wash: '#C97A85', field: '#94325A', light: '#EEC5C3', dark: '#571831' },
  { name: 'sap', wash: '#93AE63', field: '#456F37', light: '#D3DCAF', dark: '#284420' },
];

// A plain polynomial rolling hash, kept in arithmetic rather than bitwise ops
// so it stays inside Number's exact-integer range and inside the repo's lint
// rules. Well spread for short strings: adjacent slugs like "post-1"/"post-2"
// land on different palettes rather than neighbouring ones.
const MODULUS = 1000000007;

function hash(text) {
  let h = 2166136261 % MODULUS;
  for (let i = 0; i < text.length; i += 1) {
    h = (h * 31 + text.charCodeAt(i)) % MODULUS;
  }
  return h;
}

// Successive digits of one hash, taken from widely spaced places so the values
// do not move together.
const pick = (h, divisor, range) => Math.floor(h / divisor) % range;

function PostArtwork({ seed, className = '' }) {
  const h = hash(seed || 'untitled');
  const palette = PALETTES[h % PALETTES.length];

  const horizon = 70 + pick(h, 7, 80); // where the two main fields meet
  const upper = 24 + pick(h, 907, 48); // a second, higher edge
  // A wide tilt range is what stops every piece reading as the same stack of
  // horizontal bands: at 30-odd degrees the fields become diagonal instead.
  const tilt = pick(h, 90007, 65) - 32;
  // Half the pieces put the pale field under the dark one, which changes where
  // the eye thinks the light is coming from.
  const inverted = pick(h, 2503, 2) === 1;
  const bloomX = 40 + pick(h, 61, 120);
  const bloomY = 40 + pick(h, 3371, 120);
  const noiseSeed = pick(h, 190121, 900);
  const weaveSeed = pick(h, 11, 900);

  // Ids must be unique per instance: several of these render on one page, and
  // duplicate ids would make every piece use the first one's filters.
  const uid = `art${h.toString(36)}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Wanders a straight edge into a painted one. High enough frequency
            to read as brush wobble rather than as torn paper, which is what a
            coarser turbulence gives you. */}
        <filter id={`${uid}edge`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="3"
            seed={noiseSeed}
            result="churn"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="churn"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <filter id={`${uid}soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.07"
            numOctaves="3"
            seed={noiseSeed + 40}
            result="churn"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="churn"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="9" />
        </filter>

        {/* Canvas weave. Two frequencies: a fine tooth and a coarser slub, so
            it reads as woven cloth rather than as television static. */}
        <filter id={`${uid}weave`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed={weaveSeed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id={`${uid}slub`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" seed={weaveSeed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* Ground wash */}
      <rect width="200" height="200" fill={palette.wash} />

      {/* The fields are oversized and the group is tilted, so no rotated corner
          can expose the ground behind them. */}
      <g transform={`rotate(${tilt} 100 100)`}>
        <rect
          x="-110"
          y={horizon}
          width="420"
          height="320"
          fill={inverted ? palette.light : palette.field}
          opacity="0.92"
          filter={`url(#${uid}edge)`}
        />
        <rect
          x="-110"
          y="-160"
          width="420"
          height={upper + 160}
          fill={inverted ? palette.field : palette.light}
          opacity="0.78"
          filter={`url(#${uid}edge)`}
        />
      </g>

      {/* A pooled deepening where the brush sat longest. An ellipse, not a
          rect: any straight-sided shape survives the displacement as a visible
          seam, which is the one thing that gives the generator away. */}
      <ellipse
        cx={bloomX}
        cy={bloomY}
        rx="66"
        ry="58"
        fill={palette.dark}
        opacity="0.26"
        filter={`url(#${uid}soft)`}
      />

      {/* Weave. Multiply so the cloth darkens the pigment instead of laying
          grey haze on top of it. */}
      <rect
        width="200"
        height="200"
        filter={`url(#${uid}slub)`}
        opacity="0.16"
        style={{ mixBlendMode: 'multiply' }}
      />
      <rect
        width="200"
        height="200"
        filter={`url(#${uid}weave)`}
        opacity="0.34"
        style={{ mixBlendMode: 'multiply' }}
      />
    </svg>
  );
}

export default PostArtwork;
