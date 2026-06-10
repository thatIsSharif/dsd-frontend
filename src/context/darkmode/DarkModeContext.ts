import {createContext} from 'react';

export interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const darkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default darkModeContext;
