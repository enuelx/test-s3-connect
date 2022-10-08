import config from '@config';
import Reaptcha from 'reaptcha';

export const ReCaptcha = ({ setCaptchaValue }) => {
  const onVerify = (recaptchaResponse) => {
    setCaptchaValue(recaptchaResponse);
  };

  return (
    <Reaptcha
      className="txtCapchat"
      onVerify={onVerify}
      sitekey={config.captchaKey}
    />
  );
};
