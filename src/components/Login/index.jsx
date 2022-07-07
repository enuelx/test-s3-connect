import { useState, useContext } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Input, Divider, Alert } from '@mui/material';

import { UserContext } from '@context/UserContext';
import { accountApi } from '@services';

export default ({ button }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const { active, account, deactivate, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      const result = await accountApi.login(username, password);
      setIsSubmitting(false);
      setUserContext((oldValues) => {
        return { ...oldValues, token: result.token };
      });
      console.log(result.token);
      console.log(userContext);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWeb3Login = async () => {};

  return (
    <div>
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
        disabled={!active || isUnsupportedChain}
        onClick={handleWeb3Login}
      >
        Web3 Login
      </Button>
    </div>
  );
};
