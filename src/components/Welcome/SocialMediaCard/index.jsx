import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';

import DiscordCodeModal from './DiscordCodeModal';
import TwitterConnect from './TwitterConnect';

const Section = ({ title, displayData, interactButton, icon }) => {
  return (
    <Box style={{ marginBottom: '3vh' }}>
      <Box style={{ display: 'flex' }}>
        <FontAwesomeIcon color="#fff" icon={icon} size="lg" />
        <Typography
          style={{ marginLeft: '0.7vw', fontSize: '18px', color: '#787878' }}
        >
          Connect {title}
        </Typography>
      </Box>
      <Box
        style={{
          marginTop: '1vh'
        }}
      >
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          {title} user: {displayData ?? ' ---------- '}
        </Typography>
      </Box>
      {interactButton()}
    </Box>
  );
};

const SocialMediaCard = ({ userContext }) => {
  const socialMedias = [
    {
      title: 'Discord',
      displayData: userContext.user?.discordUser?.discordTag,
      interactButton: () => {
        if (!userContext.user.discordUser?.discordTag) {
          return (
            <div style={{ marginTop: '1vh' }}>
              <DiscordCodeModal />
            </div>
          );
        }
      },
      icon: faDiscord
    },
    {
      title: 'Twitter',
      displayData: userContext.user?.twitterUser?.username,
      interactButton: () => {
        if (!userContext.user.twitterUser?.username) {
          return (
            <div style={{ marginTop: '1vh' }}>
              <TwitterConnect userContext={userContext} />
            </div>
          );
        }
      },
      icon: faTwitter
    }
  ];

  return (
    <div style={{ width: '380px' }}>
      <Box
        style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#3E3E3E',
          borderRadius: '5px',
          marginBottom: '4vh'
        }}
      >
        <FontAwesomeIcon color="#fff" icon={faUserGroup} size="3x" />
      </Box>
      {socialMedias.map((socialMedia) => (
        <Section key={socialMedia.title} {...socialMedia} />
      ))}
    </div>
  );
};

export default SocialMediaCard;
