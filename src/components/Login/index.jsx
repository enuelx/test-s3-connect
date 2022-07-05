import { useState, useContext } from 'react';
import { Button, Input } from '@mui/material';

import { UserContext } from '@context/UserContext';
import { accountApi } from '@services';

export default ({ button }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const result = await accountApi.login(username, password);
      setIsSubmitting(false);
      setUserContext((oldValues) => {
        return { ...oldValues, token: result.token };
      });
      console.log(result.token);
      console.log(userContext);
    } catch (err) {
      setIsSubmitting(false);
      setError('Error logging in');
    }
  };

  return (
    <>
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
      {error && <div>{error}</div>}
    </>
  );
};
