import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const instance = axios.create({ baseURL: API_BASE });

export function setAuthToken(token) {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete instance.defaults.headers.common['Authorization'];
}

export default {
  auth: {
    signup: (data) => instance.post('/auth/signup', data),
    login: (data) => instance.post('/auth/login', data),
  },
  tasks: {
    list: () => instance.get('/tasks'),
    create: (payload) => instance.post('/tasks', payload),
    update: (id, payload) => instance.put(`/tasks/${id}`, payload),
    del: (id) => instance.delete(`/tasks/${id}`),
    suggestions: () => instance.get('/tasks/suggestions')
  }
};
