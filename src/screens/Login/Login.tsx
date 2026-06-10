import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';

import logo from 'assets/PNG/NagarroLogoWhite.png';
import bgImage from 'assets/WEBP/LoginBackground.webp';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import './Login.scss';

const VALID_USERNAME = 'WHMAN01';
const VALID_PASSWORD = 'Welcome@1234567';

function Login() {
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      navigate('/home');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
    },
    validationSchema: Yup.object({
      userId: Yup.string().required('*Required'),
      password: Yup.string().required('*Required'),
    }),
    onSubmit: async values => {
      if (
        values.userId === VALID_USERNAME &&
        values.password === VALID_PASSWORD
      ) {
        localStorage.setItem('auth', 'true');
        navigate('/home');
      } else {
        setApiError('Invalid username or password');
      }
    },
  });

  const userIdError = formik.touched.userId && formik.errors.userId;
  const passwordError = formik.touched.password && formik.errors.password;
  const loginDisabled =
    formik.values.password === '' || formik.values.userId === '';

  if (localStorage.getItem('auth') === 'true') {
    return null;
  }

  return (
    <div className={'login-root'}>
      <img src={bgImage} className={'bg-image'} alt={'background'} />
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        px={4}
        py={2}>
        <img src={logo} className={'logo'} alt={'logo'} />
        <LanguageSelect />
      </Stack>
      <div className={'form-container'}>
        <Typography
          fontSize={'32px'}
          component={'h2'}
          mb={3}
          sx={{color: 'rgba(255,255,255,0.9)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase'}}>
          {t('login.title')}
        </Typography>
        <form className={'login-form'} onSubmit={formik.handleSubmit}>
          <label
            className={`form-label font-md  ${userIdError ? 'form-label-error' : ''}`}
            htmlFor="login-form-email">
            {t('login.userId.label')}
          </label>
          <input
            id="login-form-email"
            className={`form-input font-sm  ${userIdError ? 'form-input-error' : ''} `}
            type="text"
            name="userId"
            value={formik.values.userId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {userIdError && (
            <Typography
              color={styles.redError}
              marginTop={-2}
              fontSize={styles.fontSizeXsm}>
              {formik.errors.userId}
            </Typography>
          )}
          <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
            <label
              className={`form-label font-md  ${passwordError ? 'form-label-error' : ''}`}
              htmlFor="login-form-password">
              {t('login.password.label')}
            </label>
          </Stack>
          <div className={'password-input-container'}>
            <input
              id="login-form-password"
              className={`form-input font-sm  ${passwordError ? 'form-input-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {showPassword ? (
              <IconButton
                onClick={() => setShowPassword(false)}
                className={'eye-icon'}>
                <VisibilityOffOutlinedIcon fontSize={'small'} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setShowPassword(true)}
                className={'eye-icon'}>
                <RemoveRedEyeOutlinedIcon fontSize={'small'} />
              </IconButton>
            )}
          </div>
          {passwordError && (
            <Typography
              marginTop={-2}
              color={styles.redError}
              fontSize={styles.fontSizeXsm}>
              {formik.errors.password}
            </Typography>
          )}
          {apiError !== '' && (
            <Typography
              color={styles.redError}
              marginTop={-1}
              fontSize={styles.fontSizeXsm}
              sx={{fontWeight: 600}}>
              {apiError}
            </Typography>
          )}
          <Button
            className={'font-md'}
            type={'submit'}
            variant="contained"
            disabled={loginDisabled}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6D28D9, #0891B2)',
                boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              },
            }}
            disableElevation>
            {t('login.button.label')}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

