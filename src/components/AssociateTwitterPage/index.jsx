import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { UserContext, ToastContext } from '@context';
import { toastMessages } from '@utils';
import { Loader } from '@components';
import { twitterUserApi } from '@services';

export const AssociateTwitterPage = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const oauth_token = searchParams.get('oauth_token');
        const oauth_verifier = searchParams.get('oauth_verifier');
        if (!oauth_token || !oauth_verifier || !userContext.token) {
          toastContext.errorMessage(toastMessages.error.TWITTER_LINK_INVALID);
          navigate('/');
        } else {
          await twitterUserApi.associateUser({
            oauth_token,
            oauth_verifier,
            token: userContext.token
          });

          navigate('/');

          toastContext.successMessage(
            toastMessages.success.TWITTER_LINK_SUCCESS
          );
        }
      } catch (err) {
        toastContext.errorMessage();
        navigate('/');
      }
    })();
  }, [userContext.token]);

  return <Loader />;
};
