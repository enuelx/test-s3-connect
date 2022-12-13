import config from '@config';
import Reaptcha from 'reaptcha';

export const ReCaptcha = ({ setCaptchaValue, captchaRef }) => {
  const onVerify = recaptchaResponse => {
    setCaptchaValue(recaptchaResponse);
  };

  return (
    <Reaptcha
      ref={captchaRef}
      onVerify={onVerify}
      sitekey={config.captchaKey}
      theme="dark"
    />
  );
};
