import React, {useState, useEffect} from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

function DarkModeToggle() {
	const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' 
        || window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    return false;
  });

	useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

	return (
    <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    type='button'
    >
      {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </button>
	)
}

export default DarkModeToggle