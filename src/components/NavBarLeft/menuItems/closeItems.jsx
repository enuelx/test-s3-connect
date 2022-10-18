import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../style/style.css';

const CloseItems = ({ paths }) => {
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
