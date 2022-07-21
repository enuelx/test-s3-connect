import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import CodeModal from './CodeModal';
import { Loader } from '@components';
import { accountApi, walletApi } from '@services';

const Welcome = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const { active, library, account, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const reloadUserDetailsHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // getUserDetails will be invoked from useEffect
    userContext.setUser(undefined);
  };

  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    userContext.clear();
    toastContext.successMessage('Logout successful');
    window.localStorage.setItem('logout', Date.now());
  };

  const associateWallet = async () => {
    const message = `Welcome to Cyphanatics Dashboard!\n\nClick to sign in to sign a message and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
    const signature = await library.getSigner().signMessage(message);
    try {
      await walletApi.associate(userContext.token, signature, message, account);
      userContext.setUser(undefined); // To force reload
      toastContext.successMessage('Wallet associated successfully');
    } catch (err) {
      const message = err.response.data?.error || 'Something went wrong';
      toastContext.errorMessage(message);
    }
  };

  return userContext.user === null ? (
    'Error loading user'
  ) : !userContext.user ? (
    <Loader />
  ) : (
    <div>
      <p>
        Welcome <br />
        Username: <b>{userContext.user.username}</b> <br />
        DiscordUser:{' '}
        <b>
          {userContext.user.discordUser?.discordTag ?? (
            <span>
              --- <CodeModal />
            </span>
          )}
        </b>{' '}
        <br />
        Wallets:{' '}
        <b>
          {' '}
          {userContext.user.wallets.length > 0
            ? userContext.user.wallets.map((wallet) => {
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
          {userContext.user.wallets.reduce((prev, { cypherHoldings }) => {
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

export default Welcome;
