import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <header className="max-w-2xl w-full mx-auto px-6 pt-10 pb-4">
        <Link to="/" className="font-semibold tracking-tight hover:underline">
          Hector Ramirez
        </Link>
      </header>
      <main className="max-w-2xl w-full mx-auto px-6 py-8 flex-1">
        <Outlet />
      </main>
      <footer className="max-w-2xl w-full mx-auto px-6 py-10">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Hector Ramirez
        </p>
      </footer>
    </div>
  );
}

export default Layout;
