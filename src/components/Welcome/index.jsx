import React, { useContext } from 'react';
import { Container, Grid } from '@mui/material';

import WalletData from './WalletsInfo';
import { UserContext, ToastContext } from '@context';
import { Loader } from '@components';
import DiscordCard from './DiscordCard';

const Welcome = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  return userContext.user === null ? (
    'Error loading user'
  ) : !userContext.user ? (
    <Loader />
  ) : (
    <Container
      style={{
        backgroundColor: '#252525',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
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
        <WalletData userContext={userContext} toastContext={toastContext} />
        <DiscordCard userContext={userContext} toastContext={toastContext} />
      </Grid>
    </Container>
  );
};

export default Welcome;
