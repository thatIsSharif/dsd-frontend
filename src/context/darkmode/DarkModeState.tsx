import {useCallback, useEffect, useState} from 'react';
import DarkModeContext from './DarkModeContext';

interface DarkModeStateProps {
  children: React.ReactNode;
}

function DarkModeState({children}: DarkModeStateProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeState;
