import { useContext, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { accountApi } from '@services';
import { UserContext } from '@context/UserContext';
import {
  Login,
  Register,
  Loader,
  Welcome,
  NavBar,
  ManualVerify
} from '@components';

function App() {
  const userContext = useContext(UserContext);

  const getAccountDetails = useCallback(async () => {
    try {
      if (userContext.token) {
        const userDetails = await accountApi.userDetails(userContext.token);
        userContext.setUser(userDetails);
      }
    } catch (err) {
      if (err.status === 401) {
        // Edge case: when the token has expired.
        // This could happen if the refreshToken calls have failed due to network error or
        // User has had the tab open from previous day and tries to click on the Fetch button
        window.location.reload();
      } else {
        userContext.setUser(null);
      }
    }
  }, [userContext.setUser, userContext.token]);

  useEffect(() => {
    if (!userContext.user) {
      getAccountDetails();
    }
  }, [userContext.user, getAccountDetails]);

  const verifyAccount = useCallback(async () => {
    try {
      const data = await accountApi.refreshToken();
      userContext.setToken(data.token);
    } catch (err) {
      userContext.setToken(null);
    }

    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyAccount, 5 * 60 * 1000);
  }, [userContext.setToken]);

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
        <Routes>
          <Route path="manualverify" element={<ManualVerify />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
