import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Input, Divider } from '@mui/material';

import { UserContext } from '@context/UserContext';
import { accountApi, walletApi } from '@services';

export default () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const { active, account, library, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      const result = await accountApi.login(username, password);
      setUserContext((oldValues) => {
        return { ...oldValues, token: result.token };
      });
    } catch (err) {}
    setIsSubmitting(false);
    return res.status(500).send({ error: err.message });
  };

  const handleWeb3Login = async () => {
    setIsSubmitting(true);

    try {
      const message = `Welcome to Cyphanatics Dashboard!\n\nClick sign message to sign in and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
      const signature = await library.getSigner().signMessage(message);
      const result = await walletApi.login(signature, message, account);
      setIsSubmitting(false);
      setUserContext((oldValues) => {
        return { ...oldValues, token: result.token };
      });
    } catch (err) {}
    setIsSubmitting(false);
  };

  return (
    <div style={{ padding: '40px', width: 'fit-content' }}>
      <Input
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
      />
      <br />
      <Button disabled={isSubmitting} variant="contained" onClick={handleLogin}>
        Login
      </Button>
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
