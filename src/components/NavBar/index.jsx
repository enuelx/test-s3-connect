import { useContext } from 'react';
import { AppBar, Toolbar, Link, Button } from '@mui/material';
import { Box } from '@mui/system';

import { WalletData, PinkButton } from '@components';
import { UserContext, ToastContext } from '@context';
import { accountApi } from '@services';

export default () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const logoutHandler = async () => {
    await accountApi.logout(userContext.token);
    userContext.clear();
    toastContext.successMessage('Logout successful');
    window.localStorage.setItem('logout', Date.now());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link
            href="/"
            sx={{ paddingRight: 2, color: 'white', display: 'block' }}
          >
            Home
          </Link>
          {!userContext.token && (
            <Link
              href="/register"
              sx={{ paddingRight: 2, color: 'white', display: 'block' }}
            >
              Register
            </Link>
          )}
          {userContext.token && (
            <Link
              href="/manualverify"
              sx={{ paddingRight: 2, color: 'white', display: 'block' }}
            >
              Add wallet manually
            </Link>
          )}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <WalletData />
        </Box>
        {userContext.token && (
          <PinkButton
            text="logout"
            onClick={logoutHandler}
            sx={{ marginLeft: '2px' }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
