import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Upload XML file
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get all reports
export const getAllReports = () => {
  return api.get('/reports');
};

// Get single report by ID
export const getReportById = (id) => {
  return api.get(`/reports/${id}`);
};

export default api;