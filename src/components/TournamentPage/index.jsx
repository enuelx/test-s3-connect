import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  ThemeProvider,
  Typography
} from '@mui/material';
import { faTrash, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';
import { grayButton } from '@themes';
import { UserContext, ToastContext } from '@context';
import { challengersApi } from '@services';

export const TournamentPage = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [challengerUsername, setChallengerUsername] = useState('');

  const submitAddChallenger = async () => {
    try {
      await challengersApi.add({
        username: challengerUsername,
        token: userContext.token
      });
      toastContext.successMessage('Challenger added');
      userContext.setUser(undefined); // To force reload
    } catch (err) {
      const message = err.response?.data?.error || 'Error adding challenger';
      toastContext.errorMessage(message);
    }
  };

  const removeChallenger = async (username) => {
    try {
      await challengersApi.remove({
        username,
        token: userContext.token
      });
      toastContext.successMessage('Challenger removed');
      userContext.setUser(undefined); // To force reload
    } catch (err) {
      const message = err.response?.data?.error || 'Error removing challenger';
      toastContext.errorMessage(message);
    }
  };

  return (
    <Container className="containerTournament">
      <Grid className="gridTournament">
        <div>
          <Typography variant="h4">
            The Moshpit Tournament Challengers
          </Typography>

          <Typography sx={{ marginTop: '3vh' }}>
            Each Cypher you hodl gives you a tournament entry, meaning you can
            pick a challenger for each one.
          </Typography>
          <Typography sx={{ marginTop: '1vh' }}>
            To add a challenger ask him for their username and add it below.
            They must have an associated discord account and not hold cyphers of
            their own.
          </Typography>
          <Typography sx={{ marginTop: '2vh' }}>
            Note: Remember to leave an empty spot if you want to participate
            yourself.
          </Typography>
          {userContext.user?.challengers?.length > 0 && (
            <Box
              style={{
                marginTop: '4vh',
                width: '100%',
                height: '100px',
                overflowY: 'auto',
                direction: 'rtl'
              }}
            >
              <ul
                style={{
                  direction: 'ltr'
                }}
              >
                {userContext.user?.challengers?.map((challenger) => (
                  <li
                    key={challenger.username}
                    style={{
                      marginBottom: '1vh'
                    }}
                  >
                    {challenger.username}{' '}
                    <FontAwesomeIcon
                      className="clickable"
                      onClick={() => removeChallenger(challenger.username)}
                      icon={faTrash}
                      style={{
                        marginLeft: '1vh'
                      }}
                    />
                  </li>
                ))}
              </ul>
            </Box>
          )}
          <Typography
            style={{
              marginTop: '3vh',
              color: '#fff',
              fontWeight: '600',
              fontSize: '1.1em'
            }}
          >
            New Challenger
          </Typography>
          <Box
            style={{
              textAlign: 'center',
              marginTop: '2vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              width: '80%',
              height: '7vh'
            }}
          >
            <FormControl fullWidth style={{ height: '100%' }}>
              <InputLabel style={{ color: 'rgb(120, 120, 120)' }}>
                Username
              </InputLabel>
              <OutlinedInput
                sx={{
                  height: '100%',
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white '
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white '
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white '
                  },
                  '.MuiSvgIcon-root ': {
                    fill: 'white !important'
                  }
                }}
                value={challengerUsername}
                onChange={(e) => setChallengerUsername(e.target.value)}
                label="Challenger username"
                inputProps={{ style: { color: 'rgb(120, 120, 120)' } }}
              />
            </FormControl>
          </Box>
          <Box
            style={{
              textAlign: 'center',
              marginTop: '4vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left'
            }}
          >
            <ThemeProvider theme={grayButton}>
              <Button
                sx={{
                  border: 'solid 1px',
                  color: '#787878',
                  borderRadius: '0px 10px 0px 10px',
                  height: '100%',
                  ':hover': {
                    bgcolor: '#3E3E3E'
                  }
                }}
                disabled={
                  userContext.user?.challengers?.length >=
                  userContext.user?.cyphersHoldingAmount
                }
                onClick={submitAddChallenger}
              >
                <FontAwesomeIcon icon={faCirclePlus} size="lg" />
                <Typography
                  sx={{
                    marginLeft: '0.6vw'
                  }}
                >
                  Pick challenger
                </Typography>
              </Button>
            </ThemeProvider>
          </Box>
        </div>
      </Grid>
    </Container>
  );
};
