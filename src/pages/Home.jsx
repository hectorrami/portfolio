import React from 'react';
import { Link } from 'react-router-dom';
import { posts, formatDate } from '../lib/posts';

function Home() {
  return (
    <ul className="space-y-10">
      {posts.map((post) => (
        <li key={post.slug}>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <Link
            to={`/posts/${post.slug}`}
            className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
          >
            {post.title}
          </Link>
          {post.description && (
            <p className="text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
              {post.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Home;
