import axios from 'axios';
import { useSession } from '../context/ctx';

const API_URL = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach the token automatically to requests
axiosInstance.interceptors.request.use(async (config) => {
  const { session } = useSession(); 
  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }else{
    config.headers.Authorization = ``;
  }
  return config;
});

export default axiosInstance;
