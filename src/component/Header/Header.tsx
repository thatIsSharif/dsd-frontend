import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import SignOutSelect from 'component/SignOutSelect/SignOutSelect.tsx';
import ThemeToggle from 'component/ThemeToggle/ThemeToggle';
import './Header.scss';
import {HeaderProps} from './propTypes/types.ts';

export default function Header({
  children,
}: HeaderProps) {
  return (
    <header className="header page-enter">
      <div className={'header-container'}>
        <div className="header-children">{children}</div>
        <div className={'selector-container'}>
          <ThemeToggle />
          <span className={'language-dropdown'}>
            <LanguageSelect />
          </span>
          <span className={'sign-out-dropdown'}>
            <SignOutSelect />
          </span>
        </div>
      </div>
    </header>
  );
}
