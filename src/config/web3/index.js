import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';

import config from '@config';

const injected = new InjectedConnector({
  supportedChainIds: [1]
});

const WalletConnect = new WalletConnectConnector({
  infuraId: config.infuraKey
});

const connectors = {
  Metamask: injected,
  WalletConnect
};

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

export { getLibrary, connectors };
