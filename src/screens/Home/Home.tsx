import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useToast} from 'component/Toast/ToastContext';
import {getStockSummary, getDrivers} from 'mock/api';
import DetailsCard from 'component/DetailsCard/DetailsCard';
import NavigationCard from 'component/NavigationCard/NavigationCard';
import {SidebarData} from 'component/SidebarNew/SidebarData';
import './Home.scss';

interface StockSummary {
  totalOut: number;
  totalIn: number;
  activeDrivers: number;
  ordersToday: number;
}

interface Driver {
  id: string;
  name: string;
  type: string;
  status: string;
}

/* Animated counter using requestAnimationFrame */
function AnimatedCounter({value}: {value: number}) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / 800, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

function Home() {
  const {addToast} = useToast();
  const [loading, setLoading] = useState(true);
  const [stockSummary, setStockSummary] = useState<StockSummary | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  /* Fetch mock API data */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [summary, driverList] = await Promise.all([
          getStockSummary(),
          getDrivers(),
        ]);
        setStockSummary(summary);
        setDrivers(driverList);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* Welcome toast on mount */
  useEffect(() => {
    addToast('Welcome to the Dashboard!', 'info');
  }, [addToast]);

  /* Live clock */
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  /* Time-of-day greeting */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  /* Compute active drivers from the drivers list */
  const activeDriverCount = drivers.filter(
    (d) => d.status === 'Online' || d.status === 'On Route',
  ).length;

  const statCards = stockSummary
    ? [
        {
          label: 'Orders Today',
          value: stockSummary.ordersToday,
          icon: '📦',
          accent: 'var(--accent-cyan)',
        },
        {
          label: 'Active Drivers',
          value: activeDriverCount,
          icon: '🚚',
          accent: 'var(--accent-green)',
        },
        {
          label: 'Items in Stock',
          value: stockSummary.totalIn,
          icon: '📊',
          accent: 'var(--accent-purple)',
        },
        {
          label: 'Stock Out',
          value: stockSummary.totalOut,
          icon: '📤',
          accent: 'var(--accent-amber)',
        },
      ]
    : [];

  return (
    <div className="home-screen page-enter">
      <div className="home-container">
        <h1 className="home-title">Dashboard</h1>

        {/* Welcome card + Live Clock */}
        <div className="welcome-row">
          {loading ? (
            <>
              <div className="skeleton skeleton-details" />
              <div className="skeleton skeleton-details" />
            </>
          ) : (
            <>
              <DetailsCard
                gradientAvatar
                mainInfo={`${greeting}, Admin!`}
                secondaryInfo="Here's your inventory overview for today"
              />
              <div className="glass-card live-clock-card">
                <div className="clock-icon">🕒</div>
                <div className="clock-time">{formatTime(time)}</div>
                <div className="clock-date">{formatDate(time)}</div>
              </div>
            </>
          )}
        </div>

        {/* Stat cards grid */}
        <div className="stat-cards-grid">
          {loading
            ? Array.from({length: 4}).map((_, i) => (
                <div key={i} className="skeleton skeleton-stat" />
              ))
            : statCards.map((stat, i) => (
                <div key={i} className="glass-card stat-card">
                  <div className="stat-icon" style={{color: stat.accent}}>
                    {stat.icon}
                  </div>
                  <div className="stat-value">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-delta">▲ 12%</div>
                </div>
              ))}
        </div>

        {/* Action cards */}
        <div className="action-cards-grid">
          {SidebarData.map(
            (item, index) =>
              index !== 0 && <NavigationCard item={item} key={index} />,
          )}
        </div>

        {/* Create Loading Order button */}
        <div className="create-order-section">
          <Link
            to="/stock-check-out/driver"
            className="gradient-btn create-order-btn"
          >
            <span className="btn-text">Create Loading Order</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

