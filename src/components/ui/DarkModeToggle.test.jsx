import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeToggle from './DarkModeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

describe('DarkModeToggle', () => {
  it('renders a button', () => {
    render(<DarkModeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles dark mode class on click', async () => {
    const user = userEvent.setup();
    render(<DarkModeToggle />);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light mode on second click', async () => {
    const user = userEvent.setup();
    render(<DarkModeToggle />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button'));

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
