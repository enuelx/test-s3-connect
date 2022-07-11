import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import config from '@config';

export default ({ formActionName, submitCallback }) => {
  const navigate = useNavigate();

  const [userContext, setUserContext] = useContext(UserContext);
  const [toastContext, setToastContext] = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await submitCallback(username, password);

      setUserContext((oldValues) => {
        return { ...oldValues, token: result.token };
      });
      setToastContext((oldValues) => {
        return {
          ...oldValues,
          message: `${formActionName} succesful`,
          severity: 'success'
        };
      });
      navigate('/');
    } catch (err) {
      const message =
        err.response.status === 401
          ? 'Invalid username or password'
          : err.response.data?.error || 'Something went wrong';

      setToastContext((oldValues) => {
        return { ...oldValues, message, severity: 'error' };
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Box component="form">
      <TextField
        required
        label="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        variant="standard"
        error={username !== '' && username.length < 4}
        helperText={
          username !== '' && username.length < 4
            ? 'Username must be at least 4 characters long'
            : ''
        }
      />
      <br />
      <TextField
        variant="standard"
        required
        label="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        error={password !== '' && !config.passwordRegex.test(password)}
        helperText={
          password !== '' && !config.passwordRegex.test(password)
            ? 'Password must be at least 8 characters long and contain a number, a lowercase letter, an uppercase letter and a special symbol'
            : ''
        }
      />
      <br />
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="contained"
        onClick={handleSubmit}
      >
        {formActionName}
      </Button>
    </Box>
  );
};
