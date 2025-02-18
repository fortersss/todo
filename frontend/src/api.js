import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/auth',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.response.use(response => {
  const token = response.headers['access-token'];
  if (token) {
    localStorage.setItem('auth-token', token);
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export default api;
