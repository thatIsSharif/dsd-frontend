import {cleanup, render, screen} from '@testing-library/react';
import LanguageSelect from './LanguageSelect.tsx';
import {userEvent} from '@testing-library/user-event';

describe('Language Selection Dropdown Tests', () => {
  let languageSelect: HTMLElement;
  beforeEach(() => {
    localStorage.clear();
    userEvent.setup();
    render(<LanguageSelect />);
    languageSelect = screen.getByTestId('language-select');
  });
  afterEach(cleanup);
  test('should render dropdown with current language', () => {
    expect(languageSelect).toBeInTheDocument();
    // Default language is English
    expect(screen.getByTestId('en-btn')).toBeInTheDocument();
  });
  test('should expand and show all other languages', async () => {
    const expandBtn = screen.getByTestId('expand-btn');
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
    await userEvent.click(expandBtn);
    expect(screen.queryByTestId('language-select-menu')).toBeInTheDocument();
    // Should show French and Hindi options (English is current)
    expect(screen.getByTestId('fr-btn')).toBeInTheDocument();
    expect(screen.getByTestId('hi-btn')).toBeInTheDocument();
  });
  test('should collapse menu', async () => {
    const expandBtn = screen.getByTestId('expand-btn');
    await userEvent.click(expandBtn);
    expect(screen.queryByTestId('language-select-menu')).toBeInTheDocument();
    await userEvent.click(expandBtn);
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
  });
  test('should switch language on option click', async () => {
    // Expand the menu
    await userEvent.click(screen.getByTestId('expand-btn'));
    // Click on French option
    const frBtn = screen.getByTestId('fr-btn');
    await userEvent.click(frBtn);
    // Menu should close and now show French as current language
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('fr-btn')).toBeInTheDocument();
  });
});
