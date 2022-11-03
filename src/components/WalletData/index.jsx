import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import WalletModal from './WalletModal';
import { connectors } from '@config/web3';
import './style.css';

export const WalletData = ({ login, isMobile, fromTop }) => {
  const { active, activate, account, deactivate } = useWeb3React();

  const connectMetamask = useCallback(() => {
    activate(connectors.Metamask);
  }, [activate]);

  useEffect(() => {
    if (localStorage.getItem('previouslyConnectedMetamask') === 'true')
      connectMetamask();
  }, [connectMetamask]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem('previouslyConnectedMetamask');
  };
  return active ? (
    <div>
      <div>
        <Chip
          variant="outlined"
          className={
            isMobile
              ? 'chipWalletMobile'
              : login
              ? 'chipWallet'
              : 'chipWalletNoLogin'
          }
          label={`${account.substring(0, 6)}...${account.substring(
            account.length - 6
          )}`}
          onDelete={disconnect}
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
      </div>
    </div>
  ) : (
    <div>
      <WalletModal fromTop={fromTop} isMobile={isMobile} login={login} />
    </div>
  );
};
