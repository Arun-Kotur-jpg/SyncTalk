import api from './axios';

export const generateSummary = (conversationId) =>
  api.post(`/summary/${conversationId}`);

export const getSummaries = (conversationId) =>
  api.get(`/summary/${conversationId}`);
