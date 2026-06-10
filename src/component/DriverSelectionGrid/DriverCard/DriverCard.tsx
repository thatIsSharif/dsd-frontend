import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import {ClipLoader} from 'react-spinners';
import {DriverStatus} from 'models/Driver.ts';
import './DriverCard.scss';
import {DriverCardProps} from './propTypes/types.ts';

/** Extract initials from a driver name (max 2 chars) */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** CSS modifier class for each status */
function statusClass(status?: DriverStatus): string {
  switch (status) {
    case 'ONLINE':
      return 'driver-status--online';
    case 'ON_ROUTE':
      return 'driver-status--on-route';
    default:
      return 'driver-status--offline';
  }
}

/** Human‑readable status label */
function statusLabel(status?: DriverStatus): string {
  switch (status) {
    case 'ONLINE':
      return 'Online';
    case 'ON_ROUTE':
      return 'On Route';
    default:
      return 'Offline';
  }
}

function DriverCard({
  driver,
  dataLoading,
  selectedDriverId,
  handleDriverSelection,
}: DriverCardProps) {
  return (
    <Stack data-testid={'driver-btn'}>
      <Card
        variant={'outlined'}
        className="driver-card glass-card"
        onClick={() => handleDriverSelection(driver.driverId)}>
        <CardContent sx={{p: '16px 16px 16px 16px', '&:last-child': {pb: '16px'}}}>
          {/* Status badge – top‑right corner */}
          <span
            className={`driver-status ${statusClass(driver.driverStatus)}`}>
            {statusLabel(driver.driverStatus)}
          </span>

          <div className="driver-card-content">
            {/* Avatar + Info */}
            <div className="driver-info-section">
              <div className="driver-avatar">
                <span>{getInitials(driver.driverName)}</span>
              </div>
              <Box sx={{minWidth: 0}}>
                <div className="driver-name">{driver.driverName}</div>
                <div className="driver-id">{driver.driverId}</div>
              </Box>
            </div>

            {/* Arrow / Loader */}
            {dataLoading && selectedDriverId === driver.driverId ? (
              <div className="driver-loader">
                <ClipLoader size={18} color="#A855F7" />
              </div>
            ) : (
              <button className="driver-arrow-btn" aria-label="Select driver">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default DriverCard;

