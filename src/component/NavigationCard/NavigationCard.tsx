import RightArrow from 'assets/SVG/RightArrow.svg';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import './NavigationCard.scss';
import {NavigationCardProps} from './propTypes/types.ts';

function NavigationCard({item}: NavigationCardProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="navigation-card-wrapper" onClick={() => navigate(item.path)}>
      <div className="glass-card navigation-card">
        <div className="nav-card-content">
          <div className="nav-card-icon-bg">
            {item.iconNavyBlue}
          </div>
          <div className="nav-card-text">
            <div className="nav-card-title">{t(item.cardTitle)}</div>
            <div className="nav-card-subtitle">{t(item.secondaryInfo)}</div>
          </div>
          <div className="nav-card-arrow">
            <img src={RightArrow} alt="arrow" className="arrow-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavigationCard;
