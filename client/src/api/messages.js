import api from './axios';

export const getMessages = (conversationId, page = 1, limit = 50) =>
  api.get(`/messages/${conversationId}?page=${page}&limit=${limit}`);

export const searchMessages = (conversationId, q) =>
  api.get(`/messages/${conversationId}/search?q=${encodeURIComponent(q)}`);

export const getMentions = () => api.get('/messages/user/mentions');

export const clearMention = (messageId) => api.delete(`/messages/${messageId}/mentions`);
