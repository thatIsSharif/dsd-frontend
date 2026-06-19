import {driverTypes} from 'models/driverTypes.ts';

export type DriverStatus = 'online' | 'offline' | 'onRoute';

export interface Driver {
  driverName: string;
  driverId: string;
  driverType: driverTypes;
  status?: DriverStatus;
}
export interface Drivers {
    'VAN-SELLER': Driver[];
    'DELIVERY': Driver[];
    'HYBRID': Driver[];
}

// Hardcoded statuses for demo — no API required
const STATUS_MAP: Record<string, DriverStatus> = {
  VANSELLER01: 'online',
  VANSELLER02: 'online',
  VANSELLER03: 'offline',
  VANSELLER04: 'onRoute',
  VANSELLER05: 'online',
  VANSELLER06: 'offline',
  DELIVERY01: 'onRoute',
  DELIVERY02: 'online',
  DELIVERY03: 'offline',
  DELIVERY04: 'online',
  DELIVERY05: 'onRoute',
  HYBRID01: 'online',
  HYBRID02: 'offline',
};

export function getDriverStatus(driverId: string): DriverStatus {
  return STATUS_MAP[driverId] || 'online';
}
