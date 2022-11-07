import { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [state, setState] = useState({
    message: null,
    severity: null
  });
  const [openNavBarLeft, setOpenNavBarLeft] = useState({
    login: false,
    open: false
  });
  const value = {
    ...state,
    errorMessage: (
      message = "There's been an error in the Matrix. Please try again"
    ) => {
      setState({
        message,
        severity: 'error'
      });
    },
    successMessage: (message) => {
      setState({
        message,
        severity: 'success'
      });
    },
    changeOpenNavbarLeft: (open) => {
      setOpenNavBarLeft(open);
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ message: null, severity: null });
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {state.message && (
        <Snackbar
          open={state.message !== null}
          onClose={handleToastClose}
          autoHideDuration={5000}
          style={{
            zIndex: 999999999999,
            marginLeft: openNavBarLeft.login
              ? openNavBarLeft.open
                ? '23vw'
                : '5vw'
              : ''
          }}
        >
          <Alert
            style={{ backgroundColor: '#787878' }}
            severity={state.severity}
            onClose={handleToastClose}
          >
            {state.message}
          </Alert>
        </Snackbar>
      )}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
