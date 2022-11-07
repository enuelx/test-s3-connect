import axios from 'axios';

import config from '@config';

const apiUrl = `${config.apiUrl}/api/challengers`;

export default {
  async add({ username, token }) {
    const result = await axios.post(
      `${apiUrl}/add`,
      {
        username
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return result.data;
  },

  async remove({ username, token }) {
    const result = await axios.post(
      `${apiUrl}/remove`,
      {
        username
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
