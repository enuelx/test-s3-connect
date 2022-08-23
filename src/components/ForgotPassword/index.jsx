import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, TextField, Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';

import { ToastContext } from '@context';
import { emailApi } from '@services';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const toastContext = useContext(ToastContext);

  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      await emailApi.forgotPassword(email);
      toastContext.successMessage('Email sent');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.error || 'Something went wrong';

      toastContext.errorMessage(message);
    }
  };

  return (
    <Box width="50vw">
      <FormControl fullWidth>
        <Box display="flex" sx={{ padding: '5px 0 5px 0' }}>
          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '100%' }}
          />
          <Tooltip
            arrow
            placement="right"
            describeChild
            title="Enter a valid email associated with your account"
            sx={{
              paddingLeft: '5px',
              alignSelf: 'center'
            }}
          >
            <InfoIcon />
          </Tooltip>
        </Box>
        <Button variant="outlined" onClick={handleForgotPassword}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};
