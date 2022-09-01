import { Box } from '@mui/material';

import { accountApi } from '@services';
import { AccountForm } from '@components';
import { Container } from '@mui/system';
import {
  registerBackground as background,
  createAccountText
} from './style/img';
import textLogin from '../../style/img/textLogin.png';

export default () => {
  return (
    <Container
      sx={{
        marginRight: '0px',
        height: '100vh',

        minWidth: '-webkit-fill-available',
        position: 'relative',
        left: 0,
        top: 0,
        background: `url(${background}), linear-gradient(90deg, #2a2d23, #6d705e)`
      }}
    >
      <img
        style={{
          width: '500px',
          position: 'absolute',
          top: '80px',
          left: '0px',
          marginLeft: '150px'
        }}
        src={textLogin}
        alt=""
      />
      <img
        style={{
          width: '300px',
          position: 'absolute',
          top: '400px',
          left: '59px',
          marginLeft: '150px'
        }}
        src={createAccountText}
        alt=""
      />

      <Box sx={{ marginLeft: '170px' }}>
        <AccountForm
          formActionName="Register"
          submitCallback={accountApi.signUp}
          validateRepeatPassword
          useCaptcha
          margin="250px"
        />
      </Box>
    </Container>
  );
};
