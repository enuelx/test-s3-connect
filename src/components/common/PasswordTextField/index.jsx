import { useState } from 'react';
import { TextField, Tooltip, IconButton, InputAdornment } from '@mui/material';
import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';

import config from '@config';

export const PasswordTextField = ({
  password,
  setPassword,
  label = 'password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        variant="standard"
        required
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
                {showPassword ? <HideIcon /> : <ShowIcon />}
              </IconButton>
              <Tooltip
                sx={{ textTransform: 'none' }}
                arrow
                placement="right"
                describeChild
                title={
                  <span>
                    Password must: <br />- Be at least 8 characters long <br />-
                    Contain a number <br />- Contain a lowercase letter <br />-
                    Contain an uppercase letter <br />- Contain a special symbol
                  </span>
                }
              >
                <InfoIcon />
              </Tooltip>
            </InputAdornment>
          )
        }}
      />
    </>
  );
};
