import api from './axios';

export const getUsers = (search = '') =>
  api.get(`/users${search ? `?search=${encodeURIComponent(search)}` : ''}`);

export const searchUsers = (q) => api.get(`/users/search?q=${encodeURIComponent(q)}`);

export const getMe = () => api.get('/users/me');

export const updateProfile = (data) => api.put('/users/me', data);
