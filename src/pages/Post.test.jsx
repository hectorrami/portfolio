import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import Post from './Post';
import { posts } from '../lib/posts';

beforeEach(() => {
  localStorage.clear();
});

const renderPost = (slug) =>
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[`/posts/${slug}`]}>
        <Routes>
          <Route path="/posts/:slug" element={<Post />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
  );

describe('Post', () => {
  it('renders the post title and date for a valid slug', () => {
    const post = posts[0];
    renderPost(post.slug);
    expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
    expect(document.querySelector('time')).toHaveAttribute('dateTime', post.date);
  });

  it('renders the markdown body', () => {
    const post = posts[0];
    renderPost(post.slug);
    // HTML comments are dropped by react-markdown, so sample visible text only
    const visibleText = post.content.replace(/<!--[\s\S]*?-->/g, '').trim();
    const firstSentence = visibleText.split(/[.\n]/)[0];
    expect(screen.getByText(new RegExp(firstSentence.slice(0, 40)))).toBeInTheDocument();
  });

  it('renders the post tags', () => {
    const tagged = posts.find((post) => post.tags.length > 0);
    expect(tagged).toBeTruthy();
    renderPost(tagged.slug);
    tagged.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders a back-to-posts link at the bottom of the post', () => {
    renderPost(posts[0].slug);
    const back = screen.getByRole('link', { name: /back to all posts/i });
    expect(back).toHaveAttribute('href', '/');
  });

  it('renders the Spanish translation when one exists and Spanish is selected', () => {
    const translated = posts.find((post) => post.es);
    expect(translated).toBeTruthy();
    localStorage.setItem('lang', 'es');
    renderPost(translated.slug);
    expect(screen.getByRole('heading', { name: translated.es.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /volver a todas las entradas/i })).toBeInTheDocument();
  });

  it('shows a not-found message for an unknown slug', () => {
    renderPost('does-not-exist');
    expect(screen.getByText(/post not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to all posts/i })).toBeInTheDocument();
  });
});
