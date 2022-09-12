import { Container, Grid } from '@mui/material';
import { EmailForm } from '../EmailForm';
import { ChangePassword } from './ChangePassword';

const AccountSettings = () => {
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
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingTop: '18vh',
          marginLeft: '23vw'
        }}
      >
        {<ChangePassword />}
        <EmailForm />
      </Grid>
    </Container>
  );
};

export default AccountSettings;
