import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faGear, faCloud } from '@fortawesome/free-solid-svg-icons';
const OpenItems = () => {
  let c = 1;
  let urlPath = window.location.pathname;

  if (urlPath === '/manual-verify') {
    c = 2;
  }
  if (urlPath === '/account-settings') {
    c = 3;
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
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            height: '6vh',
            marginTop: '0.5vh',
            marginBottom: '0.5vh',
            backgroundColor: select === 1 ? '#464646' : ''
          }}
        >
          <FontAwesomeIcon
            style={{ marginLeft: '25px' }}
            size="lg"
            icon={faCloud}
          />
          <Typography style={{ width: '75%' }}>Sync</Typography>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            height: '6vh',
            marginTop: '0.5vh',
            marginBottom: '0.5vh',
            backgroundColor: select === 2 ? '#464646' : ''
          }}
        >
          <FontAwesomeIcon
            style={{ marginLeft: '25px', fontZise: '50px' }}
            icon={faWallet}
            size="lg"
          />
          <Typography style={{ width: '75%' }}>Add wallet manually</Typography>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            height: '6vh',
            marginTop: '0.5vh',
            marginBottom: '0.5vh',
            backgroundColor: select === 3 ? '#464646' : ''
          }}
        >
          <FontAwesomeIcon
            style={{ marginLeft: '25px' }}
            size="lg"
            icon={faGear}
          />
          <Typography style={{ width: '75%' }}>Account settings</Typography>
        </div>
      </Link>
    </>
  );
};
export default OpenItems;
