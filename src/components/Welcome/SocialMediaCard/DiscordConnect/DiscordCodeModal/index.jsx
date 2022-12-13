import { useContext, useState } from 'react';
import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from '@emotion/react';

import { ToastContext, UserContext } from '@context';
import { discordUserApi } from '@services';
import { grayButton } from '@themes';

const DiscordCodeModal = () => {
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
      const message = err.response.data?.error;
      toastContext.errorMessage(message);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box>
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
            onClick={handleOpen}
          >
            <FontAwesomeIcon icon={faCirclePlus} size="lg" />
            <Typography
              style={{
                fontSize: '18px',
                marginLeft: '0.7vw'
              }}
            >
              Connect Discord account
            </Typography>
          </Button>
        </ThemeProvider>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 'fit-content',
            height: 'fit-content',
            paddingBottom: '2vh',
            backgroundColor: '#3E3E3E'
          }
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
          <Typography style={{ marginTop: '5vh', color: '#787878' }}>
            Here is your association code, go to the channel{' '}
            <a
              href="https://discord.com/channels/920306036517253171/961604478056939591"
              target="_blank"
              style={{ color: '#fff' }}
              rel="noreferrer"
            >
              #account-system
            </a>{' '}
            in our discord server and interact with the bot, where you will be
            prompted to insert this code.
          </Typography>
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

export default DiscordCodeModal;
