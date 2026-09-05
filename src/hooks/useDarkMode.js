import { useEffect, useState } from 'react';

const prefersDark = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Dark mode defaults to the system preference; the toggle overrides it and
// persists the choice in localStorage (read on load by the inline script in
// index.html to avoid a flash of the wrong theme).
export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return prefersDark();
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    localStorage.setItem('theme', next ? 'dark' : 'light');

    // The class is set here rather than left to the effect so that it lands
    // inside the view transition's callback, which is what gives the flip a
    // crossfade instead of a hard repaint. The effect above still runs and
    // sets the same class, which is a no-op.
    const apply = () => {
      document.documentElement.classList.toggle('dark', next);
      setDark(next);
    };

    if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
      apply();
      return;
    }

    // `theme-flip` swaps the navigation transition for a pure crossfade — a
    // theme change should not drift the page the way moving between routes does.
    const root = document.documentElement;
    root.classList.add('theme-flip');
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => root.classList.remove('theme-flip'));
  };

  return [dark, toggle];
}
