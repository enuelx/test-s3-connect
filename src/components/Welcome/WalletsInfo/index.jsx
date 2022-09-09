import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Dialog, Typography, Box, Divider, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faTrash,
  faCirclePlus,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { ThemeProvider } from '@emotion/react';

import './style.css';
import { whiteButton, grayButton } from '@themes';
import { walletApi } from '@services';

const WelcomeWalletsInfo = ({ userContext, toastContext }) => {
  const [removeWalletDialogIsOpen, setRemoveWalletDialogIsOpen] =
    useState(false);
  const [walletToDelete, setWalletToDelete] = useState(false);
  const [overStar, setOverStar] = useState(false);
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
      const message = err.response.data?.error || 'Error associating wallet';
      toastContext.errorMessage(message);
    }
  };

  const removeWallet = async (wallet) => {
    try {
      await walletApi.removeWallet(userContext.token, wallet);
      userContext.setUser(undefined);
      toastContext.successMessage('Wallet removed');
    } catch (err) {
      const message = err.response.data?.error || 'Error removing wallet';
      toastContext.errorMessage(message);
    }
  };

  const setMainWallet = async (wallet) => {
    try {
      await walletApi.setMain(userContext.token, wallet);
      userContext.setUser(undefined);
      toastContext.successMessage('Wallet set as main');
    } catch (err) {
      const message = err.response.data?.error || 'Error setting main wallet';
      toastContext.errorMessage(message);
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <Box
        style={{
          width: '166px',
          height: '71px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#3E3E3E',
          borderRadius: '5px'
        }}
      >
        <FontAwesomeIcon color="#787878" icon={faWallet} size="3x" />
      </Box>
      <Box style={{ textAlign: 'center', marginTop: '3vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Connect your wallet
        </Typography>
      </Box>
      <Box style={{ textAlign: 'center', marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          We will never do anything without your approval.
        </Typography>
      </Box>

      <div style={{ marginTop: '2vh' }}>
        {wallets.length > 0 ? (
          wallets.map((wallet, index) => {
            return (
              <Box
                style={{
                  textAlign: 'center',
                  marginTop: '1vh',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
                key={wallet.wallet}
              >
                <FontAwesomeIcon color="#787878" icon={faWallet} size="lg" />
                <Typography style={{ fontSize: '18px', color: '#787878' }}>
                  {`${wallet.wallet.substring(
                    0,
                    6
                  )}...${wallet.wallet.substring(wallet.wallet.length - 6)}`}
                </Typography>
                <Box
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {wallet.wallet === userContext.user.mainWallet?.wallet ? (
                    <FontAwesomeIcon
                      style={{ margin: 'auto' }}
                      color="#787878"
                      icon={faStar}
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="clickable"
                      onClick={() => {
                        setMainWallet(wallet.wallet);
                      }}
                      icon={
                        overStar?.over && overStar?.overIndexStart === index
                          ? faStar
                          : emptyStar
                      }
                      size="lg"
                      onMouseOver={() =>
                        setOverStar({ over: true, overIndexStart: index })
                      }
                      onMouseLeave={() =>
                        setOverStar({ over: false, overIndexStart: -1 })
                      }
                    />
                  )}

                  <FontAwesomeIcon
                    className="clickable"
                    onClick={() => {
                      setWalletToDelete(wallet.wallet);
                      setRemoveWalletDialogIsOpen(true);
                    }}
                    icon={faTrash}
                    size="lg"
                    style={{ marginLeft: '1vw' }}
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <Box style={{ textAlign: 'center', marginTop: '4vh' }}>
            <Typography style={{ fontSize: '18px', color: '#787878' }}>
              You don't have linked wallets yet
            </Typography>
          </Box>
        )}
      </div>
      <Box
        style={{
          textAlign: 'center',
          marginTop: '2vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: wallets.length > 0 ? '' : 'center'
        }}
      >
        <ThemeProvider theme={grayButton}>
          <Button
            onClick={!active || isUnsupportedChain ? () => {} : associateWallet}
            disabled={!active || isUnsupportedChain}
            sx={{
              background: 'transparent',
              border: 'solid 1px',
              alignSelf: 'baseline',
              textTransform: 'none',
              color: '#787878',
              ':hover': {
                bgcolor: '#3E3E3E'
              }
            }}
          >
            <FontAwesomeIcon
              //color={!active || isUnsupportedChain ? '#787878' : '#fff'}
              icon={faCirclePlus}
              size="lg"
            />
            <Typography
              style={{
                fontSize: '18px',
                marginLeft: '1vw'
              }}
            >
              Add new wallet
            </Typography>
          </Button>
        </ThemeProvider>
      </Box>

      <Dialog
        open={removeWalletDialogIsOpen}
        onClose={() => setRemoveWalletDialogIsOpen(false)}
        PaperProps={{
          sx: { width: '60%', height: '30%', backgroundColor: '#3E3E3E' }
        }}
      >
        <Box style={{ textAlign: 'center' }}>
          <Typography style={{ marginTop: '2vh', color: '#fff' }} variant="h5">
            Delete Wallet
          </Typography>
          <Divider
            variant="middle"
            light={true}
            style={{
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,.1)'
            }}
          />
          <Typography style={{ marginTop: '2vh', color: '#787878' }}>
            Are you sure you want to remove this wallet from your account?
          </Typography>
          <Typography style={{ marginTop: '2vh', color: '#787878' }}>
            To later re-associate the wallet you will need to sign a message or
            go through the manual verification
          </Typography>
          <Box
            style={{
              marginTop: '4vh',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            >
              <ThemeProvider theme={whiteButton}>
                <Button
                  variant="outlined"
                  onClick={() => setRemoveWalletDialogIsOpen(false)}
                  style={{ borderRadius: '0px 10px 0px 10px' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => removeWallet(walletToDelete)}
                  style={{ borderRadius: '0px 10px 0px 10px' }}
                >
                  Remove
                </Button>
              </ThemeProvider>
            </Stack>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default WelcomeWalletsInfo;
