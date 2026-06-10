import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { posts } from '../lib/posts';

describe('Home', () => {
  it('renders a link to every post', () => {
    render(<Home />, { wrapper: MemoryRouter });
    posts.forEach((post) => {
      const link = screen.getByRole('link', { name: post.title });
      expect(link).toHaveAttribute('href', `/posts/${post.slug}`);
    });
  });

  it('renders each post date', () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(document.querySelectorAll('time')).toHaveLength(posts.length);
  });
});
