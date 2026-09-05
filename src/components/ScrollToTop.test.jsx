import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

let scrollTo;

beforeEach(() => {
  scrollTo = vi.fn();
  window.scrollTo = scrollTo;
});

// `to` is what the index links to; the post route renders something to land on.
const renderApp = (to) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Link to={to}>Open the post</Link>} />
        <Route path="/posts/one" element={<p>Post body</p>} />
      </Routes>
    </MemoryRouter>,
  );

describe('ScrollToTop', () => {
  it('scrolls to the top when a link navigates to a new route', async () => {
    const user = userEvent.setup();
    renderApp('/posts/one');

    await user.click(screen.getByRole('link', { name: 'Open the post' }));

    expect(screen.getByText('Post body')).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });

  // html carries `scroll-behavior: smooth` for anchor links, so a route change
  // has to opt out explicitly or it animates a thousand pixels on every click.
  it('jumps instantly rather than animating the scroll', async () => {
    const user = userEvent.setup();
    renderApp('/posts/one');

    await user.click(screen.getByRole('link', { name: 'Open the post' }));

    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo.mock.calls[0][0].behavior).toBe('instant');
  });

  // A link to a section is asking for that section, not for the top.
  it('leaves the scroll alone when the target has a hash', async () => {
    const user = userEvent.setup();
    renderApp('/posts/one#pricing');

    await user.click(screen.getByRole('link', { name: 'Open the post' }));

    expect(screen.getByText('Post body')).toBeInTheDocument();
    expect(scrollTo).not.toHaveBeenCalled();
  });

  // The first render is a POP. Hijacking it would fight the browser's own
  // restoration on a deep link, a refresh, and the back button.
  it('does not scroll on the initial render', () => {
    renderApp('/posts/one');
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
