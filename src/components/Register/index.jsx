import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@mui/material';

import { UserContext } from '@context/UserContext';
import { accountApi } from '@services';

export default () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const result = await accountApi.signUp(username, password);
      setIsSubmitting(false);
      setUserContext((oldValues) => {
        return { ...oldValues, token: result.token };
      });
      console.log(userContext);
      navigate('/');
    } catch (err) {
      setIsSubmitting(false);
      setError('Error signing up');
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
      <Button
        disabled={isSubmitting}
        variant="contained"
        onClick={handleRegister}
      >
        Register
      </Button>
      {error && <div>{error}</div>}
    </>
  );
};
