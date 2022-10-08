import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

import { UserContext, ToastContext } from '@context';
import { accountApi, walletApi } from '@services';
import { AccountForm } from '@components';
import background from './style/img/loginBackground.png';
import textLogin from '../../style/img/textLogin.png';
import { toastMessages } from '@utils';

const Login = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { active, account, library, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const handleWeb3Login = async (captchaValue) => {
    setIsSubmitting(true);

    try {
      const message = `Welcome to Cyphanatics Dashboard!\n\nClick sign message to sign in and prove the ownership of the wallet.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${account}\n\nNonce:\n${uuidv4()}`;
      const signature = await library.getSigner().signMessage(message);
      const result = await walletApi.login({
        signature,
        message,
        account,
        captchaValue
      });
      setIsSubmitting(false);

      userContext.setToken(result.token);
      toastContext.successMessage(toastMessages.success.LOGGED);
    } catch (err) {
      const message =
        err.response.status === 401
          ? toastMessages.error.WALLET_NOT_ASSOCIATED
          : err.response.data?.error;

      toastContext.errorMessage(message);
    }
    setIsSubmitting(false);
  };

  return (
    <Container
      className="boxPrincipalLogin"
      sx={{
        marginLeft: '0px',
        marginRight: '0px',
        height: 'auto',
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
        <img className="imgLogin" src={background} alt="" />
      </Box>
      <img className="loginMobile" src={textLogin} alt="" />
      <Box className="boxContenedorForm" sx={{ marginLeft: '10vw' }}>
        <Box>
          <AccountForm
            className="formularioLogin"
            web3={true}
            formActionName="Login"
            useCaptcha
            submitCallback={accountApi.login}
            disableWeb3={!active || isUnsupportedChain || isSubmitting}
            handleWeb3Login={handleWeb3Login}
            widthButtonBox="380px"
            margin="370px"
          >
            <Link
              className="textLogin"
              to={{
                pathname: '/register'
              }}
            >
              Not a member yet? Create an account
            </Link>
            <Link
              className="textLogin"
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
