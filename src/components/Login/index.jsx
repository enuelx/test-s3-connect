import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Box, Container } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import { accountApi, walletApi } from '@services';
import { AccountForm } from '@components';
import background from './style/img/loginBackground.png';
import textLogin from '../../style/img/textLogin.png';
import { Link } from 'react-router-dom';

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
      toastContext.successMessage("Welcome, Cypher. We've been expecting you");
    } catch (err) {
      const message =
        err.response.status === 401
          ? 'Oops! Looks like this wallet is not associated to this account or the signature is invalid'
          : err.response.data?.error;

      toastContext.errorMessage(message);
    }
    setIsSubmitting(false);
  };

  return (
    <Container
      sx={{
        marginLeft: '0px',
        marginRight: '0px',
        height: '100%',
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat!important',

        objectFit: 'cover!important',

        background: ` radial-gradient(circle at center, #460036 0, #200017, #18000ee8 80%)`
      }}
    >
      <Box>
        <img
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            maxWidth: '85%',
            right: 0,
            top: 0,
            objectFit: 'cover'
          }}
          src={background}
          alt=""
        />
      </Box>
      <img
        style={{
          width: '500px',
          position: 'absolute',
          top: '50px',
          left: '0px',
          marginLeft: '7.7vw'
        }}
        src={textLogin}
        alt=""
      />
      <Box sx={{ marginLeft: '10vw' }}>
        <Box>
          <AccountForm
            web3={true}
            formActionName="Login"
            submitCallback={accountApi.login}
            disableWeb3={!active || isUnsupportedChain || isSubmitting}
            handleWeb3Login={handleWeb3Login}
            widthButtonBox="380px"
            margin="370px"
          >
            <Link
              style={{
                color: 'white',
                marginTop: '30px',
                textDecoration: 'none'
              }}
              to={{
                pathname: '/register'
              }}
            >
              Not a member yet? Create an account
            </Link>
            <Link
              style={{
                color: 'white',
                marginTop: '30px',
                textDecoration: 'none'
              }}
              to={{
                pathname: '/forgot-password'
              }}
            >
              Forgot your password?
            </Link>
          </AccountForm>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
