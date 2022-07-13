import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  withCredentials: true
});

const apiUrl = `${config.apiUrl}/api/discordUser`;

export default {
  async getDiscordUserAssociateCode(token) {
    const result = await axiosInstance.get(`${apiUrl}/associate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return result.data;
  }
};
