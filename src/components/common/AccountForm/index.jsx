import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';

import { UserContext, ToastContext } from '@context';
import { PasswordTextField } from '@components/common';

export default ({ formActionName, submitCallback }) => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await submitCallback(username, password);

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
      <PasswordTextField password={password} setPassword={setPassword} />
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
