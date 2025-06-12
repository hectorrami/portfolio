import React from 'react';
import DarkModeToggle from './DarkModeToggle';

function Nav() {
  return (
    <div className='fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50 border-b border-gray-200 dark:border-gray-700'>
       <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          Hector Ramirez
        </div>
        <DarkModeToggle />
      </div>
    </div >
  );
}

export default Nav;
