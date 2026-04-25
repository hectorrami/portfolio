import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    const { container: c } = render(<Header />);
    expect(c.firstChild).toBeInTheDocument();
  });

  it('renders the ASCII art in a pre element', () => {
    const { container: c } = render(<Header />);
    expect(c.querySelector('pre')).toBeInTheDocument();
  });
});
