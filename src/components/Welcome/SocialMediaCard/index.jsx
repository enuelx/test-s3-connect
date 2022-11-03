import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import DiscordConnect from './DiscordConnect';
import TwitterConnect from './TwitterConnect';
import './style.css';

const SocialMediaCard = ({ userContext }) => {
  return (
    <div className="divSocialMedia" style={{ width: '380px' }}>
      <Box
        className='boxSocialMedia'
      >
        <FontAwesomeIcon color="#fff" icon={faUserGroup} size="3x" />
      </Box>
      <DiscordConnect userContext={userContext} />
      <TwitterConnect userContext={userContext} />
    </div>
  );
};

export default SocialMediaCard;
