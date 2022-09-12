import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import CodeModal from '../CodeModal';
const DiscordCard = ({ userContext, toastContext }) => {
  return (
    <div style={{ width: '400px' }}>
      <Box
        style={{
          width: '100%',
          height: '40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#3E3E3E',
          borderRadius: '5px'
        }}
      >
        <FontAwesomeIcon color="#787878" icon={faDiscord} size="4x" />
      </Box>
      <Box style={{ textAlign: 'left', marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Connect Discord
        </Typography>
      </Box>
      <Box style={{ textAlign: 'left', marginTop: '4vh' }}>
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Generate sync code
        </Typography>
      </Box>
      <Box
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'left',
          marginTop: '4vh'
        }}
      >
        <FontAwesomeIcon color="#787878" icon={faUser} size="lg" />
        <Typography
          style={{ marginLeft: '1vw', fontSize: '18px', color: '#787878' }}
        >
          DiscordUser:{' '}
          {userContext.user.discordUser?.discordTag ?? ' ---------- '}
        </Typography>
      </Box>
      <div style={{ textAlign: 'center', marginTop: '4vh' }}>
        {userContext.user.discordUser?.discordTag ? '' : <CodeModal />}
      </div>
    </div>
  );
};
export default DiscordCard;
