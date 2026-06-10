import React from 'react';
import { Link } from 'react-router-dom';
import { posts, formatDate } from '../lib/posts';

function Home() {
  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={`/posts/${post.slug}`}
            className="text-lg font-medium tracking-tight hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          {post.description && (
            <p className="text-zinc-600 dark:text-zinc-300 mt-2">{post.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Home;
