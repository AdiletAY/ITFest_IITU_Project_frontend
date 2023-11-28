import axios from 'axios';
import decode, { JwtPayload } from 'jwt-decode';

const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token') || null;

  if (!token) return config;
  const access = JSON.parse(token)?.access;
  const refresh = JSON.parse(token)?.refresh || null;
  const decodeData: JwtPayload = decode(access);
  const { exp } = decodeData;

  if (exp && Date.now() >= exp * 1000) {
    localStorage.removeItem('token');
    if (refresh) {
      const response = await axios.post(`${baseURL}auth/token/refresh/`, {
        refresh: refresh,
      });

      localStorage.setItem('token', JSON.stringify(response.data));
      config.headers.Authorization = `Bearer ${response.data.access}`;
    }
    return config;
  }

  config.headers.Authorization = `Bearer ${access}`;
  return config;
});

export default instance;
