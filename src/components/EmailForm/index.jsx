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

export const EmailForm = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [email, setEmail] = useState(userContext.user?.email?.email || '');

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
          userContext.user.email.verified === true ? (
            <Verified />
          ) : (
            userContext.user?.email?.email &&
            userContext.user.email.verified ===
              false(<Button>Resend verification mail</Button>)
          )}
          <Button>Update</Button>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
