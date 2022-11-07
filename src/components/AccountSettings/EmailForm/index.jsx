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
import { toastMessages } from '@utils';
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

      toastContext.successMessage(toastMessages.success.EMAIL_UPDATED);
    } catch (err) {
      const message = err.response.data?.error;
      toastContext.errorMessage(message);
    }

    setIsSubmitting(false);
  };

  const handleResendVerificationEmail = async () => {
    setIsSubmitting(true);
    try {
      await emailApi.resendVerification(userContext.token);
      toastContext.successMessage(
        toastMessages.success.EMAIL_VERIFICATION_SENT
      );
    } catch (err) {
      const message = err.response.data?.error;
      toastContext.errorMessage(message);
    }

    setIsSubmitting(false);
  };

  return (
    <div style={{ width: '380px' }}>
      <Box
        style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#3E3E3E',
          borderRadius: '5px'
        }}
      >
        <FontAwesomeIcon color="#fff" icon={faEnvelopeCircleCheck} size="3x" />
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Verify your email
        </Typography>
      </Box>
      <Box style={{ marginTop: '3vh', width: '100%' }}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: 'rgb(120, 120, 120)', fontSize: '18px' }
            }}
            sx={{
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
                  justifyContent: 'start',
                  marginTop: '4vh'
                }}
              >
                <ThemeProvider theme={grayButton}>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: '0px 10px 0px 10px',
                      width: '70%'
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
              justifyContent: 'start',
              marginTop: '4vh'
            }}
          >
            <ThemeProvider theme={grayButton}>
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={handleUpdateEmail}
                style={{
                  borderRadius: '0px 10px 0px 10px',
                  width: '70%'
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
