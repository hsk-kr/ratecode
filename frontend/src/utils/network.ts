import axios from 'axios';
import { clearAccessToken, getAccessToken } from './store';

export const network = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

network.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
});

network.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      return;
    }
    return Promise.reject(error);
  }
);
