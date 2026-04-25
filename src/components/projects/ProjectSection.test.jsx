import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectsSection from './ProjectSection';
import { projects } from '../../data/projects';

describe('ProjectsSection', () => {
  it('renders all project titles', () => {
    render(<ProjectsSection />);
    projects.forEach((project) => {
      expect(screen.getByText(new RegExp(project.title))).toBeInTheDocument();
    });
  });

  it('renders a GitHub link for every project', () => {
    render(<ProjectsSection />);
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks).toHaveLength(projects.length);
  });

  it('renders Live Demo link only for projects that have one', () => {
    render(<ProjectsSection />);
    const projectsWithDemo = projects.filter((p) => p.liveDemo);
    const demoLinks = screen.getAllByRole('link', { name: /live demo/i });
    expect(demoLinks).toHaveLength(projectsWithDemo.length);
  });

  it('renders tech stack badges for each project', () => {
    render(<ProjectsSection />);
    projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
      });
    });
  });
});
