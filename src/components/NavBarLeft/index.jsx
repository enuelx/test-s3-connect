import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import './style/style.css';
import MenuIcon from '@mui/icons-material/Menu';
import ColliderMenu from './style/img/colliderMenu.png';
import CloseC from './style/img/CloseC.png';
import OpenItems from './menuItems/openItems';
import CloseItems from './menuItems/closeItems';
import { UserContext, ToastContext } from '@context';
import { accountApi } from '@services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCircleUser
} from '@fortawesome/free-solid-svg-icons';
export default () => {
  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);
  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    userContext.clear();
    toastContext.successMessage('Logout successful');
    window.localStorage.setItem('logout', Date.now());
  };
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
            style={{
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
                <MenuIcon style={{ marginRight: '2vh' }} />
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
              textAlign: 'center',
              marginTop: '50vh',
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
                marginLeft: '4vh'
              }}
            >
              <Typography style={{ color: '#FFF', fontWeight: '800' }}>
                UserName:
              </Typography>
              <Typography style={{ color: '#FFF', marginLeft: '1vw' }}>
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
                marginRight: '2vw',
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
        ) : (
          <Box
            style={{
              textAlign: 'center',
              marginTop: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <FontAwesomeIcon color="#FFF" icon={faCircleUser} size="lg" />
          </Box>
        )}
      </div>
    </Drawer>
  );
};
