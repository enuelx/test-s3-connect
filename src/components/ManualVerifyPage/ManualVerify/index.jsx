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
import manualValidationStatus from './manualValidationStatus';
import { ThemeProvider } from '@emotion/react';
import { grayButton, whiteButton } from '@themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

const ManualVerify = ({ stepState, setStepState }) => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const reloadUserDetailsHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // getUserDetails will be invoked from useEffect
    userContext.setUser(undefined);
  };
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
        setManualValidation(manualValidationInfo || null);
      }
    };

    getValidation().catch((err) => {
      setErrorGettingValidation(true);
      toastContext.errorMessage('Error getting validation status');
    });

    switch (manualValidation?.status) {
      case manualValidationStatus.STARTED:
      case manualValidationStatus.SENT_TO_NEW_WALLET_WAITING:
        setStepState(1);
        break;
      case manualValidationStatus.SENT_TO_NEW_WALLET_DONE:
      case manualValidationStatus.SENT_BACK_WAITING:
        setStepState(2);
        break;
      case manualValidationStatus.SENT_BACK_DONE:
        setStepState(3);
        break;
      default:
        setStepState(0);
        break;
    }
  }, [userContext.token, manualValidation]);

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
      setManualValidation(null);

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
  ) : !userContext.user || manualValidation === undefined ? (
    <Loader />
  ) : stepState === 1 ? (
    <Box style={{ marginTop: '3vh' }}>
      <Typography style={{ color: 'rgb(120, 120, 120)' }}>
        Please transfer a Cypher NFT from the verified wallet:
      </Typography>
      <Box
        style={{
          border: '1px solid rgb(120, 120, 120)',
          marginTop: '2vh',
          minHeight: '35px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography
          style={{ color: '#787878', lineHeight: '35px', fontSize: '18px' }}
        >
          {manualValidation?.verifiedWallet?.wallet}
        </Typography>
      </Box>

      <Typography style={{ color: 'rgb(120, 120, 120)', marginTop: '2vh' }}>
        To wallet:
      </Typography>
      <Box
        style={{
          border: '1px solid rgb(120, 120, 120)',
          marginTop: '2vh',
          minHeight: '35px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography
          style={{ color: '#787878', lineHeight: '35px', fontSize: '18px' }}
        >
          {manualValidation?.toVerifyWallet}
        </Typography>
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <ThemeProvider theme={grayButton}>
          <Button
            variant="contained"
            disabled={
              manualValidation.status ===
              manualValidationStatus.SENT_TO_NEW_WALLET_WAITING
            }
            style={{
              color:
                manualValidation.status ===
                manualValidationStatus.SENT_TO_NEW_WALLET_WAITING
                  ? '#787878'
                  : '#fff',
              marginRight: '1vw'
            }}
            onClick={sentValidation}
          >
            {manualValidation?.status === manualValidationStatus.STARTED ? (
              <span>
                <FontAwesomeIcon
                  style={{ marginRight: '1vh' }}
                  icon={faCircleCheck}
                  size="xs"
                />
                {"I'VE SENT IT"}
              </span>
            ) : (
              'Waiting for validation'
            )}
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={grayButton}>
          <Button
            variant="contained"
            style={{ color: '#fff' }}
            onClick={cancelValidation}
          >
            <FontAwesomeIcon
              style={{ marginRight: '1vh' }}
              icon={faCircleXmark}
              size="xs"
            />
            Cancel
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  ) : stepState === 2 ? (
    <Box style={{ marginTop: '3vh' }}>
      <Typography style={{ color: 'rgb(120, 120, 120)' }}>
        Now, please transfer the Cypher NFT from the wallet to verify:
      </Typography>

      <Box
        style={{
          border: '1px solid rgb(120, 120, 120)',
          marginTop: '2vh',
          minHeight: '35px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography
          style={{ color: '#787878', lineHeight: '35px', fontSize: '18px' }}
        >
          {manualValidation?.toVerifyWallet}
        </Typography>
      </Box>
      <Typography style={{ color: 'rgb(120, 120, 120)', marginTop: '2vh' }}>
        Back to wallet:
      </Typography>
      <Box
        style={{
          border: '1px solid rgb(120, 120, 120)',
          marginTop: '2vh',
          minHeight: '35px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography
          style={{ color: '#787878', lineHeight: '35px', fontSize: '18px' }}
        >
          {manualValidation?.verifiedWallet?.wallet}
        </Typography>
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <ThemeProvider theme={grayButton}>
          <Button
            variant="contained"
            style={{
              color:
                manualValidation.status ===
                manualValidationStatus.SENT_BACK_WAITING
                  ? '#787878'
                  : '#fff',
              marginRight: '1vw'
            }}
            disabled={
              manualValidation.status ===
              manualValidationStatus.SENT_BACK_WAITING
            }
            onClick={sentValidation}
          >
            {manualValidation?.status ===
            manualValidationStatus.SENT_TO_NEW_WALLET_DONE ? (
              <span>
                <FontAwesomeIcon
                  style={{ marginRight: '1vh' }}
                  icon={faCircleCheck}
                  size="xs"
                />
                {"I'VE SENT IT"}
              </span>
            ) : (
              'Waiting for validation'
            )}
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={grayButton}>
          <Button
            variant="contained"
            style={{ color: '#fff' }}
            onClick={cancelValidation}
          >
            <FontAwesomeIcon
              style={{ marginRight: '1vh' }}
              icon={faCircleXmark}
              size="xs"
            />
            Cancel verification
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  ) : stepState === 3 ? (
    <Box style={{ marginTop: '3vh' }}>
      <Typography style={{ color: 'rgb(120, 120, 120)' }}>
        Congrats, wallet verified
      </Typography>
      <Box
        style={{
          border: '1px solid #fff',
          marginTop: '4vh',
          minHeight: '35px',
          width: '450px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography
          style={{ color: '#787878', lineHeight: '35px', fontSize: '18px' }}
        >
          {'aca va a ir la wallet verificada'}
        </Typography>
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <ThemeProvider theme={grayButton}>
          <Button
            variant="contained"
            style={{ color: '#fff' }}
            onClick={reloadUserDetailsHandler}
          >
            <FontAwesomeIcon
              style={{ marginRight: '1vh' }}
              icon={faCircleCheck}
              size="xs"
            />
            Done
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  ) : (
    <Box>
      <Typography style={{ color: 'rgb(120, 120, 120)' }}>
        This option allows you to associate additional wallets to your account
        without having to sign a transaction with us. Keep in mind you need at
        least one wallet already verified (i.e.: A hot wallet with a Cypher). To
        prove ownership of the new wallet (i.e.: A cold wallet) we'll ask you to
        send the Cypher to the new wallet you want to verify and send it back.
      </Typography>
      <br />
      <Box component="form">
        <Typography style={{ color: 'rgb(120, 120, 120)' }}>
          Select the wallet from where you will move your cypher
        </Typography>
        <FormControl fullWidth style={{ marginTop: '2vh' }}>
          <InputLabel style={{ color: 'rgb(120, 120, 120)' }}>
            Wallet
          </InputLabel>
          <Select
            label="Wallet"
            value={useHolderWallet}
            onChange={(e) => {
              setUseHolderWallet(e.target.value);
            }}
            inputProps={{ style: { color: 'rgb(120, 120, 120)' } }}
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
        <Typography style={{ color: 'rgb(120, 120, 120)', marginTop: '2vh' }}>
          Enter the wallet you want to validate
        </Typography>
        <FormControl style={{ marginTop: '2vh' }} fullWidth>
          <InputLabel style={{ color: 'rgb(120, 120, 120)' }}>
            Wallet
          </InputLabel>
          <OutlinedInput
            value={toValidateWallet}
            onChange={(e) => {
              setToValidateWallet(e.target.value);
            }}
            label="Wallet"
            inputProps={{ style: { color: 'rgb(120, 120, 120)' } }}
          ></OutlinedInput>
        </FormControl>
        <ThemeProvider theme={whiteButton}>
          <Button
            style={{ marginTop: '2vh', backgroundColor: '#3E3E3E' }}
            variant="outlined"
            onClick={startValidation}
          >
            Start validation
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ManualVerify;
