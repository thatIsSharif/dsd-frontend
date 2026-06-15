import {useTranslation} from 'react-i18next';
import {useState, useEffect, useRef} from 'react';
import './StatsRow.scss';

interface StatCardData {
  labelKey: string;
  value: number;
  delta: string;
  deltaUp: boolean;
}

function CountUp({end, duration = 1500}: {end: number; duration?: number}) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = null;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function StatsRow() {
  const {t} = useTranslation();

  const stats: StatCardData[] = [
    {labelKey: 'stats.ordersToday', value: 156, delta: '↑ 12%', deltaUp: true},
    {labelKey: 'stats.activeDrivers', value: 24, delta: '↑ 8%', deltaUp: true},
    {labelKey: 'stats.itemsInStock', value: 3842, delta: '↓ 3%', deltaUp: false},
  ];

  return (
    <div className="stats-row">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`stat-card anim-fade-in-up anim-delay-${index + 1}`}>
          <div className="stat-value">
            <CountUp end={stat.value} />
          </div>
          <div className="stat-label">{t(stat.labelKey)}</div>
          <div className={`stat-delta ${stat.deltaUp ? 'delta-up' : 'delta-down'}`}>
            {stat.delta}
            <span className="stat-vs">{t('stats.vsYesterday')}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsRow;
