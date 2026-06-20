import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Person from 'assets/SVG/Person.svg';
import RightArrowBlue from 'assets/SVG/RightArrowBlue.svg';
import {ClipLoader} from 'react-spinners';
import {getDriverStatus} from 'models/Driver.ts';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import './DriverCard.scss';
import {DriverCardProps} from './propTypes/types.ts';

const STATUS_CONFIG = {
  online: {label: 'status.online', className: 'badge-online', pulse: true},
  offline: {label: 'status.offline', className: 'badge-offline', pulse: false},
  onRoute: {label: 'status.onRoute', className: 'badge-onroute', pulse: false},
} as const;

function DriverCard({
  driver,
  dataLoading,
  selectedDriverId,
  handleDriverSelection,
}: DriverCardProps) {
  const {t} = useTranslation();
  const status = driver.status || getDriverStatus(driver.driverId);
  const cfg = STATUS_CONFIG[status];

  return (
    <Stack data-testid={'driver-btn'}>
      <Card
        variant={'outlined'}
        sx={{
          borderRadius: '8px',
        }}>
        <CardActionArea
          onClick={() => handleDriverSelection(driver.driverId)}
          sx={{cursor: 'pointer'}}>
          <CardContent>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
              justifyContent={'space-between'}
              sx={{
                py: {
                  sm: 1,
                  md: 1,
                  lg: 1.4,
                },
                px: {
                  sm: 0.4,
                  md: 0,
                  lg: '2%',
                },
              }}>
              {/*Avatar component displays image in a circular icon*/}
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 45,
                    height: 45,
                    bgcolor: styles.bgSoftAqua,
                  }}>
                  <img src={Person} alt="no-image-present" />
                </Avatar>
                <Box>
                  <Typography
                    fontSize={styles.fontSizeMd}
                    color={styles.charcoalDark}
                    fontWeight={styles.fontWeightBolder}
                    className={'driver-text-box'}>
                    {driver.driverName}
                  </Typography>
                  <Typography
                    fontSize={styles.fontSizeXsm}
                    color={styles.grayCharcoal}
                    fontWeight={styles.fontWeightLight}>
                    {driver.driverId}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                {/* Status badge */}
                <span
                  className={`driver-status-badge ${cfg.className} ${cfg.pulse ? 'animate-pulse-badge' : ''}`}>
                  {t(cfg.label)}
                </span>
                {dataLoading && selectedDriverId === driver.driverId ? (
                  <ClipLoader size={20} />
                ) : (
                  <Avatar
                    sx={{
                      width: 25,
                      height: 25,
                      bgcolor: styles.bgSoftBabyBlue,
                    }}>
                    <img
                      className="right-icon"
                      data-testid={'icon'}
                      src={RightArrowBlue}
                      alt={'icon'}
                    />
                  </Avatar>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}

export default DriverCard;

