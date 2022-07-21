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
  },

  async getManualValidationInfo(token) {
    const result = await axiosInstance.get(`${apiUrl}/manual/info`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return result.data.manualValidation;
  },

  async startManualValidation(verifiedWallet, toVerifyWallet, token) {
    const result = await axiosInstance.post(
      `${apiUrl}/manual/start`,
      {
        verifiedWallet,
        toVerifyWallet
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data.manualValidation;
  },

  async cancelManualValidation(token) {
    const result = await axiosInstance.post(
      `${apiUrl}/manual/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data.manualValidation;
  }
};
