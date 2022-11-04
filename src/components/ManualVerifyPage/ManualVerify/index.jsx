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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

import { UserContext, ToastContext } from '@context';
import { Loader } from '@components';
import { walletApi } from '@services';
import manualValidationStatus from './manualValidationStatus';
import { ThemeProvider } from '@emotion/react';
import { grayButton, whiteButton, grayButtonVerify } from '@themes';
import { toastMessages } from '@utils';
import './style.css';
const ManualVerify = ({ stepState, setStepState }) => {
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
        setManualValidation(manualValidationInfo || null);
      }
    };

    getValidation().catch((err) => {
      setErrorGettingValidation(true);
      toastContext.errorMessage(toastMessages.error.VALIDATION_STATUS);
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
  }, [userContext.token, manualValidation?.status, userContext.user]);

  const startValidation = async () => {
    try {
      const info = await walletApi.startManualValidation(
        useHolderWallet,
        toValidateWallet,
        userContext.token
      );
      setManualValidation(info);

      toastContext.successMessage(toastMessages.success.VALIDATION_STARTED);
    } catch (err) {
      const message = err.response.data?.error;
      toastContext.errorMessage(message);
    }
  };

  const cancelValidation = async () => {
    try {
      await walletApi.cancelManualValidation(userContext.token);
      setManualValidation(null);

      toastContext.successMessage(toastMessages.success.VALIDATION_CANCELED);
    } catch (err) {
      toastContext.errorMessage();
    }
  };

  const sentValidation = async () => {
    try {
      const result = await walletApi.sentManualValidation(userContext.token);
      setManualValidation(result);

      toastContext.successMessage(toastMessages.success.VALIDATION_WAIT);
    } catch (err) {
      toastContext.errorMessage();
    }
  };

  const ackValidation = async () => {
    try {
      await walletApi.ackManualValidation(userContext.token);
      setManualValidation(null);
      toastContext.successMessage(toastMessages.success.VALIDATION_FINISHED);
    } catch (err) {
      toastContext.errorMessage();
    }
  };

  return userContext.user === null || errorGettingValidation ? (
    'Error loading data'
  ) : !userContext.user || manualValidation === undefined ? (
    <Loader />
  ) : stepState === 1 ? (
    <Box style={{ marginTop: '3vh' }}>
      <Typography>
        Please transfer a Cypher NFT from the verified wallet (A) to the wallet
        you want to verify (B).
        <br /> You’ll need to use your favorite platform or marketplace to make
        this transfer. The Accounts System DOES NOT make these transfers, just
        tracks them in the blockchain to verify your wallet.
      </Typography>
      <Typography style={{ marginTop: '2vh' }}>From:</Typography>
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

      <Typography style={{ marginTop: '2vh' }}>To:</Typography>
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
        <ThemeProvider theme={grayButtonVerify}>
          <Button
            variant="contained"
            disabled={
              manualValidation?.status ===
              manualValidationStatus.SENT_TO_NEW_WALLET_WAITING
            }
            style={{
              color:
                manualValidation?.status ===
                manualValidationStatus.SENT_TO_NEW_WALLET_WAITING
                  ? '#787878'
                  : '#fff',
              marginRight: '1vw',
              borderRadius: '0px 10px 0px 10px'
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
              style={{ marginRight: '1vh', borderRadius: '0px 10px 0px 10px' }}
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
      <Typography>
        Now, please transfer the Cypher NFT from the wallet to verify (B) back
        to the original wallet (A).
        <br /> You’ll need to use your favorite platform or marketplace to make
        this transfer. The Accounts System DOES NOT make these transfers, just
        tracks them in the blockchain to verify your wallet.
      </Typography>
      <Typography style={{ marginTop: '2vh' }}>From:</Typography>
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
      <Typography style={{ marginTop: '2vh' }}>Back to:</Typography>
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
        <ThemeProvider theme={grayButtonVerify}>
          <Button
            variant="contained"
            style={{
              color:
                manualValidation.status ===
                manualValidationStatus.SENT_BACK_WAITING
                  ? '#787878'
                  : '#fff',
              marginRight: '1vw',
              borderRadius: '0px 10px 0px 10px'
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
            style={{ color: '#fff', borderRadius: '0px 10px 0px 10px' }}
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
      <Typography className="typhoWalletStep3">
        Congrats, wallet verified, check it in your wallets section
      </Typography>
      <Box
        className="typhoWalletApprovedStep3"
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
          {manualValidation?.toVerifyWallet}
        </Typography>
      </Box>
      <Box style={{ marginTop: '3vh' }}>
        <ThemeProvider theme={grayButton}>
          <Button
            variant="contained"
            style={{ color: '#fff', borderRadius: '0px 10px 0px 10px' }}
            onClick={ackValidation}
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
      <Typography>
        This option allows you to associate additional wallets to your account
        without having to sign a transaction with us. Keep in mind you need at
        least one wallet already verified (i.e.: A hot wallet with a Cypher). To
        prove ownership of the new wallet (i.e.: A cold wallet) we'll ask you to
        send the Cypher to the new wallet you want to verify and send it back.
      </Typography>
      <br />
      <Box component="form">
        <Typography>
          Select the wallet from where you will move your cypher
        </Typography>
        <FormControl
          fullWidth
          style={{ marginTop: '2vh', color: 'rgb(120, 120, 120)' }}
        >
          <InputLabel style={{ color: 'rgb(120, 120, 120)' }}>
            Wallet
          </InputLabel>
          <Select
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white '
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white '
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white '
              },
              '.MuiSvgIcon-root ': {
                fill: 'white !important'
              }
            }}
            label="Wallet"
            value={useHolderWallet}
            onChange={(e) => {
              setUseHolderWallet(e.target.value);
            }}
            style={{ color: 'rgb(120, 120, 120)' }}
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
        <Typography style={{ marginTop: '2vh' }}>
          Enter the wallet you want to validate
        </Typography>
        <FormControl style={{ marginTop: '2vh' }} fullWidth>
          <InputLabel style={{ color: 'rgb(120, 120, 120)' }}>
            Wallet
          </InputLabel>
          <OutlinedInput
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white '
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white '
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white '
              },
              '.MuiSvgIcon-root ': {
                fill: 'white !important'
              }
            }}
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
            style={{
              marginTop: '4vh',
              marginBottom: '2vh',
              backgroundColor: '#3E3E3E',
              borderRadius: '0px 10px 0px 10px'
            }}
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
