import React, { useContext } from 'react';
import { ThemeContext } from "../Providers/ThemeContext";
import './Footer.css';

function Footer() {
    const { theme } = useContext(ThemeContext);

    const copyright = () => {
        const year = new Date().getFullYear();
        return `© ${year} Hector Ramirez. All rights reserved.`;
    }

    return (
        <div className={`footer ${theme}`}>
            <p className={'footer-text'}>{copyright()}</p>
        </div>
    );
}

export default Footer;
