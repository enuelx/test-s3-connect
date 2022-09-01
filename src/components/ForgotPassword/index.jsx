import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Tooltip
} from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';

import { ToastContext } from '@context';
import { emailApi } from '@services';
import { ThemeProvider } from '@emotion/react';

import { whiteButton } from '@themes';
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
        <Box width="50vw">
          <FormControl fullWidth>
            <Box
              display="flex"
              sx={{ padding: '5px 0 5px 0', color: 'rgb(120, 120, 120)' }}
            >
              <TextField
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '100%', color: 'white' }}
                InputLabelProps={{
                  style: { color: 'rgb(120, 120, 120)', fontSize: '18px' }
                }}
                InputProps={{
                  style: { color: 'rgb(120, 120, 120)', fontSize: '18px' }
                }}
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
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: '100%',
                marginTop: '2vh'
              }}
            >
              <ThemeProvider theme={whiteButton}>
                <Button
                  style={{ width: '45%' }}
                  variant="outlined"
                  onClick={handleForgotPassword}
                >
                  Submit
                </Button>
                <Button
                  style={{ width: '45%' }}
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Return
                </Button>
              </ThemeProvider>
            </Box>
          </FormControl>
        </Box>
      </Grid>
    </Container>
  );
};
