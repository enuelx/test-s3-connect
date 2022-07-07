import { ThemeProvider } from '@emotion/react';
import { Button, Tooltip } from '@mui/material';

import { pinkButton } from '@themes';

export default ({
  text,
  color = 'primary',
  disabled = false,
  variant = 'contained',
  onClick,
  size = 'large',
  sx,
  tooltip,
  tooltipPlacement = 'bottom'
}) => {
  if (tooltip) {
    return (
      <ThemeProvider theme={pinkButton}>
        <Tooltip title={tooltip} placement={tooltipPlacement}>
          <Button
            color={color}
            disabled={disabled}
            variant={variant}
            onClick={onClick}
            size={size}
            sx={sx}
          >
            {text}
          </Button>
        </Tooltip>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={pinkButton}>
      <Button
        color={color}
        disabled={disabled}
        variant={variant}
        onClick={onClick}
        size={size}
        sx={sx}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};
