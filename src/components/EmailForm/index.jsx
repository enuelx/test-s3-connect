import { useState, useContext } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  TextField,
  Typography
} from '@mui/material';
import { ExpandMore, Verified } from '@mui/icons-material';

import { UserContext, ToastContext } from '@context';
import { emailApi } from '@services';

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

      toastContext.successMessage('Email updated');
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
    <Accordion sx={{ width: '50vw' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Email</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '0.5rem' }}
          />
          {userContext.user?.email?.email &&
            userContext.user.email.verified === true && <Verified />}
          {userContext.user?.email?.email &&
            userContext.user.email.verified === false && (
              <Button
                variant="contained"
                sx={{ marginBottom: '2px' }}
                onClick={handleResendVerificationEmail}
                disabled={isSubmitting}
              >
                Resend verification mail
              </Button>
            )}
          <Button
            variant="contained"
            disabled={isSubmitting}
            onClick={handleUpdateEmail}
          >
            Update
          </Button>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
