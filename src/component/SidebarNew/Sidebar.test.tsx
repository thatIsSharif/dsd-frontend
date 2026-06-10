import Sidebar from './Sidebar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('sidebar-test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>,
    );
  });
  test('check-images', () => {
    const logoImage = screen.getByAltText('no-image-present');
    expect(logoImage).toBeInTheDocument();
  });

  test('submenu-list', () => {
    const submenuList = screen.getByRole('list');
    const submenuListItem = screen.getAllByRole('listitem');
    expect(submenuList).toBeInTheDocument();
    expect(submenuListItem).toHaveLength(4);
  });
});
