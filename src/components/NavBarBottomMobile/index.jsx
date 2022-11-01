import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Grid,
  GlobalStyles
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faGear,
  faCloud,
  faRotate,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

import { WalletData } from '@components';
import { UserContext, ToastContext } from '@context';
import { accountApi } from '@services';
import { toastMessages } from '@utils';
import './style.css';

const drawerBleeding = 77;

const Root = styled('div')(() => ({
  height: '100%',
  backgroundColor: 'rgb(62, 62, 62)'
}));

const StyledBox = styled(Box)(() => ({
  backgroundColor: 'rgb(62, 62, 62)'
}));

const Puller = styled(Box)(() => ({
  width: 50,
  height: 6,
  backgroundColor: '#fff',
  borderRadius: 3,
  position: 'absolute',
  top: 4,
  cursor: 'pointer',
  zIndex: 99999999,
  marginBottom: 5
}));

function NavBarBottomMobile(props) {
  const { window } = props;
  const { handleChangeMenu } = props;
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
  const toggleDrawer = () => {
    setOpen(!open);
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
  useEffect(() => {
    handleChangeMenu(select);
  }, [select]);
  return (
    <>
      <Root className="blockMobile">
        <CssBaseline className="blockMobile" />
        <GlobalStyles
          className="blockMobile"
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(28% - ${drawerBleeding}px)`,
              overflow: 'visible'
            }
          }}
        />
        <Drawer
          className="blockMobile"
          container={container}
          anchor="bottom"
          open={open}
          onClick={toggleDrawer}
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
              height: drawerBleeding,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Puller onClick={() => toggleDrawer(true)} />
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
                        marginBottom: '0.5vh',
                        cursor: 'pointer'
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
        </Drawer>
      </Root>
      <div className="divBottom">
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
