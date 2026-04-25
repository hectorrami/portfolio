import React from 'react';

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
    <div className="relative pt-32 pb-16 flex flex-col items-center justify-center dark:bg-gray-900 bg-white overflow-hidden">
      {/* ASCII Art Name */}
      <pre className="whitespace-pre overflow-x-auto text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 font-mono text-[0.5rem] md:text-xs lg:text-sm leading-tight mx-0 px-8 md:mx-4 md:px-0 md:tracking-wider">
        {asciiArt}
      </pre>
    </div>
  );
}

export default Header;
