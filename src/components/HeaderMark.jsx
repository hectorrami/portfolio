import React from 'react';

// Hand-drawn laptop and mug that draws itself once on load. Decorative, so
// aria-hidden. The stroke inherits currentColor so it follows the theme; only
// the mug carries its own colour.
function HeaderMark() {
  return (
    <svg
      viewBox="0 0 150 120"
      className="mark h-[104px] w-[130px] shrink-0 text-zinc-900 dark:text-ink"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="mark-stroke mark-laptop"
        d="M24,60 C22,47 23,33 24,24 C24,21 26,20 29,20 C46,18 68,19 82,20 C85,20 87,22 87,25
           C88,37 87,49 86,60
           M10,60 C38,58 72,58 96,60 C99,60 100,62 98,66 C96,71 93,75 90,78 C88,80 86,80 83,80
           C60,81 42,81 22,80 C19,80 17,80 15,78 C12,75 10,71 8,66 C6,62 7,60 10,60"
      />
      <path
        className="mark-mug"
        d="M108,58 L132,58 C132,58 131,72 128,82 C127,85 125,86 122,86 L118,86
           C115,86 113,85 112,82 C109,72 108,58 108,58 Z"
      />
      <path className="mark-stroke mark-handle" d="M132,63 C143,61 144,77 130,76" />
      <path
        className="mark-stroke mark-steam"
        d="M114,50 C117,46 113,42 116,38 M126,50 C129,46 125,42 128,38"
      />
    </svg>
  );
}

export default HeaderMark;
