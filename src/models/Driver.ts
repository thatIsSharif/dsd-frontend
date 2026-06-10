import {driverTypes} from 'models/driverTypes.ts';

export type DriverStatus = 'ONLINE' | 'ON_ROUTE' | 'OFFLINE';

export interface Driver {
  driverName: string;
  driverId: string;
  driverType: driverTypes;
  driverStatus?: DriverStatus;
}
export interface Drivers {
    'VAN-SELLER': Driver[];
    'DELIVERY': Driver[];
    'HYBRID': Driver[];
}
