import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button, Box, Divider, Container } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import { accountApi, walletApi } from '@services';
import { AccountForm } from '@components';
import backImg from '../../style/img/imgChart1.png';
import textLogin from '../../style/img/textLogin.png';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { grayButton } from '@themes';
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
    <Container
      sx={{
        marginLeft: '0px',
        marginRight: '0px',
        height: '980px',

        minWidth: '-webkit-fill-available',
        position: 'relative',
        left: 0,
        top: 0,
        background:
          'radial-gradient(circle at center, #460036 0, #200017, #18000ee8 80%)'
      }}
    >
      <img
        style={{
          width: '1720px',
          position: 'absolute',
          left: '250px'
        }}
        src={backImg}
        alt=""
      />

      <img
        style={{
          width: '400px',
          position: 'absolute',
          top: '100px',
          left: '0px',
          marginLeft: '150px'
        }}
        src={textLogin}
        alt=""
      />
      <Box sx={{ marginLeft: '150px' }}>
        <Box>
          <AccountForm
            margin="160px"
            formActionName="Login"
            submitCallback={accountApi.login}
          >
            <ThemeProvider theme={grayButton}>
              <Button
                variant="contained"
                disabled={!active || isUnsupportedChain || isSubmitting}
                onClick={handleWeb3Login}
                sx={{
                  width: '150px',

                  border: 'solid 1px',
                  alignSelf: 'baseline',
                  marginLeft: '250px',
                  marginTop: '25px',
                  marginBottom: '0px',

                  background: 'none',
                  ':hover': {
                    bgcolor: '#787878', // theme.palette.primary.main
                    color: 'white'
                  }
                }}
              >
                Web3 Login
              </Button>
            </ThemeProvider>

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
