import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageContext';
import { CONTACT } from '../lib/site';

// The footer's links are set as text rather than icons. A row of glyphs reads
// as a social bar; the same four words in mono read as a colophon, which is
// what the bottom of a publication actually is.
const COLOPHON_LINKS = (t) => [
  { label: 'GitHub', href: CONTACT.github, external: true },
  { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
  { label: t.email, href: `mailto:${CONTACT.email}` },
  { label: 'RSS', href: '/rss.xml' },
];

function Layout() {
  const { t, languageEnabled } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink-body">
      {/* The masthead spans the shell rather than the rail grid, but its two
          ends land on the grid anyway: the wordmark on the rail's left edge,
          the controls on the column's right edge. Centre alignment, not
          baseline — the toggles are icons, and an icon has no baseline worth
          aligning to. No rule beneath it: the gap to the first line of content
          is doing that work, so a hairline would only repeat it. */}
      <header>
        <div className="shell flex items-center justify-between py-5">
          <Link to="/" className="display text-base font-semibold tracking-tight text-ink">
            Hector Ramirez
          </Link>
          <nav className="flex items-center gap-5">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-ink-muted'}`
              }
            >
              {t.contact}
            </NavLink>
            {languageEnabled && <LanguageToggle />}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="shell flex-1 py-16 sm:py-20">
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-rule">
        <div className="shell rail-grid py-8">
          <p className="meta">© {new Date().getFullYear()} Hector Ramirez</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {COLOPHON_LINKS(t).map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  // Set unconditionally: harmless on the mailto and the feed,
                  // and a conditional rel is not statically checkable.
                  rel="noopener noreferrer"
                  className="meta transition-colors hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
