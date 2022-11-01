import { Container, Grid } from '@mui/material';

import { EmailForm } from './EmailForm';
import { ChangePassword } from './ChangePassword';
import './style.css';

export const AccountSettings = () => {
  return (
    <Container className="containerAccount">
      <Grid className="gridAccount">
        {<ChangePassword />}
        <EmailForm />
      </Grid>
    </Container>
  );
};
