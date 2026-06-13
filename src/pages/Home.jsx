import React from 'react';
import { Link } from 'react-router-dom';
import { posts, localized, formatDate } from '../lib/posts';
import { useLanguage } from '../i18n/LanguageContext';
import PostGraph from '../components/PostGraph';
import TagList from '../components/TagList';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Home() {
  const { lang, t } = useLanguage();
  useDocumentTitle(null);

  return (
    <>
      <PostGraph />
      <ul className="space-y-10">
        {posts.map((post) => {
          const { title, description } = localized(post, lang);
          return (
            <li key={post.slug}>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                <time dateTime={post.date}>{formatDate(post.date, t.dateLocale)}</time>
              </p>
              <Link
                to={`/posts/${post.slug}`}
                className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
              >
                {title}
              </Link>
              {description && (
                <p className="text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                  {description}
                </p>
              )}
              <div className="mt-3">
                <TagList tags={post.tags} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Home;
