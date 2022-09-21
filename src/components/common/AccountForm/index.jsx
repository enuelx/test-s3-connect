import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import {
  PasswordTextField,
  ReCaptcha,
  UsernameTextField
} from '@components/common';
import { ThemeProvider } from '@emotion/react';
import { grayButton } from '@themes';
export default ({
  formActionName,
  submitCallback,
  children,
  margin,
  useCaptcha = false,
  validateRepeatPassword = false,
  web3 = false,
  disableWeb3,
  handleWeb3Login,
  widthButtonBox
}) => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (validateRepeatPassword && password !== repeatPassword) {
        toastContext.errorMessage(
          'Passwords do not match. No more drinking, ser'
        );
      } else if (useCaptcha && !captchaValue) {
        toastContext.errorMessage(
          'Are you a robot? If not, please confirm your humanity'
        );
      } else {
        const result = await submitCallback({
          username,
          password,
          captchaValue
        });

        userContext.setToken(result.token);
        toastContext.successMessage(`${formActionName} successful`);
        navigate('/');
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Something went wrong';

      toastContext.errorMessage(message);
    }
    setIsSubmitting(false);
  };

  const handleWeb3Submit = async () => {
    if (useCaptcha && !captchaValue) {
      toastContext.errorMessage(
        'Are you a robot? If not, please confirm your humanity'
      );
    } else {
      handleWeb3Login(captchaValue);
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ marginTop: margin }}>
        <UsernameTextField username={username} setUsername={setUsername} />
        <PasswordTextField password={password} setPassword={setPassword} />
        {validateRepeatPassword && (
          <PasswordTextField
            margin="20px"
            password={repeatPassword}
            setPassword={setRepeatPassword}
            label="confirm your password"
          />
        )}
        {useCaptcha && (
          <Box
            style={{
              padding: '3vh 0 2vh 0'
            }}
          >
            <ReCaptcha setCaptchaValue={setCaptchaValue} />
          </Box>
        )}
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: widthButtonBox
          }}
        >
          <Button
            disabled={isSubmitting}
            variant="contained"
            onClick={handleSubmit}
            sx={{
              //marginTop: margin,
              width: '182px',
              background: 'none',

              border: 'solid 1px',
              ':hover': {
                bgcolor: '#787878', // theme.palette.primary.main
                color: 'white'
              }
            }}
          >
            {formActionName}
          </Button>

          {web3 && (
            <ThemeProvider theme={grayButton}>
              <Button
                variant="contained"
                disabled={disableWeb3}
                onClick={handleWeb3Submit}
                sx={{
                  width: '182px',
                  border: 'solid 1px',
                  background: 'none',
                  ':hover': {
                    bgcolor: '#787878', // theme.palette.primary.main
                    color: 'white'
                  }
                }}
              >
                Web3 Login
              </Button>
            </ThemeProvider>
          )}
        </Box>
        {children}
      </FormControl>
    </>
  );
};
