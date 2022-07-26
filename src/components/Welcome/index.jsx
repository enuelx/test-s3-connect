import React, { useContext } from 'react';
import { Button } from '@mui/material';

import WalletData from './WalletsInfo';
import { UserContext, ToastContext } from '@context';
import CodeModal from './CodeModal';
import { Loader } from '@components';


const Welcome = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const reloadUserDetailsHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // getUserDetails will be invoked from useEffect
    userContext.setUser(undefined);
  };

  return userContext.user === null ? (
    'Error loading user'
  ) : !userContext.user ? (
    <Loader />
  ) : (
    <div>
      <h2>Welcome</h2> <br />
      Username: <b>{userContext.user.username}</b> <br />
      DiscordUser:{' '}
      <b>
        {userContext.user.discordUser?.discordTag ?? (
          <span>
            --- <CodeModal />
          </span>
        )}
      </b>{' '}
      <WalletData userContext={userContext} toastContext={toastContext} />
      <div>
        <Button variant="contained" onClick={reloadUserDetailsHandler}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
