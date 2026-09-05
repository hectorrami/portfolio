import React from 'react';

// Tags as mono labels rather than pills. In an index the tag is apparatus, not
// a button — it should sit at the same weight as the date beside it and not
// compete with the title above it.
function TagList({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="meta flex flex-wrap items-center gap-x-4 gap-y-1">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export default TagList;
