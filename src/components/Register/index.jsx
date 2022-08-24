import { Box } from '@mui/material';

import { accountApi } from '@services';
import { AccountForm } from '@components';

export default () => {
  return (
    <Box sx={{ width: '25vw' }}>
      <AccountForm
        formActionName="Register"
        submitCallback={accountApi.signUp}
        validateRepeatPassword
        useCaptcha
      />
    </Box>
  );
};
