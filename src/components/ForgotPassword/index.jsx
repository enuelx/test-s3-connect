import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';

import { ToastContext } from '@context';
import { emailApi } from '@services';
import { whiteButton } from '@themes';
import { ReCaptcha } from '@components/common';

export const ForgotPassword = () => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const toastContext = useContext(ToastContext);

  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const captchaValue = captchaRef.current?.getValue();
      if (!captchaValue) {
        toastContext.errorMessage(
          'Are you a robot? If not, please confirm your humanity'
        );
      } else {
        await emailApi.forgotPassword(email, captchaValue);
        toastContext.successMessage(
          'Email sent! Check your inbox (or spam folder)'
        );
        navigate('/');
      }
    } catch (err) {
      const message = err.response?.data?.error;

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
                sx={{
                  width: '100%',
                  '& label.Mui-focused': {
                    color: 'white'
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white'
                    },
                    '&:hover fieldset': {
                      borderColor: 'white'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white'
                    }
                  }
                }}
                InputLabelProps={{
                  style: { color: 'rgb(120, 120, 120)', fontSize: '18px' }
                }}
                InputProps={{
                  style: { color: 'rgb(120, 120, 120)', fontSize: '18px' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        arrow
                        placement="right"
                        describeChild
                        title="Enter a valid email associated with your account"
                        sx={{
                          paddingLeft: '5px',
                          alignSelf: 'center',
                          color: 'white'
                        }}
                      >
                        <InfoIcon />
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignItems: 'center',
                width: '100%',
                marginTop: '4vh',
                marginBottom: '4vh'
              }}
            >
              <ThemeProvider theme={whiteButton}>
                <Button
                  style={{ width: '48%' }}
                  variant="outlined"
                  onClick={handleForgotPassword}
                >
                  Submit
                </Button>
                <Button
                  style={{ width: '48%' }}
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Return
                </Button>
              </ThemeProvider>
            </Box>
            <ReCaptcha captchaRef={captchaRef} />
          </FormControl>
        </Box>
      </Grid>
    </Container>
  );
};
