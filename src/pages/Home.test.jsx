import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import Home from './Home';
import { posts, localized } from '../lib/posts';

beforeEach(() => {
  localStorage.clear();
});

const renderHome = () =>
  render(
    <LanguageProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </LanguageProvider>,
  );

describe('Home', () => {
  it('renders a link to every post', () => {
    renderHome();
    posts.forEach((post) => {
      const link = screen.getByRole('link', { name: post.title });
      expect(link).toHaveAttribute('href', `/posts/${post.slug}`);
    });
  });

  it('renders each post date', () => {
    renderHome();
    expect(document.querySelectorAll('time')).toHaveLength(posts.length);
  });

  it('renders the intro line and a filter pill per tag', () => {
    renderHome();
    expect(screen.getByText(/Notes on software/)).toBeInTheDocument();
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
    expect(screen.getAllByRole('link')).toHaveLength(matching.length);

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByRole('link')).toHaveLength(posts.length);
  });

  it('renders translated titles when Spanish is selected', () => {
    localStorage.setItem('lang', 'es');
    renderHome();
    posts.forEach((post) => {
      const { title } = localized(post, 'es');
      expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
    });
  });
});
