import {cleanup, render, screen} from '@testing-library/react';
import LanguageSelect from './LanguageSelect.tsx';
import {userEvent} from '@testing-library/user-event';

describe('Language Selection Dropdown Tests', () => {
  let languageSelect: HTMLElement;
  beforeEach(() => {
    userEvent.setup();
    render(<LanguageSelect />);
    languageSelect = screen.getByTestId('language-select');
  });
  afterEach(cleanup);
  test('should render dropdown', () => {
    expect(languageSelect).toBeInTheDocument();
  });
  test('should trigger language change on click', async () => {
    // Should show English by default
    expect(screen.getByText('English')).toBeInTheDocument();
    const changeBtn = screen.getByTestId('language-select-btn');
    await userEvent.click(changeBtn);
    // After opening, should show other languages (not English since it's active)
    const hindiOption = screen.getByText('हिन्दी');
    expect(hindiOption).toBeInTheDocument();
    const frenchOption = screen.getByText('Français');
    expect(frenchOption).toBeInTheDocument();
    await userEvent.click(frenchOption);
    // After selecting French, the button should show French
    expect(screen.getByText('Français')).toBeInTheDocument();
  });
  test('should expand and collapse menu', async () => {
    const expandBtn = screen.getByTestId('expand-btn');
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
    await userEvent.click(expandBtn);
    expect(screen.queryByTestId('language-select-menu')).toBeInTheDocument();
    await userEvent.click(expandBtn);
    expect(
      screen.queryByTestId('language-select-menu'),
    ).not.toBeInTheDocument();
  });
});
