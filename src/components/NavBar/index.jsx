import { AppBar, Toolbar, Link } from '@mui/material';
import { WalletData } from '@components';
import { Box } from '@mui/system';

export default () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link
            href="/"
            sx={{ paddingRight: 2, color: 'white', display: 'block' }}
          >
            Login
          </Link>
          <Link
            href="/register"
            sx={{ paddingRight: 2, color: 'white', display: 'block' }}
          >
            Register
          </Link>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <WalletData />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
