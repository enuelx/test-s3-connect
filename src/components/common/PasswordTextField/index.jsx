import { useState } from 'react';
import {
  TextField,
  Tooltip,
  IconButton,
  InputAdornment,
  Box
} from '@mui/material';
import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';

import config from '@config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
export const PasswordTextField = ({
  margin,
  password,
  setPassword,
  label = 'password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: margin }}>
        {/*<KeyIcon sx={{ color: "white", mr: 1, my: 0.5 }} />*/}
        <FontAwesomeIcon
          style={{ marginRight: '1vw', marginBottom: '1vh' }}
          color="#fff"
          icon={faKey}
          size="lg"
        />
        <TextField
          InputLabelProps={{
            style: { color: 'antiquewhite' }
          }}
          variant="standard"
          sx={{ width: '507px', borderColor: 'white', borderBottom: 'ridge' }}
          label={label}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={showPassword ? 'text' : 'password'}
          error={password !== '' && !config.passwordRegex.test(password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <HideIcon sx={{ color: 'white' }} />
                  ) : (
                    <ShowIcon sx={{ color: 'white' }} />
                  )}
                </IconButton>
                <Tooltip
                  sx={{ textTransform: 'none', color: 'white' }}
                  arrow
                  placement="right"
                  describeChild
                  title={
                    <span>
                      Password must: <br />- Be at least 8 characters long{' '}
                      <br />- Contain a number <br />- Contain a lowercase
                      letter <br />- Contain an uppercase letter <br />- Contain
                      a special symbol
                    </span>
                  }
                >
                  <InfoIcon />
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </>
  );
};
