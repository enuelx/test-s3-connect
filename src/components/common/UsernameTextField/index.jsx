import { Box, TextField, Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
export const UsernameTextField = ({ username, setUsername }) => {
  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '30px' }}
      >
        <FontAwesomeIcon
          style={{ marginRight: '1vw', marginBottom: '1vh' }}
          color="#fff"
          icon={faUserAstronaut}
          size="lg"
        />

        <TextField
          InputLabelProps={{
            style: { color: 'antiquewhite' }
          }}
          sx={{ width: '483px', borderColor: 'white', borderBottom: 'ridge' }}
          required
          label="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          variant="standard"
          error={username !== '' && username.length < 4}
        />
        <Tooltip
          sx={{ color: 'white' }}
          arrow
          placement="right"
          describeChild
          title="Username must be at least 4 characters long"
        >
          <InfoIcon />
        </Tooltip>
      </Box>
    </>
  );
};
