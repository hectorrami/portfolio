import React from 'react';
import './Header.css';

function Header() {
  const asciiArt = `
 ██╗  ██╗███████╗ ██████╗████████╗ ██████╗ ██████╗ 
 ██║  ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
 ███████║█████╗  ██║       ██║   ██║   ██║██████╔╝
 ██╔══██║██╔══╝  ██║       ██║   ██║   ██║██╔══██╗
 ██║  ██║███████╗╚██████╗  ██║   ╚██████╔╝██║  ██║
 ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝

 ██████╗  █████╗ ███╗   ███╗██╗██████╗ ███████╗███████╗ 
 ██╔══██╗██╔══██╗████╗ ████║██║██╔══██╗██╔════╝╚════██║
 ██████╔╝███████║██╔████╔██║██║██████╔╝█████╗     ██╔╝ 
 ██╔══██╗██╔══██║██║╚██╔╝██║██║██╔══██╗██╔══╝    ██╔╝  
 ██║  ██║██║  ██║██║ ╚═╝ ██║██║██║  ██║███████╗ ██║██║██║  
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝ ╚══════╝  
  `;

  return (
    <div className="relative pt-32 pb-32 flex flex-col items-center justify-center dark:bg-gray-900 bg-white overflow-hidden min-h-screen">
      {/* ASCII Art Name */}
      <pre className="ascii-art text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 font-mono text-xs md:text-sm lg:text-base leading-tight mx-4">
        {asciiArt}
      </pre>
    </div>
  );
}

export default Header;
