import { useStorageState } from '@/hooks/useStorageState';
import axios from 'axios';

const baseURL = 'https://intimate-buzzard-purely.ngrok-free.app';

// Function to create an Axios instance with the provided token
const createAuthAxiosInstance = () => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = useStorageState('session');

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};

export default createAuthAxiosInstance;