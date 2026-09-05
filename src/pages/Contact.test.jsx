import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import Contact from './Contact';
import { CONTACT } from '../lib/site';

beforeEach(() => {
  localStorage.clear();
});

const renderContact = () =>
  render(
    <LanguageProvider enabled>
      <Contact />
    </LanguageProvider>,
  );

describe('Contact', () => {
  it('renders the heading', () => {
    renderContact();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });

  it('asks for email and links the address as a mailto', () => {
    renderContact();
    expect(screen.getByText(/For any inquiries, please send an email to/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: CONTACT.email })).toHaveAttribute(
      'href',
      `mailto:${CONTACT.email}`,
    );
  });

  it('renders a Spanish heading and lead when Spanish is selected', () => {
    localStorage.setItem('lang', 'es');
    renderContact();
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument();
    expect(screen.getByText(/Para cualquier consulta/)).toBeInTheDocument();
  });
});
