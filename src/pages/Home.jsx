import React from 'react';
import { Link } from 'react-router-dom';
import { posts, localized, formatDate } from '../lib/posts';
import { projects, localizedBlurb } from '../lib/oss';
import { useLanguage } from '../i18n/LanguageContext';
import TagList from '../components/TagList';
import RepoCard from '../components/RepoCard';
import PostArtwork from '../components/PostArtwork';
import useDocumentTitle from '../hooks/useDocumentTitle';

// A section hangs its name in the rail and puts everything else in the column.
// Keeping the heading out of the column is what makes the page read as a set
// of sections rather than a scroll of blocks, and it costs no extra chrome.
function Section({ label, children, className = '' }) {
  return (
    <section className={className}>
      <div className="rail-grid border-t border-rule-strong pt-5 pb-5">
        <h2 className="meta text-ink">{label}</h2>
      </div>
      {children}
    </section>
  );
}

function Home() {
  const { lang, t } = useLanguage();
  useDocumentTitle(null);

  return (
    <>
      {/* No manifesto. The front page states what this is and then gets out of
          the way — the index below is the argument, and it is more convincing
          than a headline claiming the same thing in larger type. The rail
          carries a dateline, so the hero sits on the same axis as every other
          section instead of being the one unstructured spot on the page. */}
      <header className="rail-grid mb-16">
        <p className="meta pt-2.5">{t.heroPlace}</p>
        <h1 className="max-w-[30rem] font-serif text-[1.5rem] leading-[1.45] text-ink sm:text-[1.75rem]">
          {t.heroLede}
        </h1>
      </header>

      <Section className="mb-20" label={t.posts}>
        <ul className="divide-y divide-rule">
          {posts.map((post) => {
            const { title, description } = localized(post, lang);
            return (
              <li key={post.slug} className="rail-grid reveal py-8">
                <div>
                  <PostArtwork
                    seed={post.slug}
                    className="mb-3 aspect-square w-full max-w-[8.5rem] rounded-lg"
                  />
                  <p className="meta">
                    <time dateTime={post.date}>{formatDate(post.date, t.dateLocale)}</time>
                  </p>
                </div>
                <Link to={`/posts/${post.slug}`} viewTransition className="row-link group block">
                  <h3 className="display text-[1.375rem] font-semibold text-ink">
                    <span className="row-title">{title}</span>
                  </h3>
                  {description && (
                    <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-body">
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
      </Section>

      {projects.length > 0 && (
        <Section label={t.ossHeading}>
          <ul className="divide-y divide-rule">
            {projects.map((project) => (
              <li key={project.slug} className="reveal">
                <RepoCard project={project} blurb={localizedBlurb(project, lang)} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

export default Home;
