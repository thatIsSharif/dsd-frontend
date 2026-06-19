// This screen will display available stock page, it contains sidebar, table and heading
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListIcon from 'assets/PNG/ListIcon.png';
import DateNavyBlue from 'assets/SVG/DateNavyBlue.svg';
import DotsIcon from 'assets/SVG/DotsIcon.svg';
import PersonBlue from 'assets/SVG/PersonBlue.svg';
import CheckInIcon from 'assets/SVG/CheckInSkyBlue.svg';
import PersonIcon from 'assets/SVG/Person.svg';
import InventoryIcon from 'assets/SVG/History.svg';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';

import Header from 'component/Header/Header';
import {DashboardSkeleton} from 'component/Skeleton/Skeleton.tsx';
import {useTranslation} from 'react-i18next';
import './Home.scss';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NagarroGray from 'assets/PNG/NagarroGray.png';
import DetailsCard from 'component/DetailsCard/DetailsCard';
import NavigationCard from 'component/NavigationCard/NavigationCard';
import {SidebarData} from 'component/SidebarNew/SidebarData';
import styles from 'styles/design-systems.module.scss';

// ─── hardcoded stats ───────────────────────────────────────────────
const STATS = [
  {key: 'ordersToday', value: 48, delta: '+12%', icon: ListIcon},
  {key: 'activeDrivers', value: 18, delta: '+5%', icon: PersonIcon},
  {key: 'itemsInStock', value: 1250, delta: '-3%', icon: InventoryIcon},
];

const ACTIVITIES = [
  {icon: CheckInIcon, textKey: 'activity.checkedIn', detail: 'VANSELLER02', timeKey: 'activity.hoursAgo', timeValue: 2},
  {icon: ListIcon, textKey: 'activity.orderCreated', detail: '', timeKey: 'activity.hoursAgo', timeValue: 3},
  {icon: PersonIcon, textKey: 'activity.stockAssigned', detail: 'DELIVERY05', timeKey: 'activity.minutesAgo', timeValue: 30},
  {icon: PersonIcon, textKey: 'activity.driverSigned', detail: 'VANSELLER07', timeKey: 'activity.minutesAgo', timeValue: 45},
  {icon: CheckInIcon, textKey: 'activity.orderCompleted', detail: '', timeKey: 'activity.hoursAgo', timeValue: 5},
];

// ─── count-up hook ─────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500): number {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const startTime = performance.now();
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

function Home() {
  const {t} = useTranslation();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="avl-stock-screen hide-scrollbar">
      <Header showLanguageSelector={true}>
        <img className="header-icon animate-fade-in-down" src={NagarroGray}></img>
      </Header>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Stack className="nav-container">
          {/* ── Welcome + Date Cards ────────────────────────────── */}
          <Box marginBottom={'16px'} position={'relative'}>
            <CardStack />
          </Box>

          {/* ── Animated Stats Row ──────────────────────────────── */}
          <Box className="stats-row animate-fade-in-up" sx={{animationDelay: '0ms'}}>
            {STATS.map((stat, i) => (
              <StatsCard key={stat.key} stat={stat} index={i} />
            ))}
          </Box>

          {/* ── Navigation Cards + CTA ──────────────────────────── */}
          <Box
            sx={{
              maxWidth: '100%',
              width: '100%',
              rowGap: '7%',
              columnGap: '2%',
              display: 'grid',
              gridTemplateColumns: {
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(4, 1fr)',
              },
              marginBottom: 3,
            }}>
            {SidebarData.map(
              (item, index) =>
                index !== 0 && (
                  <div
                    key={index}
                    className="animate-fade-in-up"
                    style={{animationDelay: `${index * 100}ms`}}>
                    <NavigationCard item={item} />
                  </div>
                ),
            )}
            <Stack
              className="animate-fade-in-up"
              style={{animationDelay: `${SidebarData.length * 100}ms`}}>
              <Card
                variant={'outlined'}
                sx={{
                  width: {
                    md: '94%',
                    lg: '98%',
                    xl: '90%',
                  },
                  height: {
                    md: '256px',
                    lg: '256px',
                    xl: '300px',
                  },
                  borderRadius: 2,
                  backgroundColor: styles.bgVibrantOceanBlue,
                  position: 'relative',
                }}>
                <CardContent
                  sx={{
                    color: styles.whitePure,
                  }}>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="start"
                    height="100%"
                    paddingLeft={'6px'}
                    marginBottom={1}
                    marginTop={3}>
                    <div>
                      <div className="list-icon-container">
                        <img
                          className="list-icon"
                          data-testid={'icon'}
                          src={ListIcon}
                          alt={'icon'}
                        />
                      </div>
                      <Typography
                        fontSize={styles.fontSizeXl}
                        fontWeight={styles.fontWeightBolder}>
                        {t('createLoadingOrder.heading')}
                      </Typography>
                      <Typography
                        color={styles.offWhiteGray}
                        fontSize={styles.fontSizeSm}
                        fontWeight={styles.fontWeightLight}>
                        {t('createLoadingOrder.subHeading')}
                      </Typography>
                    </div>
                    <div>
                      <Box
                        sx={{
                          textAlign: 'start',
                          fontSize: styles.fontSizeSm,
                          fontWeight: styles.fontWeightNormal,
                        }}>
                        <Button
                          className="action-btn"
                          sx={{
                            mt: 1,
                            color: styles.bgVibrantOceanBlue,
                            backgroundColor: styles.whitePure,
                            textTransform: 'none',
                          }}
                          variant="contained"
                          size="small"
                          component={Link}
                          to="/stock-check-out/driver"
                          disableElevation>
                          {t('availablestock.creatNow')}
                        </Button>
                      </Box>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>

          {/* ── Banner ──────────────────────────────────────────── */}
          <Box
            display={'grid'}
            sx={{
              gridTemplateColumns: {
                sm: 'repeat(4, 1fr)',
              },
              paddingLeft: {
                md: '0.2%',
                lg: '0%',
                xl: '0.6%',
              },
              paddingRight: {
                md: '3%',
                lg: '0.5%',
                xl: '2.4%',
              },
            }}
            className="download-container">
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              borderRadius={2}
              sx={{
                background: styles.gradientBlueMist,
                paddingLeft: '3%',
                height: '100px',
                width: {
                  sm: '95%',
                  md: '97%',
                  lg: '97.5%',
                  xl: '96%',
                },
                gridColumn: '3/5',
                justifySelf: 'end',
              }}>
              <Typography
                flex={1}
                sx={{paddingLeft: '2%'}}
                color={styles.darkNavy}
                fontSize={styles.fontSizeMd}
                fontWeight={styles.fontWeightNormal}>
                {t('downloadContainer.line1')}
                <br />
                {t('downloadContainer.line2')}
              </Typography>
              <div className="dots-icon-container">
                <img src={DotsIcon} alt="DotsIcon" className="dots-icon" />
                <div className="download-btn-container">
                  <Button
                    className="action-btn"
                    sx={{
                      textTransform: 'none',
                      color: styles.charcoalDark,
                      backgroundColor: styles.whitePure,
                      borderRadius: '29px',
                      fontSize: styles.fontSizeXsm,
                      fontWeight: styles.fontWeightNormal,
                      '&:hover': {backgroundColor: styles.bgWhiteSmoke},
                    }}
                    variant="contained"
                    size="small"
                    component={Link}
                    to=""
                    disableElevation>
                    {t('downloadContainer.buttonText')}
                  </Button>
                </div>
              </div>
            </Stack>
          </Box>

          {/* ── Recent Activity Feed ───────────────────────────── */}
          <Box className="activity-section">
            <Typography
              fontSize={styles.fontSizeLg}
              fontWeight={styles.fontWeightBolder}
              sx={{mb: 2, color: styles.charcoalDark}}>
              {t('activity.title')}
            </Typography>
            <Stack spacing={1.5}>
              {ACTIVITIES.map((act, i) => (
                <div
                  key={i}
                  className="activity-item animate-fade-in-up"
                  style={{animationDelay: `${i * 100}ms`}}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: styles.bgFrostBlue,
                    }}>
                    <img src={act.icon} alt="" width={20} height={20} />
                  </Avatar>
                  <div className="activity-content">
                    <Typography
                      fontSize={styles.fontSizeSm}
                      fontWeight={styles.fontWeightNormal}
                      color={styles.charcoalDark}>
                      {t(act.textKey)}
                      {act.detail && (
                        <span className="activity-detail"> — {act.detail}</span>
                      )}
                    </Typography>
                    <Typography
                      fontSize={styles.fontSizeXsm}
                      color={styles.grayCharcoal}>
                      {act.timeValue} {t(act.timeKey)}
                    </Typography>
                  </div>
                </div>
              ))}
            </Stack>
          </Box>
        </Stack>
      )}
    </div>
  );
}

export default Home;

// ─── Sub-components ─────────────────────────────────────────────────

function CardStack() {
  const {t} = useTranslation();
  const date = format(new Date(), 'do MMMM, yyyy');
  const user = JSON.parse(
    localStorage.getItem('user') || '{username:"",employee_id:""}',
  );
  const adminMainInfo = `${t('home.welcomeAdmin')} ${user.username?.split(' ')[0] || ''}!`;
  const dateMainInfo = t('home.dateHeading');
  return (
    <Stack
      direction="row"
      columnGap={'3%'}
      marginBottom={2}
      sx={{
        justifyContent: {
          sm: 'inherit',
          md: 'space-between',
          xl: 'inherit',
        },
        paddingRight: {
          md: '3%',
          lg: '0.6%',
          xl: '2%',
        },
      }}
      paddingLeft={'2px'}>
      <div className="animate-fade-in-down" style={{flex: 1}}>
        <DetailsCard
          iconBackground={styles.bgTranslucentWhite}
          icon={PersonBlue}
          cardBackground={styles.bgMidnightBlueGray}
          mainInfo={adminMainInfo}
          mainInfoColor={styles.whitePure}
          secondaryInfo={t('home.adminSecondaryHeading')}
          secondaryInfoColor={styles.whitePure}
        />
      </div>
      <div className="animate-fade-in-down" style={{flex: 1, animationDelay: '100ms'}}>
        <DetailsCard
          iconBackground={styles.bgFrostBlue}
          icon={DateNavyBlue}
          cardBackground={styles.whitePure}
          mainInfo={dateMainInfo}
          mainInfoColor={styles.charcoalDark}
          secondaryInfo={date}
          secondaryInfoColor={styles.grayCharcoal}
        />
      </div>
    </Stack>
  );
}

function StatsCard({stat, index}: {stat: typeof STATS[0]; index: number}) {
  const {t} = useTranslation();
  const count = useCountUp(stat.value);
  return (
    <Card
      className="stats-card animate-fade-in-up"
      variant="outlined"
      sx={{
        borderRadius: 2,
        p: 2,
        animationDelay: `${index * 100}ms`,
      }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{width: 44, height: 44, bgcolor: styles.bgFrostBlue}}>
          <img src={stat.icon} alt="" width={22} height={22} />
        </Avatar>
        <Box>
          <Typography fontSize={styles.fontSizeXsm} color={styles.grayCharcoal} fontWeight={styles.fontWeightNormal}>
            {t(`stats.${stat.key}`)}
          </Typography>
          <Typography fontSize={styles.fontSizeLgPlus} fontWeight={styles.fontWeightBoldest} color={styles.charcoalDark}>
            {count.toLocaleString()}
          </Typography>
        </Box>
      </Stack>
      <Typography
        fontSize={styles.fontSizeXsm}
        fontWeight={styles.fontWeightNormal}
        sx={{mt: 0.5, ml: 0.5}}
        color={stat.delta.startsWith('+') ? styles.vibrantGreen : styles.redError}>
        ↑ {stat.delta} {t('stats.vsYesterday')}
      </Typography>
    </Card>
  );
}

