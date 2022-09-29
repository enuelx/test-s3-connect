import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faGear, faCloud } from '@fortawesome/free-solid-svg-icons';
const CloseItems = () => {
  let c = 1;
  let urlPath = window.location.pathname;

  switch (urlPath) {
    case '/manual-verify':
      c = 2;
      break;
    case '/account-settings':
      c = 3;
      break;
    case '/gallery':
      c = 4;
      break;
    default:
      c = 1;
      break;
  }

  const [select, setSelect] = useState(c);

  return (
    <>
      <Link
        to={{
          pathname: '/'
        }}
        style={{
          marginTop: '1vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          textDecoration: 'none',
          color: select === 1 ? '#FFF' : '#787878'
        }}
        onClick={() => {
          setSelect(1);
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '6vh',
            marginTop: '0.5vh',
            marginBottom: '0.5vh',
            backgroundColor: select === 1 ? '#464646' : ''
          }}
        >
          <FontAwesomeIcon size="lg" icon={faCloud} />
        </div>
      </Link>
      <Link
        to={{
          pathname: '/manual-verify'
        }}
        style={{
          marginTop: '1vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          textDecoration: 'none',
          color: select === 2 ? '#FFF' : '#787878'
        }}
        onClick={() => {
          setSelect(2);
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '6vh',
            marginTop: '0.5vh',
            marginBottom: '0.5vh',
            backgroundColor: select === 2 ? '#464646' : ''
          }}
        >
          <FontAwesomeIcon icon={faWallet} size="lg" />
        </div>
      </Link>
      <Link
        to={{
          pathname: '/account-settings'
        }}
        style={{
          marginTop: '1vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          textDecoration: 'none',
          color: select === 3 ? '#FFF' : '#787878'
        }}
        onClick={() => {
          setSelect(3);
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '6vh',
            marginTop: '0.5vh',
            marginBottom: '0.5vh',
            backgroundColor: select === 3 ? '#464646' : ''
          }}
        >
          <FontAwesomeIcon
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            size="lg"
            icon={faGear}
          />
        </div>
      </Link>
    </>
  );
};
export default CloseItems;
