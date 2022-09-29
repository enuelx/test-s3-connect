import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faGear,
  faImage,
  faWallet
} from '@fortawesome/free-solid-svg-icons';

import '../style/style.css';

const paths = [
  { url: '/', text: 'Sync', icon: faCloud },
  { url: '/gallery', text: 'Gallery', icon: faImage },
  { url: '/manual-verify', text: 'Add wallet manually', icon: faWallet },
  { url: '/account-settings', text: 'Account settings', icon: faGear }
];

const OpenItems = () => {
  const urlPath = window.location.pathname;
  const iconIndex = paths.map((e) => e.url).indexOf(urlPath);

  const [select, setSelect] = useState(iconIndex);

  return (
    <>
      {paths.map((path, index) => (
        <Link
          to={{
            pathname: path.url
          }}
          className="itemLink"
          style={{
            color: select === index && '#FFF'
          }}
          onClick={() => {
            setSelect(1);
          }}
        >
          <div
            className="openItemIcon"
            style={{
              backgroundColor: select === index && '#464646'
            }}
          >
            <FontAwesomeIcon
              style={{ marginLeft: '25px' }}
              size="lg"
              icon={path.icon}
            />
            <Typography style={{ width: '75%' }}>{path.text}</Typography>
          </div>
        </Link>
      ))}
    </>
  );
};
export default OpenItems;
