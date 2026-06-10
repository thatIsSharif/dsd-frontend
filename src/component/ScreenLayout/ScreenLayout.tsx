import Grid from '@mui/material/Grid';
import Sidebar from 'component/SidebarNew/Sidebar.tsx';
import {ScreenLayoutProps} from './propTypes/types.ts';
import './ScreenLayout.scss';

function ScreenLayout({children}: ScreenLayoutProps) {
  return (
    <Grid container>
      <Grid height={'100vh'} item xs={2.75}>
        <Sidebar />
      </Grid>
      <Grid
        className={'avl-stock-screen hide-scrollbar page-enter'}
        item
        xs={9.25}
        minHeight={400}
        sx={{maxHeight: '100vh', overflowY: 'scroll'}}>
        {children}
      </Grid>
    </Grid>
  );
}
export default ScreenLayout;

