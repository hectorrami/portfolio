import React, { createContext, useState } from 'react';

// Create context
export const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // No localStorage

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
