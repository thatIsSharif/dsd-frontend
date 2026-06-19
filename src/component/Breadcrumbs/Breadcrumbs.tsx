import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import './Breadcrumbs.scss';

interface BreadcrumbItem {
  label: string;
  path: string;
  step?: number;
}

const routeMap: Record<string, BreadcrumbItem[]> = {
  '/stock-check-out': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckOut', path: '/stock-check-out'},
  ],
  '/stock-check-out/driver': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckOut', path: '/stock-check-out'},
    {label: 'breadcrumb.selectDriver', path: '/stock-check-out/driver', step: 1},
  ],
  '/stock-check-out/my-order': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckOut', path: '/stock-check-out'},
    {label: 'breadcrumb.myOrders', path: '/stock-check-out/my-order', step: 2},
  ],
  '/stock-check-out/order': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckOut', path: '/stock-check-out'},
    {label: 'breadcrumb.order', path: '/stock-check-out/order', step: 3},
  ],
  '/stock-check-out/delivery-table': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckOut', path: '/stock-check-out'},
    {label: 'breadcrumb.deliveryTable', path: '/stock-check-out/delivery-table', step: 4},
  ],
  '/stock-check-out/signature': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckOut', path: '/stock-check-out'},
    {label: 'breadcrumb.signature', path: '/stock-check-out/signature', step: 5},
  ],
  '/stock-check-in': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckIn', path: '/stock-check-in'},
  ],
  '/stock-check-in/driver': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckIn', path: '/stock-check-in'},
    {label: 'breadcrumb.selectDriver', path: '/stock-check-in/driver', step: 1},
  ],
  '/stock-check-in/history': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckIn', path: '/stock-check-in'},
    {label: 'breadcrumb.transaction', path: '/stock-check-in/history', step: 2},
  ],
  '/stock-check-in/stock': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckIn', path: '/stock-check-in'},
    {label: 'breadcrumb.stock', path: '/stock-check-in/stock', step: 3},
  ],
  '/stock-check-in/attachment': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckIn', path: '/stock-check-in'},
    {label: 'breadcrumb.attachment', path: '/stock-check-in/attachment', step: 4},
  ],
  '/stock-check-in/signature': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.stockCheckIn', path: '/stock-check-in'},
    {label: 'breadcrumb.signature', path: '/stock-check-in/signature', step: 5},
  ],
  '/history': [
    {label: 'breadcrumb.home', path: '/home'},
    {label: 'breadcrumb.history', path: '/history'},
  ],
};

export default function Breadcrumbs() {
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const crumbs = routeMap[location.pathname];

  if (!crumbs) return null;

  return (
    <nav className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <span key={crumb.path} className="breadcrumb-item">
          {index > 0 && <span className="breadcrumb-separator">›</span>}
          {index === crumbs.length - 1 ? (
            <span className="breadcrumb-current">{t(crumb.label)}</span>
          ) : (
            <button
              className="breadcrumb-link"
              onClick={() => navigate(crumb.path)}
            >
              {t(crumb.label)}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
}
