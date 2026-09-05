import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import Post from './Post';
import { posts } from '../lib/posts';
import extractHeadings from '../lib/headings';

beforeEach(() => {
  localStorage.clear();
});

const renderPost = (slug) =>
  render(
    <LanguageProvider enabled>
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
    // Sample visible text only: drop HTML comments and image lines, then
    // escape the snippet since it feeds a RegExp.
    const visibleText = post.content
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/^!\[.*$/gm, '')
      .trim();
    const firstSentence = visibleText.split(/[.\n]/)[0];
    const escaped = firstSentence.slice(0, 40).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    expect(screen.getByText(new RegExp(escaped))).toBeInTheDocument();
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

describe('table of contents', () => {
  const sectioned = posts.find((post) => extractHeadings(post.content).length >= 2);
  const flat = posts.find((post) => extractHeadings(post.content).length === 0);

  it('lists every section of a post that has them', () => {
    expect(sectioned).toBeTruthy();
    renderPost(sectioned.slug);
    const toc = screen.getByRole('navigation', { name: 'Contents' });
    extractHeadings(sectioned.content).forEach((heading) => {
      expect(within(toc).getByRole('link', { name: heading.text })).toHaveAttribute(
        'href',
        `#${heading.id}`,
      );
    });
  });

  it('anchors each contents entry to the heading it names', () => {
    renderPost(sectioned.slug);
    extractHeadings(sectioned.content).forEach((heading) => {
      expect(document.getElementById(heading.id)).toBeTruthy();
    });
  });

  it('marks the first section current before any scrolling has happened', () => {
    renderPost(sectioned.slug);
    const toc = screen.getByRole('navigation', { name: 'Contents' });
    const [first] = extractHeadings(sectioned.content);
    expect(within(toc).getByRole('link', { name: first.text })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  // A contents list for a post with no sections is longer than the post.
  it('is left out of a post with no headings', () => {
    expect(flat).toBeTruthy();
    renderPost(flat.slug);
    expect(screen.queryByRole('navigation', { name: 'Contents' })).not.toBeInTheDocument();
  });
});
