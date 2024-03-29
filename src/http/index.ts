/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_URL } from '../utils/constants';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use((config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });

        localStorage.setItem('token', response.data.accessToken);

        return $api.request(originalRequest);
      } catch (e) {
        console.log('Not authorized');
      }
    }

    throw error;
  });

export default $api;
