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

import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {languages} from 'utilities/enums.ts';

const LANGUAGE_OPTIONS = [
  {code: languages.ENGLISH, label: 'English', testId: 'en-btn', icon: EnglishIcon},
  {code: languages.FRENCH, label: 'French', testId: 'fr-btn', icon: FrenchIcon},
  {code: languages.HINDI, label: 'हिन्दी', testId: 'hi-btn', icon: EnglishIcon},
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
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem('currentLanguage') || language,
  );

  function updateCurrentLanguage(selectedLanguage: string): void {
    localStorage.setItem('currentLanguage', selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    changeLanguage(selectedLanguage);
  }

  function handleToggle() {
    setOpen(!open);
  }

  const currentOption = LANGUAGE_OPTIONS.find(l => l.code === currentLanguage) || LANGUAGE_OPTIONS[0];
  const otherOptions = LANGUAGE_OPTIONS.filter(l => l.code !== currentLanguage);

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
          <LanguageButton option={currentOption} />

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
            {otherOptions.map(option => (
              <ListItemButton
                key={option.code}
                className={'language-select-btn'}
                sx={{mt: '6px'}}
                onClick={() => {
                  updateCurrentLanguage(option.code);
                  setOpen(false);
                }}>
                <LanguageButton option={option} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default LanguageSelect;

function LanguageButton({option}: {option: typeof LANGUAGE_OPTIONS[0]}) {
  return (
    <>
      <ListItemIcon data-testid={option.testId}>
        <Avatar
          alt={option.label}
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

