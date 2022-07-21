import { useContext } from 'react';
import { AppBar, Toolbar, Link } from '@mui/material';
import { Box } from '@mui/system';

import { WalletData } from '@components';
import { UserContext } from '@context';

export default () => {
  const userContext = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link
            href="/"
            sx={{ paddingRight: 2, color: 'white', display: 'block' }}
          >
            {userContext.token ? 'Home' : 'Login'}
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
      </Toolbar>
    </AppBar>
  );
};
