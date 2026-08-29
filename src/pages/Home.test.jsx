import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import Home from './Home';
import { posts, localized } from '../lib/posts';
import { projects } from '../lib/oss';

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

  it('renders the author monogram on every post entry', () => {
    renderHome();
    postLinks().forEach((link) => {
      expect(within(link).getByText('HR')).toBeInTheDocument();
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

  it('renders the hero title, subheader, and a filter pill per tag', () => {
    renderHome();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /I love software that actually does something/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/an engineer from Houston/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All', pressed: true })).toBeInTheDocument();
    const tags = [...new Set(posts.flatMap((post) => post.tags))];
    tags.forEach((tag) => {
      expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
    });
  });

  it('filters the post list by tag and resets via All', async () => {
    const user = userEvent.setup();
    renderHome();
    const tag = posts.find((post) => post.tags.length > 0).tags[0];
    const matching = posts.filter((post) => post.tags.includes(tag));

    await user.click(screen.getByRole('button', { name: tag }));
    expect(postLinks()).toHaveLength(matching.length);

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(postLinks()).toHaveLength(posts.length);
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
    expect(screen.getByRole('heading', { name: "Software I'm glad exists" })).toBeInTheDocument();
    projects.forEach((project) => {
      expect(ossLink(project.github.url)).toBeDefined();
    });
  });

  it('translates the section heading', () => {
    localStorage.setItem('lang', 'es');
    renderHome();
    expect(
      screen.getByRole('heading', { name: 'Software que me alegra que exista' }),
    ).toBeInTheDocument();
  });

  it('is not affected by the post tag filter', async () => {
    const user = userEvent.setup();
    renderHome();
    const tag = posts.find((post) => post.tags.length > 0).tags[0];

    await user.click(screen.getByRole('button', { name: tag }));
    expect(screen.getByRole('heading', { name: "Software I'm glad exists" })).toBeInTheDocument();
    projects.forEach((project) => {
      expect(ossLink(project.github.url)).toBeDefined();
    });
  });
});
