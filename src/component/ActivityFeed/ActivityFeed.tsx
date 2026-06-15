import {useTranslation} from 'react-i18next';
import './ActivityFeed.scss';

/** Represents a single entry in the recent-activity feed. */
interface ActivityEntry {
  icon: string;
  description: string;
  timeKey: string;
  timeValue: number;
}

const activities: ActivityEntry[] = [
  {icon: '✅', description: 'VANSELLER02 checked in', timeKey: 'activity.minutesAgo', timeValue: 5},
  {icon: '📦', description: 'Loading order #104 created', timeKey: 'activity.hoursAgo', timeValue: 1},
  {icon: '🚚', description: 'Loading order #103 shipped', timeKey: 'activity.hoursAgo', timeValue: 3},
  {icon: '📋', description: 'Stock updated for Order #102', timeKey: 'activity.hoursAgo', timeValue: 5},
  {icon: '👤', description: 'Driver VANSELLER03 assigned', timeKey: 'activity.hoursAgo', timeValue: 8},
];

function ActivityFeed() {
  const {t} = useTranslation();

  return (
    <div className="activity-feed">
      <h3 className="activity-title">{t('activity.recent')}</h3>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`activity-item anim-fade-in-up anim-delay-${index + 1}`}>
            <span className="activity-icon">{activity.icon}</span>
            <div className="activity-content">
              <span className="activity-description">{activity.description}</span>
              <span className="activity-time">{activity.timeValue} {t(activity.timeKey)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
