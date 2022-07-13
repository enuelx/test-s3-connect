import { useState, useContext } from 'react';
import { Dialog, Box, TextField, Button, Typography } from '@mui/material';

import { UserContext, ToastContext } from '@context';
import { discordUserApi } from '@services';

export default () => {
  const [open, setOpen] = useState(false);
  const [associateCode, setAssociateCode] = useState('');

  const [userContext, setUserContext] = useContext(UserContext);
  const [toastContext, setToastContext] = useContext(ToastContext);

  const handleOpen = async () => {
    try {
      const result = await discordUserApi.getDiscordUserAssociateCode(
        userContext.token
      );

      setAssociateCode(result.associationCode);
      setOpen(true);
    } catch (err) {
      const message = err.response.data?.error || 'Something went wrong';
      setToastContext((oldValues) => {
        return { ...oldValues, message, severity: 'error' };
      });
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Associate Discord
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box>
          {/* TODO fix text */}
          <Typography>
            Here is your association code, go to the channel xxx in our discord
            server and interact with the bot, where you will be prompted to
            insert this code.
          </Typography>
          <TextField
            sx={{ margin: 'auto' }}
            InputProps={{ readOnly: true }}
            defaultValue={associateCode}
          />
        </Box>
      </Dialog>
    </>
  );
};
