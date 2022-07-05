import { useContext, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { accountApi } from '@services';
import { UserContext } from '@context/UserContext';
import { Login, Register, Loader } from '@components';

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

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

  return userContext.token === null ? (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  ) : userContext.token ? (
    <div>Welcome</div>
  ) : (
    <Loader />
  );
}

export default App;
