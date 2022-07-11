import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import App from './App';
import './index.css';
import { getLibrary } from '@config/web3';
import { UserProvider } from '@context/UserContext';
import { ToastProvider } from '@context/ToastContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ToastProvider>
        <BrowserRouter>
          <Web3ReactProvider getLibrary={getLibrary}>
            <App />
          </Web3ReactProvider>
        </BrowserRouter>
      </ToastProvider>
    </UserProvider>
  </React.StrictMode>
);
