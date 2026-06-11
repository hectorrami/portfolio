import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import About from './About';

beforeEach(() => {
  localStorage.clear();
});

const renderAbout = () =>
  render(
    <LanguageProvider>
      <About />
    </LanguageProvider>,
  );

describe('About', () => {
  it('renders the heading', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('renders the bio text', () => {
    renderAbout();
    expect(screen.getByText(/Software Engineer from Houston/)).toBeInTheDocument();
  });

  it('renders a Spanish heading when Spanish is selected', () => {
    localStorage.setItem('lang', 'es');
    renderAbout();
    expect(screen.getByRole('heading', { name: 'Sobre mí' })).toBeInTheDocument();
  });
});
