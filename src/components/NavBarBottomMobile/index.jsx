import { useContext, useEffect, useState } from 'react';
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
  faRotate,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

import { WalletData } from '@components';
import { UserContext, ToastContext } from '@context';
import { accountApi } from '@services';
import { toastMessages, webAppPaths as paths } from '@utils';
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

export const NavBarBottomMobile = ({ handleChangeMenu }) => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [open, setOpen] = useState(false);

  const urlPath = window.location.pathname;
  const iconIndex = paths.map((e) => e.url).indexOf(urlPath);
  const [select, setSelect] = useState(iconIndex);

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
    window !== undefined ? () => window.document.body : undefined;

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
            className="styledBox"
            sx={{
              top: -drawerBleeding,
              height: drawerBleeding
            }}
          >
            <Puller onClick={() => toggleDrawer(true)} />
          </StyledBox>
          <StyledBox
            sx={{
              marginTop: '-20px',
              pb: 3,
              height: '120%',
              overflow: 'auto',
              zIndex: 1
            }}
          >
            <Grid container>
              {paths.map((path, index) => (
                <Grid key={path.url} item xs={12 / (paths.length + 1)}>
                  <Link
                    to={{
                      pathname: path.url
                    }}
                    className="linkMobile"
                    style={{
                      color: select === index ? '#FFF' : '#787878'
                    }}
                    onClick={() => {
                      setSelect(index);
                    }}
                  >
                    <div className="divMenuOption">
                      <FontAwesomeIcon
                        size="lg"
                        icon={path.icon}
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                      />

                      <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                        {path.text}
                      </p>
                    </div>
                  </Link>
                </Grid>
              ))}

              <Grid item xs={12 / (paths.length + 1)}>
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
                      <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                        Logout
                      </p>
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
};
