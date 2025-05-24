import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from "../Providers/ThemeContext";
import './Header.css';
import global from '../Styles/global.css'
import { ABOUT_ME } from '../Constants/constants';

function Header() {
  const { theme } = useContext(ThemeContext);
  const fullText = JSON.stringify(ABOUT_ME, null, 2);
  const [typedText, setTypedText] = useState("");
  const typingSpeed = 10; // ms per character

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval); // stop when done
      }
    }, typingSpeed);

    return () => clearInterval(interval); // cleanup
  }, [fullText]);

  return (
    <header className={`json-container ${theme}`}>
      <pre>{typedText}</pre>
    </header>
  );
}

export default Header;
