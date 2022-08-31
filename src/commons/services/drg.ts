import axios from 'axios';

const auth = axios.create({
  baseURL: import.meta.env.VITE_DRG_API_AUTH_URL,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_DRG_API_URL
});

export { auth, api };