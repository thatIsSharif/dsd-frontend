import './DetailsCard.scss';
import {DetailsCardProps} from './propTypes/types.ts';

function DetailsCard({
  icon,
  iconBackground,
  gradientAvatar,
  mainInfo,
  mainInfoColor,
  secondaryInfo,
  secondaryInfoColor,
  className = '',
}: DetailsCardProps) {
  return (
    <div className={`glass-card details-card ${className}`}>
      <div className="details-card-content">
        {gradientAvatar ? (
          <div className="gradient-avatar">
            <div className="avatar-ring" />
            <div className="avatar-inner">
              <span className="avatar-emoji">👤</span>
            </div>
          </div>
        ) : icon ? (
          <div className="icon-container">
            <div className="details-avatar" style={{backgroundColor: iconBackground || 'var(--glass-bg)'}}>
              <img src={icon} alt="icon" />
            </div>
          </div>
        ) : null}
        <div className="info-container">
          <div className="main-info" style={{color: mainInfoColor || 'var(--text-primary)'}}>
            {mainInfo}
          </div>
          {secondaryInfo && (
            <div className="secondary-info" style={{color: secondaryInfoColor || 'var(--text-secondary)'}}>
              {secondaryInfo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;

