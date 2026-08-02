import { projects, getProject, localizedBlurb } from './oss';
import repos from '../data/repos.json';

describe('projects', () => {
  it('loads at least one project from src/oss', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('gives every project a slug, repo, added date, and blurb', () => {
    projects.forEach((project) => {
      expect(project.slug).toBeTruthy();
      expect(project.repo).toMatch(/^[^/]+\/[^/]+$/);
      expect(project.added).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(project.blurb).toBeTruthy();
    });
  });

  it('sorts projects newest first', () => {
    const dates = projects.map((project) => project.added);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it('does not list Spanish variant files as their own projects', () => {
    projects.forEach((project) => {
      expect(project.slug).not.toMatch(/\.es$/);
    });
  });
});

describe('github data', () => {
  it('joins fetched repo data onto the project by repo slug', () => {
    projects
      .filter((project) => repos[project.repo])
      .forEach((project) => {
        expect(project.github).toBe(repos[project.repo]);
        expect(project.github.url).toContain(project.repo);
        expect(typeof project.github.stars).toBe('number');
      });
  });

  it('leaves github null when no data has been fetched for the repo', () => {
    const project = { repo: 'nobody/nothing' };
    expect(repos[project.repo]).toBeUndefined();
  });
});

describe('getProject', () => {
  it('returns the project matching a slug', () => {
    const first = projects[0];
    expect(getProject(first.slug)).toBe(first);
  });

  it('returns null for an unknown slug', () => {
    expect(getProject('does-not-exist')).toBeNull();
  });
});

describe('localizedBlurb', () => {
  it('returns the Spanish blurb when a translation exists', () => {
    const project = { blurb: 'English', es: { blurb: 'Español' } };
    expect(localizedBlurb(project, 'es')).toBe('Español');
  });

  it('falls back to English when no translation exists', () => {
    const project = { blurb: 'English', es: null };
    expect(localizedBlurb(project, 'es')).toBe('English');
  });

  it('returns English when English is selected', () => {
    const project = { blurb: 'English', es: { blurb: 'Español' } };
    expect(localizedBlurb(project, 'en')).toBe('English');
  });
});
