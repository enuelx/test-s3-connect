import { useWeb3React } from '@web3-react/core';
import { Chip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import WalletModal from './WalletModal';

export default () => {
  const { active, account, deactivate } = useWeb3React();

  const disconnect = () => {
    deactivate();
  };

  return active ? (
    <div>
      <div>
        <Chip
          color="primary"
          label={account}
          onDelete={disconnect}
          icon={<AccountBalanceWalletIcon />}
          sx={{ bgcolor: '#fbd33e', color: '#d9144e' }}
        />
      </div>
    </div>
  ) : (
    <div>
      <WalletModal />
    </div>
  );
};
