export default {
  accountsApiUrl: import.meta.env.VITE_ACCOUNTS_API_URL,
  passwordRegex:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
};
