import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import { PERSONAL } from '../../data/personal';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

describe('Nav', () => {
  it('renders the site name from PERSONAL data', () => {
    render(<Nav />);
    expect(screen.getByText(new RegExp(PERSONAL.site))).toBeInTheDocument();
  });

  it('renders the dark mode toggle button', () => {
    render(<Nav />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
