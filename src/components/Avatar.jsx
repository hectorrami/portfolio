import React from 'react';

// A 40px rounded square used by both the repo rows and the post list, so the
// two sections share one visual rhythm. Decorative in both cases — the name it
// stands for is always adjacent as text.
function Avatar({ src, initials, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width="40"
        height="40"
        loading="lazy"
        className={`h-10 w-10 flex-none rounded-[10px] ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 flex-none items-center justify-center rounded-[10px] text-sm font-semibold ${className}`}
    >
      {initials}
    </span>
  );
}

export default Avatar;
