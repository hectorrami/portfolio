import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, localized, formatDate } from '../lib/posts';
import { projects, localizedBlurb } from '../lib/oss';
import { useLanguage } from '../i18n/LanguageContext';
import TagList from '../components/TagList';
import RepoCard from '../components/RepoCard';
import useDocumentTitle from '../hooks/useDocumentTitle';

const allTags = [...new Set(posts.flatMap((post) => post.tags))];

function Home() {
  const { lang, t } = useLanguage();
  const [activeTag, setActiveTag] = useState(null);
  useDocumentTitle(null);

  const visiblePosts = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

  const pillClass = (selected) =>
    `text-sm rounded-full px-3 py-1 transition-colors ${
      selected
        ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
    }`;

  return (
    <>
      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">{t.intro}</p>
      {projects.length > 0 && (
        <section className="mb-12">
          <h2 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.ossHeading}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <RepoCard
                key={project.slug}
                project={project}
                blurb={localizedBlurb(project, lang)}
              />
            ))}
          </div>
        </section>
      )}
      {allTags.length > 0 && (
        <div
          className={`flex flex-wrap items-center gap-2 mb-10 ${
            projects.length > 0 ? 'border-t border-zinc-200 pt-8 dark:border-zinc-800' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={pillClass(activeTag === null)}
          >
            {t.allPosts}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={pillClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <ul className="space-y-4">
        {visiblePosts.map((post) => {
          const { title, description } = localized(post, lang);
          return (
            <li key={post.slug}>
              {/* The whole entry is the target, matching the repo cards below. */}
              <Link
                to={`/posts/${post.slug}`}
                className="group -mx-3 block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              >
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                  <time dateTime={post.date}>{formatDate(post.date, t.dateLocale)}</time>
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:underline underline-offset-4">
                  {title}
                </h2>
                {description && (
                  <p className="text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                    {description}
                  </p>
                )}
                <div className="mt-3">
                  <TagList tags={post.tags} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Home;
