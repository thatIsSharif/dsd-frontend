import './Skeleton.scss';

interface SkeletonCardProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function SkeletonCard({width = '100%', height = '256px', borderRadius = '8px'}: SkeletonCardProps) {
  return (
    <div
      className="skeleton-card"
      style={{width, height, borderRadius}}
    />
  );
}

export function SkeletonRow({count = 3}: {count?: number}) {
  return (
    <div className="skeleton-row">
      {Array.from({length: count}).map((_, i) => (
        <SkeletonCard key={i} height="110px" />
      ))}
    </div>
  );
}

export function SkeletonGrid({count = 4}: {count?: number}) {
  return (
    <div className="skeleton-grid">
      {Array.from({length: count}).map((_, i) => (
        <SkeletonCard key={i} height="256px" />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">
      <SkeletonRow count={2} />
      <SkeletonGrid count={4} />
    </div>
  );
}

export function DriverGridSkeleton() {
  return (
    <div className="skeleton-grid">
      {Array.from({length: 6}).map((_, i) => (
        <SkeletonCard key={i} height="80px" />
      ))}
    </div>
  );
}
