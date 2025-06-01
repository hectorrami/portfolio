import React, { useContext } from 'react';
import { ThemeContext } from "../Providers/ThemeContext";
import { Avatar } from '@mui/material';
import Me from '../img/me.png';
import './Header.css';

function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <div className="header_contents">
        <Avatar className="avatar" alt="Hector Ramirez" src={Me} sx={{ width: 200, height: 200 }}
        />
      </div>
    </header>
  );
}

export default Header;
