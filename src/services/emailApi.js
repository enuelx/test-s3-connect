import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  withCredentials: true
});

const apiUrl = `${config.apiUrl}/api/email`;

export default {
  async update(token, email) {
    const result = await axiosInstance.post(
      `${apiUrl}/update`,
      {
        email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  },

  async resendVerification(token) {
    const result = await axiosInstance.post(
      `${apiUrl}/sendVerify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  },

  async verify(verifyToken) {
    const result = await axiosInstance.post(`${apiUrl}/verify`, {
      verifyToken
    });

    return result.data;
  }
};
