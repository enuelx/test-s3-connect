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

  async removeWallet(token, wallet) {
    const result = await axiosInstance.post(
      `${apiUrl}/remove`,
      {
        wallet
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  },

  async changePassword(token, signature, message, wallet, newPassword) {
    const result = await axiosInstance.post(
      `${apiUrl}/changepassword`,
      {
        message,
        wallet,
        signature,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  },

  async setMain(token, wallet) {
    const result = await axiosInstance.post(
      `${apiUrl}/setMain`,
      {
        wallet
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  },

  // Manual Validation Process
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
  },

  async sentManualValidation(token) {
    const result = await axiosInstance.post(
      `${apiUrl}/manual/sent`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data.manualValidation;
  },

  async ackManualValidation(token) {
    await axiosInstance.post(
      `${apiUrl}/manual/ack`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return;
  }
};
