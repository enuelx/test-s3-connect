import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faGear,
  faCloud,
  faImage
} from '@fortawesome/free-solid-svg-icons';

import '../style/style.css';

const paths = [
  { url: '/', icon: faCloud },
  { url: '/gallery', icon: faImage },
  { url: '/manual-verify', icon: faWallet },
  { url: '/account-settings', icon: faGear }
];

const CloseItems = () => {
  let urlPath = window.location.pathname;

  const c = paths.map((e) => e.url).indexOf(urlPath);

  const [select, setSelect] = useState(c);

  return (
    <>
      {paths.map((path, index) => (
        <Link
          to={{
            pathname: path.url
          }}
          className="closeItemLink"
          style={{
            color: select === index && '#FFF'
          }}
          onClick={() => {
            setSelect(index);
          }}
        >
          <div
            className="closeItemIcon"
            style={{
              backgroundColor: select === index && '#464646'
            }}
          >
            <FontAwesomeIcon size="lg" icon={path.icon} />
          </div>
        </Link>
      ))}
    </>
  );
};
export default CloseItems;
