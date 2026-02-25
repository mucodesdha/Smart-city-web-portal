import axios from 'axios';

// Create an axios instance with the backend base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to add JWT token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;