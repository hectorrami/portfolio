import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from './LanguageContext';

function Probe() {
  const { lang, toggle, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="back">{t.backToPosts}</span>
      <button type="button" onClick={toggle}>
        toggle
      </button>
    </div>
  );
}

const renderProbe = () =>
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  );

beforeEach(() => {
  localStorage.clear();
});

describe('LanguageProvider', () => {
  it('defaults to English for non-Spanish browsers', () => {
    renderProbe();
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('uses the stored language preference', () => {
    localStorage.setItem('lang', 'es');
    renderProbe();
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(screen.getByTestId('back')).toHaveTextContent('Volver a todas las entradas');
  });

  it('toggles the language, persists it, and updates the document lang', async () => {
    const user = userEvent.setup();
    renderProbe();

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(localStorage.getItem('lang')).toBe('es');
    expect(document.documentElement.lang).toBe('es');

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });
});
