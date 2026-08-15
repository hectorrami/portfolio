import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, localized, formatDate } from '../lib/posts';
import { projects, localizedBlurb } from '../lib/oss';
import { useLanguage } from '../i18n/LanguageContext';
import TagList from '../components/TagList';
import RepoCard from '../components/RepoCard';
import Avatar from '../components/Avatar';
import HeaderMark from '../components/HeaderMark';
import { AUTHOR } from '../lib/site';
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
        ? 'bg-zinc-900 text-zinc-50 dark:bg-ink dark:text-surface'
        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-surface-2 dark:text-ink-body dark:hover:bg-surface-3'
    }`;

  return (
    <>
      <header className="mb-10">
        <HeaderMark />
        {/* text-balance keeps the headline from breaking to a one-word last
            line, without hardcoding a <br> that only works at one width. */}
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl dark:text-ink">
          {t.heroTitle}
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-600 dark:text-ink-body">{t.heroSubtitle}</p>
      </header>
      {projects.length > 0 && (
        <section className="mb-12">
          <h2 className="font-semibold tracking-tight text-zinc-900 dark:text-ink">
            {t.ossHeading}
          </h2>
          <div className="mt-4 divide-y divide-zinc-100 border-y border-zinc-100 dark:divide-line dark:border-line">
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
      <section
        className={projects.length > 0 ? 'border-t border-zinc-200 pt-8 dark:border-line' : ''}
      >
        <h2 className="font-semibold tracking-tight text-zinc-900 dark:text-ink">{t.posts}</h2>
        {allTags.length > 0 && (
          <div className="mt-5 mb-10 flex flex-wrap items-center gap-2">
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
                {/* The whole entry is the target, matching the repo cards above. */}
                <Link
                  to={`/posts/${post.slug}`}
                  className="group -mx-3 flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-surface-2/40"
                >
                  <Avatar
                    initials={AUTHOR.initials}
                    className="bg-zinc-900 text-zinc-50 dark:bg-ink dark:text-surface"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-500 dark:text-ink-muted">
                      <time dateTime={post.date}>{formatDate(post.date, t.dateLocale)}</time>
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 underline-offset-4 group-hover:underline dark:text-ink">
                      {title}
                    </h3>
                    {description && (
                      <p className="mt-2 leading-relaxed text-zinc-600 dark:text-ink-body">
                        {description}
                      </p>
                    )}
                    <div className="mt-3">
                      <TagList tags={post.tags} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Home;
