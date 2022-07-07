import { createTheme } from '@mui/material';

export const pinkButton = createTheme({
  palette: {
    primary: {
      main: '#d9144e'
    },
    action: {
      disabled: '#d9144e',
      disabledBackground: '#d9144e'
    }
  }
});
