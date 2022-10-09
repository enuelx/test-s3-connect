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
  label = 'password',
  isMobile
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: margin }}>
        <FontAwesomeIcon
          style={{ marginRight: '1vw', marginBottom: '1vh' }}
          color="antiquewhite"
          icon={faKey}
          size={isMobile ? '' : 'lg'}
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
                    <HideIcon
                      sx={{
                        color: 'antiquewhite',
                        height: isMobile ? '0.9em' : '1em'
                      }}
                    />
                  ) : (
                    <ShowIcon
                      sx={{
                        color: 'antiquewhite',
                        height: isMobile ? '0.9em' : '1em'
                      }}
                    />
                  )}
                </IconButton>
                <Tooltip
                  sx={{
                    textTransform: 'none',
                    color: 'antiquewhite',
                    height: isMobile ? '0.9em' : '1em'
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
                      height: isMobile ? '0.9em' : '1em'
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
