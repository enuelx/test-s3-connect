import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(undefined);

  function clear() {
    setToken(null);
    setUser(undefined);
  }

  const value = {
    token,
    user,
    setUser,
    setToken,
    clear
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
