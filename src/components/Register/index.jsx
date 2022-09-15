import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

import { accountApi } from '@services';
import { AccountForm } from '@components';
import {
  registerBackground as background,
  createAccountText
} from './style/img';
import textLogin from '../../style/img/textLogin.png';

export default () => {
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
        background: `linear-gradient(90deg, #2a2d23, #6d705e)`
      }}
    >
      <Box>
        <img
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

      <Box sx={{ marginLeft: '10vw' }}>
        <AccountForm
          formActionName="Register"
          submitCallback={accountApi.signUp}
          validateRepeatPassword
          useCaptcha
          widthButtonBox="500px"
          margin="400px"
        >
          <Link
            to={{
              pathname: '/login'
            }}
            style={{ color: 'white', marginTop: '4vh' }}
          >
            Already a member? Log in
          </Link>
        </AccountForm>
      </Box>
    </Container>
  );
};
