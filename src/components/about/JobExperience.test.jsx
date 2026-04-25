import React from 'react';
import { render, screen } from '@testing-library/react';
import JobExperience from './JobExperience';

const baseProps = {
  company: 'Acme Corp',
  title: 'Software Engineer',
  location: 'Houston, TX',
  dateRange: 'Jan 2022 – Present',
  responsibilities: [],
};

describe('JobExperience', () => {
  it('renders company, title, location, and date range', () => {
    render(<JobExperience {...baseProps} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Houston, TX/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 2022/)).toBeInTheDocument();
  });

  it('renders responsibilities when provided', () => {
    render(<JobExperience {...baseProps} responsibilities={['Built a thing', 'Fixed a bug']} />);
    expect(screen.getByText(/Built a thing/)).toBeInTheDocument();
    expect(screen.getByText(/Fixed a bug/)).toBeInTheDocument();
  });

  it('does not render responsibilities section when list is empty', () => {
    render(<JobExperience {...baseProps} responsibilities={[]} />);
    expect(screen.queryByText('Achievements:')).not.toBeInTheDocument();
  });

  it('renders tool badges when provided', () => {
    render(<JobExperience {...baseProps} tools={['React', 'TypeScript']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('does not render tools section when no tools are provided', () => {
    render(<JobExperience {...baseProps} />);
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});
