/**
 * Mock API Layer — returns realistic data after a 300ms simulated delay
 * All hardcoded values in components should be replaced by calls to these functions.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const drivers = [
  { id: 'DRV-001', name: 'Alex Rivera', type: 'Van Seller', status: 'Online' },
  { id: 'DRV-002', name: 'Jordan Kim', type: 'Delivery', status: 'On Route' },
  { id: 'DRV-003', name: 'Sam Patel', type: 'Van Seller', status: 'Offline' },
  { id: 'DRV-004', name: 'Taylor Wong', type: 'Hybrid', status: 'Online' },
  { id: 'DRV-005', name: 'Morgan Chen', type: 'Delivery', status: 'Online' },
  { id: 'DRV-006', name: 'Casey Johnson', type: 'Van Seller', status: 'On Route' },
  { id: 'DRV-007', name: 'Riley Smith', type: 'Delivery', status: 'Offline' },
  { id: 'DRV-008', name: 'Avery Brown', type: 'Hybrid', status: 'Online' },
];

const stockSummary = {
  totalOut: 1248,
  totalIn: 876,
  activeDrivers: 5,
  ordersToday: 42,
};

const recentActivity = [
  { driverId: 'DRV-001', action: 'Stock Check Out', timestamp: '2026-06-10T08:30:00Z' },
  { driverId: 'DRV-004', action: 'Stock Check In', timestamp: '2026-06-10T08:15:00Z' },
  { driverId: 'DRV-002', action: 'Route Assigned', timestamp: '2026-06-10T07:45:00Z' },
  { driverId: 'DRV-006', action: 'Stock Check Out', timestamp: '2026-06-10T07:30:00Z' },
  { driverId: 'DRV-005', action: 'Stock Check In', timestamp: '2026-06-10T07:00:00Z' },
  { driverId: 'DRV-001', action: 'Order Updated', timestamp: '2026-06-10T06:45:00Z' },
  { driverId: 'DRV-003', action: 'Stock Check Out', timestamp: '2026-06-09T18:30:00Z' },
  { driverId: 'DRV-007', action: 'Stock Check In', timestamp: '2026-06-09T17:45:00Z' },
];

const analytics = {
  weeklyTrend: [
    { day: 'Mon', orders: 28 },
    { day: 'Tue', orders: 35 },
    { day: 'Wed', orders: 42 },
    { day: 'Thu', orders: 30 },
    { day: 'Fri', orders: 48 },
    { day: 'Sat', orders: 22 },
    { day: 'Sun', orders: 15 },
  ],
  driverTypeOrders: [
    { type: 'Van Seller', count: 18 },
    { type: 'Delivery', count: 14 },
    { type: 'Hybrid', count: 10 },
  ],
  stockDistribution: [
    { category: 'Electronics', count: 320 },
    { category: 'Clothing', count: 280 },
    { category: 'Food', count: 190 },
    { category: 'Medicine', count: 150 },
    { category: 'Other', count: 308 },
  ],
};

export async function getDrivers() {
  await delay();
  return [...drivers];
}

export async function getStockSummary() {
  await delay();
  return { ...stockSummary };
}

export async function getRecentActivity() {
  await delay();
  return [...recentActivity];
}

export async function getAnalytics() {
  await delay();
  return {
    weeklyTrend: [...analytics.weeklyTrend],
    driverTypeOrders: [...analytics.driverTypeOrders],
    stockDistribution: [...analytics.stockDistribution],
  };
}

export default {
  getDrivers,
  getStockSummary,
  getRecentActivity,
  getAnalytics,
};
