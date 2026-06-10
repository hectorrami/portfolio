import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      <header className="max-w-2xl w-full mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
        >
          Hector Ramirez
        </Link>
        <ThemeToggle />
      </header>
      <main className="max-w-2xl w-full mx-auto px-6 py-8 flex-1">
        <Outlet />
      </main>
      <footer className="max-w-2xl w-full mx-auto px-6 py-10">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Hector Ramirez ·{' '}
          <a href="/rss.xml" className="hover:underline underline-offset-4">
            RSS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
