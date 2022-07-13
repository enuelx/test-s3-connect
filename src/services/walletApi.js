import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  withCredentials: true
});

const apiUrl = `${config.apiUrl}/api/wallet`;

export default {
  async login(signature, message, account) {
    const result = await axiosInstance.post(`${apiUrl}/login`, {
      message,
        wallet: account,
        signature
    });

    return result.data;
  },

  async associate(token, signature, message, account) {
    const result = await axiosInstance.post(
      `${apiUrl}/associate`,
      {
        message,
        wallet: account,
        signature
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data.account;
  }
};
