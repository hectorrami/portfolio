import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { PERSONAL } from '../../data/personal';

describe('Footer', () => {
  it('renders the current year', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(new Date().getFullYear()))).toBeInTheDocument();
  });

  it('renders the owner name from PERSONAL data', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(PERSONAL.name))).toBeInTheDocument();
  });

  it('renders the tech stack credit', () => {
    render(<Footer />);
    expect(screen.getByText(/Built with React/)).toBeInTheDocument();
  });
});
