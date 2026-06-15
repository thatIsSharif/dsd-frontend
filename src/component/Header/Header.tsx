import DarkModeToggle from 'component/DarkModeToggle/DarkModeToggle';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import SignOutSelect from 'component/SignOutSelect/SignOutSelect.tsx';
import './Header.scss';
import {HeaderProps} from './propTypes/types.ts';

export default function Header({
  children,
  showLanguageSelector = false,
  showDarkModeToggle = false,
}: HeaderProps) {
  return (
    <header className={'header'}>
      <div className={'header-container'}>
        <div>{children}</div>
        <div className={'selector-container'}>
          {showDarkModeToggle && (
            <span className={'dark-mode-dropdown'}>
              <DarkModeToggle />
            </span>
          )}
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
