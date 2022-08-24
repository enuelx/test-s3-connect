import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

import { UserContext, ToastContext } from '@context';
import { PasswordTextField, UsernameTextField } from '@components/common';
import config from '@config';

export default ({
  formActionName,
  submitCallback,
  children,
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
      <FormControl fullWidth>
        <UsernameTextField username={username} setUsername={setUsername} />
        <PasswordTextField password={password} setPassword={setPassword} />
        {validateRepeatPassword && (
          <PasswordTextField
            password={repeatPassword}
            setPassword={setRepeatPassword}
          />
        )}
        {useCaptcha && (
          <ReCAPTCHA ref={captchaRef} sitekey={config.captchaKey} />
        )}

        <Button
          disabled={isSubmitting}
          variant="contained"
          onClick={handleSubmit}
        >
          {formActionName}
        </Button>
        {children}
      </FormControl>
    </>
  );
};
