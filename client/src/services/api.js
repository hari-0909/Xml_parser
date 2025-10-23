// client/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
console.log('API base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // <- add /api here
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAllReports = () => api.get('/reports');
export const getReportById = (id) => api.get(`/reports/${id}`);

export default api;
