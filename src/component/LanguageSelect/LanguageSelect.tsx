import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './LanguageSelect.scss';

import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {languages} from 'utilities/enums.ts';

const LANG_OPTIONS: {code: string; label: string; flag: string}[] = [
  {code: languages.ENGLISH, label: 'English', flag: '\uD83C\uDDEC\uD83C\uDDE7'},
  {code: languages.HINDI, label: '\u0939\u093F\u0928\u094D\u0926\u0940', flag: '\uD83C\uDDEE\uD83C\uDDF3'},
  {code: languages.FRENCH, label: 'Fran\u00E7ais', flag: '\uD83C\uDDEB\uD83C\uDDF7'},
];

function LanguageSelect() {
  const {
    i18n: {changeLanguage, language},
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem('currentLanguage') || language,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function selectLanguage(code: string) {
    localStorage.setItem('currentLanguage', code);
    setCurrentLanguage(code);
    changeLanguage(code);
    setOpen(false);
  }

  const activeLang = LANG_OPTIONS.find(l => l.code === currentLanguage) || LANG_OPTIONS[0];

  const sxProp = {
    bgcolor: 'background.paper',
    border: `1px solid ${styles.grayMuted}`,
    width: 160,
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

  return (
    <div ref={containerRef} style={{position: 'relative'}}>
      <List
        data-testid={'language-select'}
        className={'language-select'}
        sx={sxProp}>
        <ListItemButton
          data-testid={'language-select-btn'}
          className={'language-select-btn'}
          onClick={() => setOpen(!open)}>
          <span style={{marginRight: 8, fontSize: 16}}>{activeLang.flag}</span>
          <ListItemText
            primary={activeLang.label}
            sx={{'& .MuiListItemText-primary': {fontSize: '13px !important', fontWeight: 500}}}
          />
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
              ml: 'auto',
              ['&:hover']: {background: 'transparent'},
            }}
            onClick={() => setOpen(!open)}>
            {open ? <ExpandLess sx={{zIndex: 1}} /> : <ExpandMore />}
          </Button>
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            data-testid={'language-select-menu'}
            component="div"
            disablePadding>
            {LANG_OPTIONS.filter(l => l.code !== currentLanguage).map(lang => (
              <ListItemButton
                key={lang.code}
                className={'language-select-btn'}
                sx={{mt: '6px'}}
                onClick={() => selectLanguage(lang.code)}>
                <span style={{marginRight: 8, fontSize: 16}}>{lang.flag}</span>
                <ListItemText primary={lang.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default LanguageSelect;

