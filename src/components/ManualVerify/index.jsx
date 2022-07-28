import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Select,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button
} from '@mui/material';

import { UserContext, ToastContext } from '@context';
import { Loader } from '@components';
import { walletApi } from '@services';

const ManualVerify = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [manualValidation, setManualValidation] = useState(undefined);
  const [errorGettingValidation, setErrorGettingValidation] = useState(false);

  const [useHolderWallet, setUseHolderWallet] = useState('');
  const [toValidateWallet, setToValidateWallet] = useState('');

  useEffect(() => {
    const getValidation = async () => {
      if (userContext.token) {
        const manualValidationInfo = await walletApi.getManualValidationInfo(
          userContext.token
        );
        setManualValidation(manualValidationInfo);
      }
    };

    getValidation().catch((err) => {
      setErrorGettingValidation(true);
      toastContext.errorMessage('Error getting validation status');
    });
  }, [userContext.token]);

  const startValidation = async () => {
    try {
      const info = await walletApi.startManualValidation(
        useHolderWallet,
        toValidateWallet,
        userContext.token
      );
      setManualValidation(info);

      toastContext.successMessage('Validation started');
    } catch (err) {
      toastContext.errorMessage('Error starting validation');
    }
  };

  const cancelValidation = async () => {
    try {
      await walletApi.cancelManualValidation(userContext.token);
      setManualValidation(undefined);

      toastContext.successMessage('Validation cancelled');
    } catch (err) {
      toastContext.errorMessage('Error cancelling validation');
    }
  };

  const sentValidation = async () => {
    try {
      const result = await walletApi.sentManualValidation(userContext.token);
      setManualValidation(result);

      toastContext.successMessage('Waiting for validation');
    } catch (err) {
      toastContext.errorMessage('Error sending validation');
    }
  };

  return userContext.user === null || errorGettingValidation ? (
    'Error loading data'
  ) : !userContext.user ? (
    <Loader />
  ) : ['started', 'sent-to-new-wallet-waiting'].includes(
      manualValidation?.status
    ) ? (
    <Box>
      <Typography>
        Verified wallet: {manualValidation.verifiedWallet}
      </Typography>
      <Typography>
        To verify wallet: {manualValidation.toVerifyWallet}
      </Typography>
      <Button
        variant="contained"
        disabled={manualValidation.status === 'sent-to-new-wallet-waiting'}
        onClick={sentValidation}
      >
        I sent a cypher to the new wallet
      </Button>
      <Button variant="contained" onClick={cancelValidation}>
        Cancel verification
      </Button>
    </Box>
  ) : (
    <Box
      component="div"
      sx={{ width: '70vw', margin: 'auto', marginTop: '20px' }}
    >
      <Typography>
        This option is associate wallets to your account without having to sign
        a transaction with us. To do this, you need a wallet already linked that
        holds a Cypher, to prove you one the other wallet, we'll ask you to send
        the cypher to the wallet you want to verify, and send it back, this way
        we can verify you can sign transactions with the wallet you claim to
        own.
      </Typography>
      <br />
      <Box component="form">
        <Typography>
          Select the wallet from where you will move your cypher
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Wallet</InputLabel>
          <Select
            label="Wallet"
            value={useHolderWallet}
            onChange={(e) => {
              setUseHolderWallet(e.target.value);
            }}
          >
            {userContext.user.wallets
              .filter((wallet) => {
                return wallet.cypherHoldings.length > 0;
              })
              .map((wallet) => {
                return (
                  <MenuItem key={wallet.wallet} value={wallet.wallet}>
                    {wallet.wallet}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <Typography>Enter the wallet you want to validate</Typography>
        <FormControl fullWidth>
          <InputLabel>Wallet</InputLabel>
          <OutlinedInput
            value={toValidateWallet}
            onChange={(e) => {
              setToValidateWallet(e.target.value);
            }}
            label="Wallet"
          ></OutlinedInput>
        </FormControl>
        <Button variant="outlined" onClick={startValidation}>
          Start validation
        </Button>
      </Box>
    </Box>
  );
};

export default ManualVerify;
