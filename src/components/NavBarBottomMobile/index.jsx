import { useContext, useState } from 'react';
import { Box } from '@mui/system';

import { WalletData, CustomButton } from '@components';
import { UserContext, ToastContext } from '@context';
import { accountApi } from '@services';
import { toastMessages } from '@utils';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faGear,
  faCloud,
  faRotate,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
const drawerBleeding = 72;

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
  const [open, setOpen] = useState(false);
  let c = 1;
  let urlPath = window !== undefined ? window.location.pathname : '';

  if (urlPath === '/manual-verify') {
    c = 2;
  }
  if (urlPath === '/account-settings') {
    c = 3;
  }
  const [select, setSelect] = useState(c);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);
  const reloadUserDetailsHandler = () => {
    userContext.setUser(undefined);
  };
  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    userContext.clear();
    toastContext.changeOpenNavbarLeft({ login: false, open: false });
    toastContext.successMessage(toastMessages.success.LOGOUT);
    window.localStorage.setItem('logout', Date.now());
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(28% - ${drawerBleeding}px)`,
              //height: `auto`,
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
              left: 0,
              height: drawerBleeding
            }}
          >
            <Puller onClick={() => toggleDrawer(true)} />

            <Typography sx={{ p: 2, color: 'text.secondary' }}>
              &nbsp;
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
                  className="linkMobile"
                  style={{
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
                      flexDirection: 'column',
                      height: 'auto',
                      marginTop: '0.5vh',
                      marginBottom: '0.5vh'
                    }}
                  >
                    <FontAwesomeIcon
                      size="lg"
                      icon={faCloud}
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    />

                    <p style={{ fontSize: '0.9rem' }}>Sync</p>
                  </div>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link
                  to={{
                    pathname: '/manual-verify'
                  }}
                  style={{
                    color: select === 2 ? '#FFF' : '#787878'
                  }}
                  className="linkMobile"
                  onClick={() => {
                    setSelect(2);
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      height: 'auto',
                      marginTop: '0.5vh',
                      marginBottom: '0.5vh'
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faWallet}
                      size="lg"
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    />
                    <p style={{ fontSize: '0.9rem' }}>Add Wallet</p>
                  </div>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link
                  to={{
                    pathname: '/account-settings'
                  }}
                  className="linkMobile"
                  style={{
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
                      flexDirection: 'column',
                      height: 'auto',
                      marginTop: '0.5vh',
                      marginBottom: '0.5vh'
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                      size="lg"
                      icon={faGear}
                    />
                    <p style={{ fontSize: '0.9rem' }}>Settings</p>
                  </div>
                </Link>
              </Grid>
              <Grid item xs={3}>
                {userContext.token && (
                  <div
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      textDecoration: 'none',
                      color: '#787878'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: 'auto',
                        marginTop: '0.5vh',
                        marginBottom: '0.5vh'
                      }}
                      onClick={logoutHandler}
                    >
                      <FontAwesomeIcon
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        size="lg"
                        icon={faArrowRightFromBracket}
                      />
                      <p style={{ fontSize: '0.9rem' }}>Logout</p>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
      <div
        style={{
          position: 'fixed',
          bottom: 4,
          zIndex: 9999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <WalletData isMobile={true} login={userContext.token} />

        {userContext.token && (
          <Button
            onClick={reloadUserDetailsHandler}
            style={{
              color: userContext.token ? '#787878' : '#fff',
              border: 'solid 1px',
              marginLeft: '2vh'
            }}
          >
            <FontAwesomeIcon size="lg" icon={faRotate} />
          </Button>
        )}
      </div>
    </>
  );
}

NavBarBottomMobile.propTypes = {
  window: PropTypes.func
};

export default NavBarBottomMobile;
