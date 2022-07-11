import { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { accountApi } from '@services';
import { UserContext } from '@context/UserContext';
import { ToastContext } from '@context/ToastContext';
import { Login, Register, Loader, Welcome, NavBar } from '@components';
import { Snackbar, Alert } from '@mui/material';

function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [toastContext, setToastContext] = useContext(ToastContext);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastContext((oldValues) => {
      return { ...oldValues, message: null, severity: null };
    });
  };

  const verifyAccount = useCallback(async () => {
    try {
      const data = await accountApi.refreshToken();
      setUserContext((oldValues) => {
        return { ...oldValues, token: data.token };
      });
    } catch (err) {
      setUserContext((oldValues) => {
        return { ...oldValues, token: null };
      });
    }

    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyAccount, 5 * 60 * 1000);
  }, [setUserContext]);

  useEffect(() => {
    verifyAccount();
  }, [verifyAccount]);

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === 'logout') {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, [syncLogout]);

  return (
    <div>
      <NavBar />
      {userContext.token === null ? (
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : userContext.token ? (
        <Welcome />
      ) : (
        <Loader />
      )}

      {toastContext.message && (
        <Snackbar
          open={toastContext.message !== null}
          onClose={handleToastClose}
          autoHideDuration={5000}
        >
          <Alert severity={toastContext.severity} onClose={handleToastClose}>
            {toastContext.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default App;
