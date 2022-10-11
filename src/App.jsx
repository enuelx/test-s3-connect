import { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { accountApi } from '@services';
import { UserContext } from '@context/UserContext';
import {
  ForgotPassword,
  Login,
  Register,
  Loader,
  Welcome,
  NavBarTop,
  ResetPassword,
  VerifyEmail,
  NavBarLeft
} from '@components';
import { Box } from '@mui/system';
import AccountSettings from './components/AccountSettings';
import ManualVerifyPage from './components/ManualVerifyPage';
import { Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import './App.css';
import NavBarBottomMobile from './components/NavBarBottomMobile';
function App() {
  const userContext = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (document.body.clientWidth < 540) {
      setIsMobile(true);
    }
  }, []);
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

      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyAccount, 5 * 60 * 1000);
    } catch (err) {
      userContext.setToken(null);
    }
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
  const wallets = userContext.user?.wallets || [];
  return (
    <div>
      {/*<Box sx={{ flexGrow: 0 }}>
          <WalletData />
      </Box>*/}
      {userContext.token && !isMobile && <NavBarLeft />}
      {!isMobile && <NavBarTop />}
      {isMobile && <NavBarBottomMobile />}
      {userContext.token && (
        <div style={{ position: 'absolute', bottom: 50, right: 50 }}>
          <div
            style={{
              marginTop: '2vh',
              backgroundColor: '#3E3E3E',
              width: '250px',
              height: '32px',
              color: '#787878',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0px 10px 0px 10px'
            }}
          >
            Cyphers Hodling:{' '}
            {wallets.reduce((prev, { cypherHoldings }) => {
              return prev + cypherHoldings.length;
            }, 0)}
            <Tooltip
              arrow
              placement="top"
              describeChild
              title={<span>Holdings info are updated every 2 hours.</span>}
            >
              <InfoIcon style={{ marginLeft: '1vh', fontSize: '25px' }} />
            </Tooltip>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {userContext.token === null ? (
          <>
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Login />} />
          </>
        ) : userContext.token ? (
          <>
            <Route path="manual-verify" element={<ManualVerifyPage />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="*" element={<Welcome />} />
          </>
        ) : (
          <Loader />
        )}
      </Routes>
    </div>
  );
}

export default App;
