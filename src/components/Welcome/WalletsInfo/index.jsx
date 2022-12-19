import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  Stack,
  Typography
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faFire,
  faSnowflake,
  faTrash,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { facEmptyFire, facEmptySnowflake } from '@style/img/customIcons';
import { ThemeProvider } from '@emotion/react';

import './style.css';
import { grayButton, whiteButton } from '@themes';
import { walletApi } from '@services';
import { ReCaptcha } from '@components/common';
import { toastMessages } from '@utils';

const WelcomeWalletsInfo = ({ userContext, toastContext }) => {
  const captchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [removeWalletDialogIsOpen, setRemoveWalletDialogIsOpen] =
    useState(false);
  const [walletToDelete, setWalletToDelete] = useState(false);
  const [overFlame, setOverFlame] = useState(false);
  const [overVault, setOverVault] = useState(false);
  const wallets = userContext.user?.wallets || [];
  const { active, library, account, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const associateWallet = async () => {
    const message = `Welcome to Cyphanatics Dashboard!\n\nClick to sign in to sign a message and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
    const signature = await library.getSigner().signMessage(message);
    try {
      if (!captchaValue) {
        toastContext.errorMessage(toastMessages.error.CAPTCHA);
      } else {
        await walletApi.associate({
          token: userContext.token,
          signature,
          message,
          account,
          captchaValue
        });
        userContext.setUser(undefined); // To force reload
        toastContext.successMessage(toastMessages.success.WALLET_ASSOCIATED);
      }
    } catch (err) {
      const message =
        err.response.data?.error || toastMessages.error.WALLET_ASSOCIATION;

      toastContext.errorMessage(message);
    }
    captchaRef.current?.reset();
  };

  const removeWallet = async wallet => {
    try {
      await walletApi.removeWallet(userContext.token, wallet);
      userContext.setUser(undefined);
      toastContext.successMessage(toastMessages.success.WALLET_REMOVED);
    } catch (err) {
      const message =
        err.response.data?.error || toastMessages.error.WALLET_REMOVING;
      toastContext.errorMessage(message);
    }
  };

  const setHotWallet = async wallet => {
    try {
      await walletApi.setHot(userContext.token, wallet);
      userContext.setUser(undefined);
      toastContext.successMessage(toastMessages.success.WALLET_HOT_SET);
    } catch (err) {
      const message =
        err.response.data?.error || toastMessages.error.WALLET_HOT_SET;
      toastContext.errorMessage(message);
    }
  };

  const setVaultWallet = async wallet => {
    try {
      await walletApi.setVault(userContext.token, wallet);
      userContext.setUser(undefined);
      toastContext.successMessage(toastMessages.success.WALLET_HOT_SET);
    } catch (err) {
      const message =
        err.response.data?.error || toastMessages.error.WALLET_HOT_SET;
      toastContext.errorMessage(message);
    }
  };

  return (
    <div className="divWalletInfo">
      <Box
        style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#3E3E3E',
          borderRadius: '5px'
        }}
      >
        <FontAwesomeIcon color="#fff" icon={faWallet} size="3x" />
      </Box>
      <Box style={{ marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Connect your wallet
        </Typography>
      </Box>
      <Box style={{ textAlign: 'left', marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Pick a hot wallet to use for any required interaction (i.e.:
          authentication) and a vault/cold wallet to get your airdrops.
        </Typography>
      </Box>
      <Box style={{ textAlign: 'left', marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          We will never do anything without your approval. There are no gas fees
          involved.
        </Typography>
      </Box>

      <div style={{ marginTop: '4vh' }}>
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
                  {wallet.wallet === userContext.user.hotWallet?.wallet ? (
                    <FontAwesomeIcon
                      style={{ margin: 'auto' }}
                      color="#787878"
                      icon={faFire}
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="clickable"
                      onClick={() => {
                        setHotWallet(wallet.wallet);
                      }}
                      icon={
                        overFlame?.over && overFlame?.overIndexStart === index
                          ? faFire
                          : facEmptyFire
                      }
                      size="lg"
                      onMouseOver={() =>
                        setOverFlame({ over: true, overIndexStart: index })
                      }
                      onMouseLeave={() =>
                        setOverFlame({ over: false, overIndexStart: -1 })
                      }
                    />
                  )}

                  {wallet.wallet === userContext.user.vaultWallet?.wallet ? (
                    <FontAwesomeIcon
                      style={{ marginLeft: '0.5vw' }}
                      color="#787878"
                      icon={faSnowflake}
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="clickable"
                      onClick={() => {
                        setVaultWallet(wallet.wallet);
                      }}
                      icon={
                        overVault?.over && overVault?.overIndexStart === index
                          ? faSnowflake
                          : facEmptySnowflake
                      }
                      size="lg"
                      style={{ marginLeft: '0.5vw' }}
                      onMouseOver={() =>
                        setOverVault({ over: true, overIndexStart: index })
                      }
                      onMouseLeave={() =>
                        setOverVault({ over: false, overIndexStart: -1 })
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
                    style={{ marginLeft: '0.5vw' }}
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <Box style={{ textAlign: 'left', marginTop: '2vh' }}>
            <Typography style={{ fontSize: '18px', color: '#787878' }}>
              You don&apos;t have linked wallets yet
            </Typography>
          </Box>
        )}
      </div>
      <Box
        style={{
          textAlign: 'center',
          marginTop: '3vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: wallets.length > 0 ? '' : 'left'
        }}
      >
        <FormControl>
          {active && !isUnsupportedChain && (
            <ReCaptcha
              captchaRef={captchaRef}
              setCaptchaValue={setCaptchaValue}
            />
          )}
          <ThemeProvider theme={grayButton}>
            <Button
              onClick={
                !active || isUnsupportedChain ? () => {} : associateWallet
              }
              disabled={!active || isUnsupportedChain}
              sx={{
                background: 'transparent',
                marginTop: '1vh',
                paddingTop: '1vh',
                border: 'solid 1px',
                alignSelf: 'baseline',
                textTransform: 'none',
                color: '#787878',
                ':hover': {
                  bgcolor: '#3E3E3E'
                },
                borderRadius: '0px 10px 0px 10px'
              }}
            >
              <FontAwesomeIcon icon={faCirclePlus} size="lg" />
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
        </FormControl>
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
