import { ThemeProvider } from '@emotion/react';
import { Button, Tooltip } from '@mui/material';

import { whiteButton } from '@themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotate,
  faWallet,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
export default ({
  text,
  color = 'primary',
  disabled = false,
  variant = 'contained',
  onClick,
  size = 'large',
  sx,
  tooltip,
  tooltipPlacement = 'bottom',
  login
}) => {
  if (tooltip) {
    return (
      <ThemeProvider theme={whiteButton}>
        <Tooltip title={tooltip} placement={tooltipPlacement}>
          <Button
            disabled={disabled}
            variant={variant}
            onClick={onClick}
            size={size}
            sx={{
              width: '200px',

              marginTop: '10px',
              background: 'transparent',
              bgcolor: 'transparent', // theme.palette.primary.main
              color: 'white',
              border: 'solid 1px',
              alignSelf: 'baseline',
              ':hover': {
                bgcolor: 'transparent' // theme.palette.primary.main
              },
              marginRight: '20px',
              marginBottom: '0px'
            }}
          >
            {text}
          </Button>
        </Tooltip>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={whiteButton}>
      <Button
        disabled={disabled}
        variant={variant}
        onClick={onClick}
        size={size}
        sx={{
          width: text == 'reload' || text == 'logout' ? '50px' : '250px',
          marginTop: '10px',
          background: 'transparent',
          border: 'solid 1px',
          alignSelf: 'baseline',
          color: login ? '#787878' : '#fff',
          marginRight: '20px',
          marginBottom: '0px'
        }}
      >
        {text == 'reload' ? (
          <>
            <FontAwesomeIcon style={{ fontSize: '26px' }} icon={faRotate} />
          </>
        ) : text == 'logout' ? (
          <>
            <FontAwesomeIcon
              style={{ fontSize: '26px' }}
              icon={faArrowRightFromBracket}
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              size="lg"
              style={{ marginRight: '10px' }}
              icon={faWallet}
            />
            {text}
          </>
        )}
      </Button>
    </ThemeProvider>
  );
};
