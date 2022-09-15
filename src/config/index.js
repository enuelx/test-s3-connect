export default {
  apiUrl: import.meta.env.VITE_API_URL,
  passwordRegex:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_=.]).{8,}$/,
  captchaKey: import.meta.env.VITE_CAPTCHA_SITE_KEY
};
