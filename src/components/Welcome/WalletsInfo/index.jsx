import { useState } from 'react';
import { HighlightOffOutlined } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Dialog, Typography, Box } from '@mui/material';

import { walletApi } from '@services';

const WelcomeWalletsInfo = ({ userContext, toastContext }) => {
  const [removeWalletDialogIsOpen, setRemoveWalletDialogIsOpen] =
    useState(false);
  const [walletToDelete, setWalletToDelete] = useState(false);

  const wallets = userContext.user?.wallets || [];
  const { active, library, account, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

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

  const removeWallet = async (wallet) => {
    try {
      await walletApi.removeWallet(userContext.token, wallet);
      userContext.setUser(undefined);
      toastContext.successMessage('Wallet removed');
    } catch (err) {
      toastContext.errorMessage('Error removing wallet');
    }
  };

  return (
    <div>
      Wallets:
      <div>
        {wallets.length > 0
          ? wallets.map((wallet) => {
              return (
                <div key={wallet.wallet}>
                  <b>{wallet.wallet}</b>
                  <HighlightOffOutlined
                    onClick={() => {
                      setWalletToDelete(wallet.wallet);
                      setRemoveWalletDialogIsOpen(true);
                    }}
                  />
                </div>
              );
            })
          : '---'}
      </div>
      <Button
        onClick={associateWallet}
        variant="contained"
        disabled={!active || isUnsupportedChain}
      >
        Add wallet
      </Button>
      <div>
        Cyphers Hodling:{' '}
        <b>
          {wallets.reduce((prev, { cypherHoldings }) => {
            return prev + cypherHoldings.length;
          }, 0)}
        </b>
      </div>
      <Dialog
        open={removeWalletDialogIsOpen}
        onClose={() => setRemoveWalletDialogIsOpen(false)}
      >
        <Box>
          <Typography>
            Are you sure you want to remove this wallet from your account?
          </Typography>
          <Typography>
            To later re-associate the wallet you will need to sign a message or
            go through the manual verification
          </Typography>
          <Button onClick={() => setRemoveWalletDialogIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => removeWallet(walletToDelete)} autoFocus>
            Remove
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default WelcomeWalletsInfo;
