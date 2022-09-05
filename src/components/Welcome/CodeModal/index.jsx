import { useState, useContext } from 'react';
import { Dialog, Box, Typography, Divider, Button } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import { discordUserApi } from '@services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from '@emotion/react';
import { grayButton } from '@themes';
export default () => {
  const [open, setOpen] = useState(false);
  const [associateCode, setAssociateCode] = useState('');

  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const handleOpen = async () => {
    try {
      const result = await discordUserApi.getDiscordUserAssociateCode(
        userContext.token
      );

      setAssociateCode(result.associationCode);
      setOpen(true);
    } catch (err) {
      const message = err.response.data?.error || 'Something went wrong';
      toastContext.errorMessage(message);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        style={{
          textAlign: 'center',
          marginTop: '2vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
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
              }
            }}
            onClick={handleOpen}
          >
            <FontAwesomeIcon icon={faEye} size="lg" />
            <Typography
              style={{
                fontSize: '18px',
                marginLeft: '1vw'
              }}
            >
              Connect discord account
            </Typography>
          </Button>
        </ThemeProvider>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: '60%', height: '30%', backgroundColor: '#3E3E3E' }
        }}
      >
        <Box style={{ textAlign: 'center' }}>
          <Typography style={{ marginTop: '2vh', color: '#fff' }} variant="h5">
            Sync Discord
          </Typography>
          <Divider
            variant="middle"
            light={true}
            style={{
              backgroundColor: '#fff',
              border: '1px solid rgba(0,0,0,.1)'
            }}
          />
          {/* TODO fix text */}
          <Typography style={{ marginTop: '5vh', color: '#787878' }}>
            Here is your association code, go to the channel xxx in our discord
            server and interact with the bot, where you will be prompted to
            insert this code.
          </Typography>
          {/*<TextField
            sx={{ margin: "auto", color: "#787878" }}
            InputProps={{ readOnly: true }}
            defaultValue={associateCode}
          />*/}
          <Box
            style={{
              border: '1px solid #fff',
              marginTop: '4vh',
              minHeight: '35px',
              width: '200px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <Typography
              style={{ color: '#787878', lineHeight: '35px', fontSize: '18px' }}
            >
              {associateCode}
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
