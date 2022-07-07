import { useState } from 'react';
import {
  AppBar,
  Menu,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Button
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { WalletData } from '@components';
import { Box } from '@mui/system';

export default () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            Login
          </Button>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            Register
          </Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <WalletData />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
