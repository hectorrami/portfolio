import React from 'react';

function TagList({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-0.5"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default TagList;
