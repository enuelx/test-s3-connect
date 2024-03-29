import { useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material';
import {
  VisibilityOffOutlined as HideIcon,
  InfoOutlined as InfoIcon,
  VisibilityOutlined as ShowIcon
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
        <FontAwesomeIcon
          style={{ marginRight: '1vw', marginBottom: '1vh' }}
          color="antiquewhite"
          icon={faKey}
          size={'lg'}
        />
        <TextField
          InputLabelProps={{
            style: { color: 'antiquewhite' }
          }}
          variant="standard"
          sx={{
            width: '507px',
            borderColor: 'white',
            borderBottom: 'ridge',
            input: { color: 'antiquewhite' }
          }}
          label={label}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          type={showPassword ? 'text' : 'password'}
          error={password !== '' && !config.passwordRegex.test(password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <HideIcon
                      sx={{
                        color: 'antiquewhite',
                        height: '1em'
                      }}
                    />
                  ) : (
                    <ShowIcon
                      sx={{
                        color: 'antiquewhite',
                        height: '1em'
                      }}
                    />
                  )}
                </IconButton>
                <Tooltip
                  sx={{
                    textTransform: 'none',
                    color: 'antiquewhite',
                    height: '1em'
                  }}
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
                  <InfoIcon
                    sx={{
                      color: 'antiquewhite',
                      height: '1em'
                    }}
                  />
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </>
  );
};
