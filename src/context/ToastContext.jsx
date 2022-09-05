import { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [state, setState] = useState({
    message: null,
    severity: null
  });

  const value = {
    ...state,
    errorMessage: (message) => {
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
