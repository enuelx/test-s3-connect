import axios from 'axios';

import config from '@config';

const apiUrl = `${config.accountsApiUrl}/api/account`;

export default {
  async login(username, password) {
    const result = await axios.post(
      `${apiUrl}/login`,
      {
        username,
        password
      },
      {
        withCredentials: true
      }
    );

    return result.data;
  },

  async signUp(username, password) {
    const result = await axios.post(
      `${apiUrl}/signup`,
      {
        username,
        password
      },
      {
        withCredentials: true
      }
    );

    return result.data;
  },

  async refreshToken() {
    const result = await axios.post(
      `${apiUrl}/refresh`,
      {},
      { withCredentials: true }
    );

    return result.data;
  }
};
