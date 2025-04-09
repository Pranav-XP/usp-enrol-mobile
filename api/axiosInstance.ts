import axios from 'axios';

const baseURL = 'https://intimate-buzzard-purely.ngrok-free.app';

// Function to create an Axios instance with the provided token
const instance = (token: string | null) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add the Authorization header if a token is provided
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};

export default instance;