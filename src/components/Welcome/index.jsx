import React, { useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import CodeModal from './CodeModal';
import { Loader } from '@components';
import { accountApi, walletApi } from '@services';

export default () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [toastContext, setToastContext] = useContext(ToastContext);

  const [associateCode, setAssociateCode] = useState('');

  const { active, library, account, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

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
    setToastContext((oldValues) => {
      return {
        ...oldValues,
        message: 'Logged out successfully',
        severity: 'success'
      };
    });
    window.localStorage.setItem('logout', Date.now());
  };

  const associateWallet = async () => {
    const message = `Welcome to Cyphanatics Dashboard!\n\nClick to sign in to sign a message and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
    const signature = await library.getSigner().signMessage(message);
    try {
      await walletApi.associate(userContext.token, signature, message, account);
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined };
      });
      setToastContext((oldValues) => {
        return {
          ...oldValues,
          message: 'Wallet associated successfully',
          severity: 'success'
        };
      });
    } catch (err) {
      const message = err.response.data?.error || 'Something went wrong';
      setToastContext((oldValues) => {
        return { ...oldValues, message, severity: 'error' };
      });
    }
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
          {userContext.details.discordUser?.discordTag ?? (
            <span>
              --- <CodeModal />
            </span>
          )}
        </b>{' '}
        <br />
        Wallets:{' '}
        <b>
          {' '}
          {userContext.details.wallets.length > 0
            ? userContext.details.wallets.map((wallet) => {
                return (
                  <span key={wallet.wallet}>
                    <br />
                    {wallet.wallet}
                  </span>
                );
              })
            : '---'}
          <br />
          <Button
            onClick={associateWallet}
            variant="contained"
            disabled={!active || isUnsupportedChain}
          >
            Add wallet
          </Button>
        </b>
        <br />
        Cyphers Hodling:{' '}
        <b>
          {userContext.details.wallets.reduce((prev, { cypherHoldings }) => {
            return prev + cypherHoldings.length;
          }, 0)}
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
