import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
  type: 'dashboard' | 'driverGrid';
}

function SkeletonLoader({type}: SkeletonLoaderProps) {
  if (type === 'dashboard') {
    return (
      <div className="skeleton-dashboard">
        <div className="skeleton-row">
          <div className="skeleton-card skeleton-welcome" />
          <div className="skeleton-card skeleton-date" />
        </div>
        <div className="skeleton-row">
          <div className="skeleton-card skeleton-nav-card" />
          <div className="skeleton-card skeleton-nav-card" />
          <div className="skeleton-card skeleton-nav-card" />
          <div className="skeleton-card skeleton-nav-card" />
        </div>
        <div className="skeleton-stats-row">
          <div className="skeleton-card skeleton-stat" />
          <div className="skeleton-card skeleton-stat" />
          <div className="skeleton-card skeleton-stat" />
        </div>
      </div>
    );
  }

  if (type === 'driverGrid') {
    return (
      <div className="skeleton-driver-grid">
        <div className="skeleton-header-row">
          <div className="skeleton-toggle" />
          <div className="skeleton-search" />
        </div>
        <div className="skeleton-driver-cards">
          <div className="skeleton-card skeleton-driver" />
          <div className="skeleton-card skeleton-driver" />
          <div className="skeleton-card skeleton-driver" />
          <div className="skeleton-card skeleton-driver" />
        </div>
      </div>
    );
  }

  return null;
}

export default SkeletonLoader;
