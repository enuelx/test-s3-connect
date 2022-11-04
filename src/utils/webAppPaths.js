import {
  faCloud,
  faWallet,
  faTrophy,
  faGear,
  faImage
} from '@fortawesome/free-solid-svg-icons';

export default [
  { url: '/', text: 'Sync', icon: faCloud },
  { url: '/manual-verify', text: 'Add wallet manually', icon: faWallet },
  { url: '/gallery', text: 'Gallery', icon: faImage },
  { url: '/tournament', text: 'Tournament', icon: faTrophy },
  { url: '/account-settings', text: 'Account settings', icon: faGear }
];
