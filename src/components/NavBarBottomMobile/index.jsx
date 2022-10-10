import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faGear, faCloud } from '@fortawesome/free-solid-svg-icons';
const drawerBleeding = 56;

const Root = styled('div')(() => ({
  height: '100%',
  backgroundColor: 'rgb(62, 62, 62)'
}));

const StyledBox = styled(Box)(() => ({
  backgroundColor: 'rgb(62, 62, 62)'
}));

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  backgroundColor: '#fff',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  cursor: 'pointer'
}));

function NavBarBottomMobile(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  let c = 1;
  let urlPath = window !== undefined ? window.location.pathname : '';

  if (urlPath === '/manual-verify') {
    c = 2;
  }
  if (urlPath === '/account-settings') {
    c = 3;
  }
  const [select, setSelect] = React.useState(c);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            height: `auto`,
            overflow: 'visible'
          }
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0
          }}
        >
          <Puller onClick={() => toggleDrawer(true)} />

          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            51 results
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            pb: 2,
            height: '100%',
            overflow: 'auto'
          }}
        >
          <Grid container>
            <Grid item xs={3}>
              <Link
                to={{
                  pathname: '/'
                }}
                style={{
                  marginTop: '1vh',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textDecoration: 'none',
                  color: select === 1 ? '#FFF' : '#787878'
                }}
                onClick={() => {
                  setSelect(1);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '6vh',
                    marginTop: '0.5vh',
                    marginBottom: '0.5vh'
                  }}
                >
                  <FontAwesomeIcon size="lg" icon={faCloud} />
                </div>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link
                to={{
                  pathname: '/manual-verify'
                }}
                style={{
                  marginTop: '1vh',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textDecoration: 'none',
                  color: select === 2 ? '#FFF' : '#787878'
                }}
                onClick={() => {
                  setSelect(2);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '6vh',
                    marginTop: '0.5vh',
                    marginBottom: '0.5vh'
                  }}
                >
                  <FontAwesomeIcon icon={faWallet} size="lg" />
                </div>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link
                to={{
                  pathname: '/account-settings'
                }}
                style={{
                  marginTop: '1vh',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textDecoration: 'none',
                  color: select === 3 ? '#FFF' : '#787878'
                }}
                onClick={() => {
                  setSelect(3);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '6vh',
                    marginTop: '0.5vh',
                    marginBottom: '0.5vh'
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    size="lg"
                    icon={faGear}
                  />
                </div>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link
                to={{
                  pathname: '/account-settings'
                }}
                style={{
                  marginTop: '1vh',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textDecoration: 'none',
                  color: select === 3 ? '#FFF' : '#787878'
                }}
                onClick={() => {
                  setSelect(3);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '6vh',
                    marginTop: '0.5vh',
                    marginBottom: '0.5vh'
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    size="lg"
                    icon={faGear}
                  />
                </div>
              </Link>
            </Grid>
          </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

NavBarBottomMobile.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default NavBarBottomMobile;