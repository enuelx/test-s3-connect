import { useState, useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { Verified } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { UserContext, ToastContext } from '@context';
import { emailApi } from '@services';
import { ThemeProvider } from '@emotion/react';
import { grayButton } from '@themes';
export const EmailForm = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(userContext.user?.email?.email || '');

  const handleUpdateEmail = async () => {
    setIsSubmitting(true);
    try {
      const data = await emailApi.update(userContext.token, email);
      userContext.setUser({
        ...userContext.user,
        email: data.email
      });

      toastContext.successMessage('Email updated, verify email sent');
    } catch (err) {
      const message = err.response.data?.error || 'Something went wrong';
      toastContext.errorMessage(message);
    }

    setIsSubmitting(false);
  };

  const handleResendVerificationEmail = async () => {
    setIsSubmitting(true);
    try {
      await emailApi.resendVerification(userContext.token);
      toastContext.successMessage('Verification email sent');
    } catch (err) {
      const message = err.response.data?.error || 'Something went wrong';
      toastContext.errorMessage(message);
    }

    setIsSubmitting(false);
  };

  return (
    <div style={{ width: '45%' }}>
      <Box
        style={{
          width: '166px',
          height: '71px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#3E3E3E',
          borderRadius: '5px'
        }}
      >
        <FontAwesomeIcon
          color="#787878"
          icon={faEnvelopeCircleCheck}
          size="3x"
        />
      </Box>
      <Box style={{ textAlign: 'center', marginTop: '3vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Verify your email
        </Typography>
      </Box>
      <Box style={{ textAlign: 'center', marginTop: '3vh' }}>
        <FormControl width="80%">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: 'rgb(120, 120, 120)', fontSize: '18px' }
            }}
            InputProps={{
              style: { color: 'rgb(120, 120, 120)', fontSize: '18px' },
              endAdornment: (
                <InputAdornment position="end">
                  {userContext.user?.email?.email &&
                    userContext.user.email.verified === true && (
                      <Verified sx={{ color: '#787878' }} />
                    )}
                </InputAdornment>
              )
            }}
          />

          {userContext.user?.email?.email &&
            userContext.user.email.verified === false && (
              <Box
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginTop: '4vh'
                }}
              >
                <ThemeProvider theme={grayButton}>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: '0px 10px 0px 10px',
                      width: '100%'
                    }}
                    onClick={handleResendVerificationEmail}
                    disabled={isSubmitting}
                  >
                    Resend verification mail
                  </Button>
                </ThemeProvider>
              </Box>
            )}
          <Box
            style={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '3vh'
            }}
          >
            <ThemeProvider theme={grayButton}>
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={handleUpdateEmail}
                style={{
                  borderRadius: '0px 10px 0px 10px',
                  width: '100%'
                }}
              >
                Update
              </Button>
            </ThemeProvider>
          </Box>
        </FormControl>
      </Box>
    </div>
  );
};
