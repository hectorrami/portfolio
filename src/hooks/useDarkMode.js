import { useEffect, useState } from 'react';

const prefersDark = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

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

  const toggle = () =>
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });

  return [dark, toggle];
}
