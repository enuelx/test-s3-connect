import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import DiscordCodeModal from './DiscordCodeModal';

const DiscordConnect = ({ userContext }) => {
  return (
    <Box style={{ marginBottom: '3vh' }}>
      <Box style={{ display: 'flex' }}>
        <FontAwesomeIcon color="#fff" icon={faDiscord} size="lg" />
        <Typography
          style={{ marginLeft: '0.7vw', fontSize: '18px', color: '#787878' }}
        >
          Connect Discord
        </Typography>
      </Box>
      <Box
        style={{
          marginTop: '1vh'
        }}
      >
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Discord user:{' '}
          {userContext.user?.discordUser?.discordTag ?? ' ---------- '}
        </Typography>
      </Box>
      {!userContext.user.discordUser?.discordTag && (
        <div style={{ marginTop: '1vh' }}>
          <DiscordCodeModal />
        </div>
      )}
    </Box>
  );
};

export default DiscordConnect;
