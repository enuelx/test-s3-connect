import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import { connectors } from '@config/web3';

import './style.css';
import { PinkButton } from '@components/common';
import MetamaskLogo from './img/MetaMask.png';
import WalletConnectLogo from './img/WalletConnect.png';

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { activate, error } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  useEffect(() => {
    const requestChangeNetwork = async () => {
      if (typeof window.ethereum !== 'undefined' && isUnsupportedChain) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }]
        });
      }
    };

    requestChangeNetwork().catch(console.error);
  }, [isUnsupportedChain]);

  return (
    <div>
      <PinkButton text="Connect Wallet" onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose your wallet</DialogTitle>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={async () => {
                activate(connectors.Metamask);
                localStorage.setItem('previouslyConnectedMetamask', 'true')
                handleClose();
              }}
              disabled={
                typeof window.ethereum === 'undefined' || isUnsupportedChain
              }
            >
              <ListItemIcon>
                <img className="wallet-icon" src={MetamaskLogo} />
              </ListItemIcon>
              <ListItemText primary="Metamask" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                activate(connectors.WalletConnect);
                handleClose();
              }}
            >
              <ListItemIcon>
                <img className="wallet-icon" src={WalletConnectLogo} />
              </ListItemIcon>
              <ListItemText primary="Wallet Connect" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};
