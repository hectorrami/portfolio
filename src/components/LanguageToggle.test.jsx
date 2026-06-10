import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

beforeEach(() => {
  localStorage.clear();
});

const renderToggle = () =>
  render(
    <LanguageProvider>
      <LanguageToggle />
    </LanguageProvider>,
  );

describe('LanguageToggle', () => {
  it('offers Spanish while in English', () => {
    renderToggle();
    expect(screen.getByRole('button', { name: /cambiar a español/i })).toHaveTextContent('ES');
  });

  it('switches to Spanish when clicked', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: /cambiar a español/i }));
    expect(screen.getByRole('button', { name: /switch to english/i })).toHaveTextContent('EN');
  });
});
