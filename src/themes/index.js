import { createTheme } from '@mui/material';

export const CustomButton = createTheme({
  palette: {
    primary: {
      main: '#fffffff'
    },

    action: {
      disabled: 'white'
    }
  }
});

export const whiteButton = createTheme({
  palette: {
    primary: {
      main: '#fff'
    },
    action: {
      disabled: 'rgb(62, 62, 62)',
      disabledBackground: 'transparent'
    }
  }
});

export const grayButton = createTheme({
  palette: {
    primary: {
      main: 'rgb(62, 62, 62)'
    },
    action: {
      disabled: '#3E3E3E',
      disabledBackground: 'transparent'
    }
  }
});

export const grayButtonVerify = createTheme({
  palette: {
    primary: {
      main: 'rgb(62, 62, 62)'
    },
    action: {
      disabled: '#3E3E3E',
      disabledBackground: '#3E3E3E'
    }
  }
});

export const grayDisabledButton = createTheme({
  palette: {
    primary: {
      main: 'rgb(62, 62, 62)'
    },
    action: {
      disabled: '#787878',
      disabledBackground: '#3E3E3E'
    }
  }
});
