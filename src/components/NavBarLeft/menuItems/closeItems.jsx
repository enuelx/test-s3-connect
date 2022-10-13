import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faGear,
  faTrophy,
  faWallet
} from '@fortawesome/free-solid-svg-icons';

import '../style/style.css';

const paths = [
  { url: '/', icon: faCloud },
  { url: '/challengers', icon: faTrophy },
  { url: '/manual-verify', icon: faWallet },
  { url: '/account-settings', icon: faGear }
];

const CloseItems = () => {
  const urlPath = window.location.pathname;

  const iconIndex = paths.map((e) => e.url).indexOf(urlPath);

  const [select, setSelect] = useState(iconIndex);

  return (
    <>
      {paths.map((path, index) => (
        <Link
          key={index}
          to={{
            pathname: path.url
          }}
          className="itemLink"
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
