import axios from 'axios';

import config from '@config';

const filesApiUrl = config.apiUrl + '/api/files';

export default {
  getCypherFileUrl: async (id, token) => {
    const response = await axios.get(filesApiUrl, {
      params: {
        cypherId: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.url;
  }
};
