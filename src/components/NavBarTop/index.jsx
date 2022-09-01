import { useContext } from 'react';
import { Box } from '@mui/system';

import { WalletData, PinkButton } from '@components';
import { UserContext } from '@context';

export default () => {
  const userContext = useContext(UserContext);

  const reloadUserDetailsHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // getUserDetails will be invoked from useEffect
    userContext.setUser(undefined);
  };

  return (
    <>
      <Box sx={{ float: 'right', marginRight: '20px', display: 'flex' }}>
        {userContext.token && (
          <PinkButton
            text="reload"
            onClick={reloadUserDetailsHandler}
            sx={{ marginLeft: '2px' }}
          />
        )}

        <Box sx={{ flexGrow: 0, zIndex: '999999' }}>
          <WalletData />
        </Box>
      </Box>
    </>
  );
};
