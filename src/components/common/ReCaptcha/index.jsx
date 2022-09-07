import config from '@config';
import ReCAPTCHA from 'react-google-recaptcha';

export const ReCaptcha = ({ captchaRef }) => {
  return <ReCAPTCHA ref={captchaRef} sitekey={config.captchaKey} />;
};
