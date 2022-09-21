import { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Loader } from '@components';
import { ToastContext } from '@context';
import { emailApi } from '@services';
import { toastMessages } from '@utils';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    (async () => {
      try {
        const verifyToken = searchParams.get('token');
        await emailApi.verify(verifyToken);
        toastContext.successMessage(toastMessages.success.EMAIL_VERIFIED);
      } catch (err) {
        const message = err.response.data?.error;
        toastContext.errorMessage(message);
      }
      navigate('/');
    })();
  }, []);

  return <Loader />;
};
