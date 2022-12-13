import { useContext } from 'react';
import { Box } from '@mui/system';

import { CustomButton, WalletData } from '@components';
import { ToastContext, UserContext } from '@context';
import { accountApi } from '@services';
import { toastMessages } from '@utils';
import './style.css';

export const NavBarTop = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);
  const reloadUserDetailsHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // getUserDetails will be invoked from useEffect
    userContext.setUser(undefined);
  };
  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    userContext.clear();
    toastContext.changeOpenNavbarLeft({ login: false, open: false });
    toastContext.successMessage(toastMessages.success.LOGOUT);
    window.localStorage.setItem('logout', Date.now());
  };
  return (
    <>
      <Box
        sx={{
          float: 'right',
          marginRight: '20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {userContext.token && (
          <CustomButton
            fromTop={true}
            text="reload"
            onClick={reloadUserDetailsHandler}
            sx={{ marginLeft: '2px' }}
            login={userContext.token}
          />
        )}

        <Box className={'boxWalletData'}>
          <WalletData fromTop={!!userContext.token} login={userContext.token} />
        </Box>

        {userContext.token && (
          <CustomButton
            fromTop={true}
            text="logout"
            onClick={logoutHandler}
            sx={{ marginLeft: '2px' }}
            login={userContext.token}
          />
        )}
      </Box>
    </>
  );
};
