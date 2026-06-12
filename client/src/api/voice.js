import api from './axios';

export const uploadVoice = (formData) =>
  api.post('/voice/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const transcribeVoice = (messageId) =>
  api.post(`/voice/transcribe/${messageId}`);
