import { useState, useContext } from 'react';
import { Button, FormControl } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { PasswordTextField } from '@components/common';
import { accountApi } from '@services';
import { UserContext, ToastContext } from '@context';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleResetPassword = async () => {
    setIsSubmitting(true);

    if (password !== repeatPassword) {
      toastContext.errorMessage('Passwords do not match');
    } else {
      try {
        const resetToken = searchParams.get('token');
        await accountApi.resetPassword(resetToken, password);
        toastContext.successMessage('Password updated');
        navigate('/');
      } catch (err) {
        const message = err.response?.data?.error || 'Something went wrong';
        toastContext.errorMessage(message);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <FormControl>
      <PasswordTextField password={password} setPassword={setPassword} />
      <PasswordTextField
        password={repeatPassword}
        setPassword={setRepeatPassword}
      />
      <Button
        variant="outlined"
        onClick={handleResetPassword}
        disabled={isSubmitting}
      >
        Reset Password
      </Button>
    </FormControl>
  );
};
