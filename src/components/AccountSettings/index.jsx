import { Container, Grid } from '@mui/material';
import { EmailForm } from '../EmailForm';
import { ChangePassword } from './ChangePassword';

export const AccountSettings = () => {
  return (
    <Container className="backgroundContainer">
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingTop: '13vh',
          marginLeft: '23vw',
          width: '52vw'
        }}
      >
        {<ChangePassword />}
        <EmailForm />
      </Grid>
    </Container>
  );
};
