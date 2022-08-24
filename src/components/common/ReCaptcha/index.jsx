const captchaRef = useRef(null);

export default () => {
  const captchaValue = captchaRef.current.getValue();
  return <ReCAPTCHA ref={captchaRef} sitekey={config.captchaKey} />;
};
