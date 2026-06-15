import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import './Breadcrumb.scss';

interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function Breadcrumb({items}: BreadcrumbProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="breadcrumb-item">
            {item.onClick || item.path ? (
              <span
                className={`breadcrumb-link ${isLast ? 'breadcrumb-active' : ''}`}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}>
                {t(item.label) || item.label}
              </span>
            ) : (
              <span className={`breadcrumb-label ${isLast ? 'breadcrumb-active' : ''}`}>
                {t(item.label) || item.label}
              </span>
            )}
            {!isLast && <span className="breadcrumb-separator">&gt;</span>}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
