import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('renders translated titles when Spanish is selected', () => {
    localStorage.setItem('lang', 'es');
    renderHome();
    posts.forEach((post) => {
      const { title } = localized(post, 'es');
      expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
    });
  });
});
