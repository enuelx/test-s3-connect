import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ToastContext, UserContext } from '@context';
import { toastMessages } from '@utils';
import { Loader } from '@components';
import { twitterUserApi } from '@services';

export const AssociateTwitterPage = () => {
  const userContext = useContext(UserContext);
  const toastContext = useContext(ToastContext);

  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const oauthToken = searchParams.get('oauth_token');
        const oauthVerifier = searchParams.get('oauth_verifier');
        if (!oauthToken || !oauthVerifier || !userContext.token) {
          toastContext.errorMessage(toastMessages.error.TWITTER_LINK_INVALID);
          navigate('/');
        } else {
          await twitterUserApi.associateUser({
            oauthToken,
            oauthVerifier,
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
