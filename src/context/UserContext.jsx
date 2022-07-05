import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
