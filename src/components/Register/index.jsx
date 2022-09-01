import { Box } from '@mui/material';

import { accountApi } from '@services';
import { AccountForm } from '@components';
import { Container } from '@mui/system';
import imgChartRegister from '../../style/img/imgChartRegister.png';
import textLogin from '../../style/img/textLogin.png';
import tituloCreate from '../../style/img/createAccount.png';

import { Link } from 'react-router-dom';
export default () => {
  return (
    <Container
      sx={{
        marginRight: '0px',
        height: '980px',

        minWidth: '-webkit-fill-available',
        position: 'relative',
        left: 0,
        top: 0,
        background: 'linear-gradient(90deg, #2a2d23, #6d705e)'
      }}
    >
      <img
        style={{
          width: '1720px',
          position: 'absolute',
          left: '250px'
        }}
        src={imgChartRegister}
      ></img>

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
        src={tituloCreate}
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
