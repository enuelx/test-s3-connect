import { TextField, Tooltip } from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';

export const UsernameTextField = ({ username, setUsername }) => {
  return (
    <>
      <TextField
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
        arrow
        placement="right"
        describeChild
        title="Username must be at least 4 characters long"
      >
        <InfoIcon />
      </Tooltip>
    </>
  );
};
