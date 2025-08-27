import axios from 'axios';

// Create axios instance with base URL from environment
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add authorization header with JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors by redirecting to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    const response = await apiClient.post('/api/auth/login', { username, password });
    return response.data;
  },
  getUserProfile: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },
};

// Reports API
export const reportsAPI = {
  getConfig: async () => {
    const response = await apiClient.get('/api/reports/config');
    return response.data;
  },
  executeReport: async (internalID, params) => {
    const response = await apiClient.post('/api/reports/execute', { internalID, params });
    return response.data;
  },
  getDataSource: async (sourceName) => {
    const response = await apiClient.get(`/api/reports/datasource/${sourceName}`);
    return response.data;
  },
};

export default apiClient;
