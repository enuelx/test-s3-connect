import { useContext } from 'react';
import { Container, Grid } from '@mui/material';

import WalletData from './WalletsInfo';
import { UserContext, ToastContext } from '@context';
import { Loader } from '@components';
import SocialMediaCard from './SocialMediaCard';
import './style.css';

export const Welcome = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  return (
    <Container className="classContainerWelcome">
      {userContext.user === null ? (
        'Error loading user'
      ) : !userContext.user ? (
        <Loader />
      ) : (
        <Grid className='gridWelcome'>
          <WalletData userContext={userContext} toastContext={toastContext} />
          <SocialMediaCard
            userContext={userContext}
            toastContext={toastContext}
          />
        </Grid>
      )}
    </Container>
  );
};
