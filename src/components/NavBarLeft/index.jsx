import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCircleUser
} from '@fortawesome/free-solid-svg-icons';

import ColliderMenu from './style/img/colliderMenu.png';
import CloseC from './style/img/CloseC.png';
import './style/style.css';
import OpenItems from './menuItems/openItems';
import CloseItems from './menuItems/closeItems';
import { UserContext, ToastContext } from '@context';
import { toastMessages } from '@utils';
import { accountApi } from '@services';

export const NavBarLeft = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(!open);
    toastContext.changeOpenNavbarLeft({ login: true, open: !open });
  };
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);
  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    userContext.clear();
    toastContext.changeOpenNavbarLeft({ login: false, open: false });
    toastContext.successMessage(toastMessages.success.LOGOUT);
    window.localStorage.setItem('logout', Date.now());
  };
  useEffect(() => {
    toastContext.changeOpenNavbarLeft({ login: true, open: open });
  }, []);
  return (
    <Drawer
      variant="permanent"
      sx={{ height: '100%' }}
      PaperProps={{
        sx: {
          backgroundColor: '#3E3E3E'
        }
      }}
      open={open}
    >
      <div style={open ? { width: '400px' } : { width: '90px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
            disableRipple={true}
            sx={{
              marginTop: '1vh',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            {open ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxHeight: '24px'
                }}
              >
                <MenuIcon style={{ marginRight: '1vh', color: '#787878' }} />
                <img style={{ objectFit: 'contain' }} src={ColliderMenu} />
              </div>
            ) : (
              <img height={24} width={24} src={CloseC} />
            )}
          </IconButton>
        </div>
        <div
          style={{
            marginTop: '15vh'
          }}
        >
          {open ? <OpenItems /> : <CloseItems />}
        </div>
        {open ? (
          <Box
            style={{
              position: 'absolute',
              bottom: 50,
              width: '100%'
            }}
          >
            <Box
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Box
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginLeft: '31px'
                }}
              >
                <Typography style={{ color: '#FFF', fontWeight: '800' }}>
                  {userContext.user.username}
                </Typography>
              </Box>

              <Box
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginRight: '6vw',
                  cursor: 'pointer'
                }}
                onClick={logoutHandler}
              >
                <Typography style={{ color: '#787878', marginRight: '1vh' }}>
                  Logout
                </Typography>
                <FontAwesomeIcon
                  color="#787878"
                  icon={faArrowRightFromBracket}
                  size="lg"
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            style={{
              textAlign: 'center',
              position: 'absolute',
              bottom: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Box
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginLeft: '31px'
              }}
            >
              <FontAwesomeIcon color="#FFF" icon={faCircleUser} size="lg" />
            </Box>
          </Box>
        )}
      </div>
    </Drawer>
  );
};
