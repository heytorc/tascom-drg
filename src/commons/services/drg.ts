import axios from 'axios';

const auth = axios.create({
  baseURL: import.meta.env.VITE_DRG_API_AUTH_URL,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_DRG_API_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_DRG_API_KEY
  }
});

export { auth, api };