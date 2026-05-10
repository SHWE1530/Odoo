import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('traveloop_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Automatically handle refresh token cascades generically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Intercept 401 Unauthorized errors and force logic to re-authenticate or eject
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('traveloop_access_token');
      localStorage.removeItem('traveloop_refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
