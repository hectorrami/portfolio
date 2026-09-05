import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import Home from './Home';
import { posts, localized } from '../lib/posts';
import { projects } from '../lib/oss';
import { STRINGS } from '../i18n/strings';

beforeEach(() => {
  localStorage.clear();
});

// The page also links out to each open source project, so link assertions about
// the post list have to be scoped to internal post links. Each post link wraps
// the whole entry — date, title, description, tags — so its accessible name is
// all of that text concatenated; match on href instead.
const postLinks = () =>
  screen.getAllByRole('link').filter((link) => link.getAttribute('href').startsWith('/posts/'));

const postLink = (slug) =>
  screen.getAllByRole('link').find((link) => link.getAttribute('href') === `/posts/${slug}`);

// A project card is one link wrapping the name, owner, blurb and stats. Matching
// on the name alone is ambiguous when a repo's owner and name are the same
// (react/react renders "react" twice), so match on href like the post links.
const ossLink = (url) =>
  screen.getAllByRole('link').find((link) => link.getAttribute('href') === url);

const renderHome = () =>
  render(
    <LanguageProvider enabled>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </LanguageProvider>,
  );

describe('Home', () => {
  it('links the whole entry to every post', () => {
    renderHome();
    posts.forEach((post) => {
      const link = postLink(post.slug);
      expect(link).toBeTruthy();
      expect(within(link).getByRole('heading', { name: post.title })).toBeInTheDocument();
    });
  });

  // The date hangs in the rail beside the entry rather than inside it: it
  // annotates the post, so it is not part of what you click.
  it('renders each post date in the rail, outside the link', () => {
    renderHome();
    postLinks().forEach((link) => {
      expect(within(link).queryByText(/\d{4}/)).toBeNull();
    });
    document.querySelectorAll('time').forEach((time) => {
      expect(time.closest('a')).toBeNull();
    });
  });

  it('renders a Posts heading above the list', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument();
  });

  it('renders each post date', () => {
    renderHome();
    expect(document.querySelectorAll('time')).toHaveLength(posts.length);
  });

  it('renders the hero lede and its dateline', () => {
    renderHome();
    // Asserted against the string source, not a copy of it: the hero is
    // editorial copy that gets rewritten, and rewriting it should not fail a
    // test about whether the hero renders.
    expect(
      screen.getByRole('heading', { level: 1, name: STRINGS.en.heroLede }),
    ).toBeInTheDocument();
    expect(screen.getByText(STRINGS.en.heroPlace)).toBeInTheDocument();
  });

  // The index shows every post, always. Tags are still rendered on each entry
  // as metadata, but they are labels now, not controls.
  it('lists every post with no filtering controls', () => {
    renderHome();
    expect(postLinks()).toHaveLength(posts.length);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('renders translated titles when Spanish is selected', () => {
    localStorage.setItem('lang', 'es');
    renderHome();
    posts.forEach((post) => {
      const { title } = localized(post, 'es');
      expect(within(postLink(post.slug)).getByRole('heading', { name: title })).toBeInTheDocument();
    });
  });
});

describe('open source section', () => {
  it('renders a heading and a card per project', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: STRINGS.en.ossHeading })).toBeInTheDocument();
    projects.forEach((project) => {
      expect(ossLink(project.github.url)).toBeDefined();
    });
  });

  it('translates the section heading', () => {
    localStorage.setItem('lang', 'es');
    renderHome();
    expect(screen.getByRole('heading', { name: STRINGS.es.ossHeading })).toBeInTheDocument();
  });
});
