import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPost, formatDate } from '../lib/posts';

function Post() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-4">Post not found</h1>
        <Link
          to="/"
          className="text-zinc-600 dark:text-zinc-300 hover:underline underline-offset-4"
        >
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <article>
      <header className="mb-10">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {post.title}
        </h1>
      </header>
      <div className="prose prose-zinc dark:prose-invert prose-headings:tracking-tight prose-a:underline-offset-4 leading-relaxed">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

export default Post;
