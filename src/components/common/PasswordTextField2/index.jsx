import { useState } from 'react';
import { TextField, Tooltip, IconButton, InputAdornment } from '@mui/material';
import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';

import config from '@config';

export const PasswordTextField2 = ({
  password,
  setPassword,
  label = 'password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        sx={{ width: '88%' }}
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
                {showPassword ? (
                  <HideIcon style={{ color: '#787878' }} />
                ) : (
                  <ShowIcon style={{ color: '#787878' }} />
                )}
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
                <InfoIcon style={{ color: '#787878' }} />
              </Tooltip>
            </InputAdornment>
          ),
          disableUnderline: true,
          style: { fontSize: '18px', color: '#787878' }
        }}
        InputLabelProps={{ style: { fontSize: '18px', color: '#787878' } }}
      />
    </>
  );
};
