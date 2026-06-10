import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import Layout from './Layout';
import { CONTACT } from '../lib/site';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

const renderLayout = () =>
  render(
    <LanguageProvider>
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    </LanguageProvider>,
  );

describe('Layout', () => {
  it('renders the site name linking home', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: 'Hector Ramirez' })).toHaveAttribute('href', '/');
  });

  it('renders contact links for GitHub, LinkedIn, and email', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', CONTACT.github);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      CONTACT.linkedin,
    );
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      `mailto:${CONTACT.email}`,
    );
  });

  it('renders the RSS link and copyright', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/rss.xml');
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  it('translates the email label in Spanish', () => {
    localStorage.setItem('lang', 'es');
    renderLayout();
    expect(screen.getByRole('link', { name: 'Correo' })).toBeInTheDocument();
  });
});
