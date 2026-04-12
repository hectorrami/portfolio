import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 py-6 px-4 text-center text-sm text-gray-700 dark:text-gray-400 font-mono border-t border-gray-200 dark:border-gray-700">
      <p className="mb-1">
        <span className="text-green-500 dark:text-green-400">$</span> echo "© {new Date().getFullYear()} Hector Ramirez"
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-600">
        Built with React • Vite • Tailwind CSS
      </p>
    </footer>
  );
}

export default Footer;
