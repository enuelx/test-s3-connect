import {
  faCloud,
  faWallet,
  faGear,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';

import { facMoshpitLogo } from '@style/img/customIcons';

export default [
  { url: '/', text: 'Sync', icon: faCloud },
  { url: '/manual-verify', text: 'Add wallet manually', icon: faWallet },
  { url: '/tournament', text: 'Tournament', icon: facMoshpitLogo },
  { url: '/account-settings', text: 'Account settings', icon: faGear },
  {
    url: '/benefit-calculator',
    text: 'Benefits calculator',
    icon: faCalculator
  }
];
