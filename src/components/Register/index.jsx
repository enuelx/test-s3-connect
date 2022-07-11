import { useState, useContext } from 'react';

import { accountApi } from '@services';
import { AccountForm } from '@components';

export default () => {
  return (
    <>
      <AccountForm
        formActionName="Register"
        submitCallback={accountApi.signUp}
      />
    </>
  );
};
