import { Box, Button, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { twitterUserApi } from '@services';
import { grayButton } from '@themes';

export default ({ userContext }) => {
  return (
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
        onClick={async () => {
          if (userContext.token) {
            const url = await twitterUserApi.getLinkLogin(userContext.token);
            window.open(url, '_blank');
          }
        }}
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
  );
};
