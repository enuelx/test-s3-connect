import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import { twitterUserApi } from '@services';
import { grayButton } from '@themes';

const TwitterConnect = ({ userContext }) => {
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    setCheckAuth(userContext.user?.twitterUser?.shareAuth);
  }, [userContext.user]);

  const handleConnectTwitter = async () => {
    if (userContext.token) {
      const url = await twitterUserApi.getLinkLogin(userContext.token);
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      window.open(url, '_blank');
      userContext.setUser(undefined); // To force reload user data
    }
  };

  const handleTwitterAcceptChange = async event => {
    try {
      await twitterUserApi.updateShareAuth({
        token: userContext.token,
        shareAuth: event.target.checked
      });
      setCheckAuth(event.target.checked);
      userContext.setUser(undefined); // To force reload user data
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box style={{ marginBottom: '3vh' }}>
      <Box style={{ display: 'flex' }}>
        <FontAwesomeIcon color="#fff" icon={faTwitter} size="lg" />
        <Typography
          style={{ marginLeft: '0.7vw', fontSize: '18px', color: '#787878' }}
        >
          Connect Twitter
        </Typography>
      </Box>
      <Box
        style={{
          marginTop: '1vh'
        }}
      >
        <Typography style={{ fontSize: '18px', color: '#787878' }}>
          Twitter user:{' '}
          {userContext.user?.twitterUser?.username ?? ' ---------- '}
        </Typography>
        {userContext.user?.twitterUser?.username && (
          <div style={{ display: 'flex' }}>
            <Checkbox
              checked={checkAuth}
              size="small"
              sx={{
                color: '#787878',
                '&.Mui-checked': { color: '#787878' }
              }}
              onChange={event => handleTwitterAcceptChange(event)}
            />
            <Typography
              style={{
                paddingTop: '0.9vh',
                fontSize: '13px',
                color: '#787878'
              }}
            >
              I authorize Collider Craftworks to share a link to my Twitter
              profile on their website.
            </Typography>
          </div>
        )}
      </Box>
      {!userContext.user.twitterUser?.username && (
        <div style={{ marginTop: '1vh' }}>
          <ThemeProvider theme={grayButton}>
            <Button
              sx={{
                background: 'transparent',
                border: 'solid 1px',
                alignSelf: 'baseline',
                textTransform: 'none',
                color: '#787878',
                ':hover': {
                  bgcolor: '#3E3E3E'
                },
                borderRadius: '0px 10px 0px 10px'
              }}
              variant="contained"
              onClick={handleConnectTwitter}
            >
              <FontAwesomeIcon icon={faCirclePlus} size="lg" />
              <Typography
                style={{
                  fontSize: '18px',
                  marginLeft: '0.7vw'
                }}
              >
                Connect Twitter account
              </Typography>
            </Button>
          </ThemeProvider>
        </div>
      )}
    </Box>
  );
};

export default TwitterConnect;
