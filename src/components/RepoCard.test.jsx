import React from 'react';
import { render, screen } from '@testing-library/react';
import RepoCard from './RepoCard';

const project = {
  slug: 'superpowers',
  repo: 'obra/superpowers',
  added: '2026-08-01',
  github: {
    name: 'superpowers',
    owner: 'obra',
    url: 'https://github.com/obra/superpowers',
    stars: 264824,
    language: 'Shell',
    license: 'MIT',
    avatar: '/images/oss/obra.png',
  },
  es: null,
};

describe('RepoCard', () => {
  it('links the whole card to the repo, opening in a new tab safely', () => {
    render(<RepoCard project={project} blurb="A skills library." />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/obra/superpowers');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the name, owner, blurb, language, and license', () => {
    render(<RepoCard project={project} blurb="A skills library." />);
    expect(screen.getByText('superpowers')).toBeInTheDocument();
    expect(screen.getByText(/obra/)).toBeInTheDocument();
    expect(screen.getByText('A skills library.')).toBeInTheDocument();
    expect(screen.getByText('Shell')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('does not show the added date', () => {
    const { container } = render(<RepoCard project={project} blurb="A skills library." />);
    expect(container.querySelector('time')).toBeNull();
  });

  it('abbreviates the star count visually but exposes the full number', () => {
    render(<RepoCard project={project} blurb="A skills library." />);
    expect(screen.getByText('★ 264.8K')).toBeInTheDocument();
    expect(screen.getByText('264,824 stars')).toBeInTheDocument();
  });

  it('renders a decorative avatar so screen readers skip it', () => {
    const { container } = render(<RepoCard project={project} blurb="A skills library." />);
    const avatar = container.querySelector('img');
    expect(avatar).toHaveAttribute('src', '/images/oss/obra.png');
    expect(avatar).toHaveAttribute('alt', '');
  });

  it('falls back to the repo slug and hides the stats row when github data is missing', () => {
    render(<RepoCard project={{ ...project, github: null }} blurb="A skills library." />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/obra/superpowers');
    expect(screen.getByText('superpowers')).toBeInTheDocument();
    expect(screen.queryByText('Shell')).not.toBeInTheDocument();
    expect(screen.queryByText(/stars/)).not.toBeInTheDocument();
  });

  it('falls back to a monogram when there is no avatar', () => {
    const { container } = render(
      <RepoCard project={{ ...project, github: null }} blurb="A skills library." />,
    );
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('S')).toBeInTheDocument();
  });
});
