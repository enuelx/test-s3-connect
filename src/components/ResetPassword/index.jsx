import { useContext, useState } from 'react';
import { Box, Button, Container, FormControl, Grid } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { ReCaptcha, PasswordTextField } from '@components/common';
import { accountApi } from '@services';
import { ToastContext } from '@context';
import { ThemeProvider } from '@emotion/react';
import { whiteButton } from '@themes';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleResetPassword = async () => {
    setIsSubmitting(true);

    if (password !== repeatPassword) {
      toastContext.errorMessage(
        'Passwords do not match. No more drinking, ser'
      );
    } else if (!captchaValue) {
      toastContext.errorMessage(
        'Are you a robot? If not, please confirm your humanity'
      );
    } else {
      try {
        const resetToken = searchParams.get('token');
        await accountApi.resetPassword(resetToken, password, captchaValue);
        toastContext.successMessage('Password updated');
        navigate('/');
      } catch (err) {
        const message = err.response?.data?.error;
        toastContext.errorMessage(message);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <Container
      style={{
        backgroundColor: '#252525',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingTop: '24vh',
          marginLeft: '18vw'
        }}
      >
        <FormControl>
          <PasswordTextField password={password} setPassword={setPassword} />
          <PasswordTextField
            password={repeatPassword}
            setPassword={setRepeatPassword}
            margin="3vh"
          />
          <Box
            style={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: '4vh'
            }}
          >
            <ThemeProvider theme={whiteButton}>
              <Button
                variant="outlined"
                onClick={handleResetPassword}
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </ThemeProvider>
            <ReCaptcha setCaptchaValue={setCaptchaValue} />
          </Box>
        </FormControl>
      </Grid>
    </Container>
  );
};
