import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import ScrollProgressIndicator from './ScrollProgressIndicator';

function Nav() {
  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50 border-b-2 border-green-500 dark:border-green-600'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
          <div className="font-mono font-bold text-gray-800 dark:text-white text-lg">
            <span className="text-green-500 dark:text-green-400">$</span> hector-ramirez
          </div>
          <DarkModeToggle />
        </div>
      </div >
      <ScrollProgressIndicator />
    </>
  );
}

export default Nav;
