import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  withCredentials: true
});

const apiUrl = `${config.apiUrl}/api/shippingAddress`;

export default {
  async update(token, shippingAddress) {
    const result = await axiosInstance.post(
      `${apiUrl}/update`,
      {
        ...shippingAddress
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
