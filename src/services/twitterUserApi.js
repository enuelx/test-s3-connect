import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  withCredentials: true
});

const apiUrl = `${config.apiUrl}/api/twitterUser`;

export default {
  async getLinkLogin(token) {
    const result = await axiosInstance.get(`${apiUrl}/login`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return `https://api.twitter.com/oauth/authenticate?oauth_token=${result.data.oauth_token}`;
  },

  async associateUser({ oauth_token, oauth_verifier, token }) {
    const result = await axiosInstance.post(
      apiUrl,
      {
        oauth_token,
        oauth_verifier
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  }
};
