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
import HindiIcon from 'assets/SVG/Hindi.svg';
import './LanguageSelect.scss';

import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {languages} from 'utilities/enums.ts';

// Language configuration
const languageOptions = [
  {
    key: languages.ENGLISH,
    label: 'English',
    testId: 'en-btn',
    icon: EnglishIcon,
    alt: 'english',
  },
  {
    key: languages.FRENCH,
    label: 'French',
    testId: 'fr-btn',
    icon: FrenchIcon,
    alt: 'french',
  },
  {
    key: languages.HINDI,
    label: 'हिन्दी',
    testId: 'hi-btn',
    icon: HindiIcon,
    alt: 'hindi',
  },
];

function LanguageButton({langKey}: {langKey: string}) {
  const option = languageOptions.find(opt => opt.key === langKey)!;
  return (
    <>
      <ListItemIcon data-testid={option.testId}>
        <Avatar
          alt={option.alt}
          src={option.icon}
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </ListItemIcon>
      <ListItemText className={'language-select-text'} primary={option.label} />
    </>
  );
}

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

  function updateCurrentLanguage(selectedLanguage: string): void {
    localStorage.setItem('currentLanguage', selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    changeLanguage(selectedLanguage);
    setOpen(false);
  }

  // Function to hide and show dropdown
  function handleToggle() {
    setOpen(!open);
  }

  const availableLanguages = languageOptions.filter(
    opt => opt.key !== currentLanguage,
  );

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
          <LanguageButton langKey={currentLanguage} />

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
            {availableLanguages.map(option => (
              <ListItemButton
                key={option.key}
                className={'language-select-btn'}
                sx={{mt: '6px'}}
                onClick={() => updateCurrentLanguage(option.key)}>
                <LanguageButton langKey={option.key} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default LanguageSelect;

