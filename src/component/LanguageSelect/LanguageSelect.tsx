import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import EnglishIcon from 'assets/SVG/English.svg';
import FrenchIcon from 'assets/SVG/French.svg';
import './LanguageSelect.scss';

import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {languages} from 'utilities/enums.ts';

const languageOptions = [
  {code: languages.ENGLISH, label: 'English', icon: EnglishIcon},
  {code: languages.FRENCH, label: 'French', icon: FrenchIcon},
  {code: languages.HINDI, label: 'हिन्दी', icon: EnglishIcon},
];

function LanguageSelect() {
  //   Styles for list
  const sxProp = {
    bgcolor: 'background.paper',
    border: `1px solid ${styles.grayMuted}`,
    width: 144,
    p: 0.5,
    borderRadius: 6,
    '& .MuiListItemIcon-root': {
      minWidth: 42,
    },
    ['.language-select-btn.MuiListItemButton-root']: {
      color: styles.blueSteel,
      px: 0.5,
      py: 0.5,
      borderRadius: 10,
      ['.MuiListItemText-primary']: {
        fontWeight: styles.fontWeightNormal,
        fontSize: styles.fontSizeSm,
      },
    },
  };
  const {
    i18n: {changeLanguage, language},
  } = useTranslation();
  const [open, setOpen] = useState(false); //state to toggle dropdown menu
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem('currentLanguage') || language,
  );

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, []);

  function updateCurrentLanguage(selectedLanguage: string): void {
    localStorage.setItem('currentLanguage', selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    changeLanguage(selectedLanguage);
  }

  // Function to hide and show dropdown
  function handleToggle() {
    setOpen(!open);
  }

  const currentLang = languageOptions.find(l => l.code === currentLanguage) || languageOptions[0];

  return (
    <>
      <List
        data-testid={'language-select'}
        className={'language-select'}
        sx={sxProp}>
        <ListItemButton
          data-testid={'language-select-btn'}
          className={'language-select-btn'}
          onClick={handleToggle}>
          <ListItemIcon data-testid={`${currentLang.code}-btn`}>
            <Avatar
              alt={currentLang.label}
              src={currentLang.icon}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </ListItemIcon>
          <ListItemText className={'language-select-text'} primary={currentLang.label} />

          <Button
            data-testid={'expand-btn'}
            disableFocusRipple
            disableTouchRipple
            disableRipple
            disableElevation
            sx={{
              p: 0,
              minWidth: '10px',
              color: styles.blueSteel,
              ['&:hover']: {
                background: 'transparent',
              },
            }}
            onClick={handleToggle}>
            {open ? <ExpandLess sx={{zIndex: 1}} /> : <ExpandMore />}
          </Button>
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            data-testid={'language-select-menu'}
            component="div"
            disablePadding>
            {languageOptions
              .filter(l => l.code !== currentLanguage)
              .map(lang => (
                <ListItemButton
                  key={lang.code}
                  className={'language-select-btn'}
                  sx={{mt: '6px'}}
                  onClick={() => updateCurrentLanguage(lang.code)}>
                  <ListItemIcon data-testid={`${lang.code}-btn`}>
                    <Avatar
                      alt={lang.label}
                      src={lang.icon}
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={lang.label} />
                </ListItemButton>
              ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default LanguageSelect;



