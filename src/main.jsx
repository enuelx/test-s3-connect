import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

import './index.css';
import { getLibrary } from '@config/web3';
import { ToastProvider, UserProvider } from '@context';
import App from './App';

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
