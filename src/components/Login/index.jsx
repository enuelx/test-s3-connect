import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Divider } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import { accountApi, walletApi } from '@services';
import { AccountForm } from '@components';

const Login = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { active, account, library, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const handleWeb3Login = async () => {
    setIsSubmitting(true);

    try {
      const message = `Welcome to Cyphanatics Dashboard!\n\nClick sign message to sign in and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
      const signature = await library.getSigner().signMessage(message);
      const result = await walletApi.login(signature, message, account);
      setIsSubmitting(false);

      userContext.setToken(result.token);
      toastContext.successMessage('Login successful');
    } catch (err) {
      const message =
        err.response.status === 401
          ? 'Wallet not associated to an account or invalid signature'
          : err.response.data?.error || 'Something went wrong';

      toastContext.errorMessage(message);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <AccountForm formActionName="Login" submitCallback={accountApi.login} />
      <Divider />
      <Button
        variant="contained"
        disabled={!active || isUnsupportedChain || isSubmitting}
        onClick={handleWeb3Login}
      >
        Web3 Login
      </Button>
    </div>
  );
};

export default Login;
