import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
// One code theme for both modes; index.css swaps its ground for the site's own.
import 'highlight.js/styles/github-dark.css';
import { getPost, localized, formatDate } from '../lib/posts';
import { useLanguage } from '../i18n/LanguageContext';
import TagList from '../components/TagList';
import TableOfContents from '../components/TableOfContents';
import extractHeadings, { slugify } from '../lib/headings';
import { AUTHOR } from '../lib/site';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Below this a contents list is longer than the piece it indexes.
const MIN_HEADINGS_FOR_TOC = 2;

function Post() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const post = getPost(slug);
  const titleForTab = post ? localized(post, lang).title : t.postNotFound;
  useDocumentTitle(titleForTab);

  const bodyRef = useRef(null);
  const content = post ? localized(post, lang).content : '';
  const headings = useMemo(() => extractHeadings(content), [content]);

  // Ids are stamped onto the rendered headings by document order rather than
  // recomputed from their text, so the anchors always match the contents list
  // even if the two ever disagree about how to slug a character. If the counts
  // drift, fall back to the element's own text so anchors still resolve.
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    body.querySelectorAll('h2, h3').forEach((el, i) => {
      el.setAttribute('id', headings[i]?.id || slugify(el.textContent) || `section-${i + 1}`);
      el.style.setProperty('scroll-margin-top', '2rem');
    });
  }, [headings, content]);

  if (!post) {
    return (
      <div className="rail-grid">
        <div className="lg:col-start-2">
          <h1 className="display mb-4 text-[1.75rem] font-semibold text-ink">{t.postNotFound}</h1>
          <Link to="/" viewTransition className="link font-serif text-[1.0625rem]">
            {t.backToPosts}
          </Link>
        </div>
      </div>
    );
  }

  const { title, description } = localized(post, lang);
  const showToc = headings.length >= MIN_HEADINGS_FOR_TOC;

  return (
    <article>
      {/* Title block: the byline hangs in the rail where the date sat on the
          index, so an article opens on the same axis the list closed on. It is
          separated from the body by space rather than a rule; the first h2
          already brings its own. */}
      <header className="rail-grid">
        <div className="meta pt-2 leading-relaxed">
          <p>{AUTHOR.name}</p>
          <p>
            <time dateTime={post.date}>{formatDate(post.date, t.dateLocale)}</time>
          </p>
        </div>
        <div>
          <h1 className="display text-[2rem] font-semibold text-ink sm:text-[2.5rem]">{title}</h1>
          {description && (
            <p className="mt-5 font-serif text-[1.1875rem] leading-[1.6] text-ink-muted">
              {description}
            </p>
          )}
          <div className="mt-6">
            <TagList tags={post.tags} />
          </div>
        </div>
      </header>

      <div className="rail-grid pt-16">
        <div className="mb-10 lg:mb-0">
          {showToc && (
            <TableOfContents headings={headings} containerRef={bodyRef} label={t.contents} />
          )}
        </div>
        <div ref={bodyRef} className="prose">
          {/* skipHtml keeps raw HTML (e.g. draft comments) out of the rendered page */}
          <ReactMarkdown skipHtml rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>

      <footer className="rail-grid mt-16 border-t border-rule-strong pt-6">
        <div className="lg:col-start-2">
          <Link to="/" viewTransition className="link font-serif text-[1.0625rem]">
            {t.backToPosts}
          </Link>
        </div>
      </footer>
    </article>
  );
}

export default Post;
