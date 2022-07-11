import { createContext, useState } from 'react';

const ToastContext = createContext([{}, () => {}]);

const ToastProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <ToastContext.Provider value={[state, setState]}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
