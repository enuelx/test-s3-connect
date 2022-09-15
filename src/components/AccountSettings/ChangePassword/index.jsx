import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, FormControl, Typography } from '@mui/material';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole, faKey } from '@fortawesome/free-solid-svg-icons';
import { UserContext, ToastContext } from '@context';
import { accountApi, walletApi } from '@services';
import { PasswordTextField2 } from '../../common/PasswordTextField2';
import { ThemeProvider } from '@emotion/react';
import { grayButton, grayDisabledButton } from '@themes';
export const ChangePassword = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const { active, account, library, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const handleChangePassword = async () => {
    setIsSubmitting(true);

    try {
      const data = await accountApi.changePassword(
        userContext.token,
        oldPassword,
        newPassword
      );
      userContext.setToken(data.token);
      toastContext.successMessage('Password changed');
    } catch (err) {
      const message =
        err.response.status === 401
          ? 'Invalid password'
          : err.response.data?.error || 'Something went wrong';
      toastContext.errorMessage(message);
    }

    setIsSubmitting(false);
  };

  const handleWeb3ChangePassword = async () => {
    setIsSubmitting(true);

    if (
      !userContext.user.wallets.map((wallet) => wallet.wallet).includes(account)
    ) {
      toastContext.errorMessage('Wallet not associated to this account.');
    } else if (newPassword !== repeatNewPassword) {
      toastContext.errorMessage('Passwords do not match');
    } else {
      try {
        const message = `Click sign message to sign in and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
        const signature = await library.getSigner().signMessage(message);
        const data = await walletApi.changePassword(
          userContext.token,
          signature,
          message,
          account,
          newPassword
        );

        userContext.setToken(data.token);
        toastContext.successMessage('Password changed');
      } catch (err) {
        const message =
          err.response.status === 401
            ? 'Wallet not associated to this account or invalid signature'
            : err.response.data?.error || 'Something went wrong';

        toastContext.errorMessage(message);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div style={{ width: '380px' }}>
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
        <FontAwesomeIcon color="#fff" icon={faUnlockKeyhole} size="3x" />
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Change Password
        </Typography>
      </Box>
      <Box style={{ textAlign: 'left', marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          To change the password, you can choose to enter your previous
          password, or sign a message with a wallet associated to your account.
        </Typography>
      </Box>
      <FormControl style={{ width: '100%' }}>
        <Box
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: '2vh'
          }}
        >
          <FontAwesomeIcon
            style={{ marginTop: '2vh' }}
            color="#787878"
            icon={faKey}
            size="lg"
          />
          <PasswordTextField2
            password={oldPassword}
            setPassword={setOldPassword}
            label="current password"
          />
        </Box>
        <Box
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: '2vh'
          }}
        >
          <FontAwesomeIcon
            style={{ marginTop: '2vh' }}
            color="#787878"
            icon={faKey}
            size="lg"
          />
          <PasswordTextField2
            password={newPassword}
            setPassword={setNewPassword}
            label="new password"
          />
        </Box>
        <Box
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: '2vh'
          }}
        >
          <FontAwesomeIcon
            style={{ marginTop: '2vh' }}
            color="#787878"
            icon={faKey}
            size="lg"
          />
          <PasswordTextField2
            password={repeatNewPassword}
            setPassword={setRepeatNewPassword}
            label="repeat new password"
          />
        </Box>
        <Box
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'start',
            marginTop: '4vh'
          }}
        >
          <ThemeProvider theme={grayButton}>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              onClick={handleChangePassword}
              style={{
                borderRadius: '0px 10px 0px 10px',
                width: '70%'
              }}
            >
              Submit new password
            </Button>
          </ThemeProvider>
        </Box>
        <Box
          style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'start',
            marginTop: '3vh'
          }}
        >
          <ThemeProvider theme={grayDisabledButton}>
            <Button
              variant="contained"
              disabled={!active || isUnsupportedChain || isSubmitting}
              onClick={handleWeb3ChangePassword}
              style={{
                borderRadius: '0px 10px 0px 10px',
                width: '70%'
              }}
            >
              W3 Change Password
            </Button>
          </ThemeProvider>
        </Box>
      </FormControl>
    </div>
  );
};
