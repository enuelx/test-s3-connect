import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

import { accountApi } from '@services';
import { AccountForm } from '@components';
import {
  registerBackground as background,
  createAccountText
} from './style/img';
import textLogin from '../../style/img/textLogin.png';
import { useEffect, useState } from 'react';

export const Register = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (document.body.clientWidth < 540) {
      setIsMobile(true);
    }
  }, []);
  return (
    <Container
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
        background: `linear-gradient(90deg, #2a2d23, #6d705e)`
      }}
    >
      <Box>
        <img
          className="imgRegister"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            right: 0,
            maxWidth: '85%',
            bottom: 0
          }}
          src={background}
          alt=""
        />
      </Box>
      <img
        className="imgTextRegister"
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
      <img
        className="imgTextRegister2"
        style={{
          width: '300px',
          position: 'absolute',
          top: '370px',
          left: '59px',
          marginLeft: '7.7vw'
        }}
        src={createAccountText}
        alt=""
      />

      <Box className="boxContenedorForm" sx={{ marginLeft: '10vw' }}>
        <AccountForm
          formActionName={isMobile ? 'Create Account' : 'Register'}
          submitCallback={accountApi.signUp}
          validateRepeatPassword
          useCaptcha
          widthButtonBox="500px"
          margin="400px"
          isMobile={isMobile}
        >
          <Link
            to={{
              pathname: '/login'
            }}
            style={{ color: 'white', marginTop: isMobile ? '1.5vh' : '4vh' }}
          >
            Already a member? Log in
          </Link>
        </AccountForm>
      </Box>
    </Container>
  );
};
