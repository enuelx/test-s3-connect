import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Chip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import WalletModal from './WalletModal';
import { connectors } from '@config/web3';

export default () => {
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
          sx={{ color: '#787878' }}
          label={account}
          onDelete={disconnect}
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
      </div>
    </div>
  ) : (
    <div>
      <WalletModal />
    </div>
  );
};
