import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
// One dark code theme for both modes — prose styles code blocks dark either way.
import 'highlight.js/styles/github-dark.css';
import { getPost, localized, formatDate } from '../lib/posts';
import { useLanguage } from '../i18n/LanguageContext';
import TagList from '../components/TagList';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Post() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const post = getPost(slug);
  const titleForTab = post ? localized(post, lang).title : t.postNotFound;
  useDocumentTitle(titleForTab);

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-4">{t.postNotFound}</h1>
        <Link
          to="/"
          className="text-zinc-600 dark:text-zinc-300 hover:underline underline-offset-4"
        >
          {t.backToPosts}
        </Link>
      </div>
    );
  }

  const { title, content } = localized(post, lang);

  return (
    <article>
      <header className="mb-10">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
          <time dateTime={post.date}>{formatDate(post.date, t.dateLocale)}</time>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        <div className="mt-3">
          <TagList tags={post.tags} />
        </div>
      </header>
      <div className="prose prose-zinc dark:prose-invert prose-headings:tracking-tight prose-a:underline-offset-4 leading-relaxed">
        {/* skipHtml keeps raw HTML (e.g. draft comments) out of the rendered page */}
        <ReactMarkdown skipHtml rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </div>
      <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <Link
          to="/"
          className="text-zinc-600 dark:text-zinc-300 hover:underline underline-offset-4"
        >
          {t.backToPosts}
        </Link>
      </footer>
    </article>
  );
}

export default Post;
