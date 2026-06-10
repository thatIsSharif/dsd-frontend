import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import {useContext} from 'react';
import darkModeContext from 'context/darkmode/DarkModeContext';
import styles from 'styles/design-systems.module.scss';

export default function DarkModeToggle() {
  const {darkMode, toggleDarkMode} = useContext(darkModeContext);

  return (
    <IconButton
      onClick={toggleDarkMode}
      data-testid="dark-mode-toggle"
      sx={{
        color: darkMode ? styles.greyDarker : styles.blueSteel,
        '&:hover': {
          backgroundColor: darkMode
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.04)',
        },
        transition: 'color 0.3s ease',
      }}>
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
