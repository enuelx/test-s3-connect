import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, _setUser] = useState(undefined);

  function clear() {
    setToken(null);
    _setUser(undefined);
  }

  function setUser(newUser) {
    if (!newUser) {
      _setUser(newUser);
    } else {
      const wallets = newUser.wallets || [];
      const cyphersHoldingAmount = newUser.wallets?.reduce(
        (prev, { cypherHoldings }) => {
          return prev + cypherHoldings.length;
        },
        0
      );
      const updatedUser = {
        ...newUser,
        wallets,
        cyphersHoldingAmount
      };
      _setUser(updatedUser);
    }
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
