import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

import i18n from 'i18next';
import {lazy, Suspense} from 'react';
import {initReactI18next} from 'react-i18next';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import ProtectedRoute from 'component/ProtectedRoute/ProtectedRoute.tsx';
import TimelineState from 'context/timeline/TimelineState.tsx';
import Loading from 'screens/Loading/Loading.tsx';
import Login from 'screens/Login/Login.tsx';

import 'App.scss';
import './index.css';
import SidebarState from 'context/sidebar/sidebarState';
import enJSON from 'resources/labels/en.json';
import frJSON from 'resources/labels/fr.json';
import {languages} from 'utilities/enums';
import {ToastProvider} from './component/Toast/ToastContext';

const Home = lazy(() => import('screens/Home/Home.tsx'));
const History = lazy(() => import('screens/AllHistory/AllHistory.tsx'));
const ForgotPassword = lazy(
  () => import('screens/ForgotPassword/ForgotPassword.tsx'),
);
const DriverNameGrid = lazy(
  () => import('screens/StockCheckOut/DriverNameGrid/DriverNameGrid.tsx'),
);
const StockCheckoutScreen = lazy(
  () => import('screens/StockCheckOut/StockCheckOut.tsx'),
);
const DriverSignatureForm = lazy(
  () => import('screens/StockCheckOut/DriverSignature/DriverSignature.tsx'),
);
const OrderTable = lazy(
  () => import('screens/StockCheckOut/OrderTable/OrderTable.tsx'),
);
const StockCheckInScreen = lazy(
  () => import('screens/StockCheckIn/StockCheckIn.tsx'),
);
const PendingCheckInSelection = lazy(
  () =>
    import(
      'screens/StockCheckIn/PendingSelectionGrid/PendingSelectionGrid.tsx'
    ),
);
const HistoryTable = lazy(
  () => import('screens/StockCheckIn/TransactionTable/TransactionTable.tsx'),
);
const StockTable = lazy(
  () => import('screens/StockCheckIn/StockTable/StockTable.tsx'),
);
const AttachmentTable = lazy(
  () => import('screens/StockCheckIn/AttachmentTable/AttachmentTable.tsx'),
);
const AdminSignature = lazy(
  () => import('screens/StockCheckIn/AdminSignature/AdminSignature.tsx'),
);

const MyOrders = lazy(
  () => import('screens/StockCheckOut/MyOrder/MyOrder.tsx'),
);


const initialLanguage =
  localStorage.getItem('currentLanguage') || languages.ENGLISH;
i18n.use(initReactI18next).init({
  resources: {
    en: {translation: {...enJSON}},
    hi: {translation: {...enJSON}},
    fr: {translation: {...frJSON}},
  },
  lng: initialLanguage,
  fallbackLng: languages.ENGLISH,
});

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Space Grotesk", sans-serif',
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#7C3AED',
      },
      secondary: {
        main: '#06B6D4',
      },
      background: {
        default: '#111118',
        paper: 'rgba(255,255,255,0.05)',
      },
      text: {
        primary: 'rgba(255,255,255,0.9)',
        secondary: 'rgba(255,255,255,0.6)',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: '"Space Grotesk", sans-serif',
            textTransform: 'none',
            borderRadius: '8px',
            '&:active': {
              transform: 'scale(0.97)',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#111118',
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <SidebarState>
          <TimelineState>
            <ToastProvider>
              <BrowserRouter>
                <CssBaseline />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Login />} />
                  <Route
                    path="/home"
                    element={
                      <Suspense fallback={<Loading />}>
                        <ProtectedRoute>
                          <Home />
                        </ProtectedRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <Suspense fallback={<Loading />}>
                        <ProtectedRoute>
                          <History />
                        </ProtectedRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/forgotpassword"
                    element={
                      <Suspense fallback={<Loading />}>
                        <ForgotPassword />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/stock-check-out"
                    element={
                      <Suspense fallback={<Loading />}>
                        <ProtectedRoute>
                          <StockCheckoutScreen />
                        </ProtectedRoute>
                      </Suspense>
                    }>
                    <Route
                      path="driver"
                      element={
                        <Suspense fallback={<Loading />}>
                          <DriverNameGrid />
                        </Suspense>
                      }
                    />
                    <Route
                      path="my-order"
                      element={
                        <Suspense fallback={<Loading />}>
                          <MyOrders />
                        </Suspense>
                      }
                    />
                    <Route
                      path="order"
                      element={
                        <Suspense fallback={<Loading />}>
                          <OrderTable />
                        </Suspense>
                      }
                    />
                    <Route
                      path="delivery-table"
                      element={
                        <Suspense fallback={<Loading />}>
                          <OrderTable />
                        </Suspense>
                      }
                    />
                    <Route
                      path="signature"
                      element={
                        <Suspense fallback={<Loading />}>
                          <DriverSignatureForm />
                        </Suspense>
                      }
                    />
                  </Route>
                  <Route
                    path="/stock-check-in"
                    element={
                      <Suspense fallback={<Loading />}>
                        <ProtectedRoute>
                          <StockCheckInScreen />
                        </ProtectedRoute>
                      </Suspense>
                    }>
                    <Route
                      path="driver"
                      element={
                        <Suspense fallback={<Loading />}>
                          <PendingCheckInSelection />
                        </Suspense>
                      }
                    />
                    <Route
                      path="history"
                      element={
                        <Suspense fallback={<Loading />}>
                          <HistoryTable />
                        </Suspense>
                      }
                    />
                    <Route
                      path="stock"
                      element={
                        <Suspense fallback={<Loading />}>
                          <StockTable />
                        </Suspense>
                      }
                    />
                    <Route
                      path="attachment"
                      element={
                        <Suspense fallback={<Loading />}>
                          <AttachmentTable />
                        </Suspense>
                      }
                    />
                    <Route
                      path="signature"
                      element={
                        <Suspense fallback={<Loading />}>
                          <AdminSignature />
                        </Suspense>
                      }
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </TimelineState>
        </SidebarState>
      </ThemeProvider>
    </>
  );
}

export default App;

