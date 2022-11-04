import { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';

import { accountApi } from '@services';
import { UserContext } from '@context/UserContext';
import {
  AccountSettings,
  ForgotPassword,
  Login,
  Register,
  Loader,
  Welcome,
  NavBarTop,
  ResetPassword,
  VerifyEmail,
  NavBarLeft,
  Gallery,
  ManualVerifyPage,
  TournamentPage,
  AssociateTwitterPage
} from '@components';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import './App.css';
import NavBarBottomMobile from './components/NavBarBottomMobile';

function App() {
  const userContext = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [menu, setMenu] = useState(null);
  const [textMenu, setTextMenu] = useState('');

  useEffect(() => {
    if (document.body.clientWidth < 850) {
      setIsMobile(true);
    }
  }, []);

  const handleChangeMenu = (index) => {
    setMenu(index);
  };

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

  useEffect(() => {
    if (menu) {
      setTextMenu(
        menu === 1
          ? 'Dashboard'
          : menu === 2
          ? 'Manually Sync'
          : 'Account Settings'
      );
    }
  }, [menu]);

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

  return (
    <div className="App">
      {userContext.token && <NavBarLeft />}
      {<NavBarTop />}
      {userContext.token && (
        <NavBarBottomMobile handleChangeMenu={handleChangeMenu} />
      )}

      {userContext.token && (
        <div className="divApp">
          <div className="textMobile">
            <h3 style={{ color: 'rgb(120, 120, 120)' }}>
              Hi {userContext?.user?.username}
              <br></br>
              <span style={{ color: '#fff', fontSize: '1.3rem' }}>
                {textMenu}
              </span>
            </h3>
          </div>

          <div className="holdings">
            {isMobile ? 'Hodling:' : 'Cyphers Hodling:'}
            {userContext.user?.cyphersHoldingAmount}
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
            <Route path="gallery" element={<Gallery />} />
            <Route path="manual-verify" element={<ManualVerifyPage />} />
            <Route path="tournament" element={<TournamentPage />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="twitter/login" element={<AssociateTwitterPage />} />
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
