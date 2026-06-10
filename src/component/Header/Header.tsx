import {useState, useEffect} from 'react';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import SignOutSelect from 'component/SignOutSelect/SignOutSelect.tsx';
import './Header.scss';
import {HeaderProps} from './propTypes/types.ts';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setIsDark(prev => !prev)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}>
      <svg viewBox="0 0 24 24" fill="none" className="theme-toggle-icon">
        {isDark ? (
          // Sun icon for dark mode (click to switch to light)
          <path
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          // Moon icon for light mode (click to switch to dark)
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export default function Header({
  children,
  showLanguageSelector = false,
}: HeaderProps) {
  return (
    <header className="header page-enter">
      <div className={'header-container'}>
        <div className="header-children">{children}</div>
        <div className={'selector-container'}>
          <ThemeToggle />
          {showLanguageSelector && (
            <span className={'language-dropdown'}>
              <LanguageSelect />
            </span>
          )}
          <span className={'sign-out-dropdown'}>
            <SignOutSelect />
          </span>
        </div>
      </div>
    </header>
  );
}
