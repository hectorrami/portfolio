import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../Providers/ThemeContext';
import { Menu, Bedtime, WbSunny, GitHub, LinkedIn } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import global from '../Styles/global.css'
import './Nav.css';

function Nav() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [show, handleShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const transitionNavbar = () =>
    window.scrollY > 100 ? handleShow(true) : handleShow(false);

  useEffect(() => {
    window.addEventListener('scroll', transitionNavbar);

    return () => window.removeEventListener('scroll', transitionNavbar);
  }, []);

  return (
    <div className={`nav ${theme}`}>
      <div className="nav_contents">
        <div className="nav_left">
          {/* <IconButton>
            <Menu className={`${theme}`} />
          </IconButton> */}
        </div>

        <div className="nav_right">
          <IconButton onClick={toggleTheme}>
            {theme === 'light' ? <Bedtime className={`${theme}`} /> : <WbSunny className={`${theme}`} />}
          </IconButton>
          <IconButton>
            <a href="https://github.com/hectorrami" target="_blank" rel="noopener noreferrer">
              <GitHub className={`${theme}`} />
            </a>
          </IconButton>
          <IconButton>
            <a href={'https://www.linkedin.com/in/hector-ramirez-14ab63185'} target={'_blank'}>
              <LinkedIn className={`${theme}`} />
            </a>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Nav;
