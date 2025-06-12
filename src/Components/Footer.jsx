import React from 'react';

function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-gray-900 py-4 px-4 text-center text-sm text-gray-800 dark:text-white ">
        <p>
          © {new Date().getFullYear()} Hector Ramirez
        </p>
      </footer>
    );
}

export default Footer;
