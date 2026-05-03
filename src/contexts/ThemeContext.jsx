import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ThemeContext = createContext();

const STORAGE_KEY = 'transitly-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
}

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === 'dark' ? 'dark' : 'light',
          primary: {
            main: '#3B82F6',
          },
        },
      }),
    [theme]
  );

  const value = { theme, toggle, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};
