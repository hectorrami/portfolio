import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import useDarkMode from '../../hooks/useDarkMode';

function DarkModeToggle() {
  const [darkMode, toggle] = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      type="button"
    >
      {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </button>
  );
}

export default DarkModeToggle;
