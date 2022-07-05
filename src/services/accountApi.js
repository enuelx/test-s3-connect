import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  withCredentials: true
});

const apiUrl = `${config.accountsApiUrl}/api/account`;

export default {
  async login(username, password) {
    const result = await axiosInstance.post(`${apiUrl}/login`, {
      username,
      password
    });

    return result.data;
  },

  async signUp(username, password) {
    const result = await axiosInstance.post(`${apiUrl}/signup`, {
      username,
      password
    });

    return result.data;
  },

  async refreshToken() {
    const result = await axiosInstance.post(`${apiUrl}/refresh`, {});

    return result.data;
  },

  async userDetails(token) {
    const result = await axiosInstance.get(`${apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return result.data.account;
  },

  async logout(token) {
    const result = await axiosInstance.get(`${apiUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return result.data;
  }
};
