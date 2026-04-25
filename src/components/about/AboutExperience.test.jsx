import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutExperience from './AboutExperience';
import { experience, education } from '../../data/experience';
import { PERSONAL } from '../../data/personal';

beforeEach(() => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

describe('AboutExperience', () => {
  it('renders the about section with location', () => {
    render(<AboutExperience />);
    expect(screen.getByText(PERSONAL.location)).toBeInTheDocument();
  });

  it('renders the employer name and link', () => {
    render(<AboutExperience />);
    expect(screen.getByRole('link', { name: PERSONAL.employer.name })).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    render(<AboutExperience />);
    experience.forEach((entry) => {
      expect(screen.getByText(entry.company)).toBeInTheDocument();
    });
  });

  it('renders all education entries', () => {
    render(<AboutExperience />);
    education.forEach((entry) => {
      expect(screen.getByText(entry.company)).toBeInTheDocument();
    });
  });

  it('renders the connect section with social links', () => {
    render(<AboutExperience />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument();
  });
});
