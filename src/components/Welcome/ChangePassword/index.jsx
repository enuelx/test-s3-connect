import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
  InfoOutlined as InfoIcon,
  ExpandMore
} from '@mui/icons-material';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import config from '@config';
import { UserContext, ToastContext } from '@context';
import { accountApi, walletApi } from '@services';

export const ChangePassword = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

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
    <Accordion sx={{ width: '50vw' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Change Password</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <span>
            To change the password, you can choose to enter your previous
            password, or sign a message with a wallet associated to your
            account.
          </span>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="current password"
              variant="standard"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              type={showOldPassword ? 'text' : 'password'}
              error={
                oldPassword !== '' && !config.passwordRegex.test(oldPassword)
              }
              sx={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <Box
              component="div"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <HideIcon /> : <ShowIcon />}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="new password"
              variant="standard"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type={showNewPassword ? 'text' : 'password'}
              error={
                newPassword !== '' && !config.passwordRegex.test(newPassword)
              }
              sx={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <Box
              component="div"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <HideIcon /> : <ShowIcon />}
            </Box>
            <Tooltip
              sx={{ textTransform: 'none' }}
              arrow
              placement="right"
              describeChild
              title={
                <span>
                  Password must: <br />- Be at least 8 characters long <br />-
                  Contain a number <br />- Contain a lowercase letter <br />-
                  Contain an uppercase letter <br />- Contain a special symbol
                </span>
              }
            >
              <InfoIcon />
            </Tooltip>
          </Box>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            onClick={handleChangePassword}
          >
            Submit new password
          </Button>
          <Button
            variant="contained"
            disabled={!active || isUnsupportedChain || isSubmitting}
            onClick={handleWeb3ChangePassword}
          >
            Web3 Change Password
          </Button>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
