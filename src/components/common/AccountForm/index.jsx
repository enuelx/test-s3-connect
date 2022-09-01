import { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

import { UserContext, ToastContext } from '@context';
import { PasswordTextField, UsernameTextField } from '@components/common';
import config from '@config';

export default ({
  formActionName,
  submitCallback,
  children,
  margin,
  useCaptcha = false,
  validateRepeatPassword = false
}) => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (validateRepeatPassword && password !== repeatPassword) {
        toastContext.errorMessage('Passwords do not match');
        setIsSubmitting(false);
        return;
      }

      if (useCaptcha && !captchaRef.current?.getValue()) {
        toastContext.errorMessage('Please verify that you are not a robot');
        return;
      }

      const result = await submitCallback({
        username,
        password,
        captchaValue: captchaRef.current?.getValue()
      });

      userContext.setToken(result.token);
      toastContext.successMessage(`${formActionName} successful`);
      navigate('/');
    } catch (err) {
      const message =
        err.response.status === 401
          ? 'Invalid username or password'
          : err.response.data?.error || 'Something went wrong';

      toastContext.errorMessage(message);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <FormControl fullWidth sx={{ marginTop: '425px' }}>
        <UsernameTextField username={username} setUsername={setUsername} />
        <PasswordTextField password={password} setPassword={setPassword} />
        {validateRepeatPassword && (
          <PasswordTextField
            margin="20px"
            password={repeatPassword}
            setPassword={setRepeatPassword}
          />
        )}

        <Button
          disabled={isSubmitting}
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginTop: margin,
            width: '182px',
            background: 'none',

            border: 'solid 1px',
            position: 'absolute',
            ':hover': {
              bgcolor: '#787878', // theme.palette.primary.main
              color: 'white'
            }
          }}
        >
          {formActionName}
        </Button>

        {formActionName == 'Register' ? (
          <Link
            to={{
              pathname: '/login'
            }}
            style={{ color: 'white', marginTop: '100px' }}
          >
            Already a member? Log in
          </Link>
        ) : (
          ''
        )}

        {useCaptcha && (
          <Box sx={{ marginTop: '50px' }}>
            <ReCAPTCHA ref={captchaRef} sitekey={config.captchaKey} />
          </Box>
        )}
        {children}
      </FormControl>
    </>
  );
};
