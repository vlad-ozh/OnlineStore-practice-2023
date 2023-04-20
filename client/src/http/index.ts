import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

export default axiosInstance;
