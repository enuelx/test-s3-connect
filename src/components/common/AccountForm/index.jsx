import { useContext, useRef, useState } from 'react';
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
import { toastMessages } from '@utils';
import './style.css';

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
  widthButtonBox,
  isMobile
}) => {
  const captchaRef = useRef(null);
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
        toastContext.errorMessage(toastMessages.error.WRONG_PASSWORD);
      } else if (useCaptcha && !captchaValue) {
        toastContext.errorMessage(toastMessages.error.CAPTCHA);
      } else {
        const result = await submitCallback({
          username,
          password,
          captchaValue
        });

        userContext.setToken(result.token);
        toastContext.successMessage(
          toastMessages.success.GENERIC_ACTION(formActionName)
        );
        navigate('/');
      }
    } catch (err) {
      const message = err.response?.data?.error;

      toastContext.errorMessage(message);
    }
    captchaRef.current?.reset();
    setIsSubmitting(false);
  };

  const handleWeb3Submit = async () => {
    if (useCaptcha && !captchaValue) {
      toastContext.errorMessage(toastMessages.error.CAPTCHA);
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
            <ReCaptcha
              captchaRef={captchaRef}
              setCaptchaValue={setCaptchaValue}
            />
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
            className={
              formActionName === 'Create Account'
                ? 'accountButton'
                : 'loginButton'
            }
          >
            {formActionName}
          </Button>

          {web3 && (
            <ThemeProvider theme={grayButton}>
              <Button
                variant="contained"
                disabled={disableWeb3}
                onClick={handleWeb3Submit}
                className="web3Button"
              >
                <span className="textMobile">Web3</span>
                <span className="textNoMobile">Web3 Login</span>
              </Button>
            </ThemeProvider>
          )}
        </Box>
        {children}
      </FormControl>
    </>
  );
};
