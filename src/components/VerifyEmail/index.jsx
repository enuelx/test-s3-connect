import { useEffect, useContext } from 'react';
import { useSearchParams , useNavigate } from 'react-router-dom';

import { Loader } from '@components';
import { ToastContext } from '@context';
import { emailApi } from '@services';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    (async () => {
      try {
        const verifyToken = searchParams.get('token');
        await emailApi.verify(verifyToken);
        toastContext.successMessage('Email verified');
      } catch (err) {
        const message = err.response.data?.error || 'Something went wrong';
        toastContext.errorMessage(message);
      }
      navigate('/');
    })();
  }, []);

  return <Loader />;
};
