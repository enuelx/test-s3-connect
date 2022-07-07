import React, { useCallback, useContext, useEffect } from 'react';
import { Button } from '@mui/material';

import { UserContext } from '@context/UserContext';
import { Loader } from '@components';
import { accountApi } from '@services';

export default () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const getUserDetails = useCallback(async () => {
    try {
      const userDetails = await accountApi.userDetails(userContext.token);
      setUserContext((oldValues) => {
        return { ...oldValues, details: userDetails };
      });
    } catch (err) {
      if (err.status === 401) {
        // Edge case: when the token has expired.
        // This could happen if the refreshToken calls have failed due to network error or
        // User has had the tab open from previous day and tries to click on the Fetch button
        window.location.reload();
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, details: null };
        });
      }
    }
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) {
      getUserDetails();
    }
  }, [userContext.details, getUserDetails]);

  const reloadUserDetailsHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // getUserDetails will be invoked from useEffect
    setUserContext((oldValues) => {
      return { ...oldValues, details: undefined };
    });
  };

  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    setUserContext((oldValues) => {
      return { ...oldValues, details: undefined, token: null };
    });
    window.localStorage.setItem('logout', Date.now());
  };

  return userContext.details === null ? (
    'Error loading user'
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <div>
      <p>
        Welcome <br />
        Username: <b>{userContext.details.username}</b> <br />
        DiscordUser:{' '}
        <b>
          {userContext.details.discordUser.discordTag ?? (
            <div>
              --- <Button variant="contained">Associate discord</Button>
            </div>
          )}
        </b>{' '}
        <br />
        Wallets:{' '}
        <b>
          {' '}
          {userContext.details.wallets.length > 0
            ? userContext.details.wallets.forEach((wallet) => {
                <div>{wallet.wallet}</div>;
              })
            : '---'}
          <Button variant="contained">Add wallet</Button>
        </b>
      </p>
      <Button variant="contained" onClick={reloadUserDetailsHandler}>
        Reload
      </Button>
      <Button variant="contained" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};
