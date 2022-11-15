import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

import { accountApi } from '@services';
import { AccountForm } from '@components';
import { createAccountText, cypherChosen } from './style/img';
import textLogin from '../../style/img/textLogin.png';
import { useEffect, useState } from 'react';
import './style.css';

export const Register = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (document.body.clientWidth < 850) {
      setIsMobile(true);
    }
  }, []);
  return (
    <Container className="mainContainer">
      <Box>
        <img className="imgRegister" src={cypherChosen} alt="" />
      </Box>
      <img className="imgTextRegister" src={textLogin} alt="" />
      <img className="imgTextRegister2" src={createAccountText} alt="" />

      <Box className="boxContenedorForm" sx={{ marginLeft: '10vw' }}>
        <AccountForm
          formActionName={'Create Account'}
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
