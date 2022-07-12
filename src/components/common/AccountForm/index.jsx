import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';

import { UserContext, ToastContext } from '@context';
import config from '@config';

export default ({ formActionName, submitCallback }) => {
  const navigate = useNavigate();

  const [userContext, setUserContext] = useContext(UserContext);
  const [toastContext, setToastContext] = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          message: `${formActionName} successful`,
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
      />
      <Tooltip
        arrow
        placement="right"
        describeChild
        title="Username must be at least 4 characters long"
      >
        <InfoIcon />
      </Tooltip>
      <br />
      <TextField
        variant="standard"
        required
        label="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type={showPassword ? 'text' : 'password'}
        error={password !== '' && !config.passwordRegex.test(password)}
      />
      <Tooltip
        sx={{ textTransform: 'none' }}
        arrow
        placement="right"
        describeChild
        title={
          <span>
            Password must: <br />- Be at least 8 characters long <br />- Contain
            a number <br />- Contain a lowercase letter <br />- Contain an
            uppercase letter <br />- Contain a special symbol
          </span>
        }
      >
        <InfoIcon />
      </Tooltip>
      <Box component="div" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <HideIcon /> : <ShowIcon />}
      </Box>
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
