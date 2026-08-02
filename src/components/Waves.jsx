import React from 'react';

// Decorative only. Each path is drawn twice across a 2880-wide viewBox so the
// layer can be translated -50% and loop seamlessly. The three layers run at
// different speeds, with the middle one reversed, so they never settle into a
// visible repeat.
function Waves() {
  return (
    <div className="wave-layer" aria-hidden="true">
      <svg className="wave wave-1" viewBox="0 0 2880 130" preserveAspectRatio="none">
        <path
          d="M0,70 C180,40 360,40 540,70 C720,100 900,100 1080,70 C1260,40 1440,40 1440,40
             C1620,40 1800,40 1980,70 C2160,100 2340,100 2520,70 C2700,40 2880,40 2880,40
             L2880,130 L0,130 Z"
        />
      </svg>
      <svg className="wave wave-2" viewBox="0 0 2880 130" preserveAspectRatio="none">
        <path
          d="M0,88 C240,58 480,118 720,88 C960,58 1200,118 1440,88
             C1680,58 1920,118 2160,88 C2400,58 2640,118 2880,88
             L2880,130 L0,130 Z"
        />
      </svg>
      <svg className="wave wave-3" viewBox="0 0 2880 130" preserveAspectRatio="none">
        <path
          d="M0,104 C180,86 360,120 540,104 C720,88 900,118 1080,104 C1260,90 1440,104 1440,104
             C1620,118 1800,88 1980,104 C2160,120 2340,86 2520,104 C2700,120 2880,104 2880,104
             L2880,130 L0,130 Z"
        />
      </svg>
    </div>
  );
}

export default Waves;
